import { navItems } from "@/data";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import RecentProjects from "@/components/RecentProjects";

export default function ProjectsPage() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <section className="py-20">
          <h1 className="heading">All <span className="text-purple">Projects</span></h1>
          <p className="text-base text-neutral-300 mt-3">Browse a curated list of recent and highlighted work.</p>
        </section>
        <RecentProjects />
      </div>
    </main>
  );
}
