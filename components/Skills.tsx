import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";

import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";

function DynamicIcon({ name }: { name: string | null }) {
  if (!name) return <FiIcons.FiBox className="w-5 h-5" />;

  let IconComponent;
  if (name.startsWith("Fa") && (FaIcons as any)[name]) IconComponent = (FaIcons as any)[name];
  else if (name.startsWith("Si") && (SiIcons as any)[name]) IconComponent = (SiIcons as any)[name];
  else if (name.startsWith("Fi") && (FiIcons as any)[name]) IconComponent = (FiIcons as any)[name];
  else if (name.startsWith("Md") && (MdIcons as any)[name]) IconComponent = (MdIcons as any)[name];

  if (IconComponent) {
    return <IconComponent className="w-5 h-5" />;
  }
  
  return <FiIcons.FiBox className="w-5 h-5" />;
}

export default async function Skills() {
  const [
    { data: categories, error },
    { data: certificates }
  ] = await Promise.all([
    supabase
      .from("skill_categories")
      .select(`
        id, 
        name, 
        description, 
        icon, 
        type, 
        display_order,
        skills (
          id, 
          name, 
          display_order
        )
      `)
      .order("display_order", { ascending: true }),
    supabase
      .from("certificates")
      .select("*")
      .order("display_order", { ascending: true })
  ]);

  // Sort nested skills locally to ensure correct display_order
  const formattedCategories = categories?.map(cat => ({
    ...cat,
    skills: Array.isArray(cat.skills) 
      ? cat.skills.sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
      : []
  })) || [];

  return (
    <div className="flex flex-col w-full pt-16 md:pt-20 border-b border-zinc-800">
      {/* 
        ========================================
        Skills Header
        ========================================
      */}
      <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto w-full border-b border-zinc-800">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="text-[10px] md:text-xs font-bold tracking-widest text-[#d3e97a] uppercase flex items-center gap-3">
            <div className="w-8 h-[1px] bg-[#d3e97a]"></div>
            Technical Arsenal
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2 md:mb-4 text-white">
            Skills &<br />Expertise.
          </h1>
          <p className="text-zinc-400 text-base md:text-xl max-w-2xl leading-relaxed">
            A comprehensive overview of the utilities, frameworks, and methodologies I employ to craft performant digital experiences.
          </p>
        </div>
      </section>

      {/* 
        ========================================
        Supabase Categories & Skills Map
        ========================================
      */}
      <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-2 md:gap-3 mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">Core Technologies</h2>
        </div>
        
        {error && (
          <p className="text-red-400 w-full mb-8 bg-red-400/10 p-4 border border-red-400/30 rounded-lg">
            Failed to load data from database: {error.message}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {formattedCategories.length > 0 ? (
            formattedCategories.map((category) => (
              <div 
                key={category.id}
                className="bg-[#181818] p-6 md:p-10 rounded-lg md:rounded-xl border border-zinc-800 flex flex-col gap-6 md:gap-8 hover:border-zinc-700 transition-colors group"
              >
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full border border-zinc-700 bg-[#222222] flex items-center justify-center text-zinc-300 group-hover:text-[#d3e97a] group-hover:border-[#d3e97a] transition-colors">
                    <DynamicIcon name={category.icon} />
                  </div>

                  <div className="flex flex-col gap-1 md:gap-2 pt-1 md:pt-1.5">
                    <h3 className="font-bold text-xl md:text-2xl text-white group-hover:text-[#d3e97a] transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>

                {category.description && (
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                    {category.description}
                  </p>
                )}

                <div className="mt-auto pt-5 md:pt-6 border-t border-zinc-800">
                  <h4 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-4 md:mb-5">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2 md:gap-2.5">
                    {category.skills.length > 0 ? (
                      category.skills.map(skill => (
                        <span 
                          key={skill.id} 
                          className="px-3 md:px-3.5 py-1 md:py-1.5 bg-[#222222] border border-zinc-700 text-zinc-300 text-[10px] md:text-xs font-medium tracking-wide rounded-full"
                        >
                          {skill.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-zinc-600 text-[10px] md:text-xs italic">No specific technologies added yet.</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            !error && (
              <div className="col-span-full border border-dashed border-zinc-800 p-12 rounded-[24px] text-center">
                <p className="text-zinc-500 mb-2">No skill categories found in database.</p>
                <p className="text-zinc-600 text-sm">Add categories to `skill_categories` and insert some `skills`.</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* 
        ========================================
        Validation & Certificates
        ========================================
      */}
      <section className="px-6 py-16 md:py-32 max-w-7xl mx-auto border-t border-zinc-800 w-full">
        <div className="flex flex-col gap-2 md:gap-3 mb-10 md:mb-16">
          <div className="text-[10px] md:text-xs font-bold tracking-widest text-[#d3e97a] uppercase flex items-center gap-2">
            Validation
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">Certificates & Achievements</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {certificates && certificates.length > 0 ? (
            certificates.map((cert) => (
             <div key={cert.id} className="bg-[#181818] rounded-lg md:rounded-xl border border-zinc-800 flex flex-col hover:border-zinc-700 transition-colors overflow-hidden group">
                {cert.image_url && (
                  <div className="relative w-full aspect-video border-b border-zinc-800 bg-[#222]">
                    <Image src={cert.image_url} alt={cert.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6 md:p-10 flex flex-col gap-5 md:gap-6 flex-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-700 bg-[#222222] flex items-center justify-center text-zinc-300 shrink-0">
                    {cert.icon_type === 'badge' ? <FiIcons.FiAward className="w-4 h-4 md:w-5 md:h-5" /> : <FiIcons.FiFileText className="w-4 h-4 md:w-5 md:h-5" />}
                  </div>
                <div className="flex flex-col gap-2 md:gap-3">
                  <h3 className="font-bold text-lg md:text-xl text-white">{cert.title}</h3>
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                    Issued by <span className="text-zinc-300 font-semibold">{cert.issuer}</span> {cert.issued_year && `• ${cert.issued_year}`}
                  </p>
                </div>
                {cert.credential_url && (
                  <Link href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="mt-auto pt-5 md:pt-6 text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:text-[#d3e97a] transition-colors text-zinc-500 w-fit">
                    View Credential <FiIcons.FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                </div>
             </div>
           ))
          ) : (
            <div className="col-span-full py-16 text-center border border-dashed border-zinc-800 rounded-[24px] text-zinc-500">
               No certificates available to display.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
