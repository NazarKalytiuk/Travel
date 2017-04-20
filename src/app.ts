import * as express from 'express';
import { Event } from "./models/event";
import { EventRepository } from './domain/infrastructure/repositories/eventRepository';
import { AppDbContext } from './domain/appDbContext';
import { Collection } from 'mongodb';

var app = express();
let db = new AppDbContext();

app.get('/', function (req, res) {
  let events : Collection = db.getCollection('events');
  let event = new Event();
  events.insert(event, (err, result) => {
    if(err) {
      console.log(err);
      return;
    }
    res.send(event)
  })
});

app.listen(3000, () => {
  db.connect();
  console.log('Example app listening on port 3000!');
});