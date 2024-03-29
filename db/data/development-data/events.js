const filmStart1 = new Date().setHours(new Date().getHours() + 440)
const filmStart2 = new Date().setHours(new Date().getHours() + 444)
const filmStart3 = new Date().setHours(new Date().getHours() + 448)
const filmStart4 = new Date().setHours(new Date().getHours() + 430)
const filmStart5 = new Date().setHours(new Date().getHours() + 330)
const filmStart6 = new Date().setHours(new Date().getHours() + 360)
const filmStart7 = new Date().setHours(new Date().getHours() + 390)
const filmStart8 = new Date().setHours(new Date().getHours() + 410)
const filmStart9 = new Date().setHours(new Date().getHours() + 387)
const filmStart10 = new Date().setHours(new Date().getHours() - 10)
const filmStart11 = new Date().setHours(new Date().getHours() - 20)

module.exports = [
  // Events in Birmingham
  {
    film_title: 'Bob Marley: One Love',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZTRjYzlhNjQtOWZjOC00ZGQzLWEzZjAtMDZjZjBkODMwNWRiXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_SX300.jpg',
    certificate: '12',
    run_time: '104',
    start_time: new Date(filmStart1),
    available_seats: '{A1,A2,B1,B2,B3,C3,C4,D1,D2,D3,D4}',
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
    start_time: new Date(filmStart2),
    available_seats: '{A1,A3,A4,B1,B2,B3,B4,C1,C2,D1,D2}',
    active: true,
    start_price: 3,
    business_id: 1,
  },
  {
    film_title: 'Madame Webb',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjhkYjA0ZmUtM2I4OC00YzQ1LTk2YWUtYjA3ZGRhM2YzYWU1XkEyXkFqcGdeQXVyMTc1MzUzOTY0._V1_SX300.jpg',
    certificate: '12',
    run_time: '117',
    start_time: new Date(filmStart2),
    available_seats: '{A1,A2,A3,B1,B2,B3,B4,C1,C2,C3,C4}',
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
    start_time: new Date(filmStart3),
    available_seats: '{A1,A2,A3,A4,B1,B2,B3,B4}',
    active: true,
    start_price: 4,
    business_id: 2,
  },
  {
    film_title: 'The Holdovers',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNDc2MzNkMjMtZDY5NC00NmQ0LWI1NjctZjRhNWIzZjc4MGRiXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg',
    certificate: '15',
    run_time: '133',
    start_time: new Date(filmStart2),
    available_seats:
      '{A1,A2,A3,B1,B2,B3,B4,B5,C1,C2,C3,D1,D2,D3,D4,D5,E1,E2,E3}',
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
    start_time: new Date(filmStart4),
    available_seats:
      '{A2,A3,A4,A5,B3,B4,B5,C1,C2,C3,C4,C5,D3,D4,D5,E1,E2,E3,E4,E5}',
    active: true,
    start_price: 4,
    business_id: 3,
  },
  {
    film_title: 'Lights Out',
    poster:
      'https://m.media-amazon.com/images/M/MV5BYjBiNzJhYmItN2FlNi00NjA1LWIzOWYtYTdkZjcyOTdhMmMwXkEyXkFqcGdeQXVyMzQwMTY2Nzk@._V1_SX300.jpg',
    certificate: '18',
    run_time: '90',
    start_time: new Date(filmStart11),
    available_seats: '{A4,A5,B5,C1,C2,C3,D3,D4,D5,E1,E2,E3,E4,E5}',
    active: false,
    start_price: 3.5,
    business_id: 4,
  },
  {
    film_title: 'Madame Webb',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjhkYjA0ZmUtM2I4OC00YzQ1LTk2YWUtYjA3ZGRhM2YzYWU1XkEyXkFqcGdeQXVyMTc1MzUzOTY0._V1_SX300.jpg',
    certificate: '12',
    run_time: '117',
    start_time: new Date(filmStart5),
    available_seats: '{A2,A3,B1,B2,B3,B4,C1,C3,C4}',
    active: true,
    start_price: 3.5,
    business_id: 4,
  },
  {
    film_title: 'Marmalade',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZjI0ZDZkMDktMDlkYi00YjhkLWFmMGEtZWUzYTc3ZmEwZmMyXkEyXkFqcGdeQXVyMTM1NjM2ODg1._V1_SX300.jpg',
    certificate: 'PG',
    run_time: '99',
    start_time: new Date(filmStart5),
    available_seats:
      '{A3,A4,A5,B1,B2,B3,C1,C2,C3,C4,C5,D1,D2,D3,D4,D5,E1,E2,E3,E4,E5}',
    active: true,
    start_price: 2,
    business_id: 5,
  },
  {
    film_title: 'Madame Webb',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjhkYjA0ZmUtM2I4OC00YzQ1LTk2YWUtYjA3ZGRhM2YzYWU1XkEyXkFqcGdeQXVyMTc1MzUzOTY0._V1_SX300.jpg',
    certificate: '12',
    run_time: '117',
    start_time: new Date(filmStart6),
    available_seats: '{A3,A4,A5,B1,B2,B3,B4,B5,C1,C2,D1,D2,D3,E3,E4,E5}',
    active: true,
    start_price: 3.5,
    business_id: 5,
  },
  // Events in Manchester
  {
    film_title: 'The Holdovers',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNDc2MzNkMjMtZDY5NC00NmQ0LWI1NjctZjRhNWIzZjc4MGRiXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg',
    certificate: '15',
    run_time: '133',
    start_time: new Date(filmStart7),
    available_seats:
      '{A1,A2,A3,B1,B2,B3,B4,B5,C1,C2C5,D1,D2,D3,D4,D5,E3,E4,E5}',
    active: true,
    start_price: 3,
    business_id: 6,
  },
  {
    film_title: 'Lights Out',
    poster:
      'https://m.media-amazon.com/images/M/MV5BYjBiNzJhYmItN2FlNi00NjA1LWIzOWYtYTdkZjcyOTdhMmMwXkEyXkFqcGdeQXVyMzQwMTY2Nzk@._V1_SX300.jpg',
    certificate: '18',
    run_time: '90',
    start_time: new Date(filmStart4),
    available_seats: '{A1,A2,B1,B2,C1,C2,C3,C4,C5,D4,D5,E1,E2,E3,E4,E5}',
    active: true,
    start_price: 3.5,
    business_id: 6,
  },
  {
    film_title: 'Wicked Little Letters',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjFhYmIzZjktMjEyYS00NDQzLThiNzMtNmMzODI4MDgwMDk3XkEyXkFqcGdeQXVyMTYxNTA3NjEx._V1_SX300.jpg',
    certificate: '12',
    run_time: '100',
    start_time: new Date(filmStart8),
    available_seats: '{A1,A2,A3,A4,A5,B1,B2,C3,C4,C5}',
    active: true,
    start_price: 3.5,
    business_id: 7,
  },
  {
    film_title: 'The Holdovers',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNDc2MzNkMjMtZDY5NC00NmQ0LWI1NjctZjRhNWIzZjc4MGRiXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg',
    certificate: '15',
    run_time: '133',
    start_time: new Date(filmStart3),
    available_seats: '{A4,A5,B1,B2,B3,B4,B5,C1,C4,C5}',
    active: true,
    start_price: 3.5,
    business_id: 7,
  },
  {
    film_title: 'Bob Marley: One Love',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZTRjYzlhNjQtOWZjOC00ZGQzLWEzZjAtMDZjZjBkODMwNWRiXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_SX300.jpg',
    certificate: '12',
    run_time: '104',
    start_time: new Date(filmStart10),
    available_seats: '{A5,A6,B1,B2,B5,B6,C1,C4,D3,D4,D5,D6,E1,E2,E3,E4,E5,E6}',
    active: false,
    start_price: 3,
    business_id: 8,
  },
  {
    film_title: 'Madame Webb',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjhkYjA0ZmUtM2I4OC00YzQ1LTk2YWUtYjA3ZGRhM2YzYWU1XkEyXkFqcGdeQXVyMTc1MzUzOTY0._V1_SX300.jpg',
    certificate: '12',
    run_time: '117',
    start_time: new Date(filmStart1),
    available_seats:
      '{A1,A2,A3,A4,A5,A6,B1,B2,B3,C1,C2,D1,D2,D3,D4,D5,D6,E1,E2,E3}',
    active: true,
    start_price: 3.5,
    business_id: 8,
  },
  {
    film_title: 'Dune: Part Two',
    poster:
      'https://m.media-amazon.com/images/M/MV5BODI0YjNhNjUtYjM0My00MTUwLWFlYTMtMWI2NGUzYjNjNGQzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
    certificate: '12',
    run_time: '166',
    start_time: new Date(filmStart9),
    available_seats: '{A1,A2,B1,B2,B3,B4,C1,C2,D4,E3,E4}',
    active: true,
    start_price: 3,
    business_id: 9,
  },
  {
    film_title: 'Madame Webb',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjhkYjA0ZmUtM2I4OC00YzQ1LTk2YWUtYjA3ZGRhM2YzYWU1XkEyXkFqcGdeQXVyMTc1MzUzOTY0._V1_SX300.jpg',
    certificate: '12',
    run_time: '117',
    start_time: new Date(filmStart1),
    available_seats: '{A1,A2,A3,B1,B2,B3,B4,C3,C4,D1,D2,D3,D4,E3,E4}',
    active: true,
    start_price: 3.5,
    business_id: 9,
  },
  {
    film_title: 'Lights Out',
    poster:
      'https://m.media-amazon.com/images/M/MV5BYjBiNzJhYmItN2FlNi00NjA1LWIzOWYtYTdkZjcyOTdhMmMwXkEyXkFqcGdeQXVyMzQwMTY2Nzk@._V1_SX300.jpg',
    certificate: '18',
    run_time: '90',
    start_time: new Date(filmStart2),
    available_seats:
      '{A1,A2,A3,A4,A5,B1,B4,B5,C3,C4,C5,D1,D2,D3,D4,D5,E5,F1,F2,F3,F4,F5,G1,G2,G3,G4,G5}',
    active: true,
    start_price: 4,
    business_id: 10,
  },
  {
    film_title: 'Wicked Little Letters',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjFhYmIzZjktMjEyYS00NDQzLThiNzMtNmMzODI4MDgwMDk3XkEyXkFqcGdeQXVyMTYxNTA3NjEx._V1_SX300.jpg',
    certificate: '12',
    run_time: '100',
    start_time: new Date(filmStart3),
    available_seats:
      '{A1,A2,A3,A4,A5,B1,B2,C1,C2,C3,C4,C5,D1,D2,E1,E2,F1,F2,F3,F4,F5,G4,G5}',
    active: true,
    start_price: 3,
    business_id: 10,
  },
]
