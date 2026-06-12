import { Hero } from '@/components/sections/Hero';
import { USP } from '@/components/sections/USP';
import { WhyAim } from '@/components/sections/WhyAim';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { Process } from '@/components/sections/Process';
import { Roadmap } from '@/components/sections/Roadmap';
import { Projects } from '@/components/sections/Projects';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <USP />
      <WhyAim />
      <ServicesPreview />
      <Process />
      <Roadmap />
      <Projects />
      <FinalCTA />
    </main>
  );
}
