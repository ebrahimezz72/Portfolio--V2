import React from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
//nananana
export default async function About() {
  const [
    { data: profile },
    { data: skills },
    { data: milestones }
  ] = await Promise.all([
    supabase.from('profile').select('*').limit(1).single(),
    supabase.from('skills').select('id, name, skill_categories(name)').order('display_order', { ascending: true }).limit(8),
    supabase.from('milestones').select('*').order('year', { ascending: false })
  ]);
///sss
  const paragraphs = profile?.bio ? profile.bio.split("\n").filter((p: string) => p.trim() !== '') : [];

  return (
    <div className="flex flex-col w-full pb-32">
      
      {/* 
        1. HERO HEADER 
      */}
      <section className="px-6 py-16 md:py-24 lg:py-32 max-w-7xl mx-auto w-full">
        <div className="text-[10px] md:text-xs font-bold tracking-widest text-[#d3e97a] uppercase mb-6 md:mb-8">
          Editorial Engineering
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
          The Digital Artisan:<br />Behind the Code.
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-2xl leading-relaxed font-light">
          Crafting high-fidelity interfaces through the lens of structural integrity and aesthetic warmth.
        </p>
      </section>

      {/* 
        2. THE NARRATIVE
      */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto w-full border-t border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-start">
        <div className="lg:col-span-3 mb-2 lg:mb-0">
          <h2 className="text-[10px] md:text-xs font-bold tracking-widest text-[#d3e97a] uppercase lg:sticky lg:top-32">
            The Narrative
          </h2>
        </div>
        <div className="lg:col-span-9 flex flex-col gap-8 md:gap-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-medium leading-[1.2] tracking-tight text-white">
            {profile?.philosophy || "I believe software should feel like a bespoke timepiece—precise in its mechanics, yet human in its touch."}
          </h3>
          <div className="flex flex-col gap-4 md:gap-6 text-zinc-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl font-light">
            {paragraphs.length > 0 ? (
              paragraphs.map((p: string, i: number) => <p key={i}>{p}</p>)
            ) : (
              <>
                <p>
                  With over a year of dedicated front-end exploration, my journey isn&apos;t just about moving pixels; it&apos;s about <strong className="text-white font-medium">Engineering Intention</strong>. I approach the browser as a canvas where performance meets poetry.
                </p>
                <p>
                  Transitioning from a background focused on technical logic to the expressive world of user interfaces, I&apos;ve found my niche in the intersection of <strong className="text-[#d3e97a] font-medium">minimalist aesthetics and robust architecture</strong>.
                </p>
                <p>
                  Every line of code is a commitment to the end-user&apos;s serenity.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 
        3. CORE PHILOSOPHY
      */}
      <section className="bg-[#141414] border-y border-zinc-800 w-full py-16 md:py-24">
        <div className="px-6 max-w-7xl mx-auto w-full">
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Core Philosophy</h2>
            <div className="w-12 md:w-16 h-1 bg-[#d3e97a]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
            <div className="flex flex-col gap-4 md:gap-5">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#d3e97a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">Precision</h3>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                Meticulous attention to spacing, typography scales, and structural hierarchy. Ensuring a layout that breathes and functions with absolute clarity.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 md:gap-5">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#d3e97a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M5 5l1.5 1.5"/><path d="M17.5 17.5L19 19"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M5 19l1.5-1.5"/><path d="M17.5 6.5L19 5"/></svg>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">Intentionality</h3>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                No element exists without a purpose. We reject decorative clutter in favor of meaningful interactions that guide the user journey.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 md:gap-5">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#d3e97a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">Performance</h3>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                Beauty is nothing without speed. High-end experiences are built on optimized assets and lightweight, semantic codebases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        4. TECHNOLOGICAL STACK
      */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-start">
        <div className="lg:col-span-4 flex flex-col gap-3 lg:sticky lg:top-32 mb-4 lg:mb-0">
          <h2 className="text-[10px] md:text-xs font-bold tracking-widest text-[#d3e97a] uppercase">
            Technological Stack
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xs">
            A curated selection of modern tools used to bridge the gap between design and production.
          </p>
        </div>
        
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5">
          {skills && skills.length > 0 ? (
            skills.map((skill) => (
              <div key={skill.id} className="bg-[#181818] border border-zinc-800 rounded-lg p-5 border-l-4 hover:border-l-[#d3e97a] transition-all duration-300">
                <h4 className="font-bold text-white text-base md:text-lg mb-1 truncate">{skill.name}</h4>
                <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest truncate">
                  {(skill.skill_categories as any)?.name || 'CORE'}
                </p>
              </div>
            ))
          ) : (
            // Fallback content if empty
            ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Three.js', 'Framer Motion', 'Figma', 'Git'].map((item, i) => (
              <div key={i} className="bg-[#181818] border border-zinc-800 rounded-lg p-5 border-l-4 hover:border-l-[#d3e97a] transition-all duration-300">
                <h4 className="font-bold text-white text-base md:text-lg mb-1">{item}</h4>
                <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">ECOSYSTEM</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 
        5. MILESTONES
      */}
      <section className="px-6 py-16 md:py-24 bg-[#121212] border-y border-zinc-800 w-full relative">
        <div className="max-w-4xl mx-auto flex flex-col w-full relative">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">Milestones</h2>
            <div className="text-[10px] md:text-xs font-bold tracking-widest text-[#d3e97a] uppercase">
              The Timeline of Growth
            </div>
          </div>

          <div className="relative border-l border-zinc-800 ml-4 md:ml-8 pl-8 md:pl-12 flex flex-col gap-12 md:gap-16">
            {milestones && milestones.length > 0 ? (
              milestones.map((ms) => (
                <div key={ms.id} className="relative group">
                  <div className="absolute w-3 h-3 bg-[#111] border-2 border-zinc-600 rounded-full -left-[38px] md:-left-[54px] top-1.5 group-hover:border-[#d3e97a] transition-colors"></div>
                  <div className="flex flex-col gap-2 md:gap-3">
                    <span className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase">
                      {ms.year}
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">{ms.title}</h3>
                    <p className="text-zinc-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mt-1">
                       {ms.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              // Fallback content if empty
              <>
                <div className="relative group">
                  <div className="absolute w-3 h-3 bg-[#111] border-2 border-zinc-600 rounded-full -left-[38px] md:-left-[54px] top-1.5 group-hover:border-[#d3e97a] transition-colors"></div>
                  <div className="flex flex-col gap-2 md:gap-3">
                    <span className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase">Present — 2024</span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">Digital Artisan Studio</h3>
                    <p className="text-zinc-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mt-1">
                      Independent focus on high-end portfolio development and design system engineering for niche web brands.
                    </p>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute w-3 h-3 bg-[#111] border-2 border-zinc-600 rounded-full -left-[38px] md:-left-[54px] top-1.5 group-hover:border-[#d3e97a] transition-colors"></div>
                  <div className="flex flex-col gap-2 md:gap-3">
                    <span className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase">2023 — Foundation</span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">Frontend Deep-Dive</h3>
                    <p className="text-zinc-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mt-1">
                      Immersive transits into React ecosystems, mastering the balance between functional programming and modern UI patterns.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 
        6. CTA SECTION
      */}
      <section className="px-6 py-20 md:py-32 max-w-5xl mx-auto w-full">
         <div className="bg-[#181818] border border-zinc-800 rounded-2xl md:rounded-[32px] p-8 md:p-16 flex flex-col items-center justify-center text-center gap-6 md:gap-8 shadow-2xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2 max-w-2xl">
              Let&apos;s Build Something <span className="italic font-light text-[#d9ba96]">Meaningful.</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
              Currently accepting new collaborations for high-end digital experiences. Whether you have a specific project or just want to discuss the future of the web.
            </p>
            <Link 
              href="/contact" 
              className="mt-6 md:mt-8 bg-[#d3e97a] text-black px-8 py-3.5 md:py-4 rounded-lg font-bold tracking-wide hover:bg-[#b0c85f] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Start a Conversation
            </Link>
         </div>
      </section>

    </div>
  );
}
