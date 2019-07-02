require('../src/db/mongoose')
const Task = require('../src/models/tasks')
// Task.findByIdAndDelete('5d0b715974885d095414bed3').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })
const DeleteAndCount = async (id)=>{
    const task = await Task.findByIdAndDelete({_id: id})
    const count = await Task.countDocuments({completed: false})
    return count
}
DeleteAndCount('5d0b75a0b7b79e468ca4e3e2').then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})