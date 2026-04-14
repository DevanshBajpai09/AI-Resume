import ai from '../config/ai.js'

const analyzeResumeATS = async (resume) => {

 const resumeText = `
Name: ${resume.personal_info?.full_name}
Profession: ${resume.personal_info?.profession}
Location: ${resume.personal_info?.location}

Summary:
${resume.professional_summary}

Skills:
${resume.skills?.join(", ")}

Experience:
${resume.experience?.map(e =>
`Company: ${e.company}
Role: ${e.position}
Duration: ${e.start_date} - ${e.end_date}
Description: ${e.description}`
).join("\n\n")}

Projects:
${resume.projects?.map(p =>
`Project: ${p.name}
Type: ${p.type}
Description: ${p.description}`
).join("\n\n")}

Education:
${resume.education?.map(e =>
`${e.degree} in ${e.field}
${e.institution}
Graduated: ${e.graduation_date}`
).join("\n\n")}
`

  const prompt = `
You are a professional ATS (Applicant Tracking System) used by large tech companies.

Analyze the resume carefully like a recruiter and ATS system.

Evaluate the resume based on:

1. Keyword optimization
2. Experience impact
3. Technical skill relevance
4. Project quality
5. Resume structure
6. Achievements and measurable results
7. Education relevance
8. ATS compatibility

Return ONLY JSON with this structure:

{
 "score": number (0-100),
 "strengths": [string],
 "suggestions": [string],
 "missing_keywords": [string],
 "section_scores": {
    "skills": number,
    "experience": number,
    "projects": number,
    "education": number,
    "summary": number
 }
}

Rules:
- Suggestions must be specific and actionable
- Mention exact improvements
- Avoid generic advice
- Focus on tech industry resumes
- Assume candidate is applying for software engineering roles

Resume:
${resumeText}
`

  try {

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: "You are an ATS resume analyzer." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2
    })

    const text = response.choices[0].message.content

    console.log("AI RESPONSE:", text)   // 🔥 IMPORTANT DEBUG

    // extract JSON safely
    const jsonMatch = text.match(/\{[\s\S]*\}/)

    if (!jsonMatch) {
      throw new Error("Invalid AI JSON response")
    }

    const result = JSON.parse(jsonMatch[0])

    return result

  } catch (error) {

    console.log("ATS ERROR:", error.message)

    return {
      score: 0,
      suggestions: ["AI analysis failed"],
      missing_keywords: []
    }

  }

}

export default analyzeResumeATS