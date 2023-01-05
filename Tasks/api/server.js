const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routesUrls = require('./routes/routes')
const { route } = require('./routes/routes')
const dotenv = require('dotenv');
const app = express();


dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"));



app.use(express.json());
app.use(cors());
app.use('/', routesUrls)
app.listen(3001, () => console.log("server started on port 3001"));