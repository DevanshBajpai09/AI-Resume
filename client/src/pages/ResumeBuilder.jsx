import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, Sparkles, User } from 'lucide-react';
import PersonalInfo from '../Component/personalInfo';
import ResumePreview from '../Component/ResumePreview';
import TemplateSelector from '../Component/TemplateSelector';
import ColorPicker from '../Component/ColorPicker';
import ProfessionalSummary from '../Component/ProfessionalSummary';
import ExperienceForm from '../Component/ExperienceForm';
import EducationForm from '../Component/EducationForm';
import ProjectForm from '../Component/ProjectForm';


const ResumeBuilder = () => {
  const {resumeId} = useParams();
  const [resumedata, setresumeData] = useState({
    _id: '',
    title: '',
    professionalInfo :{},
    professionalSummary: '',
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template:'classic',
    accent_color: '#3B82F6',
    public: false
  });


  const loadExistingResume = async()=>{
    const resume = dummyResumeData.find(resume=> resume._id === resumeId)
    if(resume){
      setresumeData(resume)
      document.title = resume.title
    }

  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const section = [
    {id: 'personal', title: 'Personal Info' , icon: User},
    {id: 'Summary', title: 'Summary' , icon: FileText},
    {id: 'Experience', title: 'Experience' , icon: Briefcase},
    {id: 'Education', title: 'Education' , icon: GraduationCap},
    {id: 'Projects', title: 'Projects' , icon: FolderIcon},
    {id: 'Skills', title: 'Skills' , icon: Sparkles},
  ]

  const activeSection = section[activeSectionIndex]

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadExistingResume()
  },[])
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to='/app' className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-500 transition-all'>
        <ArrowLeftIcon className="size-4"/>Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left panel form */}

          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 pt-1 p-6'>
              {/* progress bar using activesectionidex */}
              <hr  className='absolute top-0 left-0 right-0 border-2 border-gray-200'/>
              <hr  className='absolute top-0 left-0 h-1 bg-linear-to-r from green-600 to-green-600 border-none transition-all duration-2000' style={{width: `${activeSectionIndex * 100/ (section.length - 1)}%`}}/>

              {/* section navigation */}
              <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
                <div className='flex  items-center gap-2'>
                  <TemplateSelector selectedTemplate={resumedata.template} onChange={(template)=> setresumeData(prev=>({...prev, template}))}/>
                    <ColorPicker selectedColor={resumedata.accent_color} onChange={(color)=>setresumeData(prev=>({...prev,accent_color:color}))}/>
                </div>
                <div className='flex items-center'>
                  {activeSectionIndex !== 0 &&(
                    <button onClick = {()=>setActiveSectionIndex((prevIndex)=> Math.max(prevIndex - 1, 0))} className='flex items-center cursor-pointer gap-1 p-3 rounded-lg text-sm font-medium text-gray-600  hover:bg-gray-50 transition-all' disabled={activeSectionIndex === 0}>
                      <ChevronLeft className='size-4'/> Previous
                    </button>
                  )}

                  <button onClick = {()=>setActiveSectionIndex((prevIndex)=> Math.min(prevIndex + 1, section.length - 1))} className={`flex items-center cursor-pointer gap-1 p-3 rounded-lg text-sm font-medium text-gray-600  hover:bg-gray-50 transition-all ${activeSectionIndex == section.length - 1 && 'opacity-50'}`} disabled={activeSectionIndex === section.length}>
                      Next<ChevronRight className='size-4 cursor-pointer'/>
                    </button>
                </div>

              </div>

              {/* form sectioon */}
              <div className='space-y-6'>
                {activeSection.id === 'personal' && (
                  <PersonalInfo data={resumedata.personal_info} onChange={(data)=>setresumeData(prev => ({...prev, personal_info: data}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}/>
                )}
                {activeSection.id === 'Summary' && (
                  <ProfessionalSummary data={resumedata.professional_summary} onChange={(data)=>setresumeData(prev => ({...prev, professional_summary: data}))} setResumeData={setresumeData}/>
                )}
                {activeSection.id === 'Experience' && (
                  <ExperienceForm data={resumedata.experience} onChange={(data)=>setresumeData(prev => ({...prev, experience: data}))} />
                )}
                {activeSection.id === 'Education' && (
                  <EducationForm data={resumedata.education} onChange={(data)=>setresumeData(prev => ({...prev, education: data}))} />
                )}
                {activeSection.id === 'Projects' && (
                  <ProjectForm data={resumedata.projects} onChange={(data)=>setresumeData(prev => ({...prev, projects: data}))} />
                )}

              </div>

            </div>

          </div>

          {/* Right panel preview */}
          <div className='lg:col-span-7 max-lg:mt-6'>
            <div >
              {/* button */}

            </div>

            {/* resume preview */}
            <ResumePreview data={resumedata} accentColor={resumedata.accent_color} template={resumedata.template}/>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ResumeBuilder