export const managerPageTemplate = () => `
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "@/utils/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Manager() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <div className="w-full min-h-screen relative bg-(--bg-section-100) transition-colors duration-500 p-6">
      <h2>Bora major.catuca nesse freelas..</h2>
    </div >
  );
};
`;