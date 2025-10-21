"use client";

import { useState } from "react";
import { navItems } from "@/data";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:contact@jsmastery.pro?subject=${subject}&body=${body}`;
  };

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-2xl w-full">
        <FloatingNav navItems={navItems} />
        <section className="py-20">
          <h1 className="heading">Get in <span className="text-purple">Touch</span></h1>
          <p className="text-base text-neutral-300 mt-3">Fill out the form and I'll get back to you.</p>
        </section>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md bg-neutral-900 border border-white/10 p-3 outline-none focus:border-white/20"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-neutral-900 border border-white/10 p-3 outline-none focus:border-white/20"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full rounded-md bg-neutral-900 border border-white/10 p-3 outline-none focus:border-white/20"
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-md border border-white/10 px-5 py-3 font-medium hover:border-white/20"
          >
            Send Email
          </button>
        </form>
      </div>
    </main>
  );
}
