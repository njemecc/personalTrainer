import { getNutritionPlanByUserId } from "@/lib/actions/nutritionPlan.actions";
import UserNutrition from "@/components/features/nutrition/UserNutrition";
import { UserDetailsPageParams } from "@/types/users";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NutritionPlanPage = async ({ params }: UserDetailsPageParams) => {
  console.log("Učitavanje plana ishrane za korisnika:", params.userId);

  const nutritionPlan = await getNutritionPlanByUserId(params.userId);
  console.log("Nutrition plan učitan:", nutritionPlan ? "Da" : "Ne");

  if (nutritionPlan) {
    console.log("Podaci plana ishrane:", {
      id: nutritionPlan._id,
      name: nutritionPlan.name,
      url: nutritionPlan.url,
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Plan Ishrane</h1>
        <Link href={`/plan/${params.userId}`}>
          <Button variant="outline" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dumbbell"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>
            <span>Pregledaj plan treninga</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <UserNutrition userId={params.userId} nutritionPlan={nutritionPlan} />
        </div>
      </div>
    </div>
  );
};

export default NutritionPlanPage;
