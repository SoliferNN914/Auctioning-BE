const { TestWatcher } = require('jest')
const request = require('supertest')
const app = require('../app.js')
const allTestData = require('../db/data/test-data/index.js')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')

beforeEach(() => seed(allTestData))
afterAll(() => db.end())

// describe('/api/users', () => {
//   test('200: responds with an array of users', () =>
//     request(app).get('/api/users').expect(200))
// })

// describe('/api/users/1', () => {
//   test('200: responds with user with a specific id', () =>
//     request(app)
//       .get('/api/users/1')
//       .expect(200)
//       .then(({ body }) => {
//         expect(body.user).toEqual({
//           user_id: 1,
//           username: 'test1',
//           profile_url:
//             'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953',
//         })
//       }))
// })

// describe('PATCH /api/users/1', () => {
//   test('200: should respond with status 200 when object is passed in', () => {
//     const patch = {
//       username: 'butter_bridge',
//     }
//     return request(app).patch('/api/users/1').send(patch).expect(200)
//   })
//   test('200: should respond username updated', () => {
//     const patch = {
//       username: 'butter_bridge',
//     }
//     return request(app)
//       .patch('/api/users/1')
//       .expect(200)
//       .send(patch)
//       .then(({ body }) => {
//         const { user } = body
//         expect(user).toHaveProperty('user_id', 1)
//         expect(user).toHaveProperty('username', 'butter_bridge')
//       })
//   })
// })
