import { Hero } from "@/components/home/hero";
import { CategoriesSection } from "@/components/home/categories-section";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { Story } from "@/components/home/story";
import { WhyMeyla } from "@/components/home/why-meyla";
import { Reviews } from "@/components/home/reviews";
import { Faq } from "@/components/home/faq";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <CategoriesSection />
        <NewArrivalsSection />
        <Story />
        <WhyMeyla />
        <Reviews />
        <Faq />
      </main>
    </>
  );
}
