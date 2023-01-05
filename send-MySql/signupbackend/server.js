const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')


const db = mysql.createPool({
    host: "localhost",
    database: "formdb",
    user: "root",
    password: "password",
    connectionLimit:10
});




app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))


app.post('/signup', (request, response) => {

    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const email = request.body.email;
    const personalNumber = request.body.personalNumber;
    const draftDate = request.body.draftDate;
    const rank = request.body.rank;

    const sqlInsert = "INSERT INTO filled (first_name, last_name, email, personal_num, draft_date,sol_rank) VALUES(?,?,?,?,?,?)"

    db.query(sqlInsert, [firstName, lastName, email, personalNumber, draftDate,rank], (err, result) => {
        if(err!=null) console.log(err)
    });
})

app.listen(4000, () => console.log("server is up and running"))