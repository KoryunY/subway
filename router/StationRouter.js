const express = require('express');
const StationController = require('../controller/StationController');
const StationRouter = express.Router();

StationRouter.get('/', StationController.getAll);
StationRouter.post('/create/', StationController.createStation);
StationRouter.post('/checkIn/:cId', StationController.checkIn);
StationRouter.post('/checkOut/:cId', StationController.checkOut);
StationRouter.post('/update/:id', StationController.updateStation);
module.exports = StationRouter;