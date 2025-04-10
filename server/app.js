require('dotenv').config()
const  express = require('express')
const cookies = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')


const app = express()
const userRoute = require('./routes/user')
const expenseRoute = require('./routes/expense')


const PORT  = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookies());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//database
const MONGO_URL = process.env.MONGO_URL
mongoose.connect(MONGO_URL).then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));


app.get('/', (req, res) => {
   try{
    res.send('Hello World!')
   }
   catch(err)
   {
    console.log(err);
    res.status(500).send(err).json({error: err});
   }
});

app.use('/user', userRoute);
app.use('/expense', expenseRoute);

app.listen(PORT, () => {console.log(`Server is running at ${PORT}`);});