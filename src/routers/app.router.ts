import * as express from 'express';
const router = express.Router();
import { eventController } from '../domain/contollers/event.controller';

router.get('/', eventController.get);

module.exports = router;
