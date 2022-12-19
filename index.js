const express = require('express')
const app = express()
const fs = require('fs')
const port = process.env.PORT || 4200
const greeting = process.env.GREETING || 'Server is up'

app.use(express.urlencoded({extended:false}))
app.use(express.json())

// localhost:port/
app.get('/',(req, res)=>{
    res.send(`<h2>Express demo: Good to have you</h2><div><a href="/adduser">Add a user</a></div>`)
})
// localhost:port/time
app.get('/time', (req, res)=>{
    const date = new Date()
    console.log(date)
    res.send(`<h2>Just a minute.</h2><div>The current time is: ${date}</div>`)
})
// localhost:port/file
app.get('/file',(req, res)=>{
    fs.readFile('./brownies.txt', 'utf-8', (err, data)=>{
        res.send(`<pre>${data}</pre>`)
    })
})
// localhost:port/adduser 
app.get('/adduser',(req, res)=>{
    fs.readFile('./index.html', 'utf-8', (err, data)=>{
        res.send(`${data}`)
    })
})greeting
// html form or Postname
app.post('/addUser',(req,res)=>{
    const email = req.body.email
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    console.log(`name: ${firstName} ${lastName}. email: ${email}`)
    res.send(`Hi ${firstName} ${lastName}. Your email is: ${email}`)
})

// Postman with an arry of json objects
// [{"firstName":"Lionel","lastName":"Messi","email":"forward@barcelona.edu"},
//  {"firstName":"Cristiano","lastName":"Ronaldo","email":"football@realmadrid.edu"}]
app.post('/addUsers',(req,res)=>{
    const data = req.body
    console.log(data)
    console.log(JSON.stringify(data))
    data.forEach(element => {
        const email = element.email
        const firstName = element.firstName
        const lastName = element.lastName
        console.log(`name: ${firstName} ${lastName}. email: ${email}`)
    });
    res.json(data)
})

app.listen(port, ()=>{
console.log(`${greeting}. Listening on port ${port}`);
})
