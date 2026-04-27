import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default async function Experience() {
  const [
    { data: profile },
    { data: milestones },
    { data: experience }
  ] = await Promise.all([
    supabase.from("profile").select("philosophy").limit(1).maybeSingle(),
    supabase.from("milestones").select("*").order("display_order", { ascending: true }),
    supabase.from("experience").select("*").order("display_order", { ascending: true })
  ]);

  return (
    <div className="flex flex-col w-full pt-16 md:pt-20 border-b border-zinc-800">
      {/* 
        ========================================
        Experience Header
        ========================================
      */}
      <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto w-full border-b border-zinc-800">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="text-[10px] md:text-xs font-bold tracking-widest text-[#d3e97a] uppercase flex items-center gap-3">
            <div className="w-8 h-[1px] bg-[#d3e97a]"></div>
            Career Trajectory
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2 md:mb-4 text-white">
            Work &<br />Experience.
          </h1>
          <p className="text-zinc-400 text-base md:text-xl max-w-2xl leading-relaxed">
            A timeline of my professional journey, highlighting key roles, impactful projects, and continuous growth within the digital landscape.
          </p>
        </div>
      </section>

      {/* 
        ========================================
        Growth Milestones
        ========================================
      */}
      <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight sticky top-32">Growth Milestones</h2>
          </div>
          <div className="w-full md:w-2/3 flex flex-col">
            {milestones && milestones.length > 0 ? (
              milestones.map((item, index) => (
                <div key={item.id} className="relative pl-8 pb-16 md:pb-24 border-l border-zinc-800 last:border-l-transparent last:pb-0 group">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-[#d3e97a] group-hover:scale-150 transition-all duration-300"></div>
                  
                  <div className="flex flex-col gap-2 -mt-1.5">
                    <div className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase">{item.period}</div>
                    <h3 className="text-xl md:text-2xl font-bold text-white transition-colors group-hover:text-[#d3e97a]">{item.title}</h3>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed mt-2 max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-zinc-500 italic">No milestones recorded.</div>
            )}
          </div>
        </div>
      </section>

      {/* 
        ========================================
        Professional Tenure
        ========================================
      */}
      <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto w-full border-t border-zinc-800">
        <div className="flex flex-col gap-3 mb-16 md:mb-24">
          <div className="text-[10px] md:text-xs font-bold tracking-widest text-[#d3e97a] uppercase flex items-center gap-2">
            Details
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">Professional Tenure</h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-32">
          {experience && experience.length > 0 ? (
            experience.map((job) => (
             <div key={job.id} className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 border-t border-zinc-800 pt-10 md:pt-16">
               {/* Left Column: Dates & Status */}
               <div className="md:col-span-1 flex flex-col gap-1">
                 <div className="text-zinc-500 font-medium text-sm md:text-base">
                   {job.period_start} — {job.period_end}
                 </div>
                 {job.period_end === 'PRESENT' && (
                   <div className="text-[10px] md:text-xs font-bold tracking-widest text-[#d3e97a] uppercase mt-1 md:mt-2">Current</div>
                 )}
               </div>
               
               {/* Right Column: Details */}
               <div className="md:col-span-3 flex flex-col gap-6 md:gap-8">
                 <div>
                   <h3 className="text-xl md:text-4xl font-bold mb-1 md:mb-2 text-white">{job.role}</h3>
                   <div className="flex flex-wrap items-center gap-3 text-sm md:text-lg text-zinc-400 italic font-serif">
                     <span>{job.company}</span>
                     <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                     <span className="not-italic text-xs font-bold tracking-widest uppercase text-zinc-500">{job.location_type}</span>
                     <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                     <span className="not-italic text-xs font-bold tracking-widest uppercase text-zinc-500">{job.employment_type}</span>
                   </div>
                 </div>
                 
                 {/* Responsibilities */}
                 <div className="flex flex-col gap-3 md:gap-4">
                   {job.responsibilities?.map((item: string, i: number) => (
                      <div key={i} className="flex items-start gap-4">
                        <svg className="w-5 h-5 text-[#d3e97a] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">{item}</p>
                      </div>
                   ))}
                 </div>

                 {/* Key Achievement */}
                 {job.key_achievement && (
                   <div className="bg-[#181818] border border-zinc-800 p-5 md:p-6 rounded-2xl md:rounded-3xl mt-2 md:mt-4">
                     <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-zinc-500 block mb-3">Key Achievement</span>
                     <p className="text-white text-sm md:text-base leading-relaxed italic font-serif">
                       &quot;{job.key_achievement}&quot;
                     </p>
                   </div>
                 )}

                 {/* Tech Stack */}
                 {job.technologies && job.technologies.length > 0 && (
                   <div className="border-t border-zinc-800 pt-6 mt-2 md:mt-4">
                     <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-zinc-500 block mb-4">Core Technologies</span>
                     <div className="flex flex-wrap gap-2 md:gap-2.5">
                       {job.technologies.map((tech: string, i: number) => (
                         <span key={i} className="px-3 md:px-4 py-1.5 bg-[#222222] border border-zinc-700 text-zinc-300 text-[10px] md:text-xs font-medium tracking-wide rounded-full">
                           {tech}
                         </span>
                       ))}
                     </div>
                   </div>
                 )}
               </div>
             </div>
            ))
          ) : (
            <div className="py-20 text-center border border-dashed border-zinc-800 rounded-[24px] text-zinc-500">
               No professional tenure records found.
            </div>
          )}
        </div>
      </section>

      {/* 
        ========================================
        Philosophy Section
        ========================================
      */}
      <section className="px-6 py-24 md:py-32 bg-[#181818] border-y border-zinc-800 w-full text-center flex flex-col items-center justify-center">
        <div className="mb-6 mb:mb-8 text-white">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <circle cx="12" cy="5" r="2"/>
             <path d="m4.5 22 5.5-15"/>
             <path d="m19.5 22-5.5-15"/>
             <path d="M8.5 13h7"/>
           </svg>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-8 md:mb-10">
          The Philosophy
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl max-w-4xl font-serif italic text-zinc-300 mx-auto leading-relaxed md:leading-[1.8]">
          &quot;{profile?.philosophy || "I believe front-end engineering is a form of digital joinery. Like a master carpenter selecting the right grain for a table, I select the right technical architecture for a user experience. Every interaction should feel intentional, every transition purposeful, and every line of code as clean as the Interfaces they power."}&quot;
        </p>
        <div className="mt-12 md:mt-16 w-16 h-[1px] bg-zinc-600"></div>
      </section>

      {/* 
        ========================================
        CTA Section
        ========================================
      */}
      <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 md:mb-8">
          Ready to build something together?
        </h2>
        <p className="text-zinc-400 text-base md:text-xl max-w-2xl leading-relaxed mb-10 md:mb-12">
          I am currently open for full-time roles and freelance projects. Let&apos;s discuss how I can bring value to your team.
        </p>
        <Link href="/contact" className="bg-[#d3e97a] hover:bg-[#b5cc5a] text-black px-8 md:px-10 py-4 rounded-full font-bold text-sm md:text-base tracking-wide transition-colors uppercase">
          Get In Touch
        </Link>
      </section>
    </div>
  );
}
