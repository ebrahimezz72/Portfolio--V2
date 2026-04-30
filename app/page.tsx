import React from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import ContactForm from "@/components/ContactForm";

// Icons for Certificates
import { FiAward, FiFileText, FiArrowRight } from "react-icons/fi";

export default async function Home() {
  const [
    { data: profile },
    { data: skills },
    { data: certificates },
    { data: projects },
    { data: experience }
  ] = await Promise.all([
    supabase.from('profile').select('*').limit(1).single(),
    supabase.from('skills').select('id, name, skill_categories(name)').order('display_order', { ascending: true }).limit(4),
    supabase.from('certificates').select('*').order('display_order', { ascending: true }).limit(3),
    supabase.from('projects').select('*').order('display_order', { ascending: true }).limit(2),
    supabase.from('experience').select('*').order('start_date', { ascending: false }).limit(2)
  ]);

  // If profile is missing, fallback gracefully
  const firstName = profile?.name ? profile.name.split(' ')[0] : 'Ibrahim';
  const lastName = profile?.name ? profile.name.split(' ').slice(1).join(' ') : 'Ezzeldin';
  const titleParts = profile?.title?.split(" & ") || ["Front-end Developer."];

  return (
    <main className="pt-24 lg:pt-28 pb-32">
      {/* 
        ========================================
        1. HERO SECTION
        ========================================
      */}
      <section className="px-6 py-16 md:py-24 lg:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-32 items-center text-center lg:text-left" id="home">
        <div className="flex flex-col gap-6 items-center lg:items-start">
          <div className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase">
            {profile?.tagline || "Editorial Engineering"}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-4">
            {firstName} {lastName}<br />
            <span className="text-zinc-500 whitespace-nowrap">
              {titleParts.map((part: string, i: number) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-zinc-700 mx-2">&</span>}
                  {part}
                </React.Fragment>
              ))}
            </span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-md leading-relaxed font-light mb-4 mx-auto lg:mx-0">
            {profile?.bio || "Crafting high-fidelity interfaces through the lens of structural integrity and aesthetic warmth."}
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link href="/contact" className="bg-[#d3e97a] text-black px-6 md:px-8 py-3.5 rounded-lg font-bold hover:bg-[#b0c85f] transition-all hover:scale-[1.02] active:scale-[0.98]">
              Let&apos;s Collaborate
            </Link>
            <Link href="/projects" className="flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold hover:text-[#d3e97a] hover:bg-white/5 transition-all group">
              Explore Projects
              <svg className="transition-transform group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full max-w-lg mx-auto lg:ml-auto group">
          <div className="w-full h-full bg-[#181818] rounded-2xl overflow-hidden relative border border-zinc-800 transition-transform duration-500 group-hover:scale-[1.02] shadow-2xl">
             <Image 
               src={profile?.photo_url || "/photo.jpeg"}
               alt={`${firstName} ${lastName} Portrait`}
               fill
               className="object-cover pointer-events-none"
               priority
             />
          </div>
          
          {/* Experience Badge */}
          {profile?.years_of_experience > 0 && (
            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-[#332f26] border border-[#d9ba96]/20 text-[#d9ba96] p-5 md:p-6 rounded-xl flex flex-col gap-1 max-w-[140px] md:max-w-[150px] shadow-2xl z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-3">
              <div className="text-3xl md:text-4xl font-bold flex items-start leading-none">
                {profile.years_of_experience}<span className="text-xl md:text-2xl ml-0.5">+</span>
              </div>
              <div className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase mt-2 opacity-80">
                Year{profile.years_of_experience > 1 ? 's' : ''} of Experience
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-8 md:my-16"></div>

      {/* 
        ========================================
        2. THE DIGITAL ARTISAN PHILOSOPHY
        ========================================
      */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-5 flex flex-col gap-8 md:gap-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              The Digital Artisan Philosophy
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              My approach to front-end development is rooted in the &apos;Digital Artisan&apos; concept—where code isn&apos;t just functional, but a medium for craftsmanship. I dedicate meticulous care to UX/UI details, producing highly performant, accessible digital products that feel right and function perfectly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
            <div className="flex flex-col gap-3">
              <svg className="w-6 h-6 text-[#d3e97a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              <h4 className="text-sm md:text-base font-bold text-white tracking-tight">Technical Precision</h4>
              <p className="text-[11px] md:text-xs text-zinc-500 leading-relaxed max-w-[200px]">Semantics HTML, CSS/SCSS, React components architecture.</p>
            </div>
            <div className="flex flex-col gap-3">
              <svg className="w-6 h-6 text-[#d3e97a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M5 5l1.5 1.5"/><path d="M17.5 17.5L19 19"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M5 19l1.5-1.5"/><path d="M17.5 6.5L19 5"/></svg>
              <h4 className="text-sm md:text-base font-bold text-white tracking-tight">Visual Senses</h4>
              <p className="text-[11px] md:text-xs text-zinc-500 leading-relaxed max-w-[200px]">Harmonizing color theory with responsive interface designs.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
           <div className="bg-[#181818] border border-zinc-800 p-8 md:p-14 lg:p-16 rounded-2xl relative shadow-2xl">
              <svg className="text-zinc-800 w-16 h-16 md:w-20 md:h-20 absolute top-4 left-4 md:top-6 md:left-6 opacity-30 pointer-events-none" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.3] md:leading-[1.4] text-white relative z-10 italic">
                &quot;{profile?.philosophy || "Engineering is the foundation, but the interface is where the human connection happens. I build bridges that feel like homes."}&quot;
              </h3>
              <div className="mt-8 md:mt-10 flex items-center gap-4 relative z-10">
                <div className="w-10 h-[1px] bg-[#d3e97a]"></div>
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#d3e97a] uppercase">IBRAHIM EZZELDIN, 2024</span>
              </div>
           </div>
        </div>
      </section>

      {/* 
        ========================================
        3. MASTERED UTILITIES
        ========================================
      */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <div className="mb-10 md:mb-12">
          <div className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase mb-3">
            TOOL KIT
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Mastered Utilities</h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {skills && skills.length > 0 ? (
            skills.map((skill) => (
              <div key={skill.id} className="bg-[#181818] border border-zinc-800 rounded-xl p-5 md:p-8 hover:border-[#d3e97a]/50 transition-colors group">
                <div className="w-8 h-8 md:w-10 md:h-10 border border-zinc-700 bg-zinc-800/50 rounded-lg flex items-center justify-center text-zinc-400 mb-6 group-hover:text-[#d3e97a] group-hover:border-[#d3e97a]/50 transition-colors">
                  <svg className="w-4 h-4 md:w-5 md:h-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                </div>
                <h3 className="text-base md:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#d3e97a] transition-colors">{skill.name}</h3>
                <p className="text-[11px] md:text-sm text-zinc-500 leading-relaxed font-light">
                   Core ecosystem technology for {(skill.skill_categories as any)?.name?.toLowerCase() || 'development'} performance.
                </p>
              </div>
            ))
          ) : (
            // Fallback content if empty
            ['React & Next.js', 'Tailwind CSS', 'TypeScript', 'Figma/Design'].map((item, i) => (
              <div key={i} className="bg-[#181818] border border-zinc-800 rounded-xl p-5 md:p-8 hover:border-[#d3e97a]/50 transition-colors group">
                <div className="w-8 h-8 md:w-10 md:h-10 border border-zinc-700 bg-zinc-800/50 rounded-lg flex items-center justify-center text-zinc-400 mb-6 group-hover:text-[#d3e97a] group-hover:border-[#d3e97a]/50 transition-colors">
                  <svg className="w-4 h-4 md:w-5 md:h-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                </div>
                <h3 className="text-base md:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#d3e97a] transition-colors">{item}</h3>
                <p className="text-[11px] md:text-sm text-zinc-500 leading-relaxed font-light">
                   Core ecosystem technology for structural architecture.
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 
        ========================================
        4. CERTIFICATES & ACHIEVEMENTS
        ========================================
      */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <div className="mb-10 md:mb-12">
          <div className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase mb-3">
            VALIDATION
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Certificates & Achievements</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {certificates && certificates.length > 0 ? (
            certificates.map((cert) => (
             <div key={cert.id} className="bg-[#181818] rounded-xl border border-zinc-800 flex flex-col hover:border-zinc-700 transition-colors overflow-hidden group shadow-lg">
                <div className="p-6 md:p-8 flex flex-col gap-5 md:gap-6 flex-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-700 bg-zinc-800/50 flex items-center justify-center text-[#d9ba96] shrink-0">
                    {cert.icon_type === 'badge' ? <FiAward className="w-4 h-4 md:w-5 md:h-5" /> : <FiFileText className="w-4 h-4 md:w-5 md:h-5" />}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-lg md:text-xl text-white group-hover:text-[#d9ba96] transition-colors">{cert.title}</h3>
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                      Issued by <span className="text-zinc-300 font-medium">{cert.issuer}</span> {cert.issued_year && `• ${cert.issued_year}`}
                    </p>
                  </div>
                  {cert.credential_url && (
                    <Link href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="mt-auto pt-5 md:pt-6 text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:text-[#d3e97a] transition-colors text-zinc-500 w-fit">
                      View Credential <FiArrowRight className="w-3" />
                    </Link>
                  )}
                </div>
             </div>
            ))
          ) : (
             <div className="col-span-full py-16 text-center border border-dashed border-zinc-800 rounded-xl text-zinc-500">
                No certificates available to display.
             </div>
          )}
        </div>
      </section>

      {/* 
        ========================================
        5. SELECTED WORKS (ZIG-ZAG)
        ========================================
      */}
      <section className="px-6 py-20 md:py-32 max-w-7xl mx-auto w-full">
        <div className="mb-16 md:mb-24 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Selected Works</h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              A curated portfolio of digital artifacts where technical excellence meets aesthetic beauty.
            </p>
          </div>
          <Link href="/projects" className="inline-flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-zinc-400 uppercase tracking-wide hover:text-white transition-all group">
            View All Projects
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {projects && projects.length > 0 ? (
            projects.map((project, idx) => {
              const hasImages = project.images && project.images.length > 0;
              const primaryImage = hasImages ? project.images[0] : project.thumbnail_url;
              const isEven = idx % 2 === 0;

              return (
                <div key={project.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 md:gap-16 items-center group`}>
                  {/* Image */}
                  <div className="w-full lg:w-[55%] aspect-[16/10] bg-[#141414] rounded-xl overflow-hidden relative flex flex-col items-center justify-center border border-zinc-800/80 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                    {primaryImage ? (
                      <Image 
                        src={primaryImage} 
                        alt={project.title} 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-4 text-zinc-700">
                         <svg className="w-10 h-10 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                         <span className="text-[10px] font-bold tracking-widest uppercase">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-[45%] flex flex-col pt-0">
                    <div className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-4">
                      {project.type} Development • {project.created_at ? new Date(project.created_at).getFullYear() : '2024'}
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white group-hover:text-[#d3e97a] transition-colors">{project.title}</h3>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
                       {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.tech_stack?.slice(0, 4).map((tech: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 bg-[#181818] border border-zinc-800 text-zinc-300 text-[10px] md:text-xs font-bold tracking-wider rounded-lg">
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack && project.tech_stack.length > 4 && (
                        <span className="px-3 py-1.5 bg-transparent border border-dashed border-zinc-700 text-zinc-500 text-[10px] md:text-xs font-bold tracking-wider rounded-lg">
                          +{project.tech_stack.length - 4} MORE
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                      {project.live_demo_url && (
                        <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] md:text-xs font-bold text-black bg-white px-5 py-2.5 rounded-full uppercase tracking-widest hover:bg-[#d3e97a] transition-all">
                          Case Study
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
             <div className="py-20 text-center border border-dashed border-zinc-800 rounded-xl text-zinc-500 w-full">
               No projects found in database.
             </div>
          )}
        </div>
      </section>

      {/* 
        ========================================
        6. THE PROFESSIONAL JOURNEY (EXPERIENCE)
        ========================================
      */}
      <section className="px-6 py-20 md:py-32 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        <div className="lg:col-span-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">The Professional Journey</h2>
          <div className="w-12 h-1 bg-zinc-800 hidden lg:block mt-6"></div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-12 md:gap-16 relative">
          <div className="absolute left-2.5 top-2 bottom-5 w-[1px] bg-zinc-800 hidden md:block"></div>
          
          {experience && experience.length > 0 ? (
            experience.map((job) => {
              const startYear = job.start_date ? new Date(job.start_date).getFullYear() : "";
              const endYear = job.is_current ? "PRESENT" : (job.end_date ? new Date(job.end_date).getFullYear() : "");

              return (
                <div key={job.id} className="relative md:pl-12 flex flex-col gap-2 group">
                  <div className="absolute w-2 h-2 bg-[#d3e97a] rounded-full left-[6px] top-2 shadow-[0_0_10px_rgba(211,233,122,0.5)] hidden md:block opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute w-5 h-5 bg-[#111] border border-zinc-700 rounded-full left-[1px] top-0.5 hidden md:block group-hover:border-[#d3e97a] transition-colors"></div>
                  
                  <div className="text-[10px] font-bold tracking-widest text-[#d3e97a] uppercase mb-1">
                    {startYear} — {endYear}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{job.title}</h3>
                  <h4 className="text-sm md:text-base text-zinc-500 font-medium mb-2">{job.company_name}</h4>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
                    {job.description}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center border border-dashed border-zinc-800 rounded-xl text-zinc-500 w-full">
               No experience records found.
            </div>
          )}
        </div>
      </section>

      {/* 
        ========================================
        7. CONTACT FORM CTA
        ========================================
      */}
      <section className="px-6 py-20 md:py-32 max-w-4xl mx-auto w-full relative">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
           <div className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase">
             CONNECT & COLLABORATE
           </div>
           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-2xl">
             Ready to start your next artisanal digital journey?
           </h2>
           <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed mt-4">
             Whether you&apos;re looking to build a premium product or just want to talk shop over a coffee, my inbox is always open.
           </p>
        </div>

        <div className="bg-[#141414] border border-zinc-800 rounded-2xl md:rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3e97a]/5 blur-[120px] rounded-full pointer-events-none"></div>
           <ContactForm />
        </div>
      </section>

    </main>
  );
}
