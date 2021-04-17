const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes)


//should I use a routes folder, not really needed
//app.use(require('./routes'));

// not sure what to call this
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-networkDB', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));