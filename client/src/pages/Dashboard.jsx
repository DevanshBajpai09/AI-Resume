import { FilePenLineIcon, PencilIcon, Plus, TrashIcon, UploadCloud, UploadCloudIcon, XIcon, LoaderCircleIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';
import pdfToText from "react-pdftotext"

const Dashboard = () => {
  const color = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allresumes, setallResumes] = useState([]);
  const [CreateResume, setCreateResume] = useState(false);
  const [uploadresume, setUploadresume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteResumeId, setDeleteResumeId] = useState(null);

  const { user, token } = useSelector(state => state.auth)


  const navigate = useNavigate()
  const loadallResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setallResumes(data.resumes)

    } catch {
      toast.error(error?.response?.data?.message || error.message)

    }
  }

  const Createresume = async (e) => {
    try {
      e.preventDefault()
      const { data } = await api.post("/api/resumes/create", { title }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setallResumes([...allresumes, data.resume])
      setTitle('')
      setCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }
  const UploadResume = async (e) => {
    e.preventDefault()
    setisLoading(true)
    try {
      const resumeText = await pdfToText(resume)

      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      console.log("data", data)
      setTitle('')
      setResume(null)
      setUploadresume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)



    } finally {

      setisLoading(false)
    }
  }

  const EditResume = async (e) => {
    try {
      e.preventDefault()



      const { data } = await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, { headers: { Authorization: `Bearer ${token}` } })


      setallResumes(allresumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
      setTitle("")
      setEditResumeId("")
      toast.success(data.message)

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)

    }


  }

  const DeleteResume = async () => {
    try {
      const { data } = await api.delete(
        `/api/resumes/delete/${deleteResumeId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setallResumes(prev =>
        prev.filter(resume => resume._id !== deleteResumeId)
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setShowDeleteModal(false);
      setDeleteResumeId(null);
    }
  };


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadallResumes()
  }, [])
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-600 bg-clip-text text-transparent sm:hidden'>
          Welcome John Doe
        </p>
        <div className='flex gap-4'>
          <button onClick={() => setCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <Plus className='size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-green-300 to-green-500 text-white rounded-full' />
            <p className='text-sm group hover:text-green-600 transition-all duration-300'>Create Resume</p>
          </button>
          <button onClick={() => setUploadresume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full' />
            <p className='text-sm group-hover:text-purple-600 transition-all duration-300'>Upload Existing</p>
          </button>
        </div>

        <hr className='border-slate-300 my-6 sm:w-76.25' />
        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
          {allresumes.map((resume, index) => {
            const baseColor = color[index % color.length];
            return (
              <button onClick={() => navigate(`/app/builder/${resume._id}`)} key={index} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer' style={{ background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`, borderColor: baseColor + '40' }}>
                <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' style={{ color: baseColor }} />
                <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{ color: baseColor }}>{resume.title}</p>
                <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{ color: baseColor + '90' }}>Update On {new Date(resume.updatedAt).toLocaleDateString()}</p>
                <div onClick={e => e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                  <TrashIcon className='size-7 p-1.5  rounded text-slate-700 transition-colors hover:text-red-800 text-red-500' 
                    onClick={() => {
                      setDeleteResumeId(resume._id);
                      setShowDeleteModal(true);
                    }}
                  />

                  <PencilIcon onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className='size-7 p-1.5 hover:text-slate-900 rounded text-slate-700 transition-colors' />
                </div>

              </button>
            )

          })}

        </div>

        {CreateResume && (
          <form onSubmit={Createresume} onClick={() => setCreateResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur  bg-opacity-50 z-10 flex items-center justify-center">
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50    shadow-md rounded-lg w-full max-w-sm px-6 py-8'>

              <h2 className="text-xl font-bold mb-4">Create Resume</h2>

              <input id="text" onChange={(e) => setTitle(e.target.value)} value={title} className="w-full px-4 py-2 mb-4 border border-gray-500 ring-green-400 focus:outline-none" type="text" placeholder="Enter resume title" required />

              <button type="submit" className="w-full py-2 bg-green-600 cursor-pointer text-white rounded hover:bg-green-700 transition-colors">Create Resume</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:slate-600 cursor-pointer transition-colors' onClick={() => { setCreateResume(false); setTitle('') }} />
            </div>
          </form>
        )}

        {uploadresume && (
          <form onSubmit={UploadResume} onClick={() => setUploadresume(false)} className="fixed inset-0 bg-black/70 backdrop-blur  bg-opacity-50 z-10 flex items-center justify-center">
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50    shadow-md rounded-lg w-full max-w-sm px-6 py-8'>

              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

              <input id="text" onChange={(e) => setTitle(e.target.value)} value={title} className="w-full px-4 py-2 mb-4 border border-gray-500 ring-green-400 focus:outline-none" type="text" placeholder="Enter resume title" required />
              <div>
                <label htmlFor="resume-input" className="block text-sm text-slate-700">
                  Select resume file
                  <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'>
                    {resume ? (
                      <p className='text-green-700'>{resume.name}</p>
                    ) : (<>
                      <UploadCloud className='size-14 stroke-1' />
                      <p>Upload Resume</p>
                    </>)}

                  </div>
                </label>
                <input type="file" id='resume-input' accept='.pdf' onChange={(e) => setResume(e.target.files[0])} hidden />

              </div>

              <button disabled={isLoading} type="submit" className="w-full items-center justify-center flex gap-2 py-2 bg-green-600 cursor-pointer text-white rounded hover:bg-green-700 transition-colors">{isLoading && <LoaderCircleIcon className="animate-spin size-4 text-white" />}{isLoading ? "Uploading..." : "Upload Resume"}</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:slate-600 cursor-pointer transition-colors' onClick={() => { setUploadresume(false); setTitle('') }} />
            </div>
          </form>

        )}


        {editResumeId && (
          <form onSubmit={EditResume} onClick={() => setEditResumeId('')} className="fixed inset-0 bg-black/70 backdrop-blur  bg-opacity-50 z-10 flex items-center justify-center">
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50    shadow-md rounded-lg w-full max-w-sm px-6 py-8'>

              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>

              <input id="text" onChange={(e) => setTitle(e.target.value)} value={title} className="w-full px-4 py-2 mb-4 border border-gray-500 ring-green-400 focus:outline-none" type="text" placeholder="Enter resume title" required />

              <button type="submit" className="w-full py-2 bg-green-600 cursor-pointer text-white rounded hover:bg-green-700 transition-colors">Update Resume</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:slate-600 cursor-pointer transition-colors' onClick={() => { setEditResumeId(''); setTitle('') }} />
            </div>
          </form>
        )}

        {showDeleteModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={() => setShowDeleteModal(false)}
    />

    <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-2">
        Delete Resume?
      </h3>

      <p className="text-sm text-gray-500 mb-6">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-4 py-2 border cursor-pointer rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={DeleteResume}
          className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}


      </div>
    </div>
  )
}

export default Dashboard