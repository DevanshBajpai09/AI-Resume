import Notification from "../models/NotificationModel.js"

export const getNotification = async(req,res)=>{
    try{
        const notification = await Notification.find({userId: req.userId}).sort({createdAt: -1}).limit(20)

        const unreadCount = await Notification.countDocuments({userId: req.userId, read: false})

        return res.status(200).json({notification, unreadCount})
    }catch(error){
        return res.status(400).json({message: error.message})
    }
}



export const markSingleNotificationRead = async (req, res) => {
  try {

    const { notificationId } = req.params

    await Notification.findByIdAndUpdate(
      notificationId,
      { read: true }
    )

    res.json({ success: true })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}