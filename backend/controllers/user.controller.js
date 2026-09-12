import { supabase } from "../config/supabase.js";

export const handleMockUpgrade = async (req, res) => {
  try {
    const { plan } = req.body;
    if (!["silver", "gold"].includes(plan)) {
      return res.status(400).json({ error: "Invalid plan selected" });
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        plan_name: plan,
        is_premium: true,
      })
      .eq("id", req.user.id);

    if (error) throw error;

    res.json({ message: `Welcome to ${plan.charAt(0).toUpperCase() + plan.slice(1)}! 🚀` });
  } catch (err) {
    console.error("Upgrade error:", err);
    res.status(500).json({ error: "Upgrade failed", details: err.message });
  }
};
