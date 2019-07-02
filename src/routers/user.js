const express = require('express')
const User = require('../models/users')
const auth = require('../middleware/auth')
const router = new express.Router()
router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
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
        res.send(req.user)
    } catch(e){
        res.status(500).send(e)
    }
})

module.exports = router