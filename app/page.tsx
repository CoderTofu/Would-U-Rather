import { prisma } from "@/lib/db";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      Testing
    </div>
  );
}
