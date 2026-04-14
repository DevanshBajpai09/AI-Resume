import { X, Sparkles, AlertTriangle } from "lucide-react"
import { useEffect } from "react"

const ATSModal = ({ resume, onClose }) => {

const scoreColor =
resume.atsScore >= 80
? "text-green-600"
: resume.atsScore >= 60
? "text-orange-500"
: "text-red-500"

useEffect(() => {
document.body.style.overflow = "hidden"
return () => (document.body.style.overflow = "auto")
}, [])

return (

<div
className="
fixed inset-0
flex items-center justify-center
bg-black/40 backdrop-blur-sm
z-50
animate-[fadeIn_0.25s_ease]
"
>

{/* Modal */}

<div
className="
relative
bg-white
rounded-2xl
shadow-2xl
w-[540px]
max-h-[85vh]
overflow-y-auto
scrollbar-hide
p-7
animate-[scaleIn_0.25s_ease]
"
>

{/* Close Button */}

<button
onClick={onClose}
className="
absolute right-4 top-4
p-1 rounded-md
hover:bg-gray-100
transition
"
>
<X size={18}/>
</button>

{/* Header */}

<div className="flex items-center gap-2 mb-6">

<div className="
p-2 rounded-lg
bg-orange-100
">
<Sparkles className="w-5 h-5 text-orange-500"/>
</div>

<h2 className="text-lg font-semibold">
ATS Resume Analysis
</h2>

</div>

{/* Score Section */}

<div className="mb-8">

<div className="flex justify-between items-center">

<p className="text-sm text-gray-500">
ATS Score
</p>

<span className={`text-sm font-semibold ${scoreColor}`}>
{resume.atsScore >= 80
? "Excellent"
: resume.atsScore >= 60
? "Good"
: "Needs Improvement"}
</span>

</div>

<div className={`text-4xl font-bold mt-1 ${scoreColor}`}>
{resume.atsScore}%
</div>

{/* Score Bar */}

<div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden">

<div
className="
h-2 rounded-full
bg-gradient-to-r
from-orange-400
to-orange-600
transition-all duration-700
"
style={{width: `${resume.atsScore}%`}}
></div>

</div>

</div>

{/* Suggestions */}

<h3 className="font-semibold mb-3 flex items-center gap-2">

<AlertTriangle className="w-4 h-4 text-orange-500"/>

Suggestions to Improve

</h3>

<ul className="space-y-3 mb-7">

{resume.atsFeedback?.map((item,index)=>{

const cleanText = item.replace(/\*\*/g,"")

const isImportant =
cleanText.toLowerCase().includes("critical")

return (

<li
key={index}
className={`
p-3 rounded-lg text-sm
leading-relaxed
flex gap-3
transition
${isImportant
? "bg-red-50 border border-red-200 text-red-700"
: "bg-orange-50 border border-orange-100 text-gray-700"}
`}
>

<span
className={`font-bold mt-[2px]
${isImportant
? "text-red-500"
: "text-orange-500"}
`}
>
•
</span>

<span>
{cleanText}
</span>

</li>

)

})}

</ul>

{/* Missing Keywords */}

<h3 className="font-semibold mb-3">
Missing Keywords
</h3>

<div className="flex flex-wrap gap-2">

{resume.missingKeywords?.map((kw,i)=>(

<span
key={i}
className="
px-3 py-1
text-xs font-medium
bg-red-100
text-red-600
rounded-full
border border-red-200
"
>

{kw}

</span>

))}

</div>

</div>

</div>

)

}

export default ATSModal