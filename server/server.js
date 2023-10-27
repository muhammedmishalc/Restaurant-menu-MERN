const express = require('express')
const mongoose = require('mongoose')
const registerrouter = require('./src/router/registerrouter')
const bodyParser = require('body-parser')
const loginrouter = require('./src/router/loginrouter')
const productrouter = require('./src/router/productrouter')

const app = express()

app.use(bodyParser())
app.use(express.urlencoded({ extented: false }))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/reg', registerrouter)
app.use('/log', loginrouter)
app. use('/product', productrouter)

const url = 'mongodb+srv://mishalc5678:mishalc5678@cluster0.tgwxmvg.mongodb.net/Restaurant?retryWrites=true&w=majority'
mongoose.connect(url).then(() => {
    app.listen(2500, () => {
        console.log('Server started')
    })

}).catch((error) => {
    console.log(error);
}
)

