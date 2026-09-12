import { supabase } from "../config/supabase.js";
import { PLAN_LIMITS } from "../constants/keywords.js";

export const checkRateLimit = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized: No token provided" });

  const token = authHeader.split(" ")[1];
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }

  req.user = user;

  const today = new Date().toISOString().split("T")[0];
  const [{ data: profile }, { count, error: countError }] = await Promise.all([
    supabase.from("profiles").select("plan_name").eq("id", user.id).maybeSingle(),
    supabase
      .from("usage_logs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", today),
  ]);

  if (countError) {
    console.error("Rate limit check error:", countError);
    return next(); // Fail-safe
  }

  const plan = profile?.plan_name || "free";
  const currentLimit = PLAN_LIMITS[plan] ?? 10;

  if (count >= currentLimit) {
    const nextPlan = plan === "free" ? "Silver" : plan === "silver" ? "Gold" : null;
    const upgradeMsg = nextPlan
      ? `Upgrade to ${nextPlan} for more daily requests.`
      : "You've reached your maximum daily limit.";

    return res.status(429).json({
      error: "Daily limit reached",
      message: `You've reached your daily limit of ${currentLimit} AI requests. ${upgradeMsg}`,
    });
  }

  next();
};

export const logUsage = async (userId, feature) => {
  await supabase.from("usage_logs").insert([{ user_id: userId, feature_name: feature }]);
};