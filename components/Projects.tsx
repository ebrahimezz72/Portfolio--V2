import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";

interface ProjectsProps {
  limit?: number;
}

export default async function Projects({ limit }: ProjectsProps = {}) {
  let query = supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });
    
  if (limit) {
    query = query.limit(limit);
  }

  const [
    { data: projects, error },
    { data: profile }
  ] = await Promise.all([
    query,
    supabase.from("profile").select("*").limit(1).single()
  ]);

  const cvLink = profile?.resume_url || profile?.cv_url || profile?.cv || "/resume.pdf";

  return (
    <div className="flex flex-col w-full">
      <section className={`px-6 max-w-7xl mx-auto w-full ${limit ? 'py-16 md:py-24 border-t border-zinc-800' : 'py-12 md:py-20 pb-20'}`}>
        {/* Header matching projects.png */}
        <div className="mb-12 md:mb-16">
          <div className="text-[10px] md:text-xs font-bold tracking-widest text-zinc-500 uppercase mb-4">
             PORTFOLIO OF WORK
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-[80px] font-bold tracking-tight mb-4 text-white leading-none">
            Selected<br />
            <span className="italic text-[#d3e97a]">Projects</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed mt-6">
             My approach combines the technical precision of a front-end engineer with the editorial sensibility of an artisan. I build interfaces that feel tactile, purposeful, and permanent.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects && projects.map((project, idx) => {
            const hasImages = project.images && project.images.length > 0;
            const primaryImage = hasImages ? project.images[0] : project.thumbnail_url;
            
            // First item: Takes full width (col-span-2)
            if (idx === 0) {
              return (
                <div key={project.id} className="md:col-span-2 bg-[#181818] rounded-xl p-6 md:p-12 border border-zinc-800 lg:p-16 flex flex-col lg:flex-row gap-10 items-center group transition-shadow hover:shadow-2xl hover:border-zinc-700">
                  {/* Left: Content */}
                  <div className="w-full lg:w-5/12 flex flex-col">
                    <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4 tracking-tight group-hover:text-[#d3e97a] transition-colors">{project.title}</h3>
                    <p className="text-zinc-400 text-base lg:text-lg leading-relaxed mb-8">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-10">
                       {project.tech_stack?.slice(0, 4).map((tech: string, i: number) => (
                         <span key={i} className="px-4 py-1.5 bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-[10px] tracking-widest font-bold uppercase rounded-full">
                           {tech}
                         </span>
                       ))}
                    </div>
                    <div className="flex items-center gap-6 mt-auto">
                       {project.live_demo_url && (
                         <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#d3e97a] hover:text-white flex items-center gap-2 transition-colors">
                           View Case Study <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                         </a>
                       )}
                       {project.repo_url && (
                         <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                           Live Demo
                         </a>
                       )}
                    </div>
                  </div>
                  {/* Right: Image Placeholder */}
                  <div className="w-full lg:w-7/12 aspect-[4/3] bg-[#222222] rounded-lg overflow-hidden relative border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                     {primaryImage ? (
                        <Image src={primaryImage} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                     ) : (
                        <div className="flex flex-col items-center justify-center h-full text-zinc-700">
                           <span className="text-6xl md:text-9xl font-bold opacity-30 tracking-tighter">{project.title.substring(0,2).toUpperCase()}</span>
                        </div>
                     )}
                  </div>
                </div>
              );
            }

            // Normal Items: Half width
            return (
              <div key={project.id} className="bg-[#181818] border border-zinc-800 hover:border-zinc-700 rounded-xl p-6 md:p-10 flex flex-col group transition-shadow hover:shadow-2xl">
                 {/* Image Top */}
                 <div className="w-full aspect-video bg-[#222222] rounded-lg overflow-hidden relative border border-zinc-800 mb-8 group-hover:border-zinc-700 transition-colors">
                     {primaryImage ? (
                        <Image src={primaryImage} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                     ) : (
                        <div className="flex flex-col items-center justify-center h-full text-zinc-700">
                           <span className="text-5xl font-bold opacity-30 tracking-tighter">{project.title.substring(0,4).toUpperCase()}</span>
                        </div>
                     )}
                 </div>
                 {/* Content Bottom */}
                 <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#d3e97a] transition-colors">{project.title}</h3>
                 <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                   {project.description}
                 </p>
                 <div className="flex flex-wrap gap-2 mb-10 mt-auto">
                    {project.tech_stack?.slice(0,3).map((tech: string, i: number) => (
                      <span key={i} className="px-3.5 py-1 bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-[10px] tracking-widest font-bold uppercase rounded-full">
                        {tech}
                      </span>
                    ))}
                 </div>
                 <div className="flex items-center gap-6">
                   {project.live_demo_url ? (
                     <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-[#d3e97a] hover:text-white flex items-center gap-2 transition-colors">
                       Explore System <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                     </a>
                   ) : (
                     <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer">
                       Explore System <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                     </span>
                   )}
                 </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        {!limit && (
           <div className="mt-16 text-center">
             <Link href="/projects/archive" className="inline-block border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors px-10 py-4 rounded text-[10px] uppercase font-bold tracking-widest">
               Browse All Archive
             </Link>
           </div>
        )}
      </section>

      {/* Let's Build Something Permanent CTA */}
      {!limit && (
         <section className="px-6 py-24 md:py-32 mb-32 max-w-7xl mx-auto w-full bg-[#1A1A1A] rounded-[32px] border border-zinc-800 relative flex flex-col items-center text-center overflow-hidden">
            {/* Watermark Coffee Cup Icon */}
            <svg className="absolute -right-16 -bottom-16 w-96 h-96 text-zinc-800/30 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 19h16v2H4zm11-13h2a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-2v1c0 2.2-1.8 4-4 4H9c-2.2 0-4-1.8-4-4V6h10zm-2 2H7v6c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V8zm4 5h-2V8h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1z"/>
            </svg>
            
            <div className="relative z-10 text-[10px] md:text-xs font-bold tracking-widest text-[#d3e97a] uppercase mb-6">
              Next Chapter
            </div>
            <h2 className="relative z-10 text-4xl md:text-6xl lg:text-[72px] font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Let&apos;s build something <br />
              <span className="italic text-[#d3e97a]">permanent.</span>
            </h2>
            <p className="relative z-10 text-zinc-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
              I am currently open to freelance partnerships and full-time engineering roles that value craftsmanship and editorial design.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Link href="/contact" className="bg-[#d3e97a] text-black px-10 py-4 font-bold text-sm hover:bg-[#b5cc5a] transition-colors rounded-sm">
                Start a Conversation
              </Link>
              <a href={cvLink} download="Resume.pdf" target="_blank" rel="noopener noreferrer" className="bg-[#2a2a2a] text-zinc-300 px-10 py-4 font-bold text-sm hover:text-white hover:bg-zinc-700 transition-colors rounded-sm border border-zinc-700">
                Download CV
              </a>
            </div>
         </section>
      )}
    </div>
  );
}
