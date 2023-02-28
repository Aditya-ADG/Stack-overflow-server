import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'

import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'



const app = express();
dotenv.config();



app.use(express.json({limit: "30mb", extend: "true"}))
app.use(express.urlencoded({limit: "30mb", extend: "true"}))
app.use(cors())

app.get('/', (req, res) => {
    res.send("This is a stack overflow clone API")
})

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)

const PORT = process.env.PORT || 5000

// const CONNECTION_URL = "mongodb+srv://A-D-G:Aditya-230898@stack-overflow-clone.vfx9bsa.mongodb.net/?retryWrites=true&w=majority"
const DATABASE_URL = process.env.CONNECTION_URL
mongoose.set('strictQuery',false)
// @ts-ignore

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
    .catch((err) => console.log(err.message))

