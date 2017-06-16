const EventRepository = require('../repositories/event.repository');
/**
 *
 */
class EventController {
    /**
     *
     */
    constructor() {
        this.eventRepository = new EventRepository();
    };
    /**
     *
     */
    get() {
        return async(req, res) => {
            try {
                const repositories = await this.eventRepository.getAll();
                if (repositories.lenght < 1) {
                    res.sendStatus(404);
                };
                res.json(repositories);
            } catch (error) {
                res.sendStatus(500);
            }
        };
    }
};

module.exports = EventController;
