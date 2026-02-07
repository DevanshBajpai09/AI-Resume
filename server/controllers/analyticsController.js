import Resume from "../models/ResumeModel.js"

export const getAnalytics = async (req, res) => {
  try {
    const userId = req.userId

    // 🔹 Get all resumes of this user
    const resumes = await Resume.find({ userId })

    if (!resumes.length) {
      return res.status(404).json({ message: "No resumes found" })
    }

    // 🔹 Merge all analytics + views
    let totalViews = 0
    let allAnalytics = []

    resumes.forEach(resume => {
      totalViews += resume.views || 0
      if (resume.analytics?.length) {
        allAnalytics.push(...resume.analytics)
      }
    })

    // 🔹 Sort analytics by date
    allAnalytics.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

    // 🔹 Unique countries
    const uniqueCountries = new Set(
      allAnalytics.map(a => a.country).filter(Boolean)
    ).size

    // 🔹 Last viewed
    const lastViewed =
      allAnalytics.length > 0
        ? allAnalytics[allAnalytics.length - 1].createdAt
        : null

    // 🔹 Views per day
    let viewsPerDay = 0

    if (allAnalytics.length > 0 && lastViewed) {
      const firstDate = new Date(allAnalytics[0].createdAt)
      const lastDate = new Date(lastViewed)

      const diffDays = Math.max(
        1,
        Math.ceil((lastDate - firstDate) / (1000 * 60 * 60 * 24))
      )

      viewsPerDay = Number((totalViews / diffDays).toFixed(1))
    }

    // 🔹 Timeline aggregation
    const timelineMap = {}

    allAnalytics.forEach(a => {
      const date = new Date(a.createdAt).toISOString().split("T")[0]
      timelineMap[date] = (timelineMap[date] || 0) + 1
    })

    const viewsTimeline = Object.keys(timelineMap)
      .sort()
      .map(date => ({
        date,
        count: timelineMap[date],
      }))

    // 🔹 Country distribution
    const countryMap = {}

    allAnalytics.forEach(a => {
      const country = a.country || "Unknown"
      countryMap[country] = (countryMap[country] || 0) + 1
    })

    const countryDistribution = Object.keys(countryMap).map(country => ({
      country,
      count: countryMap[country],
    }))

    return res.status(200).json({
      totalViews,
      uniqueCountries,
      lastViewed,
      viewsPerDay,
      viewsTimeline,
      countryDistribution,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
