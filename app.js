require("dotenv").config();


const express = require("express");

const { hashPassword, verifyPassword, verifyToken } = require("./auth");

const app = express();

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};
app.use(express.json());

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

const userHandlers = require("./userHandlers");


const isItDwight = (req, res) => {
  if (req.body.email === "dwight@theoffice.com" && req.body.password === "123456") {
    res.send("Credentials are valid");
  } else {
    res.sendStatus(401);
  }
};




app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.use(verifyToken);
app.post("/api/movies", verifyToken, movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);


app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", verifyToken,hashPassword,userHandlers.postUser);
app.put("/api/users/:id", verifyToken, hashPassword, userHandlers.updateUser);
app.delete("/api/users/:id", verifyToken, userHandlers.deleteUser);
app.use(verifyToken);

app.post("/api/login",userHandlers.getUserByEmailWithPasswordAndPassToNext,verifyPassword);


movieHandlers
userHandlers

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});




