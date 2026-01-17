import { BookOpenIcon, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const ProjectForm = ({data, onChange}) => {
    const AddProject = () => {
        const newProject = {
            name:"",
            type:"",
            description:""


        }
        onChange([...data, newProject])
    }


    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index)
        onChange(updated)

    }


    const updateProject = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)

    }
  return (
    <div>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Project</h3>
                    <p className='text-sm text-gray-500'>Add your Project</p>
                </div>
                <button onClick={AddProject} className='flex cursor-pointer items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
                    <Plus size={14} /> Add Project
                </button>
            </div>

            {data.length === 0 ? (
                <div className='text-gray-500 text-center py-8'>
                    <BookOpenIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No Project added here</p>
                    <p className='text-sm'>Click "Add Project" to get started.</p>
                </div>
            ) : (
                <div className='space-y-4 mt-6'>
                    {data.map((project, index) => (
                        <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                            <div className='flex justify-between items-start'>
                                <h4>Project #{index + 1}</h4>
                                <button onClick={() => removeProject(index)} className='text-red-500 cursor-pointer hover:text-red-700 transition-colors'>
                                    <Trash2 className='size-4' />
                                </button>

                            </div>
                            <div className='grid md:grid-cols-2 gap-3'>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-medium text-gray-600">
                                        Project Name
                                    </label>
                                    <input
                                        value={project.name || ""}
                                        onChange={(e) => updateProject(index, "name", e.target.value)}
                                        type="text"
                                        placeholder="Project Name"
                                        className="px-3 py-2 border border-gray-400 text-sm rounded-lg focus:ring focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                    {/* degree */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-medium text-gray-600">
                                            Project Type
                                        </label>
                                        <input
                                            value={project.type || ""}
                                            onChange={(e) => updateProject(index, "type", e.target.value)}
                                            type="text"
                                            placeholder="Project Type"
                                            className="px-3 py-2 text-sm border border-gray-400 rounded-lg  focus:ring focus:ring-blue-500 outline-none"
                                        />
                                    </div>

                                    {/* Field of Study */}
                                     <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-xs font-medium text-gray-600">
            Project Description
        </label>
        <textarea
            rows={4}
            value={project.description || ""}
            onChange={(e) => updateProject(index, "description", e.target.value)}
            placeholder="Describe your project"
            className="w-full px-3 py-2 text-sm border border-gray-400 rounded-lg resize-none min-h-[120px] focus:ring focus:ring-blue-500 outline-none"
        />
    </div>

                                    
                                    
                                </div>








                                        </div>
                                    
                                ))}
                            </div>
                        )}
                    </div>
  )
}

export default ProjectForm