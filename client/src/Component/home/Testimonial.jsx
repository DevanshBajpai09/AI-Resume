import React from 'react'
import Title from './Title'
import { BookUser } from 'lucide-react'
import TestimonialHover from './TestimonialHover'

const Testimonial = () => {
    return (
        <div id='testimonials' className='flex flex-col items-center my-8 scroll-mt-12'>
            <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 border border-green-200 rounded-full px-6 py-1.5">
                <BookUser height={14} />
                <span>Testimonials</span>
            </div>
            <Title title="Don't just take our words" description="Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review." />

            <div>
                <TestimonialHover/>
            </div>
        </div>
    )
}

export default Testimonial