import { Navbar } from "../components/landing/Navbar";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { Architecture } from "../components/landing/Architecture";
import { Observability } from "../components/landing/Observability";
import { TechStack } from "../components/landing/TechStack";
import { Footer } from "../components/landing/Footer";
import { FadeIn } from "../components/common/FadeIn";

export function LandingPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
        linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
      `,
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="relative">
                <Navbar />

                <Hero />

                <FadeIn>
                    <Features />
                </FadeIn>

                <FadeIn delay={0.1}>
                    <Architecture />
                </FadeIn>

                <FadeIn delay={0.2}>
                    <Observability />
                </FadeIn>

                <FadeIn delay={0.3}>
                    <TechStack />
                </FadeIn>

                <Footer />
            </div>
        </main>
    );
}

