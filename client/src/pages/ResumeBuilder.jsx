import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, Copy, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, Globe, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react';
import PersonalInfo from '../Component/PersonalInfo';
import ResumePreview from '../Component/ResumePreview';
import TemplateSelector from '../Component/TemplateSelector';
import ColorPicker from '../Component/ColorPicker';
import ProfessionalSummary from '../Component/ProfessionalSummary';
import ExperienceForm from '../Component/ExperienceForm';
import EducationForm from '../Component/EducationForm';
import ProjectForm from '../Component/ProjectForm';
import SkillsForm from '../Component/SkillsForm';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';
import { useRef } from 'react';
import { useReactToPrint } from "react-to-print"
import ResumeBuilderSkeleton from '../Component/skeleton/ResumeBuilderSkeleton';
import QRCode from "react-qr-code"
import { QrCode } from "lucide-react"





const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const resumeRef = useRef(null)
  const { token } = useSelector(state => state.auth)
  const { loading: authLoading } = useSelector((state) => state.auth);
  const isOnline = useSelector((state) => state.network.isOnline);
  const [pageLoading, setPageLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false)
  const shareRef = useRef(null)
  const [showQR, setShowQR] = useState(false)


  const portfolioUrl = window.location.origin + "/portfolio/" + resumeId

  const [resumedata, setresumeData] = useState({
    _id: '',
    title: '',
    personal_info: {
      full_name: '',
      profession: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      image: ''
    },
    professionalInfo: {},
    professionalSummary: '',
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false
  });


  const loadExistingResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/get/" + resumeId, { headers: { Authorization: `Bearer ${token}` } })

      if (data.resume) {
        setresumeData(data.resume)
        document.title = data.resume.title
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)

    } finally {
      setPageLoading(false);
    }



  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const section = [
    { id: 'personal', title: 'Personal Info', icon: User },
    { id: 'Summary', title: 'Summary', icon: FileText },
    { id: 'Experience', title: 'Experience', icon: Briefcase },
    { id: 'Education', title: 'Education', icon: GraduationCap },
    { id: 'Projects', title: 'Projects', icon: FolderIcon },
    { id: 'Skills', title: 'Skills', icon: Sparkles },
  ]

  const activeSection = section[activeSectionIndex]

  useEffect(() => {

    loadExistingResume()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShareMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify({ public: !resumedata.public }))

      const { data } = await api.put("/api/resumes/update", formData, { headers: { Authorization: `Bearer ${token}` } })
      setresumeData({ ...resumedata, public: !resumedata.public })

      toast.success(data.message)

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)

    }
  }

 

  const saveResume = async () => {
    try {

      let updatedResumeData = structuredClone(resumedata)

      // remove image from updatedresumedata

      if (typeof resumedata.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image
      }

      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify(updatedResumeData))
      removeBackground && formData.append("removeBackground", "yes")
      typeof resumedata.personal_info.image === 'object' && formData.append("image", resumedata.personal_info.image)

      const { data } = await api.put("/api/resumes/update", formData, { headers: { Authorization: `Bearer ${token}` } })
      setresumeData(data.resume)
      toast.success(data.message)

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)

    }
  }



  const downloadResume = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "Resume",
  })

  const handleReorder = async (newOrder) => {
    setresumeData((prev) => ({ ...prev, sectionOrder: newOrder }));

    try {
      await api.put(
        "/api/resumes/section-order",
        { resumeId, sectionOrder: newOrder },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error(err);
    }
  };

if (authLoading || !isOnline || pageLoading) {
  return <ResumeBuilderSkeleton />;
}






  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to='/app' className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-500 transition-all'>
          <ArrowLeftIcon className="size-4" />Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left panel form */}

          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 pt-1 p-6'>
              {/* progress bar using activesectionidex */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
              <hr className='absolute top-0 left-0 h-1 bg-linear-to-r from green-600 to-green-600 border-none transition-all duration-2000' style={{ width: `${activeSectionIndex * 100 / (section.length - 1)}%` }} />

              {/* section navigation */}
              <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
                <div className='flex  items-center gap-2'>
                  <TemplateSelector selectedTemplate={resumedata.template} onChange={(template) => setresumeData(prev => ({ ...prev, template }))} />
                  <ColorPicker selectedColor={resumedata.accent_color} onChange={(color) => setresumeData(prev => ({ ...prev, accent_color: color }))} />
                </div>
                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button onClick={() => setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0))} className='flex items-center cursor-pointer gap-1 p-3 rounded-lg text-sm font-medium text-gray-600  hover:bg-gray-50 transition-all' disabled={activeSectionIndex === 0}>
                      <ChevronLeft className='size-4' /> Previous
                    </button>
                  )}

                  <button onClick={() => setActiveSectionIndex((prevIndex) => Math.min(prevIndex + 1, section.length - 1))} className={`flex items-center cursor-pointer gap-1 p-3 rounded-lg text-sm font-medium text-gray-600  hover:bg-gray-50 transition-all ${activeSectionIndex == section.length - 1 && 'opacity-50'}`} disabled={activeSectionIndex === section.length}>
                    Next<ChevronRight className='size-4 cursor-pointer' />
                  </button>
                </div>

              </div>

              {/* form sectioon */}
              <div className='space-y-6'>
                {activeSection.id === 'personal' && (
                  <PersonalInfo data={resumedata.personal_info} onChange={(data) => setresumeData(prev => ({ ...prev, personal_info: data }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                )}
                {activeSection.id === 'Summary' && (
                  <ProfessionalSummary data={resumedata.professional_summary} onChange={(data) => setresumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={setresumeData} />
                )}
                {activeSection.id === 'Experience' && (
                  <ExperienceForm data={resumedata.experience} onChange={(data) => setresumeData(prev => ({ ...prev, experience: data }))} />
                )}
                {activeSection.id === 'Education' && (
                  <EducationForm data={resumedata.education} onChange={(data) => setresumeData(prev => ({ ...prev, education: data }))} />
                )}
                {activeSection.id === 'Projects' && (
                  <ProjectForm data={resumedata.projects} onChange={(data) => setresumeData(prev => ({ ...prev, projects: data }))} />
                )}
                {activeSection.id === 'Skills' && (
                  <SkillsForm data={resumedata.skills} onChange={(data) => setresumeData(prev => ({ ...prev, skills: data }))} />
                )}

              </div>
              <button onClick={() => toast.promise(saveResume, { loading: "Saving..." })} className='bg-linear-to-br from-green-100 to-green-200  ring-green-300 text-green-600 cursor-pointer ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>Save Changes</button >

            </div>

          </div>

          {/* Right panel preview */}
          <div className='lg:col-span-7 max-lg:mt-6'>
            <div className='relative w-full'>
              {/* button */}
              <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                {resumedata.public && (
  <div className="relative z-40" ref={shareRef}>
    
    <button
      onClick={() => setShowShareMenu((prev) => !prev)}
      className="flex items-center p-2 px-4 gap-2 text-xs 
      bg-linear-to-br from-blue-100 to-blue-200 
      text-blue-600 rounded-lg ring-blue-300 
      hover:ring transition-all duration-200"
    >
      <Share2Icon className="size-4" />
      Share
    </button>

    {showShareMenu && (
      <div
        className="absolute right-0 mt-2 w-48 
        bg-white border border-gray-200 
        rounded-xl shadow-lg 
        animate-[fadeIn_0.15s_ease-out]"
      >

        <button
          onClick={() => {
            const url = window.location.origin + "/view/" + resumeId
            navigator.clipboard.writeText(url)
            toast.success("Resume link copied")
            setShowShareMenu(false)
          }}
          className="flex items-center gap-3 w-full px-4 py-3 
          text-sm text-gray-700 
          hover:bg-gray-100 transition-colors"
        >
          <FileText className="size-4 text-blue-500" />
          Resume Link
          <Copy className="size-3 ml-auto opacity-60" />
        </button>

        <button
          onClick={() => {
            const url = window.location.origin + "/portfolio/" + resumeId
            navigator.clipboard.writeText(url)
            toast.success("Portfolio link copied")
            setShowShareMenu(false)
          }}
          className="flex items-center gap-3 w-full px-4 py-3 
          text-sm text-gray-700 
          hover:bg-gray-100 transition-colors"
        >
          <Globe className="size-4 text-green-500" />
          Portfolio Link
          <Copy className="size-3 ml-auto opacity-60" />
        </button>

      </div>
    )}
  </div>
)}
{resumedata.public && (
  <button
    onClick={() => setShowQR(true)}
    className="flex items-center p-2 px-4 gap-2 text-xs 
    bg-linear-to-br from-indigo-100 to-indigo-200 
    text-indigo-600 rounded-lg ring-indigo-300 hover:ring transition-colors"
  >
    <QrCode className="size-4" />
    QR Code
  </button>
)}
                {resumedata.public && (
                  <button
                    onClick={() => window.open(`/portfolio/${resumeId}`, "_blank")}
                    className="flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-gray-300 to-gray-400 text-gray-800 rounded-lg ring-gray-500 hover:ring transition-colors"
                  >
                    <Globe className="size-4" />
                    Generate Portfolio
                  </button>
                )}


                <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors'>
                  {resumedata.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}
                  {resumedata.public ? "public" : "private"}
                </button>

                <button onClick={downloadResume} className='flex cursor-pointer item-center gap-2 px-6 py-2 text-xs bg-linear-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
                  <DownloadIcon className='size-4' /> Download
                </button>
              </div>


            </div>

            {/* resume preview */}
            <div style={{ position: "relative" }}>



              <div ref={resumeRef}>

                <ResumePreview data={resumedata} accentColor={resumedata.accent_color} template={resumedata.template} onReorder={handleReorder} />
              </div>

            </div>

          </div>

        </div>

      </div>
      {showQR && (
  <div
    className="fixed inset-0 flex items-center justify-center 
    bg-black/40 backdrop-blur-sm 
    z-50 animate-[modalFade_0.2s_ease-out]"
  >

    <div
      className="relative bg-white rounded-2xl 
      p-7 shadow-2xl text-center w-80 
      animate-[modalScale_0.25s_ease-out]"
    >

      {/* Close button */}
      <button
        onClick={() => setShowQR(false)}
        className="absolute top-3 right-3 p-1 rounded-full 
        text-gray-400 hover:text-gray-700 
        hover:bg-gray-100 transition cursor-pointer"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Scan Portfolio QR
      </h2>

      {/* QR container */}
      <div className="flex justify-center p-4 
        bg-gray-50 rounded-xl shadow-inner">

        <QRCode
          value={portfolioUrl}
          size={180}
        />

      </div>

      {/* Info text */}
      <p className="text-xs text-gray-500 mt-4">
        Scan this QR code to open your portfolio on your phone
      </p>

      {/* Portfolio link preview */}
      <p className="text-xs text-gray-400 mt-2 truncate">
        {portfolioUrl}
      </p>

    </div>

  </div>
)}

    </div>
    
  )
}

export default ResumeBuilder