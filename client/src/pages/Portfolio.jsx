/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../configs/api";
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Github,
  ExternalLink,
  Calendar,
  Building2,
  Sparkles,
  ChevronRight,
  Download,
  Menu,
  X,
  Heart,
  BookOpen,
  Target,
  Zap,
  Layers,
  BadgeCheck,
} from "lucide-react";

const Portfolio = () => {
  const { resumeId } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    education: useRef(null),
    contact: useRef(null),
  };

  const fetchResume = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/api/resumes/public/${resumeId}`);
      setResume(data.resume);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, [resumeId]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([key, ref]) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(key);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(ref.current);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [sectionRefs]);

  const scrollToSection = (section) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: "hero", label: "Home", icon: <User className="w-4 h-4" /> },
    { id: "about", label: "About", icon: <Target className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Zap className="w-4 h-4" /> },
    {
      id: "experience",
      label: "Experience",
      icon: <Briefcase className="w-4 h-4" />,
    },
    { id: "projects", label: "Projects", icon: <Layers className="w-4 h-4" /> },
    {
      id: "education",
      label: "Education",
      icon: <GraduationCap className="w-4 h-4" />,
    },
    { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-green-500/20 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="relative">
            <div className="w-24 h-24 border-2 border-green-500/30 rounded-full"></div>
            <div className="w-24 h-24 border-2 border-green-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-green-500 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-400 text-lg mt-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            Crafting your portfolio
          </p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-transparent"></div>
        <div className="relative z-10 text-center p-8 max-w-md">
          <div className="text-8xl mb-6 opacity-50">🎯</div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Portfolio Not Found
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            The portfolio you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg shadow-green-500/25 font-medium flex items-center gap-2 mx-auto"
          >
            <ChevronRight className="w-5 h-5" />
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const { personal_info, professional_summary, skills, projects, experience, education } =
    resume;

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-gray-100 relative overflow-x-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-200 h-200 bg-linear-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-[120px] animate-blob"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
            transition: "transform 0.2s ease-out",
          }}
        ></div>
        <div
          className="absolute top-1/2 right-0 w-150 h-150 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${
              mousePosition.y * -0.01
            }px)`,
            transition: "transform 0.2s ease-out",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Sticky Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl">
        <div className="relative">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800"></div>

          <div className="relative px-4 py-3">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeSection === item.id
                      ? "text-white bg-linear-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden flex items-center justify-between">
              <span className="text-white font-medium flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" />
                Portfolio
              </span>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/5 border border-gray-800 text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-800 md:hidden">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${
                      activeSection === item.id
                        ? "text-white bg-linear-to-r from-green-500/20 to-emerald-500/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-32">
        {/* Hero Section */}
        <section
          ref={sectionRefs.hero}
          className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        >
          <div className="max-w-6xl mx-auto text-center relative">
            {/* Animated name */}
            <div className="relative mb-8">
              <h1 className="text-7xl md:text-9xl font-bold bg-linear-to-r from-white via-green-300 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                {personal_info?.full_name || "Your Name"}
              </h1>
              <div className="absolute inset-0 blur-3xl bg-linear-to-r from-green-500/20 to-emerald-500/20 -z-10"></div>
            </div>

            {/* Profession */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <BadgeCheck className="w-8 h-8 text-green-500" />
              <h2 className="text-3xl md:text-4xl text-gray-300 font-light">
                {personal_info?.profession || "Developer"}
              </h2>
            </div>

            {/* Tagline */}
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Building exceptional digital experiences with modern technologies
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <button className="group relative px-8 py-4 bg-linear-to-r from-green-500 to-emerald-600 rounded-xl text-white font-medium overflow-hidden shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all">
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download Resume
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2 group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Contact Me
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4">
              {personal_info?.linkedin && (
                <a
                  href={personal_info.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl hover:bg-green-500/20 hover:border-green-500/30 transition-all group"
                >
                  <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-green-500 group-hover:scale-110 transition-all" />
                </a>
              )}
              {personal_info?.github && (
                <a
                  href={personal_info.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl hover:bg-green-500/20 hover:border-green-500/30 transition-all group"
                >
                  <Github className="w-6 h-6 text-gray-400 group-hover:text-green-500 group-hover:scale-110 transition-all" />
                </a>
              )}
              {personal_info?.website && (
                <a
                  href={personal_info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl hover:bg-green-500/20 hover:border-green-500/30 transition-all group"
                >
                  <Globe className="w-6 h-6 text-gray-400 group-hover:text-green-500 group-hover:scale-110 transition-all" />
                </a>
              )}
              {personal_info?.email && (
                <a
                  href={`mailto:${personal_info.email}`}
                  className="p-4 bg-white/5 backdrop-blur-sm border  border-gray-800 rounded-xl hover:bg-green-500/20 hover:border-green-500/30 transition-all group"
                >
                  <Mail className="w-6 h-6 text-gray-400 group-hover:text-green-500 group-hover:scale-110 transition-all" />
                </a>
              )}
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 rounded-full border-2 border-gray-700 flex justify-center">
                <div className="w-1 h-3 bg-green-500 rounded-full mt-2 animate-scroll"></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={sectionRefs.about} className="px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                <Target className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                About Me
              </h2>
            </div>

            <div className="relative group">
              <div className="relative p-8 md:p-12 bg-white/5 backdrop-blur-sm rounded-3xl border border-gray-800 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {professional_summary || "No professional summary provided."}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-500 mb-2">
                        {experience?.length || 0}+
                      </div>
                      <div className="text-gray-400 text-sm">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-500 mb-2">
                        {projects?.length || 0}+
                      </div>
                      <div className="text-gray-400 text-sm">Projects Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-500 mb-2">
                        {skills?.length || 0}+
                      </div>
                      <div className="text-gray-400 text-sm">Skills</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-500 mb-2">
                        {education?.length || 0}+
                      </div>
                      <div className="text-gray-400 text-sm">Degrees</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={sectionRefs.skills} className="px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                <Zap className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Skills & Expertise
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills?.map((skill, index) => (
                <div
                  key={index}
                  className="group relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-green-500/30 transition-all duration-500 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center gap-3">
                    <BadgeCheck className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-300 font-medium">{skill}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-green-500 to-emerald-500 rounded-b-2xl w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section ref={sectionRefs.experience} className="px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                <Briefcase className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Work Experience
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-linear-to-b from-green-500 via-emerald-500 to-transparent"></div>

              <div className="space-y-12">
                {experience?.map((exp, index) => (
                  <div key={index} className="relative pl-20 group">
                    <div className="absolute left-6 top-0 w-4 h-4 bg-green-500 rounded-full border-4 border-gray-900 group-hover:scale-125 transition-transform"></div>

                    <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-green-500/30 transition-all">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {exp.position}
                          </h3>
                          <p className="text-green-500 flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            {exp.company}
                          </p>
                        </div>
                        <span className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-xl text-green-500 text-sm flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {exp.start_date} — {exp.is_current ? "Present" : exp.end_date}
                        </span>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={sectionRefs.projects} className="px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                <Layers className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects?.map((project, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-gray-800 hover:border-green-500/30 transition-all duration-500"
                >
                  <div className="h-48 bg-linear-to-br from-green-500/20 to-emerald-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-500 text-xs">
                        {project.type || "Project"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-500 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-500">Featured Project</span>
                      </div>
                      <button className="flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors group">
                        View Project
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-linear-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section ref={sectionRefs.education} className="px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                <GraduationCap className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Education
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education?.map((edu, index) => (
                <div
                  key={index}
                  className="group relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-green-500/30 transition-all"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <BookOpen className="w-8 h-8 text-green-500" />
                      {edu.gpa && (
                        <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-500 text-xs">
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-green-500 mb-4 flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      {edu.institution}
                    </p>

                    {edu.graduation_date && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Graduated: {edu.graduation_date}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={sectionRefs.contact} className="px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-3 bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                <Mail className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Let's Connect
              </h2>
            </div>

            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Interested in working together? Feel free to reach out through any of these
              platforms.
            </p>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {personal_info?.email && (
                <a
                  href={`mailto:${personal_info.email}`}
                  className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-green-500/30 transition-all"
                >
                  <Mail className="w-8 h-8 text-green-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-gray-300 text-sm truncate">{personal_info.email}</p>
                </a>
              )}

              {personal_info?.phone && (
                <a
                  href={`tel:${personal_info.phone}`}
                  className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-green-500/30 transition-all"
                >
                  <Phone className="w-8 h-8 text-green-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-gray-300 text-sm">{personal_info.phone}</p>
                </a>
              )}

              {personal_info?.location && (
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-800">
                  <MapPin className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <p className="text-gray-300 text-sm">{personal_info.location}</p>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4">
              {personal_info?.linkedin && (
                <a
                  href={personal_info.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl hover:bg-green-500/20 hover:border-green-500/30 transition-all group"
                >
                  <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-green-500 group-hover:scale-110 transition-all" />
                </a>
              )}
              {personal_info?.github && (
                <a
                  href={personal_info.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl hover:bg-green-500/20 hover:border-green-500/30 transition-all group"
                >
                  <Github className="w-6 h-6 text-gray-400 group-hover:text-green-500 group-hover:scale-110 transition-all" />
                </a>
              )}
              {personal_info?.website && (
                <a
                  href={personal_info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl hover:bg-green-500/20 hover:border-green-500/30 transition-all group"
                >
                  <Globe className="w-6 h-6 text-gray-400 group-hover:text-green-500 group-hover:scale-110 transition-all" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-8 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-500" />
              © 2024 {personal_info?.full_name || "Portfolio"}. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              Built with <Heart className="w-4 h-4 text-green-500 fill-green-500" /> using
              React & Tailwind
            </p>
          </div>
        </footer>
      </div>

      {/* Styles */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          
          .animate-blob {
            animation: blob 10s infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          
          @keyframes scroll {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(15px); opacity: 0; }
          }
          
          .animate-scroll {
            animation: scroll 1.5s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Portfolio;