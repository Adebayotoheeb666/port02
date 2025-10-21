"use client";

import { useState, useEffect } from 'react';
import FileUpload from './FileUpload';

type Post = { id?: number; title: string; excerpt?: string; content?: string; date?: string; url?: string };

export default function PostForm({ post, onSaved, onCancel }: { post?: Post | null; onSaved: () => void; onCancel?: () => void }) {
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [url, setUrl] = useState(post?.url || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(post?.title || '');
    setExcerpt(post?.excerpt || '');
    setContent(post?.content || '');
    setUrl(post?.url || '');
  }, [post]);

  async function submit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload = { title, excerpt, content, url, date: new Date().toISOString() };
      const method = post?.id ? 'PUT' : 'POST';
      const body = post?.id ? { id: post.id, ...payload } : payload;
      const res = await fetch('/api/posts', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error('Save failed');
      onSaved();
    } catch (err) {
      console.error(err);
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm">Title</label>
        <input className="w-full p-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm">Excerpt</label>
        <input className="w-full p-2" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm">Content</label>
        <textarea className="w-full p-2" value={content} onChange={(e) => setContent(e.target.value)} rows={6} />
      </div>
      <div>
        <label className="block text-sm">External URL</label>
        <input className="w-full p-2" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-2 border" type="submit" disabled={saving}>{post?.id ? 'Save' : 'Create'}</button>
        {onCancel && (
          <button type="button" className="px-3 py-2 border" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}
