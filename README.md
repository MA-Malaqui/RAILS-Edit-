# RAILS

A Reservation And Inventory Laboratory System (RAILS) for the Philippine Science High School - Eastern Visayas Campus (PSHS-EVC) Science Research Assistant (SRA) office 


## Setup

**Be sure to install [Node.js](https://nodejs.org/en/download/) to continue**

---

Install the dependencies:

```bash
npm install
```
Create a ```.env``` file by following the instructions on the ```.env.example``` 

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Local Database Initialization

When creating changes to the database schema through the ```schema.prisma``` file push changes with the command:
```bash
npx prisma db push
```
