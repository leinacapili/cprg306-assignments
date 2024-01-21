import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <h1 class="text-4xl font-bold mb-5">CPRG 306: Web Development 2 - Assignments</h1>
        <Link href="/week-2" class="hover-">Week 2 Assignment</Link>
      </div>
    </main>
  );
}
