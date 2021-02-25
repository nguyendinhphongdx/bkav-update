const mongoose = require('mongoose');

async function connect() {
  let url = process.env.DATABASE_URL || 
  'mongodb://localhost:27017/bkavupdatecenter'
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log('connected succesfully!!!');
  } catch (error) {
    console.log(`fail = ${error}`);
  }
}

module.exports = { connect };