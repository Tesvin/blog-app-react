const express=require('express')
const app=express()
const dotenv=require('dotenv')
const cors = require('cors')
const multer = require('multer')
const path = require("path")
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')
const connect = require('./database/connect.js')
// const morgan = require('morgan')


//middlewares
dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

// app.use(cors());
// app.use(morgan('tiny'));
// app.disable('x-powered-by'); // less hackers know about our stack
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


const port = process.env.PORT

const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null, "images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null, "image1.jpeg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req, res) => {
    res.status(200).json("Image has been uploaded successfully")
})

connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`server connected to https://localhost:${port}`)
        }) 
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log('Invalid database connection...!')
})

