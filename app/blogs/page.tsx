import { navItems } from "@/data";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { supabaseAdmin } from '@/lib/supabaseAdmin';

type Post = {
  id: number;
  title: string;
  excerpt?: string;
  date?: string | null;
  url?: string;
};

export default async function BlogsPage() {
  const { data: postsData, error } = await supabaseAdmin.from<Post>('posts').select('*').order('date', { ascending: false });
  const posts = error ? [] : postsData || [];

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
              href={post.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-white/10 p-6 transition-colors hover:border-white/20"
            >
              <h2 className="text-xl font-semibold group-hover:text-purple">{post.title}</h2>
              {post.excerpt && <p className="mt-2 text-neutral-300">{post.excerpt}</p>}
              <p className="mt-4 text-sm text-neutral-400">{post.date ? new Date(post.date).toLocaleDateString() : ''}</p>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}
