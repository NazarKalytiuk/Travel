const express = require('express');
const router = express.Router();
const EventController = require('../domain/contollers/event.controller');
let e = new EventController();

router.get('/', e.get());

module.exports = router;
