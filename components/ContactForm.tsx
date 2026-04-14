"use client";

import React, { useState, useTransition } from "react";
import { submitContactMessage } from "@/app/actions";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await submitContactMessage(null, formData);
      setStatus(result);
      if (result.success) {
         (e.target as HTMLFormElement).reset();
         setTimeout(() => setStatus(null), 5000);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-12 md:gap-16">
      <div className="flex flex-col">
        <label htmlFor="fullName" className="text-xs font-bold tracking-widest text-[#d3e97a] uppercase mb-3">
          Full Name
        </label>
        <input 
          type="text" 
          id="fullName"
          name="fullName"
          required
          placeholder="e.g. Ibrahim Ezzeldin" 
          className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-4 text-lg md:text-xl text-white outline-none focus:border-[#d3e97a] focus:bg-zinc-800 transition-all placeholder:text-zinc-600 disabled:opacity-50"
          disabled={isPending}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-xs font-bold tracking-widest text-[#d3e97a] uppercase mb-3">
          Email Address
        </label>
        <input 
          type="email" 
          id="email"
          name="email"
          required
          placeholder="hello@domain.com" 
          className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-4 text-lg md:text-xl text-white outline-none focus:border-[#d3e97a] focus:bg-zinc-800 transition-all placeholder:text-zinc-600 disabled:opacity-50"
          disabled={isPending}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="phone" className="text-xs font-bold tracking-widest text-[#d3e97a] uppercase mb-3">
          Phone Number
        </label>
        <input 
          type="tel" 
          id="phone"
          name="phone"
          placeholder="e.g. +20 123 456 7890" 
          className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-4 text-lg md:text-xl text-white outline-none focus:border-[#d3e97a] focus:bg-zinc-800 transition-all placeholder:text-zinc-600 disabled:opacity-50"
          disabled={isPending}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="message" className="text-xs font-bold tracking-widest text-[#d3e97a] uppercase mb-3">
          Your Message
        </label>
        <textarea 
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell me about your project or say hi..." 
          className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-4 text-lg md:text-xl text-white outline-none focus:border-[#d3e97a] focus:bg-zinc-800 transition-all placeholder:text-zinc-600 resize-none disabled:opacity-50"
          disabled={isPending}
        ></textarea>
      </div>

      {status && (
        <div className={`p-4 rounded-xl text-sm font-medium ${status.success ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {status.message}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isPending}
        className="group flex items-center justify-between md:justify-start gap-6 mt-4 disabled:opacity-50 transition-opacity self-start w-full md:w-auto cursor-pointer"
      >
        <span className="text-xl md:text-3xl font-medium text-white transition-colors group-hover:text-[#d3e97a]">
           {isPending ? 'Sending...' : 'Send Inquiry'}
        </span>
        {!isPending && (
          <svg className="w-8 h-8 text-white transition-transform group-hover:translate-x-2 group-hover:text-[#d3e97a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        )}
      </button>
    </form>
  );
}
