/** eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Code, Cpu, ChevronRight, Github } from "lucide-react";

function Logo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="w-40 h-40 bg-white rounded-3xl shadow-lg flex items-center justify-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="text-5xl font-bold text-purple-600 italic"
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        scrapi
      </motion.span>
    </motion.div>
  );
}

export default function ScrapiLanding() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-screen bg-white flex items-center justify-center"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={
                heroInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }
              }
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center mb-8"
            >
              <Logo />
            </motion.div>
            <motion.h1
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Scrape the Web, Power Your LLMs
            </motion.h1>
            <motion.p
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              scrapi transforms web content into markdown, providing clean,
              structured data for your language models.
            </motion.p>
            <motion.div
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.a
                href="#"
                className="px-6 py-3 bg-purple-600 text-white rounded-full flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ChevronRight className="ml-2" />
              </motion.a>
              <motion.a
                href="https://github.com/yourusername/scrapi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="mr-2" />
                View on GitHub
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Markdown Conversion"
                description="Automatically convert web content into clean, structured markdown format."
                icon={<FileText className="w-12 h-12 text-purple-600" />}
              />
              <FeatureCard
                title="LLM-Ready Output"
                description="Generate output that's optimized for ingestion by language models."
                icon={<Cpu className="w-12 h-12 text-purple-600" />}
              />
              <FeatureCard
                title="Customizable Scraping"
                description="Tailor your scraping parameters to extract exactly what you need."
                icon={<Code className="w-12 h-12 text-purple-600" />}
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              How It Works
            </h2>
            <div className="max-w-4xl mx-auto">
              <Timeline />
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="bg-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Supercharge Your LLMs?
            </h2>
            <p className="text-xl mb-8">
              Start scraping and converting web content with scrapi today
            </p>
            <motion.a
              href="#"
              className="px-8 py-4 bg-white text-purple-600 rounded-full inline-flex items-center text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
              <ChevronRight className="ml-2" />
            </motion.a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 scrapi. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:underline">
              Documentation
            </a>
            <a href="#" className="hover:underline">
              GitHub
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-2xl shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function Timeline() {
  const steps = [
    {
      title: "Input URL",
      description: "Provide the URL of the web page you want to scrape.",
    },
    {
      title: "Scrape Content",
      description: "scrapi fetches the content from the specified URL.",
    },
    {
      title: "Process and Clean",
      description:
        "The content is processed and cleaned to remove unnecessary elements.",
    },
    {
      title: "Convert to Markdown",
      description:
        "Clean content is converted into structured markdown format.",
    },
    {
      title: "LLM Integration",
      description:
        "Use the markdown output to train or query your language models.",
    },
  ];

  return (
    <div className="relative">
      {/* <div className="absolute left-9 top-2 h-full w-0.5 bg-purple-200"></div> */}
      {steps.map((step, index) => {
        // const ref = useRef(null);
        // const isInView = useInView(ref, { once: true });

        return (
          <motion.div
            key={index}
            // ref={ref}
            className="mb-8 flex items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="mr-4">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {index + 1}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex-1">
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
