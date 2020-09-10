var express = require('express');
var router = express.Router();

const EventsController = require('../controllers/EventsController')
const {ensureAuthenticated} = require('../extra/Authenticate')

router.get('/', ensureAuthenticated, EventsController.getAllEvents)


module.exports = router;