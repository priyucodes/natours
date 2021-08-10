const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 🎇 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // To fix deprecation warnings etc.
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database Connection made successfully'));
// .then(con) It gets access to a con -> Connection Object
// .catch(err=>console.log(err)) Handling unhandled PromiseRejection Locally

// 4) START SERVER

const port = process.env.port || 3000;
const server = app.listen(port, () =>
  console.log(`App running on port ${port}...`)
);

// Unhandled PromiseRejection Globally
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 🎇 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
  // 0 -> Success
  // 1 -> Uncaught exception
});
