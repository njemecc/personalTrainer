import UserDetails from "@/components/features/admin/users/userDetails/userDetails";
import { getUserAndSurveyInfo } from "@/lib/actions/survey.actions";
import { UserDetailsPageParams } from "@/types/users";

const page = async ({ params }: UserDetailsPageParams) => {
  const user = await getUserAndSurveyInfo(params.userId);

  console.log(user);

  if (!user)
    return (
      <h1 className="text-xl">
        Korisnik sa ovim identifikatorom ne postoji u bazi podataka ili nije
        popunio anketu.
      </h1>
    );
  return <UserDetails {...user} />;
};

export default page;
