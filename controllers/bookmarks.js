
const Bookmarks = require("../models/bookmarks")
const getall=async(req,res)=>{
  try {
    const allBookmarks = await Bookmarks.find({})
    res.status(200).json(allBookmarks)
  } catch (error) {
    res.status(500).json(error)
  }  
}
const create= async(req,res)=>{
    try {
        const  bookmark= await Bookmarks.create(req.body)
        res.status(201).send()
    } catch (error) {
        res.status(400).json(error)
    }
}
const deleteBookmark = async(req,res)=>{
    try {
        const deleted = await Bookmarks.deleteOne({_id: req.body._id})
        if (deleted.deletedCount <1) {
            res.status(404).json(deleted)
        }
        res.status(200).json(deleted)
    } catch (error) {
        res.status(400).json(error)
    }
}
const update = async(req,res)=>{
    try {
        const update = await Bookmarks.updateOne({_id: req.body._id},req.body)
if (update.matchedCount <1) {
    res.status(404).json(update)
}
res.status(200).json(update)
    } catch (error) {
        res.status(400).json(error)
        
    }
}
module.exports = {create,getall,update,deleteBookmark}
