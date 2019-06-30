const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  {
    id: "1",
    title: "GoBarber Front-end",
    tasks: []
  }, 
  { 
    id: "2",
    title: "GoBarber Back-end",
    tasks: []
  },   
  {
    id: "3",
    title: "GoBarber App Mobile",
    tasks: []
  }
];

// Read projects
server.get("/projects", (req, res) =>{
  return res.json(projects);
});

// Create project
server.post("/projects", (req, res) =>{
  const project = {
    id: req.body.id,
    title: req.body.title,
    tasks: []
  }

  projects.push(project);

  return res.json(projects);
});

server.listen(3333);