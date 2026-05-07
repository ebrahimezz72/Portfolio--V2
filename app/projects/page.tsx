import type { Metadata } from "next";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore a curated collection of digital projects and web applications developed by Ibrahim Ezzeldin.",
};

export default function ProjectsPage() {
  return (
    <main className="pt-24 lg:pt-28 min-h-screen">
      <Projects />
    </main>
  );
}
