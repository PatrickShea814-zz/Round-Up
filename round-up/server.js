const express = require('express');
const mongoose = require("mongoose");

const app = express();


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});


//Use Routes

const port = process.env.PORT || 3000;

app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
