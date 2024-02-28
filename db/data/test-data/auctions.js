const auctionStart1 = new Date().setMinutes(new Date().getMinutes())
const auctionStart2 = new Date().setMinutes(new Date().getMinutes() - 40)
const auctionStart3 = new Date().setMinutes(new Date().getMinutes() + 40)

const auctionEnd1 = new Date().setMinutes(new Date().getMinutes() + 20)
const auctionEnd2 = new Date().setMinutes(new Date().getMinutes() - 20)
const auctionEnd3 = new Date().setMinutes(new Date().getMinutes() + 60)

module.exports = [
  {
    event_id: 1,
    seat_selection: '{A1,A2}',
    current_bid: 5,
    time_started: new Date(auctionStart1),
    time_ending: new Date(auctionEnd1),
    current_highest_bidder: 2,
    users_involved: '{1, 2}',
    active: false,
    bid_counter: 3,
  },
  {
    event_id: 1,
    seat_selection: '{B1,B2}',
    current_bid: 5,
    time_started: new Date(auctionStart1),
    time_ending: new Date(auctionEnd1),
    current_highest_bidder: 3,
    users_involved: '{3, 2}',
    active: false,
    bid_counter: 3,
  },
  {
    event_id: 2,
    seat_selection: '{B3}',
    current_bid: 3.5,
    time_started: new Date(auctionStart2),
    time_ending: new Date(auctionEnd2),
    current_highest_bidder: 3,
    users_involved: '{3}',
    active: false,
    bid_counter: 1,
  },
  {
    event_id: 2,
    seat_selection: '{B4}',
    current_bid: 3.5,
    time_started: new Date(auctionStart2),
    time_ending: new Date(auctionEnd2),
    current_highest_bidder: 2,
    users_involved: '{1,2,4}',
    active: true,
    bid_counter: 5,
  },
  {
    event_id: 3,
    seat_selection: '{D3, D4, D5}',
    current_bid: 4,
    time_started: new Date(auctionStart3),
    time_ending: new Date(auctionEnd3),
    current_highest_bidder: 4,
    users_involved: '{4}',
    active: false,
    bid_counter: 1,
  },
]
