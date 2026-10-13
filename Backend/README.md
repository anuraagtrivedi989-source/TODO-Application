# Backend of Todo 


# importtant commands used

  npm init - to initalize the backend 
  npm i express  - to create the backend server
  npm i nodemon- to create the live  development environment
  npm install cors -  for the connection of backend to frontend
  npm i mongoose - to create the database


 `folder structure`-|
                    |--Backend-|-models
                               |routes
                               |-.env
                               |-dbConnection.js
                               |-server.js 

# methods used 
 `post` - to adding a new task                                
 `get` - to get all tasks and to get a task by id
 `put` - to update the task details 
 `delete` - to delete the created tasks

# routes used
  `router.post(/add)` - to add a task
  `router.get(/task)` - to get all the task
  `router.get(/:id)` - to search a particular task
  `router.put(/:id)` - to update a particular task
  `router.delete(/:id)`- to delete the task 

# flow of the backend 
 backend -- request ----->database 


