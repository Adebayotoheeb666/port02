"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProjectForm from '@/components/dashboard/ProjectForm';
import PostForm from '@/components/dashboard/PostForm';
import FileUpload from '@/components/dashboard/FileUpload';

type Project = { id: number; title: string; des?: string; img?: string; link?: string };
type Post = { id: number; title: string; excerpt?: string; date?: string; url?: string };
type Contact = { id: number; name: string; email: string; message: string };

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, data) => setSession(data.session));
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) fetchAll();
  }, [session]);

  async function signIn() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setSession(data.session);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      alert(err.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  async function fetchAll() {
    try {
      const [pRes, postRes, cRes] = await Promise.all([
        fetch('/api/projects').then((r) => r.json()),
        fetch('/api/posts').then((r) => r.json()),
        fetch('/api/contacts').then((r) => r.json()),
      ]);
      setProjects(pRes || []);
      setPosts(postRes || []);
      setContacts(cRes || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function createProject() {
    const title = prompt('Project title');
    if (!title) return;
    const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) });
    if (res.ok) fetchAll();
  }

  async function deleteProject(id: number) {
    if (!confirm('Delete project?')) return;
    const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchAll();
  }

  async function createPost() {
    const title = prompt('Post title');
    if (!title) return;
    const res = await fetch('/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, date: new Date().toISOString() }) });
    if (res.ok) fetchAll();
  }

  async function deleteContact(id: number) {
    if (!confirm('Delete contact entry?')) return;
    const res = await fetch(`/api/contacts?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchAll();
  }

  if (!session)
    return (
      <main className="p-10 max-w-2xl mx-auto">
        <h1 className="text-2xl mb-4">Admin sign in</h1>
        <input className="w-full p-3 mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-3 mb-4" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex gap-2">
          <button className="px-4 py-2 border" onClick={signIn} disabled={loading}>Sign in</button>
        </div>
      </main>
    );

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Dashboard</h1>
        <div>
          <button className="px-3 py-2 border mr-2" onClick={createProject}>New Project</button>
          <button className="px-3 py-2 border mr-2" onClick={createPost}>New Post</button>
          <button className="px-3 py-2 border" onClick={signOut}>Sign out</button>
        </div>
      </div>

      <section className="grid grid-cols-3 gap-6">
        <div className="col-span-1 border p-4">
          <h2 className="font-semibold mb-3">Projects</h2>
          <ul>
            {projects.map((p) => (
              <li key={p.id} className="flex justify-between items-center py-2">
                <span>{p.title}</span>
                <button className="text-sm text-red-500" onClick={() => deleteProject(p.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 border p-4">
          <h2 className="font-semibold mb-3">Posts</h2>
          <ul>
            {posts.map((p) => (
              <li key={p.id} className="flex justify-between items-center py-2">
                <span>{p.title}</span>
                <button className="text-sm text-red-500" onClick={async () => {
                  if (!confirm('Delete post?')) return;
                  const res = await fetch(`/api/posts?id=${p.id}`, { method: 'DELETE' });
                  if (res.ok) fetchAll();
                }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 border p-4">
          <h2 className="font-semibold mb-3">Contacts</h2>
          <ul>
            {contacts.map((c) => (
              <li key={c.id} className="py-2 border-b">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{c.name} — <span className="text-sm">{c.email}</span></div>
                    <div className="text-sm mt-1">{c.message}</div>
                  </div>
                  <div>
                    <button className="text-sm text-red-500" onClick={() => deleteContact(c.id)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
