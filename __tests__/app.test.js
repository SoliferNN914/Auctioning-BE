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

describe('GET/api', () => {
  test('200: when calling the api as the endpoint, return an object containing all of the endpoint information for every endpoint tested in app.js', () => {
    return fs.readFile('./endpoints.json', 'utf8').then((result) => {
      return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
          expect(response.body.endpointObject).toEqual(JSON.parse(result))
        })
    })
  })
})

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
            x: 52.47399,
            y: -1.92048,
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
        expect(users.length).toBe(4)
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

describe('POST /api/users', () => {
  test('201: inserts a new user into the database, returning an object with all of the new user information', () => {
    const userToAdd = {
      username: 'cinemalover',
      postcode: 'M3 2BW',
    }
    const newUser = {
      username: 'cinemalover',
      postcode: 'M3 2BW',
      device_token: null,
      coords: {
        x: -2.246756,
        y: 53.482225,
      },
      user_id: 5,
      currently_bidding: null,
    }
    return request(app)
      .post('/api/users')
      .send(userToAdd)
      .expect(201)
      .then(({ body }) => {
        const { user } = body
        expect(user).toEqual(newUser)
      })
  })
  test('201: inserts a new user into the database with a device token, returning an object with all of the new user information', () => {
    const userToAdd = {
      username: 'cinemalover',
      postcode: 'M3 2BW',
      device_token: '765ABD673',
    }
    const newUser = {
      username: 'cinemalover',
      postcode: 'M3 2BW',
      device_token: '765ABD673',
      coords: {
        x: -2.246756,
        y: 53.482225,
      },
      user_id: 5,
      currently_bidding: null,
    }
    return request(app)
      .post('/api/users')
      .send(userToAdd)
      .expect(201)
      .then(({ body }) => {
        const { user } = body
        expect(user).toEqual(newUser)
      })
  })
  test('POST 400: responds with an error when missing required keys', () => {
    const userToAdd = {
      postcode: 'M3 2BW',
    }
    return request(app)
      .post('/api/users')
      .send(userToAdd)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request')
      })
  })
  test('POST 400: responds with an error when given a username that already exists', () => {
    const userToAdd = {
      username: 'smink123',
      postcode: 'B47 5HQ',
    }
    return request(app)
      .post('/api/users')
      .send(userToAdd)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request')
      })
  })
  test('POST 400: responds with a bad request error when any of the keys are incorrectly named', () => {
    const userToAdd = {
      name: 'smink123',
      city: 'B47 5HQ',
    }
    return request(app)
      .post('/api/users')
      .send(userToAdd)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request')
      })
  })
  test('POST 400: responds with a bad request error when any of the values are empty strings', () => {
    const userToAdd = {
      username: '',
      postcode: '',
    }
    return request(app)
      .post('/api/users')
      .send(userToAdd)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request')
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
            x: 52.38532,
            y: -1.88381,
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
