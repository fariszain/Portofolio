import Image from 'next/image';
import Experience from '@/components/canvas/Experience';
import { getTranslations } from 'next-intl/server';
import { Navigation } from '@/components/ui/Navigation';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import { experience, achievements } from '@/data/experience';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as 'id' | 'en';
  
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tHero = await getTranslations({ locale, namespace: 'hero' });
  const tAbout = await getTranslations({ locale, namespace: 'about' });
  const tSections = await getTranslations({ locale, namespace: 'sections' });
  const tContact = await getTranslations({ locale, namespace: 'contact' });
  const tUi = await getTranslations({ locale, namespace: 'ui' });
  
  return (
    <main className="w-full relative bg-[#03050c]">
      <LoadingScreen />
      
      {/* 3D Canvas fixed in background */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <Experience />
      </div>
      
      {/* Scrollable DOM Content */}
      <div className="relative z-10 text-white pointer-events-none">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[100vh] w-full flex flex-col md:flex-row items-center justify-center p-12 md:p-24 border-b border-white/5 gap-12">
          <div className="pointer-events-auto flex flex-col items-center md:items-start text-center md:text-left z-10">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_30px_rgba(0,240,255,0.3)] mb-8">
              <Image 
                src={profile.photo} 
                alt={profile.name} 
                fill 
                sizes="(max-width: 768px) 192px, 256px"
                className="object-cover object-top"
                priority
              />
            </div>
            <p className="text-white/60 uppercase tracking-widest mb-2 font-mono">{tHero('greeting')}</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-[#00f0ff] mb-6">{profile.title[l]}</p>
            <div className="flex gap-4">
              <a href="#contact" className="px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                {tHero('contactBtn')}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors backdrop-blur-md">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
        
        {/* ABOUT SECTION */}
        <section id="about" className="min-h-[100vh] w-full flex items-center justify-start p-12 md:p-24 border-b border-white/5">
          <div className="pointer-events-auto max-w-2xl bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-4xl font-bold mb-6 text-[#8b5cf6]">{tAbout('title')}</h2>
            <p className="text-white/80 leading-relaxed text-lg mb-8">
              {profile.summary[l]}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div>
                <h3 className="text-white/50 text-sm uppercase tracking-wider mb-2">{tAbout('education')}</h3>
                <p className="font-bold">{profile.university}</p>
                <p className="text-white/70">{tAbout('major')} (Batch {profile.batch})</p>
              </div>
              <div>
                <h3 className="text-white/50 text-sm uppercase tracking-wider mb-2">{tAbout('gpa')} & {tAbout('expectedGrad')}</h3>
                <p className="font-bold">{profile.gpa}</p>
                <p className="text-white/70">{profile.expectedGrad[l]}</p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="min-h-[100vh] w-full flex flex-col justify-center p-12 md:p-24 border-b border-white/5">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#10b981]">{tSections('projects')}</h2>
          <div className="pointer-events-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
            {projects.map(project => (
              <div key={project.id} className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#10b981]/50 transition-colors group">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-[#10b981] transition-colors">{project.title}</h3>
                <p className="text-white/50 mb-4 font-mono text-sm">{project.subtitle[l]}</p>
                <p className="text-white/70 mb-6 text-sm line-clamp-3">{project.description[l]}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-white/5 rounded-md text-xs text-white/60">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* SKILLS SECTION */}
        <section id="skills" className="min-h-[100vh] w-full flex items-center justify-end p-12 md:p-24 border-b border-white/5">
          <div className="pointer-events-auto max-w-2xl bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 w-full">
            <h2 className="text-4xl font-bold mb-8 text-[#00f0ff] text-right">{tSections('skills')}</h2>
            <div className="space-y-6">
              {skills.map(skillGroup => (
                <div key={skillGroup.category.en}>
                  <h3 className="text-lg font-bold mb-3" style={{ color: skillGroup.color }}>
                    {skillGroup.category[l]}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map(item => (
                      <span key={item} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/80">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* EXPERIENCE SECTION */}
        <section id="experience" className="min-h-[100vh] w-full flex items-center justify-start p-12 md:p-24 border-b border-white/5">
          <div className="pointer-events-auto max-w-2xl w-full">
            <h2 className="text-4xl font-bold mb-12 text-[#e040fb]">{tSections('experience')}</h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
              {experience.map((exp, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#03050c] bg-[#e040fb] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_#e040fb] z-10"></div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                    <div className="text-[#e040fb] font-mono text-xs font-bold mb-1">{exp.period}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role[l]}</h3>
                    <div className="text-white/60 text-sm mb-3">{exp.organization}</div>
                    <p className="text-white/70 text-sm leading-relaxed">{exp.description[l]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CONTACT SECTION */}
        <section id="contact" className="min-h-[100vh] w-full flex flex-col items-center justify-center p-12 md:p-24">
          <div className="pointer-events-auto max-w-2xl bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl p-10 md:p-16 rounded-[3rem] border border-white/10 text-center shadow-2xl">
            <h2 className="text-5xl font-bold mb-6">{tSections('contact')}</h2>
            <p className="text-white/60 leading-relaxed mb-10 text-lg">
              {tContact('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`mailto:${profile.email}`} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2">
                {tContact('emailLabel')}
              </a>
              <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#0a66c2] text-white font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2">
                {tContact('linkedinLabel')}
              </a>
              {profile.github && (
                <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#24292e] text-white font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2">
                  {tContact('githubLabel')}
                </a>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* HTML Overlays (Fixed UI) */}
      <div className="dom-overlay fixed inset-0 w-full h-full pointer-events-none z-20">
        <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center pointer-events-none">
          <h1 className="text-2xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            FZ
          </h1>
        </header>
        
        <LanguageToggle />
        <Navigation />
        
        <div className="absolute bottom-10 w-full text-center pointer-events-none">
          <p className="text-white/60 text-sm tracking-widest uppercase animate-pulse">
            {tHero('scrollHint')}
          </p>
        </div>
      </div>
    </main>
  );
}
