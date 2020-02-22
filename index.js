const express = require('express')
const app = express();
const port = 80
// const history = require('connect-history-api-fallback');
const summarizer = require('./summarizer')
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.post('/', (req,res)=>{
    var data = new summarizer(req.body.text)
    res.json(data)
})

// app.use(history({ verbose: false }))
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})