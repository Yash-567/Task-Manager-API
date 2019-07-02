const express = require('express')
const app = express()
require('./db/mongoose.js')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const port = process.env.PORT || 3000

// app.use((req,res,next)=>{
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled')
//     }else{
//         next()
//     }
// })
// app.use((req,res,next)=>{
//     res.status(503).send('Site is under maintenance')
//     next()
// })

app.use(express.json())//Parses json requests and populates an object body with the parsed data 
app.use(userRouter)
app.use(taskRouter)

app.listen(port,(req,res)=>{
    console.log("Server is up on port "+ port)
})
// const jwt = require('jsonwebtoken')

// const myFunction = async ()=>{
//     const token = jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'5 seconds'})
//     console.log(token)

//     const data = jwt.verify(token,'thisismynewcourse')
//     console.log(data)
// }
// myFunction()
const c = '5d1b62c19b460129b0864be9'
console.log(c.toString())