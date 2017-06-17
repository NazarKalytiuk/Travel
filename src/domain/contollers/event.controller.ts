import { Request, Response } from 'express';
import { eventRepository } from '../repositories/event.repository';

const get = async (req: Request, res: Response) => {
    try {
        const events = await eventRepository.getAll();
        if (!events) {
            res.sendStatus(404);
        } else {
            res.json(event);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

const eventController = {
    get,
};

export { eventController };
