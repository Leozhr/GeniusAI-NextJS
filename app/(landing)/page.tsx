import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";

const LandingPage = () => {
  return ( 
    <div className="h-full bg-[#111827]">
      <LandingNavbar />

      <div className="h-[80%] flex items-center justify-center">
        <LandingHero />
      </div>
    </div>
   );
}
 
export default LandingPage;
