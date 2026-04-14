import { supabase } from "@/lib/supabase/client";

export default async function Footer() {
  const { data: profile } = await supabase
    .from('profile')
    .select('name, github_url, linkedin_url, behance_url, dribbble_url, cv_url')
    .limit(1)
    .single();

  const currentYear = new Date().getFullYear();
  const userName = profile?.name || "EDITORIAL ENGINEERING";

  return (
    <footer className="w-full border-t border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 flex flex-col lg:flex-row justify-between items-center gap-6">
        
        <div className="text-[9px] md:text-[10px] font-bold tracking-widest text-zinc-500 uppercase text-center lg:text-left">
          © {currentYear} {userName.toUpperCase()}. BUILT FOR THE DIGITAL ARTISAN.
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[9px] md:text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          )}
          {profile?.github_url && (
            <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          )}
          {profile?.behance_url && (
            <a href={profile.behance_url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Behance</a>
          )}
          {profile?.dribbble_url && (
            <a href={profile.dribbble_url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Dribbble</a>
          )}
          {profile?.cv_url && (
            <a href={profile.cv_url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Read CV</a>
          )}
        </div>

      </div>
    </footer>
  );
}
