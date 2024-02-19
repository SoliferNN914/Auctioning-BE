const { TestWatcher } = require('jest')
const request = require('supertest')
const app = require('../app.js')
const allTestData = require('../db/data/test-data/index.js')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
const endpointFile = require('../endpoints.json')

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
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        const { endpointObject } = body
        expect(endpointObject).toEqual(endpointFile)
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
          expect(typeof business.name).toBe('string')
          expect(typeof business.postcode).toBe('string')
          expect(business).toHaveProperty('coordinates')
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
          coords: '52.47399, -1.92048',
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
          expect(user).toHaveProperty('coordinates')
          expect(user).toHaveProperty('currently_bidding')
          expect(user).toHaveProperty('device_token')
        })
      })
  })
})
