const d = new Date()
const auctionStart1 = d.setMinutes(d.getMinutes())
const auctionStart2 = d.setMinutes(d.getMinutes() - 40)
const auctionStart3 = d.setMinutes(d.getMinutes() + 40)

const auctionEnd1 = d.setMinutes(d.getMinutes() + 20)
const auctionEnd2 = d.setMinutes(d.getMinutes() - 20)
const auctionEnd3 = d.setMinutes(d.getMinutes() + 60)

//auction1 active now
//auction2 ended
//auction3 active in future

module.exports = [
  {
    event_id: 1,
    seat_selection: '{A1,A2}',
    current_bid: 5,
    time_started: `${auctionStart1}`,
    time_ending: `${auctionEnd1}`,
    current_highest_bidder: 2,
    users_involved: '{1, 2}',
    active: false,
    bid_counter: 3,
  },
  {
    event_id: 2,
    seat_selection: '{B3}',
    current_bid: 3.5,
    time_started: `${auctionStart2}`,
    time_ending: `${auctionEnd2}`,
    current_highest_bidder: 3,
    users_involved: '{3}',
    active: false,
    bid_counter: 1,
  },
  {
    event_id: 2,
    seat_selection: '{B4}',
    current_bid: 3.5,
    time_started: `${auctionStart2}`,
    time_ending: `${auctionEnd2}`,
    current_highest_bidder: 2,
    users_involved: '{1,2,4}',
    active: true,
    bid_counter: 5,
  },
  {
    event_id: 3,
    seat_selection: '{D3, D4, D5}',
    current_bid: 4,
    time_started: `${auctionStart3}`,
    time_ending: `${auctionEnd3}`,
    current_highest_bidder: 4,
    users_involved: '{4}',
    active: false,
    bid_counter: 1,
  },
]