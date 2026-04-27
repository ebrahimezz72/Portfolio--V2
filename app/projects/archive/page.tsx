import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default async function ArchivePage() {
  // Fetch all projects
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="pt-24 lg:pt-32 min-h-screen px-6 max-w-7xl mx-auto w-full pb-24">
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <Link href="/projects" className="text-zinc-500 hover:text-white transition-colors mb-6 inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest">
           <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg> Back to Projects
        </Link>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-none">
          Project <span className="italic text-[#d3e97a]">Archive</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base mt-6 max-w-xl leading-relaxed">
          A full repository of all projects, tools, systems, and open-source contributions I have built over the years.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects && projects.map(project => {
          const hasImages = project.images && project.images.length > 0;
          const primaryImage = hasImages ? project.images[0] : project.thumbnail_url;
          
          return (
            <div key={project.id} className="bg-[#141414] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 md:p-6 flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
               {/* Thumbnail */}
               <div className="w-full aspect-video bg-[#222222] rounded-lg overflow-hidden relative border border-zinc-800 mb-6 group-hover:border-zinc-700 transition-colors">
                 {primaryImage ? (
                    <Image src={primaryImage} alt={project.title} fill className="object-cover" />
                 ) : (
                    <div className="flex items-center justify-center h-full text-zinc-700 font-bold opacity-30 text-3xl tracking-tighter">
                       {project.title.substring(0,4).toUpperCase()}
                    </div>
                 )}
               </div>
               
               {/* Content */}
               <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#d3e97a] transition-colors">{project.title}</h3>
               <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                 {project.description}
               </p>
               
               {/* Tags */}
               <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech_stack?.slice(0,3).map((tech: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 bg-zinc-800/40 border border-zinc-700/50 text-zinc-300 text-[9px] tracking-widest font-bold uppercase rounded-full">
                      {tech}
                    </span>
                  ))}
               </div>
               
               {/* Links */}
               <div className="flex items-center gap-5 mt-auto pt-5 border-t border-zinc-800/60">
                 {project.live_demo_url && (
                   <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#d3e97a] transition-colors text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5">
                     Live <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                 )}
                 {project.repo_url && (
                   <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5">
                     Code <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                   </a>
                 )}
               </div>
            </div>
          );
        })}
        {(!projects || projects.length === 0) && !error && (
            <div className="col-span-full py-20 text-center border border-dashed border-zinc-800 rounded-xl text-zinc-500">
               No archive projects currently found in database.
            </div>
        )}
      </div>
    </main>
  );
}
