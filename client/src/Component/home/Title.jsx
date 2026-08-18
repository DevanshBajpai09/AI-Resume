import React from 'react'

const Title = ({ eyebrow, title, description }) => {
    return (
        <div className='max-w-xl text-[#171B24]'>
            {eyebrow && (
                <div className="ff-mono text-[11px] tracking-widest uppercase text-[#5B6070] flex items-center gap-2.5 mb-4">
                    <span className="w-3.5 h-px bg-[#C63B26] inline-block" />
                    {eyebrow}
                </div>
            )}
            <h2 className='ff-serif font-medium text-3xl sm:text-4xl'>{title}</h2>
            <p className='mt-3.5 text-[#5B6070] text-[15px] leading-relaxed'>{description}</p>
        </div>
    )
}

export default Title