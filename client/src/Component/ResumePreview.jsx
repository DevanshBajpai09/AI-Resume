import React from 'react'
import ModernTemplate from '../Component/templates/ModernTemplate'
import ClassicTemplate from '../Component/templates/ClassicTemplate'
import MinimalTemplate from '../Component/templates/MinimalTemplate'
import MinimalImageTemplate from '../Component/templates/MinimalImageTemplate'
import FuturisticTemplate  from '../Component/templates/FuturisticLayout'
import CreativeTemplate from '../Component/templates/MinimalCreativeLayout'
import ElegantTemplate from '../Component/templates/ElegantProfessionalLayout'


const ResumePreview = ({ data, template, accentColor, classes = "" }) => {

  const RenderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />
      case "futuristic":
        return <FuturisticTemplate data={data} accentColor={accentColor} />
      case "creative":
        return <CreativeTemplate data={data} accentColor={accentColor} />
      case "elegant":
        return <ElegantTemplate data={data} accentColor={accentColor} />



      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />

    }
  }
  return (
    
    <div className='w-full bg-gray-100'>
      <div id='resume-preview' className={"border border-gray-200 print-shadow-none print-border-none" + classes}>
      
        {RenderTemplate()}

      
    </div>
    
    </div>
  )
}

export default ResumePreview