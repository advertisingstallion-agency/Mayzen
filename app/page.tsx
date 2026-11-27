import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/home/hero";
import { CategoriesSection } from "@/components/home/categories-section";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { Story } from "@/components/home/story";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CategoriesSection />
        <NewArrivalsSection />
        <Story />
      </main>
    </>
  );
}
