const { getEndpoints } = require('./controllers/api.controllers')
const {
  getAllBusinesses,
  getBusinessById,
  postBusiness,
} = require('./controllers/businesses.controllers')

const {
  getAuctionsByEventId,
  getAuctionsByUserInvolved,
  patchAuctionsById,
  getAuctionsWonByUserId,
  postAuction,
  getAuctionByAuctionId,
} = require('./controllers/auctions.controllers')



const {
  getAllUsers,
  getUserById,
  editUserById,
  postNewUser,
  patchUserBiddingStatus,
} = require('./controllers/users.controllers')

const {
  patchSeatingById,
  getEventById,
  getEventsByBusinessId,
  getEventsByUserId,
  postEvent,
} = require('./controllers/events.controllers')

const express = require('express')

const app = express()
const cors = require('cors')


/////websocket stuff
const { createServer } = require('node:http');
const server = createServer(app);

const { join } = require('node:path');

const { Server } = require('socket.io');

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


const io = new Server(server);
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});


/////////////////
app.use(cors())
app.use(express.json())

app.get('/api/', getEndpoints)

app.get('/api/businesses', getAllBusinesses)
app.get('/api/businesses/:business_id', getBusinessById)
app.post('/api/businesses', postBusiness)

app.get('/api/users', getAllUsers)
app.get('/api/users/:user_id', getUserById)
app.patch('/api/users/:user_id', editUserById)
app.post('/api/users', postNewUser)
app.patch('/api/users/:user_id/bidding', patchUserBiddingStatus)

app.get('/api/auctions/event/:event_id', getAuctionsByEventId)
app.get('/api/auctions/user/:user_id', getAuctionsByUserInvolved)
app.patch('/api/auctions/:auction_id', patchAuctionsById)
app.get('/api/auctions/won/:user_id', getAuctionsWonByUserId)
app.post('/api/auctions/', postAuction)
app.get('/api/auctions/:auction_id', getAuctionByAuctionId)

app.patch('/api/events/seating/:event_id', patchSeatingById)
app.get('/api/events/business/:business_id', getEventsByBusinessId)
app.get('/api/events/near/:user_id', getEventsByUserId)
app.post('/api/events', postEvent)
app.get('/api/events/:event_id', getEventById)

app.all('*', (req, res, next) => {
  res.status(404).send({ msg: 'Invalid path' })
})

app.all('*', (req, res, next) => {
  res.status(404).send({ msg: 'Invalid path' })
})

app.use((err, req, res, next) => {
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg })
  } else {
    next(err)
  }
})

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: err.msg })
  } else {
    next(err)
  }
})

app.use((err, req, res, next) => {
  if (err.code === '22P02' || '23503' || '23502') {
    res.status(400).send({ msg: 'Bad request' })
  }
})

// app.use((err, req, res, next) => {
//   if(err.code === '23505'){
//       res.status(400).send(({msg: err.detail}))
//   } else {
//       next (err)
//   }
// })

module.exports = app
