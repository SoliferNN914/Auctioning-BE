# BLOST Auctioning API

The API for a live auctioning platform for cinema tickets where businesses can list events and seats for auction and users can bid on tickets for those seats.

- Hosted: https://auctioning-be.onrender.com/api/
- Frontend Repo: https://github.com/bensuth86/auctioning-fe

## Contributors

[Sarah Harvey](https://github.com/Smink123), [Laurie Hillier](https://github.com/lauriehillier), [Tiah Hind](https://github.com/tjhind), [Oskars Otdelnijs](https://github.com/SoliferNN914) & [Ben Sutherland](https://github.com/bensuth86)

## Installation

```bash
# Clone
git clone https://github.com/SoliferNN914/Auctioning-BE.git

# Install dependencies
npm install
```

## Instructions

1. Create two files, one called '.env.test' and one called '.env.development'.
2. In each file, add 'PGDATABASE=database_name', replacing database_name with 'auctioning_test' or 'auctioning' appropriately.
3. Add '.env.\*' to the .gitignore file.

```bash
# Create the databases
npm run setup-dbs
# Testing
npm test
# Running locally
npm run seed
npm run start
## Open http://localhost:9090 in your browser
open http://localhost:9090
```

## Technologies

Project created with:

- Node.js version: 21.1.0
- Postgres version: 14.10
