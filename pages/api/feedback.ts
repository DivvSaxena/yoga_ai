import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@/lib/supabase";

type FeedbackData = {
  name: string;
  email: string;
  phone: string;
  ageGroup: string;
  city: string;
  occupation: string;
  currentFitnessLevel: string;
  fitnessGoals: string[];
  dietType: string;
  howDidYouHear: string;
  rating: number;
  likedFeatures: string;
  improvements: string;
  wouldRecommend: boolean | null;
  consentToResearch: boolean;
  consentToContact: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data: FeedbackData = req.body;

    const { data: feedback, error } = await supabase
      .from("feedback")
      .insert({
        name: data.name || null,
        email: data.email || null,
        phone: data.phone || null,
        age_group: data.ageGroup || null,
        city: data.city || null,
        occupation: data.occupation || null,
        current_fitness_level: data.currentFitnessLevel || null,
        fitness_goals: data.fitnessGoals.length > 0 ? data.fitnessGoals : null,
        diet_type: data.dietType || null,
        how_did_you_hear: data.howDidYouHear || null,
        rating: data.rating || null,
        liked_features: data.likedFeatures || null,
        improvements: data.improvements || null,
        would_recommend: data.wouldRecommend,
        consent_to_research: data.consentToResearch,
        consent_to_contact: data.consentToContact,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Failed to save feedback", details: error.message });
    }

    // Get total feedback count
    const { count } = await supabase
      .from("feedback")
      .select("*", { count: "exact", head: true });

    return res.status(200).json({
      success: true,
      feedbackId: feedback?.id,
      totalFeedback: count,
      message: "Thank you for your feedback!",
    });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      error: "Failed to submit feedback",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
