const express = require('express');
const { getExchangeRates } = require('../controller/currencyCtrl');
const router = express.Router();

router.get('/', getExchangeRates);



module.exports = router;