import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../configs/api"
import ResumePreview from "../Component/ResumePreview"
import toast from "react-hot-toast"
import PublicResumeSkeleton from "../Component/PublicResumeSkeleton"

const PublicResume = () => {
  const { resumeId } = useParams()
  const [resumeData, setResumeData] = useState(null)

  const fetchResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/view/${resumeId}`)
      setResumeData(data.resume)
      document.title = data.resume.title
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchResume()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ✅ Skeleton instead of plain loading text
  if (!resumeData) return <PublicResumeSkeleton />

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <ResumePreview
        data={resumeData}
        accentColor={resumeData.accent_color}
        template={resumeData.template}
      />
    </div>
  )
}

export default PublicResume
