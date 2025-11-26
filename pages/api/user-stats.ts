import type { NextApiRequest, NextApiResponse } from "next";

import { getUserStatsFromSupabase } from "@/lib/supabase";
import { loadDataset, computeStatistics } from "@/lib/dataset";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get stats from original dataset (CSV)
    const profiles = loadDataset();
    const datasetStats = computeStatistics(profiles);

    // Get stats from Supabase (new user submissions)
    const supabaseStats = await getUserStatsFromSupabase();

    return res.status(200).json({
      success: true,
      trainingDataset: {
        source: "Indian Fitness Dataset (CSV)",
        totalProfiles: datasetStats.totalRecords,
        demographics: datasetStats.demographics,
        goals: datasetStats.goals,
        dietTypes: datasetStats.dietTypes,
        exerciseTypes: datasetStats.exercise.types.slice(0, 5),
      },
      userDatabase: {
        source: "Supabase (PostgreSQL)",
        totalUsers: supabaseStats?.totalUsers || 0,
        lastActivity: supabaseStats?.lastUser || null,
        stats: supabaseStats?.stats || null,
        recentUsers: supabaseStats?.recentUsers || [],
      },
      combined: {
        totalDataPoints: datasetStats.totalRecords + (supabaseStats?.totalUsers || 0),
        description: "1000 training profiles + live user submissions",
      },
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return res.status(500).json({
      error: "Failed to get stats",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
