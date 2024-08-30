const express = require('express');
const { getExchangeRates, getCurrencyCodes, getHistory } = require('../controller/currencyCtrl');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, getExchangeRates);
router.get('/codes', authMiddleware, getCurrencyCodes);
router.get('/history', authMiddleware, getHistory);



module.exports = router;