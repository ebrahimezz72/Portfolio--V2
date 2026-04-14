import React from "react";
import ContactForm from "./ContactForm";
import { supabase } from "@/lib/supabase/client";

export default async function Contact() {
  const { data: profile } = await supabase.from('profile').select('*').limit(1).single();

  return (
    <div className="flex flex-col w-full min-h-screen pt-32 pb-20 md:pb-32">
      <section className="px-6 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-20 md:mb-32">
          <div className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase mb-8">
            AVAILABILITY: {profile?.availability_status === 'OPEN' ? 'AVAILABLE NOW' : 'SOON'}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight">
            Start a <span className="italic font-light text-[#d9ba96]">Conversation.</span>
          </h1>
        </div>

        {/* Form and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-12">
          
          {/* Left Column - Form */}
          <ContactForm />

          {/* Right Column - Info */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col">
            
            <div className="mb-16">
              <h4 className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase mb-6">
                Direct Channel
              </h4>
              <a href={`mailto:${profile?.email || 'hello@domain.com'}`} className="text-2xl md:text-3xl text-white hover:text-[#d3e97a] transition-colors block mb-4">
                {profile?.email || 'hello@domain.com'}
              </a>
              <div className="flex items-center gap-3 text-zinc-400 text-sm md:text-base">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{profile?.location || 'Remote'}</span>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase mb-8">
                Ecosystem
              </h4>
              <div className="flex flex-col gap-6 text-xl md:text-2xl text-white">
                {profile?.linkedin_url && (
                   <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#d3e97a] transition-colors self-start">LinkedIn</a>
                )}
                {profile?.github_url && (
                   <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#d3e97a] transition-colors self-start">GitHub</a>
                )}
                {profile?.behance_url && (
                   <a href={profile.behance_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#d3e97a] transition-colors self-start">Behance</a>
                )}
                {profile?.dribbble_url && (
                   <a href={profile.dribbble_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#d3e97a] transition-colors self-start">Dribbble</a>
                )}
                {profile?.cv_url && (
                   <a href={profile.cv_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#d3e97a] transition-colors self-start">Read.cv</a>
                )}
              </div>
            </div>

            <div className="w-full h-[1px] bg-zinc-800 my-10"></div>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Whether you have a specific project or just want to talk shop over a digital coffee, my inbox is always open. I typically respond within 24–48 business hours.
            </p>

          </div>

        </div>
      </section>
    </div>
  );
}
