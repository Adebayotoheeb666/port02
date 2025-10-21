import { navItems } from "@/data";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

const posts = [
  {
    id: 1,
    title: "Designing a Modern Portfolio with Next.js",
    excerpt: "A practical guide to building a fast, animated portfolio using the App Router, Tailwind, and Framer Motion.",
    date: "2024-07-10",
    url: "https://nextjs.org/learn",
  },
  {
    id: 2,
    title: "3D on the Web with Three.js",
    excerpt: "Key concepts for integrating Three.js scenes into React apps without hurting performance.",
    date: "2024-06-02",
    url: "https://threejs.org/docs/",
  },
  {
    id: 3,
    title: "Motion Design Basics for Developers",
    excerpt: "How to use Framer Motion to create delightful interactions that feel polished and intentional.",
    date: "2024-05-15",
    url: "https://www.framer.com/motion/",
  },
];

export default function BlogsPage() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <section className="py-20">
          <h1 className="heading">Latest <span className="text-purple">Blogs</span></h1>
          <p className="text-base text-neutral-300 mt-3">Articles and resources on building great web experiences.</p>
        </section>
        <section className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-white/10 p-6 transition-colors hover:border-white/20"
            >
              <h2 className="text-xl font-semibold group-hover:text-purple">{post.title}</h2>
              <p className="mt-2 text-neutral-300">{post.excerpt}</p>
              <p className="mt-4 text-sm text-neutral-400">{new Date(post.date).toLocaleDateString()}</p>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}
