"use server";

import { connectToDatabase } from "../database/mongodb";
import User from "../database/mongodb/models/user.model";
import Survey from "../database/mongodb/models/survey.model";
import WorkoutPlan from "../database/mongodb/models/workoutplan.model";
import NutritionPlan from "../database/mongodb/models/nutritionPlan.model";
import { handleError } from "../utils";

export const getDashboardStatistics = async () => {
  try {
    await connectToDatabase();

    // Ukupan broj korisnika
    const totalUsers = await User.countDocuments();

    // Aktivni korisnici
    const activeUsers = await User.countDocuments({ is_active: true });

    // Neaktivni korisnici
    const inactiveUsers = totalUsers - activeUsers;

    // Broj popunjenih anketa
    const totalSurveys = await Survey.countDocuments();

    // Broj trening planova
    const totalWorkoutPlans = await WorkoutPlan.countDocuments();

    // Broj korisnika sa planovima ishrane
    const usersWithNutritionPlans = await User.countDocuments({
      nutritionPlans: { $exists: true, $ne: [] },
    });

    // Broj ukupnih planova ishrane (svih tipova)
    const totalNutritionPlans = await NutritionPlan.countDocuments();

    // Registracije po mesecima (poslednjih 6 meseci)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const usersByMonth = await User.aggregate([
      {
        $match: {
          created_at: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    // Statistike iz anketa
    const surveyStats = await Survey.aggregate([
      {
        $group: {
          _id: "$tipOsobe",
          count: { $sum: 1 },
        },
      },
    ]);

    const radniStatusStats = await Survey.aggregate([
      {
        $group: {
          _id: "$radniStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    const ranijeTreniraliStats = await Survey.aggregate([
      {
        $group: {
          _id: "$ranijeTrenirali",
          count: { $sum: 1 },
        },
      },
    ]);

    // Prosečna visina i težina - izračunaj na osnovu validnih brojeva
    const allSurveys = await Survey.find({}, { visina: 1, tezina: 1 }).lean();

    const validVisine = allSurveys
      .map((s: any) => {
        const num = parseFloat(
          s.visina?.toString().replace(/[^\d.,]/g, "") || ""
        );
        return isNaN(num) ? null : num;
      })
      .filter((n: number | null): n is number => n !== null);

    const validTezine = allSurveys
      .map((s: any) => {
        const num = parseFloat(
          s.tezina?.toString().replace(/[^\d.,]/g, "") || ""
        );
        return isNaN(num) ? null : num;
      })
      .filter((n: number | null): n is number => n !== null);

    const avgVisina =
      validVisine.length > 0
        ? validVisine.reduce((a, b) => a + b, 0) / validVisine.length
        : 0;

    const avgTezina =
      validTezine.length > 0
        ? validTezine.reduce((a, b) => a + b, 0) / validTezine.length
        : 0;

    // Broj korisnika sa planovima ishrane po mesecima
    const nutritionPlansByMonth = await User.aggregate([
      {
        $unwind: "$nutritionPlans",
      },
      {
        $match: {
          "nutritionPlans.assignedAt": { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$nutritionPlans.assignedAt" },
            month: { $month: "$nutritionPlans.assignedAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    return {
      overview: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        totalSurveys,
        totalWorkoutPlans,
        usersWithNutritionPlans,
        totalNutritionPlans,
        avgVisina,
        avgTezina,
      },
      registrationsByMonth: usersByMonth.map((item: any) => ({
        month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
        count: item.count,
      })),
      nutritionPlansByMonth: nutritionPlansByMonth.map((item: any) => ({
        month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
        count: item.count,
      })),
      surveyStats: {
        tipOsobe: surveyStats,
        radniStatus: radniStatusStats,
        ranijeTrenirali: ranijeTreniraliStats,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard statistics:", error);
    handleError(error);
    throw error;
  }
};
