const Joi = require('joi');
const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());


const passport = require('passport');
const LocalStrategy =require('passport-local').Strategy;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "temp_schema"
  });
  
con.connect((err) => {
if (err) throw err;
console.log("Connected!");

const sql2 = "SELECT * FROM users";
const sql1 = "INSERT INTO users (name, password) VALUES ('hammam', 'hammamnajem123321')";
con.query(sql2, (err, result) =>{
    if (err) throw err;
    console.log(result);
  });
});

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
];

app.get('/', (req, res) =>{
    res.send('Holow world??');

});

app.get('/api/courses', (req, res) =>{
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('the course with the given id does not exist!');//404: dosn't exist
    res.send(course);
});

app.post('/api/courses', (req, res) =>{
    
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        
    const course = {
      id: courses.length +1,
      name: req.body.name,  
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) =>{

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('the course with the given id does not exist!');//404: dosn't exist

    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);


});

app.delete('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id=== parseInt(req.params.id));
    if(!course) return res.status(404).send('the course with a given id is not found');

    const index = courses.indexOf(course);
    res.send(courses.splice(index, 1));
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });
    return schema.validate(course);
}

const port = process.env.PORT || 3000 ;
app.listen(port, () => console.log(`listing on port ${port}...`));
// 
// app.post();
// app.put();
// app.delete();   