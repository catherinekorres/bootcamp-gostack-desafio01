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

server.listen(3333);