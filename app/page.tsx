import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomePageContent } from "@/components/home/HomePageContent";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F17] flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Reactive Content Area with Global Filter State */}
      <main className="flex-1 pb-16">
        <HomePageContent />
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}
