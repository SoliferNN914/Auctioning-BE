
const mcrAuctionEnd = new Date().setHours(new Date().getHours() + 386)
const brumAuctionEnd = new Date().setHours(new Date().getHours() + 359)
const activeAuctionStart = new Date().setMinutes(new Date().getMinutes() - 1)
const recentAuctionStart = new Date().setHours(new Date().getHours() - 2)
const recentAuctionEnd = new Date().setHours(new Date().getHours() - 1)
// mcr past
const mcrPastStart = new Date().setHours(new Date().getHours() - 8)
const mcrPastEnd = new Date().setHours(new Date().getHours() - 9)
//brum past
const brumPastStart = new Date().setHours(new Date().getHours() - 21)
const brumPastEnd = new Date().setHours(new Date().getHours() - 22)


module.exports = [
  
// 5 brum closed
{
  event_id: 10,
  seat_selection: '{E1,E2}',
  current_bid: 4,
  time_started: `${recentAuctionStart}`,
  time_ending: `${recentAuctionEnd}`,
  current_highest_bidder: 8,
  users_involved: '{3, 4}',
  active: false,
  bid_counter: 3,
},
{
  event_id: 7,
  seat_selection: '{A2,A3}',
  current_bid: 4,
  time_started: `${brumPastStart}`,
  time_ending: `${brumPastEnd}`,
  current_highest_bidder: 6,
  users_involved: '{1, 2, 3}',
  active: false,
  bid_counter: 3,
},
{
  event_id: 7,
  seat_selection: '{B3,B4}',
  current_bid: 5,
  time_started: `${brumPastStart}`,
  time_ending: `${brumPastEnd}`,
  current_highest_bidder: 9,
  users_involved: '{1, 4}',
  active: false,
  bid_counter: 3,
},
{
  event_id: 7,
  seat_selection: '{C4,C5}',
  current_bid: 4.5,
  time_started: `${brumPastStart}`,
  time_ending: `${brumPastEnd}`,
  current_highest_bidder: 7,
  users_involved: '{1, 2}',
  active: false,
  bid_counter: 3,
},

//2 open brum
{
  event_id: 10,
  seat_selection: '{B1,B2}',
  current_bid: 5,
  time_started: `${activeAuctionStart}`,
  time_ending: `${brumAuctionEnd}`,
  current_highest_bidder: 7,
  users_involved: '{1, 2}',
  active: true,
  bid_counter: 4,
},
{
  event_id: 10,
  seat_selection: '{D1,D2}',
  current_bid: 4.5,
  time_started: `${activeAuctionStart}`,
  time_ending: `${brumAuctionEnd}`,
  current_highest_bidder: 9,
  users_involved: '{4, 5}',
  active: true,
  bid_counter: 4,
},
// 4 manc closed - make sure one user has a few 
{
  event_id: 17,
  seat_selection: '{E1,E2}',
  current_bid: 4,
  time_started: `${recentAuctionStart}`,
  time_ending: `${recentAuctionEnd}`,
  current_highest_bidder: 8,
  users_involved: '{8, 9}',
  active: false,
  bid_counter: 3,
},
{
  event_id: 15,
  seat_selection: '{A1,A2}',
  current_bid: 4,
  time_started: `${mcrPastStart}`,
  time_ending: `${mcrPastEnd}`,
  current_highest_bidder: 6,
  users_involved: '{6, 7, 8}',
  active: false,
  bid_counter: 3,
},
{
  event_id: 15,
  seat_selection: '{B3,B4}',
  current_bid: 5,
  time_started: `${mcrPastStart}`,
  time_ending: `${mcrPastEnd}`,
  current_highest_bidder: 9,
  users_involved: '{6, 9}',
  active: false,
  bid_counter: 3,
},
{
  event_id: 15,
  seat_selection: '{C5,C6}',
  current_bid: 4.5,
  time_started: `${mcrPastStart}`,
  time_ending: `${mcrPastEnd}`,
  current_highest_bidder: 7,
  users_involved: '{6, 7}',
  active: false,
  bid_counter: 3,
},

//2 open manc (check time in future) - probably keep same user as above involved for easy testing
{
  event_id: 17,
  seat_selection: '{B1,B2}',
  current_bid: 5,
  time_started: `${activeAuctionStart}`,
  time_ending: `${mcrAuctionEnd}`,
  current_highest_bidder: 7,
  users_involved: '{6, 7}',
  active: true,
  bid_counter: 4,
},
{
  event_id: 17,
  seat_selection: '{C1,C2}',
  current_bid: 4.5,
  time_started: `${activeAuctionStart}`,
  time_ending: `${mcrAuctionEnd}`,
  current_highest_bidder: 9,
  users_involved: '{9, 10}',
  active: true,
  bid_counter: 4,
},
]
