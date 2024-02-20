const request = require('supertest')
const app = require('../app.js')
const allTestData = require('../db/data/test-data/index.js')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
const fs = require('fs/promises')
const d = new Date()
const filmStart1 = d.setHours(d.getHours() + 6)

beforeEach(() => seed(allTestData))
afterAll(() => db.end())

describe('*', () => {
  test('GET 404: responds with error when given invalid endpoint', () => {
    return request(app)
      .get('/fjdihdkfkhudz')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Invalid path')
      })
  })
})

// describe('GET/api', () => {
//   test('200: when calling the api as the endpoint, return an object containing all of the endpoint information for every endpoint tested in app.js', () => {
//     return fs.readFile('../endpoints.json', 'utf8').then((result) => {
//       return request(app)
//         .get('/api')
//         .expect(200)
//         .then((response) => {
//           expect(response.body.endpoints).toEqual(JSON.parse(result))
//         })
//     })
//   })
// })

describe('GET/api/businesses', () => {
  test('200: responds with all businesses with correct details', () => {
    return request(app)
      .get('/api/businesses')
      .expect(200)
      .then(({ body }) => {
        const { businesses } = body
        expect(businesses.length).toBe(3)
        businesses.forEach((business) => {
          expect(typeof business.business_id).toBe('number')
          expect(typeof business.business_name).toBe('string')
          expect(typeof business.postcode).toBe('string')
          expect(business).toHaveProperty('coords')
          expect(business).toHaveProperty('seating_layout')
        })
      })
  })
})

describe('GET/api/businesses/:business_id', () => {
  test('200: responds with all business information for the business with given id', () => {
    return request(app)
      .get('/api/businesses/1')
      .expect(200)
      .then(({ body }) => {
        const { business } = body
        const expectedBusiness = {
          business_id: 1,
          business_name: 'odeon',
          postcode: 'B16 8LP',
          coords: {
            x: -1.92048,
            y: 52.47399,
          },
          seating_layout: [
            ['A1', 'A2', 'A3', 'A4'],
            ['B1', 'B2', 'B3', 'B4'],
            ['C1', 'C2', 'C3', 'C4'],
            ['D1', 'D2', 'D3', 'D4'],
          ],
        }
        expect(business).toEqual(expectedBusiness)
      })
  })
  test('GET 404: responds with an error when given a valid but non-existent business_id', () => {
    return request(app)
      .get('/api/businesses/1111')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('ID not found')
      })
  })
  test('GET 400: responds with an error when given an invalid business_id', () => {
    return request(app)
      .get('/api/businesses/jdks')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request')
      })
  })
})

describe('GET/api/users', () => {
  test('200: responds with all users with correct details', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        const { users } = body
        expect(users.length).toBe(5)
        users.forEach((user) => {
          expect(typeof user.user_id).toBe('number')
          expect(typeof user.username).toBe('string')
          expect(typeof user.postcode).toBe('string')
          expect(user).toHaveProperty('coords')
          expect(user).toHaveProperty('currently_bidding')
          expect(user).toHaveProperty('device_token')
        })
      })
  })
})

describe('GET /api/auctions/:event_id', () => {
  test('200: responds with auction details by event_id', () => {
    return request(app)
      .get('/api/auctions/1')
      .expect(200)
      .then(({ body }) => {
        const { auction } = body
        expect(auction).toBeDefined()
        expect(auction).toHaveProperty('auction_id')
        expect(auction).toHaveProperty('event_id')
        expect(auction).toHaveProperty('seat_selection')
        expect(auction).toHaveProperty('current_price')
        expect(auction).toHaveProperty('time_started')
        expect(auction).toHaveProperty('time_ending')
        expect(auction).toHaveProperty('current_highest_bidder')
        expect(auction).toHaveProperty('users_involved')
        expect(auction).toHaveProperty('active')
        expect(auction).toHaveProperty('bid_counter')
      })
  })
  test('GET 404: responds with an error when given a valid but non-existent event_id', () => {
    return request(app)
      .get('/api/auctions/12345')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Auction does not exist')
      })
  })
  test('GET 400: responds with an 400 when given an invalid event_id', () => {
    return request(app)
      .get('/api/auctions/jdks')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request')
      })
  })
})

describe('PATCH /api/auctions/:event_id', () => {
  test('200: responds with updated auction details', () => {
    const updatedAuctionDetails = {
      seat_selection: ['A1', 'A2'], 
      users_involved: ['1', '2', '3', '4', '5']
    };
    return request(app)
      .patch('/api/auctions/1')
      .send(updatedAuctionDetails)
      .expect(200)
      .then(({ body }) => {
        const { auction } = body;

        expect(auction).toMatchObject({
          auction_id: 1,
          event_id: 1,
          seat_selection: [ 'A1', 'A2' ],
          current_price: "5",
          current_highest_bidder: 2,
          users_involved: [ 1, 2, 3, 4, 5 ],
          active: false,
          bid_counter: 3
        })
      });
  });
  test('404: responds with error when given a non-existent event_id', () => {
    return request(app)
      .patch(`/api/auctions/999`)
      .send({ seat_selection: ['A1', 'A2'] })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Auction not found');
      });
  });
  test('400: responds with error for invalid event_id', () => {
    return request(app)
      .patch(`/api/auctions/abc`)
      .send({ seat_selection: ['A1', 'A2'] })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request');
      });
  });
});

describe('GET/api/users/:user_id', () => {
  test('200: responds with all user information for the user with given id', () => {
    return request(app)
      .get('/api/users/1')
      .expect(200)
      .then(({ body }) => {
        const { user } = body
        const expectedUser = {
          user_id: 1,
          username: 'smink123',
          postcode: 'B47 5HQ',
          coords: {
            x: -1.88381,
            y: 52.38532,
          },
          currently_bidding: null,
          device_token: null,
        }
        expect(user).toEqual(expectedUser)
      })
  })
  test('GET 404: responds with an error when given a valid but non-existent user_id', () => {
    return request(app)
      .get('/api/users/1111')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('ID not found')
      })
  })
  test('GET 400: responds with an error when given an invalid user_id', () => {
    return request(app)
      .get('/api/users/jdks')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request')
      })
  })
})

describe('PATCH/events/seating/:event_id', () => {
  test('200: sends an object of the event with updated seating', () => {
    return request(app)
      .patch('/api/events/seating/1')
      .send({ seats_sold: ['C1', 'C2', 'C3', 'C4'] })
      .expect(200)
      .then(({ body }) => {
        const { event } = body
        expect(event).toMatchObject({
          event_id: 1,
          film_title: 'Bob Marley: One Love',
          poster:
            'https://m.media-amazon.com/images/M/MV5BZTRjYzlhNjQtOWZjOC00ZGQzLWEzZjAtMDZjZjBkODMwNWRiXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_SX300.jpg',
          certificate: '12',
          run_time: 104,
          // start_time: `1708376518593`,
          available_seats: ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'],
          active: true,
          start_price: '3',
          business_id: 1,
        })
      })
  })
  test('400: sends an appropriate error if id is invalid', () => {
    return request(app)
      .patch('/api/events/seating/hello')
      .send({ seats_sold: ['C1', 'C2', 'C3', 'C4'] })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request')
      })
  })
  test("404: sends an appropriate error if id is valid but doesn't exist", () => {
    return request(app)
      .patch('/api/events/seating/744859587')
      .send({ seats_sold: ['C1', 'C2', 'C3', 'C4'] })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Event not found.')
      })
  })
  test('400: sends an appropriate error if given seats are invalid (e.g. not an array) or missing', () => {
    return request(app)
      .patch('/api/events/seating/1')
      .send({ seats_sold: 'hello' })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request')
      })
  })
})

describe('/events/business/:business_id', () => {
  describe('GET', () => {
    test('200: sends an array of events objects associated with the given and with the correct properties', () => {
      return request(app)
        .get('/api/events/business/1')
        .expect(200)
        .then(({ body }) => {
          const { events } = body
          expect(Array.isArray(events)).toBe(true)
          events.forEach((event) => {
            expect(typeof event.event_id).toBe('number')
            expect(typeof event.film_title).toBe('string')
            expect(typeof event.poster).toBe('string')
            expect(typeof event.certificate).toBe('string')
            expect(typeof event.run_time).toBe('number')
            expect(Array.isArray(event.available_seats)).toBe(true)
            expect(typeof event.active).toBe('boolean')
            expect(typeof event.start_price).toBe('string')
            expect(typeof event.business_id).toBe('number')
          })
        })
    })
    describe('?active=true/false', () => {
      test('200: sends an array of only active events', () => {
        return request(app)
          .get('/api/events/business/1?active=true')
          .expect(200)
          .then(({ body }) => {
            const { events } = body
            events.forEach((event) => {
              expect(event.active).toBe(true)
            })
          })
      })
      test('200: sends an array of only inactive events', () => {
        return request(app)
          .get('/api/events/business/1?active=false')
          .expect(200)
          .then(({ body }) => {
            const { events } = body
            events.forEach((event) => {
              expect(event.active).toBe(false)
            })
          })
      })
      test('400: sends an appropriate error if active is invalid', () => {
        return request(app)
          .get('/api/events/business/1?active=hello')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid active query')
          })
      })
    })
  })
})

describe('/events/near/:user_id', () => {
  describe('GET', () => {
    test('200: sends an array of active events objects with the correct properties, sorted by distance from the given user, under 8 miles by default', () => {
      return request(app)
        .get('/api/events/near/1')
        .expect(200)
        .then(({ body }) => {
          const { events } = body
          expect(Array.isArray(events)).toBe(true)
          expect(events).toBeSortedBy('distance_in_miles')
          events.forEach((event) => {
            expect(event.distance_in_miles).toBeLessThan(8)
            expect(typeof event.event_id).toBe('number')
            expect(typeof event.film_title).toBe('string')
            expect(typeof event.poster).toBe('string')
            expect(typeof event.certificate).toBe('string')
            expect(typeof event.run_time).toBe('number')
            expect(Array.isArray(event.available_seats)).toBe(true)
            expect(event.active).toBe(true)
            expect(typeof event.start_price).toBe('string')
            expect(typeof event.business_id).toBe('number')
          })
        })
    })
    test('200: sends an empty array no events are in range', () => {
      return request(app)
        .get('/api/events/near/3')
        .expect(200)
        .then(({ body }) => {
          const { events } = body
          expect(Array.isArray(events)).toBe(true)
          expect(events.length).toBe(0)
        })
    })
    test('400: sends an appropriate error if id is invalid (i.e. a string)', () => {
      return request(app)
        .get('/api/events/near/hello')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request')
        })
    })
    test("404: sends an appropriate error if id is valid but doesn't exist", () => {
      return request(app)
        .get('/api/events/near/34234234')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('User not found.')
        })
    })
    describe('?distance=num', () => {
      test('200: sends an array of events within the given radius', () => {
        return request(app)
          .get('/api/events/near/1?distance=20')
          .expect(200)
          .then(({ body }) => {
            const { events } = body
            expect(events.length).toBe(4)
          })
      })
      test('400: sends an appropriate error if distance is invalid (not a number)', () => {
        return request(app)
          .get('/api/events/near/1?distance=hello')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid distance query')
          })
      })
    })
  })
})

describe('GET/events/:event_id', () => {
  test('200: responds with all event information for the event with given id', () => {
    return request(app)
      .get('/api/events/1')
      .expect(200)
      .then(({ body }) => {
        const { event } = body
        const expectedEvent = {
          event_id: 1,
          film_title: 'Bob Marley: One Love',
          poster:
            'https://m.media-amazon.com/images/M/MV5BZTRjYzlhNjQtOWZjOC00ZGQzLWEzZjAtMDZjZjBkODMwNWRiXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_SX300.jpg',
          certificate: '12',
          run_time: 104,
          available_seats: [
            'A1',
            'A2',
            'A3',
            'A4',
            'B1',
            'B2',
            'B3',
            'B4',
            'C1',
            'C2',
            'C3',
            'C4',
          ],
          active: true,
          start_price: '3',
          business_id: 1,
        }
        expect(event).toMatchObject(expectedEvent)
        expect(event).toHaveProperty('start_time')
      })
  })
  test('GET 404: responds with an error when given a valid but non-existent event_id', () => {
    return request(app)
      .get('/api/events/1111')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('ID not found')
      })
  })
  test('GET 400: responds with an error when given an invalid event_id', () => {
    return request(app)
      .get('/api/events/jdks')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request')
      })
  })
})

describe('/auctions/user/:user_id', () => {
  describe('GET', () => {
    test('200: sends an array of auction objects that the user is involved in', () => {
      return request(app)
        .get('/api/auctions/user/2')
        .expect(200)
        .then(({ body }) => {
          const { auctions } = body
          expect(Array.isArray(auctions)).toBe(true)
          expect(auctions.length).toBe(2)
          auctions.forEach((auction) => {
            expect(typeof auction.auction_id).toBe('number')
            expect(typeof auction.event_id).toBe('number')
            expect(Array.isArray(auction.seat_selection)).toBe(true)
            expect(typeof auction.current_price).toBe('string')
            expect(typeof auction.time_started).toBe('string')
            expect(typeof auction.current_highest_bidder).toBe('number')
            expect(Array.isArray(auction.users_involved)).toBe(true)
            expect(auction.users_involved.includes(2)).toBe(true)
            expect(typeof auction.active).toBe('boolean')
            expect(typeof auction.bid_counter).toBe('number')
          })
        })
    })
    test('200: sends an empty array if there are no results', () => {
      return request(app)
        .get('/api/auctions/user/5')
        .expect(200)
        .then(({ body }) => {
          const { auctions } = body
          expect(Array.isArray(auctions)).toBe(true)
          expect(auctions.length).toBe(0)
        })
    })
    test('400: sends an appropriate error if id is invalid (i.e. a string)', () => {
      return request(app)
        .get('/api/auctions/user/hello')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request')
        })
    })
    test("404: sends an appropriate error if id is valid but doesn't exist", () => {
      return request(app)
        .get('/api/auctions/user/234234234')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('User not found.')
        })
    })
    describe('?active=true/false', () => {
      test('200: sends an array of auctions that are active', () => {
        return request(app)
          .get('/api/auctions/user/2?active=true')
          .expect(200)
          .then(({ body }) => {
            const { auctions } = body
            expect(auctions.length).toBe(1)
            auctions.forEach((auction) => {
              expect(auction.active).toBe(true)
            })
          })
      })
      test('200: sends an array of auctions that are inactive', () => {
        return request(app)
          .get('/api/auctions/user/2?active=false')
          .expect(200)
          .then(({ body }) => {
            const { auctions } = body
            expect(auctions.length).toBe(1)
            auctions.forEach((auction) => {
              expect(auction.active).toBe(false)
            })

          })
      })
      test('400: sends an appropriate error if active query is invalid (not true or false)', () => {
        return request(app)
          .get('/api/auctions/user/2?active=hello')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid active query')
          })
      })
    })
  })
})