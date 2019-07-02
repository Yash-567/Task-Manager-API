const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
//const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1:27017' // 127.0.0.1 is localhost
//const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error, client)=>{
    if(error){
        return console.log('Could not connect to server')
    }
    // const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'Yash Sonar',
    //     age: '18'
    // },(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('tasks').insertMany([
    //     {
    //         name: 'Yash Sonar',
    //         age: 18,
    //         description: 'hello this is entry 1',
    //         completed: true
    //     },
    //     {
    //         name: 'Jen',
    //         age: 30,
    //         completed: false
    //     },
    //     {
    //         name: 'Gunther',
    //         age: 50,
    //         completed: false
    //     }],(error,result)=>{
    //         if(error){
    //             return console.log('Unable to insert users')
    //         }
    //         console.log(result.ops)
    //     })
    // db.collection('tasks').findOne({_id: new ObjectID("5d0a500bb149c026fc6912a6")},(error,result)=>{
    //     console.log(result)
    // })
    // db.collection('tasks').find({completed: false}).toArray((error,users)=>{
    //     console.log(users)
    // })
    // db.collection('users').updateMany({
    //     completed: false
    // },{
    //     $set:{
    //         completed: true
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
})
