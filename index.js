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

// Update project
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(item => item.id === id);

  projects[index].title = title;

  return res.json(projects);
});

// Delete project
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(item => item.id === id);

  projects.splice(index, 1);

  return res.send();
});

// Create task in project
server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(item => item.id === id);

  projects[index].tasks.push(title);

  return res.json(projects);
});

server.listen(3333);