const d = new Date()
const filmStart1 = d.setHours(d.getHours() + 6)
const filmStart2 = d.setHours(d.getHours() + 4)
const filmStart3 = d.setHours(d.getHours() + 8)

module.exports = [
  {
    film_title: 'Bob Marley: One Love',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZTRjYzlhNjQtOWZjOC00ZGQzLWEzZjAtMDZjZjBkODMwNWRiXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_SX300.jpg',
    certificate: '12',
    run_time: '104',
    start_time: filmStart1,
    available_seats: '{A1,A2,A3,A4,B1,B2,B3,B4,C1,C2,C3,C4}',
    active: true,
    start_price: 3,
    business_id: 1,
  },
  {
    film_title: 'Bob Marley: One Love',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZTRjYzlhNjQtOWZjOC00ZGQzLWEzZjAtMDZjZjBkODMwNWRiXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_SX300.jpg',
    certificate: '12',
    run_time: '104',
    start_time: filmStart1,
    available_seats: '{A1,A2,A3,A4,B1,B2,B3,B4,C1,C2,C3,C4}',
    active: false,
    start_price: 3,
    business_id: 1,
  },
  {
    film_title: 'Madame Webb',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjhkYjA0ZmUtM2I4OC00YzQ1LTk2YWUtYjA3ZGRhM2YzYWU1XkEyXkFqcGdeQXVyMTc1MzUzOTY0._V1_SX300.jpg',
    certificate: '12',
    run_time: '117',
    start_time: filmStart2,
    available_seats: '{A1,A2,A3,A4,B3,B4,C1,C2}',
    active: true,
    start_price: 3.5,
    business_id: 2,
  },
  {
    film_title: 'The Holdovers',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNDc2MzNkMjMtZDY5NC00NmQ0LWI1NjctZjRhNWIzZjc4MGRiXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg',
    certificate: '15',
    run_time: '133',
    start_time: filmStart3,
    available_seats: '{A2,A5,B1,B2,B3,B4,B5,C1,C2,D3,D4,D5,E1,E2,E4,E5}',
    active: true,
    start_price: 4,
    business_id: 3,
  },
  {
    film_title: 'The Holdovers',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNDc2MzNkMjMtZDY5NC00NmQ0LWI1NjctZjRhNWIzZjc4MGRiXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg',
    certificate: '15',
    run_time: '133',
    start_time: filmStart3,
    available_seats: '{A2,A5,B1,B2,B3,B4,B5,C1,C2,D3,D4,D5,E1,E2,E4,E5}',
    active: true,
    start_price: 4,
    business_id: 2,
  },
]
