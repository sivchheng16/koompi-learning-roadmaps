import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Layout,
  Paintbrush,
  Compass,
  Home as HomeIcon,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const services = [
  {
    name: "Interior Architecture",
    icon: Layout,
    description: "Spatial Planning & Structural Harmony",
    detail:
      "We lay out every room so it flows well and feels right to live in. This includes structural modifications, floor plan optimization, and ensuring every square inch serves a purpose.",
    features: [
      "Space Planning",
      "Floor Plan Optimization",
      "Structural Coordination",
      "Lighting Integration",
    ],
  },
  {
    name: "Bespoke Furniture",
    icon: Paintbrush,
    description: "Custom Craftsmanship",
    detail:
      "Each piece is made to fit your space, your style, and the way you use it. From custom cabinetry to signature seating, we design furniture that tells your story.",
    features: [
      "Custom Cabinetry",
      "Material Selection",
      "Millwork Design",
      "Unique Upholstery",
    ],
  },
  {
    name: "Conceptual Design",
    icon: Compass,
    description: "Visual Identity & Mood",
    detail:
      "We choose the shapes, materials, and finishes that give a space its character. Our concepts are mood-driven and focused on the emotional resonance of the environment.",
    features: [
      "3D Visualization",
      "Material Boards",
      "Color Palette Curation",
      "Mood Branding",
    ],
  },
  {
    name: "Residential Luxury",
    icon: HomeIcon,
    description: "Elevated Living Spaces",
    detail:
      "Comfortable homes that look beautiful and feel like they were made for you. We specialize in high-end residential interiors that balance aesthetic with everyday functionality.",
    features: [
      "Luxury Residences",
      "Styling & Decor",
      "Art Curation",
      "Turnkey Solutions",
    ],
  },
];

const processSteps = [
  {
    title: "Discovery & Briefing",
    description:
      "We start by understanding your lifestyle, your needs, and the vision you have for your space.",
  },
  {
    title: "Concept Development",
    description:
      "Translating ideas into visual concepts, material boards, and initial spatial layouts.",
  },
  {
    title: "Detailed Design",
    description:
      "Refining every detail, from technical drawings to final material specifications.",
  },
  {
    title: "Implementation",
    description:
      "Coordinating with craftsmen and contractors to bring the vision to life with precision.",
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All Team");

  const categories = [
    {
      name: "All Team",
      description: "United in purpose, diverse in talent",
      moments: [
        {
          title: "Sivchheng Kheang",
          role: "Full-Stack Developer",
          description: "React, Node.js, TypeScript specialist",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Team Member 1",
          role: "Frontend Developer",
          description: "UI/UX implementation expert",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Team Member 2",
          role: "Backend Developer",
          description: "API development and database management",
          image:
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Team Member 3",
          role: "DevOps Engineer",
          description: "Infrastructure and deployment specialist",
          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Business Lead",
          role: "Product Manager",
          description: "Product strategy and roadmap planning",
          image:
            "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Marketing Manager",
          role: "Growth Specialist",
          description: "Digital marketing and user acquisition",
          image:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Operations Manager",
          role: "Business Operations",
          description: "Process optimization and team coordination",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Sales Director",
          role: "Partnership Development",
          description: "Client relationships and business development",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Junior Developer",
          role: "Apprentice Programmer",
          description: "Learning full-stack development fundamentals",
          image:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Design Apprentice",
          role: "UI/UX Learner",
          description:
            "Developing design skills and user experience knowledge",
          image:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Business Apprentice",
          role: "Management Trainee",
          description: "Learning business operations and project management",
          image:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Tech Apprentice",
          role: "IT Support Trainee",
          description:
            "Building technical support and system administration skills",
          image:
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
    {
      name: "Developer",
      description: "Code, create, and innovate",
      moments: [
        {
          title: "Sivchheng Kheang",
          role: "Full-Stack Developer",
          description: "React, Node.js, TypeScript specialist",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Team Member 1",
          role: "Frontend Developer",
          description: "UI/UX implementation expert",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Team Member 2",
          role: "Backend Developer",
          description: "API development and database management",
          image:
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Team Member 3",
          role: "DevOps Engineer",
          description: "Infrastructure and deployment specialist",
          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
    {
      name: "Business",
      description: "Strategy, growth, and partnerships",
      moments: [
        {
          title: "Business Lead",
          role: "Product Manager",
          description: "Product strategy and roadmap planning",
          image:
            "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Marketing Manager",
          role: "Growth Specialist",
          description: "Digital marketing and user acquisition",
          image:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Operations Manager",
          role: "Business Operations",
          description: "Process optimization and team coordination",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Sales Director",
          role: "Partnership Development",
          description: "Client relationships and business development",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
    {
      name: "Apprentice",
      description: "Learning, growing, and developing",
      moments: [
        {
          title: "Junior Developer",
          role: "Apprentice Programmer",
          description: "Learning full-stack development fundamentals",
          image:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Design Apprentice",
          role: "UI/UX Learner",
          description:
            "Developing design skills and user experience knowledge",
          image:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Business Apprentice",
          role: "Management Trainee",
          description: "Learning business operations and project management",
          image:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400",
        },
        {
          title: "Tech Apprentice",
          role: "IT Support Trainee",
          description:
            "Building technical support and system administration skills",
          image:
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
  ];
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-8 mb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-6">
              Our Expertise
            </p>
            <h1 className="text-7xl md:text-8xl font-serif font-medium tracking-tighter leading-[0.9] mb-12 uppercase">
              Services that
              <br />
              Define Spaces.
            </h1>
            <p className="text-2xl text-muted-foreground font-serif leading-relaxed max-w-2xl italic">
              "From our studios in Phnom Penh and Singapore, we provide a
              comprehensive design experience across Southeast Asia — from the
              initial concept to the final, curated detail."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      {/* <section className="px-8 mb-40">
        <div className="max-w-7xl mx-auto space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="inline-flex items-center justify-center w-16 h-16 border border-primary/20 bg-primary/5 text-primary mb-10">
                  <service.icon className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-serif font-medium mb-6">
                  {service.name}
                </h2>
                <p className="text-xs font-sans font-bold uppercase tracking-widest text-primary mb-6">
                  {service.description}
                </p>
                <p className="text-lg text-muted-foreground font-serif leading-relaxed mb-10 italic">
                  {service.detail}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-[11px] font-sans uppercase tracking-wider text-muted-foreground font-semibold">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`aspect-[4/5] bg-muted overflow-hidden border border-border/20 ${index % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <img
                  src={`https://images.unsplash.com/photo-${1600000000000 + index * 100000}?auto=format&fit=crop&q=80&w=1200`}
                  alt={service.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* Process Section */}
      {/* <section className="py-32 px-8 bg-muted/5 border-y border-border/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p className="font-sans text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-6">
              How We Work
            </p>
            <h2 className="text-5xl font-serif font-medium">
              The Design Journey
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/20 border border-border/20">
            {processSteps.map((step, idx) => (
              <div
                key={step.title}
                className="bg-background p-12 group hover:bg-muted/5 transition-colors"
              >
                <span className="font-serif text-muted-foreground/30 text-4xl mb-8 block">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-xl mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* KOOMPI Company Section */}
      <section className="py-32 px-8 bg-gradient-to-br from-background via-muted/5 to-primary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="font-sans text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-6">
              Our Partnership
            </p>
            <h2 className="text-5xl font-serif font-medium mb-8">
              KOOMPI Company
            </h2>
            <p className="text-xl text-muted-foreground font-serif leading-relaxed max-w-3xl mx-auto">
              As a proud member of the KOOMPI team, we bring together innovative
              technology and creative design to deliver exceptional digital
              experiences. Our collaborative approach combines cutting-edge
              development with artistic vision to create solutions that matter.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif font-medium mb-6">
                Innovation Through Collaboration
              </h3>
              <p className="text-lg text-muted-foreground font-serif leading-relaxed mb-8">
                At KOOMPI, we believe in the power of interdisciplinary
                collaboration. Our team combines expertise in software
                development, UI/UX design, and creative problem-solving to build
                products that make a real difference in people's lives.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-sans uppercase tracking-wider text-muted-foreground font-semibold">
                    Cross-functional Team Collaboration
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-sans uppercase tracking-wider text-muted-foreground font-semibold">
                    Agile Development Methodology
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-sans uppercase tracking-wider text-muted-foreground font-semibold">
                    User-Centered Design Approach
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              // className="aspect-[4/5] bg-muted overflow-hidden border border-border/20"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                alt="KOOMPI Team Collaboration"
                className="w-full h-full object-cover hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
              />
            </motion.div>
          </div>

          {/* Team Work Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-serif font-medium text-center mb-12">
              Our Recent Work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "E-Learning Platform",
                  description: "Interactive learning management system",
                  image:
                    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
                },
                {
                  title: "Mobile App Design",
                  description: "Cross-platform mobile application",
                  image:
                    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
                },
                {
                  title: "Web Dashboard",
                  description: "Analytics and data visualization",
                  image:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
                },
                {
                  title: "Brand Identity",
                  description: "Complete visual identity system",
                  image:
                    "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80&w=800",
                },
                {
                  title: "E-commerce Platform",
                  description: "Full-stack online marketplace",
                  image:
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
                },
                {
                  title: "UI/UX Redesign",
                  description: "User experience optimization",
                  image:
                    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800",
                },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/5] bg-muted overflow-hidden border border-border/20 mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                  </div>
                  <h4 className="font-serif text-lg font-medium mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* KOOMPI Office Gallery */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="font-sans text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-6">
              Our People
            </p>
            <h2 className="text-5xl font-serif font-medium mb-8">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground font-serif leading-relaxed max-w-3xl mx-auto">
              Get to know the talented individuals who make KOOMPI a place of
              innovation and excellence. Browse by department or view our
              complete team to see the diverse skills and expertise that drive
              our success.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="flex bg-muted/20 border border-border/20 rounded-lg p-1">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wider transition-all duration-300 rounded-md ${activeCategory === category.name
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Active Category Description */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <p className="text-lg text-muted-foreground font-serif italic">
              {
                categories.find((cat) => cat.name === activeCategory)
                  ?.description
              }
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div
            className={`grid gap-6 ${activeCategory === "All Team"
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              }`}
          >
            {categories
              .find((cat) => cat.name === activeCategory)
              ?.moments.map((moment, index) => (
                <motion.div
                  key={`${activeCategory}-${moment.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square bg-muted overflow-hidden border border-border/20 mb-4 relative">
                    <img
                      src={moment.image}
                      alt={moment.title}
                      className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                  <h4 className="font-serif text-lg font-medium mb-1 group-hover:text-primary transition-colors">
                    {moment.title}
                  </h4>
                  <p className="text-xs font-sans font-semibold uppercase tracking-wider text-primary mb-2">
                    {moment.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {moment.description}
                  </p>
                </motion.div>
              ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-lg text-muted-foreground font-serif italic">
              "Our greatest strength lies in our people—their passion,
              creativity, and commitment to excellence drive everything we do at
              KOOMPI."
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-6xl font-serif font-medium mb-12">
            Ready to improve your skill?
          </h2>
          <Button
            size="lg"
            className="rounded-none h-16 px-12 font-sans text-xs tracking-[0.2em] uppercase bg-foreground text-background hover:bg-primary transition-colors"
          >
            Enter to start with us! <ArrowRight className="ml-4 w-4 h-4" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
