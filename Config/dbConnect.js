const mongoose = require('mongoose');

const dbConnect = () => {
  mongoose.set('strictQuery', false);

  // const dbUrl = 'mongodb://localhost:27017/carInsuranceBackend';
  const dbUrl = 'mongodb+srv://Dagim:96nielPRG25lyYr8@cluster0.ifvnbab.mongodb.net/carInsurance';

  // const dbUrl = process.env.DB_URL

  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log('Database conneceted successfully');
    })
    .catch((err) => {
      console.log('Error while connecting to database');
      console.log(err);
    });
};

module.exports = dbConnect;
