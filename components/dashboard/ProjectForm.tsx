"use client";

import { useState, useEffect } from 'react';
import FileUpload from './FileUpload';

type Project = { id?: number; title: string; des?: string; img?: string; link?: string; iconlists?: string[] };

export default function ProjectForm({ project, onSaved, onCancel }: { project?: Project | null; onSaved: () => void; onCancel?: () => void }) {
  const [title, setTitle] = useState(project?.title || '');
  const [des, setDes] = useState(project?.des || '');
  const [link, setLink] = useState(project?.link || '');
  const [img, setImg] = useState(project?.img || '');
  const [iconlists, setIconlists] = useState((project?.iconlists || []).join(','));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(project?.title || '');
    setDes(project?.des || '');
    setLink(project?.link || '');
    setImg(project?.img || '');
    setIconlists((project?.iconlists || []).join(','));
  }, [project]);

  async function submit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const payload = { title, des, link, img, iconLists: iconlists.split(',').map((s) => s.trim()).filter(Boolean) };
      const method = project?.id ? 'PUT' : 'POST';
      const body = project?.id ? { id: project.id, ...payload } : payload;
      const res = await fetch('/api/projects', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
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
        <label className="block text-sm">Description</label>
        <textarea className="w-full p-2" value={des} onChange={(e) => setDes(e.target.value)} rows={3} />
      </div>
      <div>
        <label className="block text-sm">Link</label>
        <input className="w-full p-2" value={link} onChange={(e) => setLink(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm">Icons (comma separated)</label>
        <input className="w-full p-2" value={iconlists} onChange={(e) => setIconlists(e.target.value)} />
      </div>
      <div>
        <FileUpload onUpload={(path) => setImg(path)} />
        {img && <div className="text-sm mt-1">Uploaded: {img}</div>}
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-2 border" type="submit" disabled={saving}>{project?.id ? 'Save' : 'Create'}</button>
        {onCancel && (
          <button type="button" className="px-3 py-2 border" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}
