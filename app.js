const { getUsers, postUsers } = require('./controllers/test-data-controllers')


const express = require("express")
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());


app.get("/api/users", getUsers)
app.post("/api/users", postUsers)


module.exports = app;