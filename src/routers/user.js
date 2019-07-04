const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeEmail,sendGoodByeEmail} = require('../emails/account')
const User = require('../models/users')
const auth = require('../middleware/auth')
const router = new express.Router()
router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})
router.post('/users/login', async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch(e){
        res.status(400).send()
    }
})
router.post('/users/logout', auth, async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})
router.post('/users/logoutAll',auth, async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})
router.get('/users/me', auth,async (req,res)=>{
    res.send(req.user)
})
router.patch('/users/me',auth,  async (req,res)=>{
    const updates = Object.keys(req.body)
    const validUpdates = ['name','email','password','age']
    const isValid = updates.every((update)=>validUpdates.includes(update))
    if(!isValid){
        return res.status(400).send({"error":"Invalid Updates"})
    }
    try{
        //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators: true})
        // const user = await User.findById(req.params.id)
        updates.forEach((update)=>req.user[update]=req.body[update])
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})
router.delete('/users/me',auth, async (req,res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.params.id)
        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        sendGoodByeEmail(req.user.email,req.user.name)
        res.send(req.user)
    } catch(e){
        res.status(500).send(e)
    }
})
const avatar = multer({
    limits:{
        fileSize: 10000000
    },
    fileFilter(req,file,cb){
        if (!file.originalname.match(/\.(jpg|jpeg|img|png)$/)){
            return cb(new Error ('Please upload an image'))
        }
        cb(undefined,true)
    }
})//in the bracket for single we have key name that will be used to send the req data from client side
router.post('/users/me/avatar',auth, avatar.single('avatar'),async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:2500,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar = undefined 
    await req.user.save()
    res.send()
})
router.get('/users/:id/avatar',async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send(e)
    }
})

module.exports = router