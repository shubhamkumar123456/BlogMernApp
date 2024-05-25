const express = require('express');
const app = express();
const port = 8080;
const dataBase = require('./db')
const cors = require('cors')
dataBase()


let userRoutes = require('./routes/user')
let postRoutes = require('./routes/post')

app.use(cors())
app.use(express.json({limit:"50mb"}))
app.get('/',(req,res)=>{
    res.send("welcome home")
})

app.use('/',userRoutes)
app.use('/post',postRoutes)






app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})