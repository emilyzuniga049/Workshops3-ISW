const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Course = require('./models/course');
const Teacher = require('./models/teacher');


mongoose.connect('mongodb://127.0.0.1:27017/utnapi');
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});


const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors({
  domains: '*',
  methods: '*'
}));


//routes
app.post('/course', async (req, res) => {
    const course = new Course({
        name: req.body.name,
        credits: req.body.credits,
        teacherID: req.body.teacherID
    })

    try {
        const courseCreated = await course.save();
        //add header location to the response
        res.header('Location', `/course?id=${courseCreated._id}`);
        res.status(201).json(courseCreated)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

app.get('/course', async (req, res) => {
    try{
        if(!req.query.id){ 
            const data = await Course.find(); 
            return res.status(200).json(data)
        }
        const data = await Course.findById(req.query.id);
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.put('/course', async (req, res) => {

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true }
    )

    if (!updatedCourse) {
      return res.status(404)
    }

    res.json(updatedCourse)
  } catch (error) {
    res.status(500)
  }
})

app.delete('/course', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.query.id)

    if (!deletedCourse) {
      return res.status(404)
    }

    res.json(deletedCourse);
  } catch (error) {
    res.status(500)
  }
})

app.post('/teacher', async (req, res) => { 
  const teacher = new Teacher({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    idNumber: req.body.idNumber,
    age: req.body.age
  });

  try {
    const teacherCreated = await teacher.save();
    res.header('Location', `/teacher?id=${teacherCreated._id}`); 
    res.status(201).json(teacherCreated);
  } catch (error) {
    res.status(400);
  }
});

app.get('/teacher', async (req, res) => {
  try {
    if (!req.query.id) { //si no se pasa un id devuelve todos
      const data = await Teacher.find();
      return res.status(200).json(data);
    }
    const data = await Teacher.findById(req.query.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500);
  }
});


app.put('/teacher', async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404);
    }

    res.json(updatedTeacher);
  } catch (error) {
    res.status(500);
  }
});

app.delete('/teacher', async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.query.id);

    if (!deletedTeacher) {
      return res.status(404);
    }
    res.json(deletedTeacher);
  } catch (error) {
    res.status(500);
  }
});

//start the app
app.listen(3001, () => console.log(`UTN API service listening on port 3001!`))
