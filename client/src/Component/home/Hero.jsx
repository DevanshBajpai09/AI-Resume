import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Hero = () => {

    const { user } = useSelector(state => state.auth)
    const [menuOpen, setMenuOpen] = useState(false);
   

const token = localStorage.getItem("token");

const isAuthenticated = !!token && !!user;

    return (
        <>
            <div className="min-h-screen pb-20 bg-[#FBFAF6] text-[#171B24] relative">

                {/* margin rule — runs the length of the page, the document motif */}
                <div className="hidden md:block absolute top-0 bottom-0 left-16 w-px bg-[#DFDACC] pointer-events-none" />

                {/* Navbar */}
                <nav className="relative z-10 flex items-center justify-between w-full py-6 px-6 md:pl-24 md:pr-16 lg:pr-24 xl:pr-40 text-sm">
                    <a href="/" className="ff-serif italic text-xl">
                        resume<span className="text-[#C63B26]">.</span>
                    </a>

                    <div className="hidden md:flex items-center gap-8 ff-mono text-[11px] tracking-wider uppercase text-[#5B6070]">

  <a
    href="/"
    className="hover:text-[#171B24] transition"
  >
    Home
  </a>

  <button
    onClick={() =>
      document.getElementById("features")?.scrollIntoView({
        behavior: "smooth",
      })
    }
    className="hover:text-[#171B24] transition bg-transparent border-0 p-0 cursor-pointer font-inherit uppercase"
  >
    Features
  </button>

  <button
    onClick={() =>
      document.getElementById("testimonials")?.scrollIntoView({
        behavior: "smooth",
      })
    }
    className="hover:text-[#171B24] transition bg-transparent border-0 p-0 cursor-pointer font-inherit uppercase"
  >
    Testimonials
  </button>

  <button
  onClick={() => {
    window.location.href =
      "mailto:hello@yourresume.com?subject=Resume%20Platform%20Inquiry";
  }}
  className="hover:text-[#171B24] transition bg-transparent border-0 p-0 cursor-pointer font-inherit uppercase"
>
  Contact
</button>

</div>

                    <div className="flex gap-3">
                        <Link
                            to='/app?state=register'
                            className="hidden md:inline-flex items-center px-6 py-2 ff-mono text-xs bg-[#171B24] text-[#FBFAF6] rounded-sm hover:shadow-[3px_3px_0_#C63B26] active:scale-95 transition-all"
                            hidden={isAuthenticated}
                        >
                            Get started
                        </Link>
                        <Link
                            to="/app?state=login"
                            className="hidden md:inline-flex items-center px-6 py-2 ff-mono text-xs border border-[#171B24] rounded-sm hover:bg-[#171B24] hover:text-[#FBFAF6] active:scale-95 transition-all"
                            hidden={isAuthenticated}
                        >
                            Log in
                        </Link>
                        <Link
                            to='/app'
                            className="hidden md:inline-flex items-center px-7 py-2 ff-mono text-xs bg-[#171B24] text-[#FBFAF6] rounded-sm hover:shadow-[3px_3px_0_#C63B26] active:scale-95 transition-all"
                            hidden={!isAuthenticated}
                        >
                            Dashboard
                        </Link>
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 z-[100] bg-[#171B24]/95 ff-mono text-white flex flex-col items-center justify-center text-base gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <a href="/" className="uppercase tracking-wider">Home</a>
                    <a href="#features" className="uppercase tracking-wider">Features</a>
                    <a href="#testimonials" className="uppercase tracking-wider">Testimonials</a>
                    <a href="#cta" className="uppercase tracking-wider">Contact</a>
                    <button onClick={() => setMenuOpen(false)} className="mt-4 size-10 flex items-center justify-center border border-white rounded-sm">
                        ✕
                    </button>
                </div>

                {/* Hero Section */}
                <div className="relative z-10 flex flex-col items-center text-sm px-6 md:pl-24 md:pr-16 lg:pr-24 xl:pr-40">

                    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-14 items-center mt-16">

                        {/* Left: copy */}
                        <div>
                            <div className="ff-mono text-[11px] tracking-widest uppercase text-[#5B6070] flex items-center gap-2.5">
                                <span className="w-3.5 h-px bg-[#C63B26] inline-block" />
                                Draft 01 — Under review by AI
                            </div>

                            <h1 className="ff-serif font-medium text-4xl md:text-5xl leading-[1.08] tracking-tight mt-5">
                                The resume that{' '}
                                <span className="line-through decoration-[#C63B26] decoration-2 text-[#5B6070]">tries hard</span>
                                <br />
                                gets <em className="italic text-[#2547D0] not-italic font-normal" style={{ fontStyle: 'italic' }}>marked up</em>, not rewritten.
                            </h1>

                            <p className="text-[#5B6070] text-base leading-relaxed max-w-md mt-6 mb-8">
                                Paste in a job description. The AI reads your resume like a recruiter would — circles the weak lines, matches keywords, and rewrites only what needs it.
                            </p>

                            <div className="flex items-center gap-3 mb-8">
                                <Link to='/app' className="inline-flex items-center gap-2 px-7 py-3.5 ff-mono text-xs bg-[#171B24] text-[#FBFAF6] rounded-sm hover:shadow-[3px_3px_0_#C63B26] active:scale-95 transition-all">
                                    Mark up my resume
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </Link>
                                <Link to="/try_demo" className="inline-flex items-center gap-2 px-6 py-3.5 ff-mono text-xs border border-[#171B24] rounded-sm hover:bg-[#171B24] hover:text-[#FBFAF6] transition-all">
                                    See a sample
                                </Link>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="" className="size-7 object-cover rounded-full border-2 border-[#FBFAF6]" />
                                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="" className="size-7 object-cover rounded-full border-2 border-[#FBFAF6]" />
                                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="" className="size-7 object-cover rounded-full border-2 border-[#FBFAF6]" />
                                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="" className="size-7 object-cover rounded-full border-2 border-[#FBFAF6]" />
                                </div>
                                <span className="ff-mono text-[11px] text-[#5B6070]">10,000+ resumes reviewed this month</span>
                            </div>
                        </div>

                        {/* Right: signature annotated-resume mockup */}
                        <div className="relative mt-10 md:mt-0">
                            {/* stamp */}
                            <div className="absolute -top-4 right-4 md:right-6 w-20 h-20 rounded-full border-2 border-[#C63B26] flex items-center justify-center rotate-12 ff-mono text-[9px] text-[#C63B26] text-center leading-tight bg-white/70 z-10">
                                ATS<br />MATCH<br />94%
                            </div>

                            {/* doc card */}
                            <div className="bg-white border border-[#DFDACC] shadow-[0_30px_60px_-30px_rgba(23,27,36,0.25)] rounded-sm p-8 -rotate-1">
                                <div className="ff-serif text-lg font-semibold">Devansh Bajpai</div>
                                <div className="ff-mono text-[11px] text-[#5B6070] tracking-wide mt-0.5">Full-Stack Developer · Bhubaneswar, Odisha</div>

                                <div className="h-px bg-[#DFDACC] my-4" />

                                <div className="ff-mono text-[10px] tracking-widest uppercase text-[#2547D0] mb-2">Professional Experience</div>
                                <p className="text-[13px] leading-relaxed text-[#a3a8b5] line-through decoration-[#C63B26] mb-1">
                                    Worked on a project involving vessel data
                                </p>
                                <p className="text-[13px] leading-relaxed font-medium mb-3" style={{ background: 'linear-gradient(180deg, transparent 60%, #FCE388 60%)', display: 'inline' }}>
                                    Engineered a vessel management system serving 200+ daily users
                                </p>
                                <p className="text-[13px] leading-relaxed text-[#3a3f4c] mt-3">
                                    Built a full-stack healthcare platform with role-based login for patients, doctors, and admins.
                                </p>

                                <div className="h-px bg-[#DFDACC] my-4" />

                                <div className="ff-mono text-[10px] tracking-widest uppercase text-[#2547D0] mb-2">Core Skills</div>
                                <p className="text-[13px] text-[#3a3f4c]">
                                    React · Next.js · Node.js ·{' '}
                                    <span className="font-medium" style={{ background: 'linear-gradient(180deg, transparent 60%, #FCE388 60%)' }}>Vector Databases</span>{' '}
                                    · Firebase
                                </p>
                            </div>

                            {/* pin note */}
                            <div className="hidden md:block absolute top-1/2 -right-8 w-40 bg-white border border-[#DFDACC] shadow-lg p-3 ff-mono text-[10px] leading-relaxed rotate-2">
                                <b className="text-[#C63B26]">AI note —</b> add a number. "200+ users" reads stronger to a recruiter scanning in 6 seconds.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero