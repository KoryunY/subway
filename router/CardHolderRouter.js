const express = require('express');
const CardHolderController = require('../controller/CardHolderController');
const HolderRouter = express.Router();

HolderRouter.get('/', CardHolderController.getAll);
HolderRouter.post('/create/', CardHolderController.addCardHolder);
HolderRouter.post('/add/:id', CardHolderController.addMoney);

module.exports = HolderRouter;