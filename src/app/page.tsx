'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Film, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnimatedSection } from '@/components/AnimatedSection';
import { BANNERS } from '@/app/assets/images';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="flex flex-col">
        {/* Hero Section with Banner */}
        <section className="relative overflow-hidden h-[600px] flex items-center justify-center">
          {/* Banner Image */}
          <Image
            src={BANNERS.home}
            alt="Rotaract RVCE Community"
            fill
            className="object-cover"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

          {/* Animated gradient blobs */}
          <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#D41367]/30 to-[#7c3aed]/30 blur-3xl animate-blob" />
          <div className="absolute top-1/2 right-0 h-64 w-64 rounded-full bg-gradient-to-l from-[#3b82f6]/20 to-[#7c3aed]/20 blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

          <div className="container relative z-10 mx-auto px-4 text-center -translate-y-[60px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg">
                Welcome to{' '}
                <span className="text-[#c42964]">
                  Wordspace
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mb-10 max-w-2xl text-lg sm:text-xl text-white/90 drop-shadow-md"
            >
              A blog by the Rotaract Club of RVCE
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                href="/blog"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-lg font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-premium"
              >
                Read the Blog
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>



            </motion.div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <AnimatedSection animationType="slideUp">
              <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
                Explore Our Content
              </h2>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-3">
              <AnimatedSection animationType="slideUp" delay={0.1}>
                <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-premium hover-lift">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-[#D41367]/10 to-transparent rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="mb-6 h-14 w-14 rounded-xl bg-gradient-to-br from-[#D41367] to-[#7c3aed] flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow">
                      <BookOpen className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold">Articles & Poems</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Dive into thought-provoking articles and creative poetry from our members.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animationType="slideUp" delay={0.2}>
                <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-premium hover-lift">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-[#7c3aed]/10 to-transparent rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="mb-6 h-14 w-14 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow">
                      <Film className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold">Movie Reviews</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Honest and entertaining reviews of the latest blockbusters and hidden gems.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animationType="slideUp" delay={0.3}>
                <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-premium hover-lift">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-[#3b82f6]/10 to-transparent rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="mb-6 h-14 w-14 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#D41367] flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow">
                      <Calendar className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold">Club Events</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Stay updated with our latest initiatives, workshops, and community service projects.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection animationType="scale">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#D41367] via-[#7c3aed] to-[#3b82f6] p-12 md:p-16 text-center shadow-premium-lg animate-gradient">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="relative z-10">
                  <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                    Join Our Community
                  </h2>
                  <p className="mb-8 text-lg text-white/90 max-w-2xl mx-auto">
                    Be part of something bigger. Connect with like-minded individuals and make a difference in the world.
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-lg font-medium text-[#D41367] transition-all hover:scale-105 hover:shadow-xl"
                  >
                    Learn More About Us
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
