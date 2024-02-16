const { getUsers, patchUsers, getUsersById, patchBidding, getBidding } = require('./controllers/test-data-controllers')


const express = require("express")
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());


app.get("/api/users", getUsers)
app.get("/api/users/:user_id", getUsersById)
app.patch("/api/users/:user_id", patchUsers)
app.patch("/api/bidding/:item_id", patchBidding)
app.get("/api/bidding/:item_id", getBidding)


module.exports = app;