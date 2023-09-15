import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'

import {bookRouter} from './routes/booksRoute.js'
import {MONGO_DB_URL, PORT} from "./config.js";

const app = express();

app.use(express.json());
app.use('/books', bookRouter);
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type']
}))

app.get('/', (request, response) => {
    return response.status(200).send('Welcome to The MERN stact book store project')
});


mongoose.connect(MONGO_DB_URL).then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
        console.log('app is running at ', PORT)
    });
}).catch(error => {
    console.log('Database connection error', error)
})