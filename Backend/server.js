const express = require('express')
const mongoose= require('mongoose')
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000

// Express App
const app = express()

//Imported Routes
const projectRoutes = require('./routes/projects')
const clientRoutes = require('./routes/client')
const userRoutes = require('./routes/user')
const archiveRoutes = require('./routes/archive')
const queueRoutes = require('./routes/queue')





//Middleware
app.use(express.json())
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


//GET ALL NEWS
app.get("/", (request, response) => {    
    response.send("API Home Page");

});

// Use Routes
app.use('/api/projects', projectRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/users', userRoutes)
app.use('/api/archives', archiveRoutes)
app.use('/api/queues', queueRoutes)

//Database connection
mongoose.connect(process.env.DATABASE_URI)
    .then(() =>{
        // Listen for Request
        app.listen(port, ()=> {
            console.log(`Backend Server running on port ${port}. Database Connection Established`)
        });
    })

    .catch((error) => {
        console.log(error)
    })


