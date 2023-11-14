const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
//app.use(cors());

const corsOptions = {
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));
  app.use(bodyParser.json());

  

const mongouri = 'mongodb+srv://st124438:Japan01@cluster0.wwgr6yd.mongodb.net/task';

mongoose.connect(mongouri,{useNewUrlParser: true,useUnifiedTopology: true});

//Example route
// app.get('/api/task', (req, res) => {
//   // Implement your MongoDB query here
//   res.json({ message: 'Hello from the backend!' });
// });
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
  });
  
  // Define the Task model
  const Task = mongoose.model('Task', taskSchema);
  
  

app.get('/tasks', async (req, res) => {
    console.log('GET /tasks request received');

    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.post('/tasks', async (req, res) => {
    console.log('POST /tasks request received');

    try {
      // Create a new task using the Task model
      const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
      });
  
      // Save the new task to the database
      await newTask.save();
  
      // Send a response back to the client indicating success
      res.status(200).json({ message: 'Task added successfully' });
    } catch (error) {
      // Handle errors and send an error response to the client
      console.error('Error adding task:', error);
      res.status(500).json({ message: 'Error adding task' });
    }
  });
  
  
  app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
  
    try {
      await Task.findByIdAndDelete(taskId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT}`);
}

)