"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function FileUpload({ onUpload }: { onUpload: (path: string) => void }) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const filePath = `uploads/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from('uploads').upload(filePath, file, { cacheControl: '3600', upsert: false });
      if (uploadError) throw uploadError;

      // Optionally create metadata row in uploaded_files
      const user = (await supabase.auth.getUser()).data.user;
      await supabase.from('uploaded_files').insert([{ user_id: user?.id, bucket: 'uploads', path: filePath, filename: file.name, mime_type: file.type, size: file.size, public: false }]);

      onUpload(filePath);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm mb-2">Upload image</label>
      <input type="file" accept="image/*" onChange={handleFile} />
      {uploading && <div className="text-sm mt-2">Uploading...</div>}
    </div>
  );
}
