const express = require('express')
const mongoose = require('mongoose')
const studb = require('./database')
const cors = require('cors')
const app = express()
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/sbases").then(() => {
    console.log("Database Created");
}).catch(err => console.log(err))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2002');
    next();
});
app.use(cors())
app.get('/getDetails', async (req, res) => {
    try {

        const students = await studb.find()
        res.send(students)
    } catch (err) { console.log(err) }

})
app.post("/addDetails", async (req, res) => {
    const { name, rollno, year, branch, phno } = req.body
    console.log(name, rollno, year, branch, phno)
    const db = studb({
        name, rollno, year, branch, phno
    })
    await db.save()
    res.setHeader('Content-Type', 'application/json');

    res.send("Data Recevied").status(200)
})
app.patch("/updateuser/:id", async (req, res) => {
    let updateid = req.params.id;
    const { name, rollno, year, branch, phno } = req.body
    const update = { name, rollno, year, branch, phno }
    studb.findByIdAndUpdate(updateid, update).then(() => {
        res.send("updated Succesffuly")
    }).catch(err => { console.log(err) })

})
app.delete("/deleteuser/:id", (req, res) => {
    let userid = req.params.id
    studb.findByIdAndDelete(userid).then(() => res.send("Data Deleted"))
        .catch(err => { res.send(err) })
})
app.listen(2002, () => {
    console.log("Server Created");
})