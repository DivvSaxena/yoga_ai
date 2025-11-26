import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Type for user data in Supabase
export type YogaUser = {
  id?: string;
  created_at?: string;
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  bmi: number;
  goal: string;
  activity_level: string;
  diet_preference: string;
  medical_conditions: string;
  equipment: string;
  plan_calories: number;
  plan_workout_days: number;
};

// Save user to Supabase
export async function saveUserToSupabase(userData: {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  goal: string;
  activityLevel: string;
  dietPreference: string;
  medicalConditions: string;
  equipment: string;
  planCalories: number;
  planWorkoutDays: number;
}): Promise<{ success: boolean; userId?: string; error?: string }> {
  const weight = parseFloat(userData.weight) || 0;
  const height = parseFloat(userData.height) || 0;
  const bmi = height > 0 ? Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10 : 0;

  const { data, error } = await supabase
    .from("yoga_users")
    .insert({
      name: userData.name,
      age: parseInt(userData.age) || 0,
      gender: userData.gender,
      weight,
      height,
      bmi,
      goal: userData.goal,
      activity_level: userData.activityLevel,
      diet_preference: userData.dietPreference,
      medical_conditions: userData.medicalConditions || "",
      equipment: userData.equipment || "",
      plan_calories: userData.planCalories,
      plan_workout_days: userData.planWorkoutDays,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, error: error.message };
  }

  return { success: true, userId: data?.id };
}

// Get user statistics from Supabase
export async function getUserStatsFromSupabase() {
  // Get total count
  const { count } = await supabase
    .from("yoga_users")
    .select("*", { count: "exact", head: true });

  // Get all users for stats calculation
  const { data: users, error } = await supabase
    .from("yoga_users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !users || users.length === 0) {
    return {
      totalUsers: count || 0,
      stats: null,
    };
  }

  // Calculate statistics
  const avg = (arr: number[]) =>
    arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10 : 0;

  // Goal distribution
  const goalCounts: Record<string, number> = {};
  users.forEach((u) => {
    goalCounts[u.goal] = (goalCounts[u.goal] || 0) + 1;
  });

  // Diet distribution
  const dietCounts: Record<string, number> = {};
  users.forEach((u) => {
    dietCounts[u.diet_preference] = (dietCounts[u.diet_preference] || 0) + 1;
  });

  return {
    totalUsers: count || users.length,
    lastUser: users[0]?.created_at,
    stats: {
      averageAge: avg(users.map((u) => u.age)),
      averageBMI: avg(users.map((u) => u.bmi)),
      averageCalories: avg(users.map((u) => u.plan_calories)),
      goalDistribution: goalCounts,
      dietDistribution: dietCounts,
      genderSplit: {
        male: users.filter((u) => u.gender?.toLowerCase().startsWith("m")).length,
        female: users.filter((u) => u.gender?.toLowerCase().startsWith("f")).length,
      },
    },
    recentUsers: users.slice(0, 5).map((u) => ({
      name: u.name,
      goal: u.goal,
      createdAt: u.created_at,
    })),
  };
}
