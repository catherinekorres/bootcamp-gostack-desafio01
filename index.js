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

var counter = 0;

// Global middleware - Counts total requests in an app instance
server.use((req, res, next) => {
  console.time('Request');
  counter++;
  console.log(`Total de requisições: ${counter}`); 
  console.log(`Método ${req.method}; URL: ${req.url};`);
  
  next();

  console.timeEnd('Request');
});

// Middleware - Check if project exists using an id as a parameter
function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const index = projects.findIndex(item => item.id === id);

  if(index == -1){
    return res.status(400).json({ error: 'Project does not exist'});
  }

  return next();
}

// Read project(s)
server.get("/projects", (req, res) =>{
  return res.json(projects);
});

server.get("/projects/:id", checkProjectExists, (req, res) =>{
  const { id } = req.params;

  const index = projects.findIndex(item => item.id === id);

  return res.json(projects[index]);
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
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(item => item.id === id);

  projects[index].title = title;

  return res.json(projects);
});

// Delete project
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(item => item.id === id);

  projects.splice(index, 1);

  return res.send();
});

// Create task in project
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(item => item.id === id);

  projects[index].tasks.push(title);

  return res.json(projects);
});

server.listen(3333);