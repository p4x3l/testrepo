import express = require('express');
import FacebookEventsService from '../facebook-events-service';

// Create a new express app instance
const app: express.Application = express();
app.get('/', function (req, res) {
    const events = new FacebookEventsService();

    events.sendFbRequest().then(data => res.send(data));
});
app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});