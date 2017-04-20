import * as express from 'express';
import { Event } from "./models/event";

var app = express();

app.get('/', function(req, res) {
  let event = new Event();
  event.Id = "23";
  res.send(event);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});