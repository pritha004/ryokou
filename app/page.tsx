import Header from "@/components/header";
import HeroSection from "@/components/hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <footer className="bottom-0 left-0 fixed flex justify-center pb-4 w-full text-center font-extralight text-sm">
          <p> 2025 © Ryokou. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
