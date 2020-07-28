const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(passport.initialize())
require('./passport')(passport)

app.use('/api/users', require('./routers/userRoute'));
app.use('/api/transactions', require('./routers/transactionRoute'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.get('/', (req, res)=>{
    res.json({
        message: "welcome to our desni world"
    })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
    mongoose.connect(
      `mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}>@simon-syoxf.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log("database connected");
      }
    );
})