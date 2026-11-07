import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomePageContent } from "@/components/home/HomePageContent";
import { getProperties } from "@/lib/supabase/properties";

export default async function Home() {
  const { properties, source } = await getProperties();

  return (
    <div className="min-h-screen bg-[#0B0F17] flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Reactive Content Area with Global Filter State and Supabase Data */}
      <main className="flex-1 pb-16">
        <HomePageContent initialProperties={properties} initialSource={source} />
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}
