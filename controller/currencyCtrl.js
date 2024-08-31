const axios = require("axios");
const { response } = require("express");
const asyncHandler = require("express-async-handler");
const History = require('../models/historyModel')
const ApiKey = process.env.API_KEY;

const getExchangeRates = asyncHandler(async (req, res) => {

    const { baseCurrency, targetCurrency, amount } = req.body;
    
    if(!baseCurrency||!targetCurrency||!amount){
        
        throw new Error("Invalid Currency or amount selected");
    
    }
    const userId = req?.user?._id;
    const { firstname } = req?.user;
    console.log("username", firstname)

    console.log("Req ", baseCurrency, targetCurrency, amount)

    const exchangeRates = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${ApiKey}`)
    const currencies = await axios.get(`https://api.freecurrencyapi.com/v1/currencies?apikey=${ApiKey}`)

    const exchangeRate = exchangeRates.data.data
    const currenciesData = currencies.data.data;

    // Get only the currency codes
    const currencyCodes = Object.keys(currenciesData);

    if (!currencyCodes.includes(targetCurrency) || !currencyCodes.includes(baseCurrency)) {
        throw new Error("Currency Doesnt Exist")
    }

    const baseRate = exchangeRate[baseCurrency];
    const targetRate = exchangeRate[targetCurrency]

    if (!baseRate || !targetRate) {
        return res.status(400).json({ message: "Exchange rate not found for provided currencies." });
    }
    const rate = targetRate / baseRate

    const convertedAmount = (amount * rate).toFixed(2);
    // Log the codes to the console
    const history = new History({
        users: [userId],
        logs: `Conversion of ${baseCurrency} to ${targetCurrency} with amount of ${amount}`,

    });
    await history.save();
    

    // const populatedHistory = await History.findById(history._id).populate('users', 'firstname');

    return res.json({ convertedAmount });

});

const getCurrencyCodes = asyncHandler(async (req, res) => {
    try {
        const currencies = await axios.get(`https://api.freecurrencyapi.com/v1/currencies?apikey=${ApiKey}`)

    const currenciesData = currencies.data.data;

    // Get only the currency codes
    const currencyCodes = Object.keys(currenciesData);

    return res.json({ currencyCodes });
    } catch (error) {
        throw new Error("curr codes error",error)
    }
    

});

const getHistory = asyncHandler(async (req, res) => {

    const userId = req?.user?._id;
    const historyLogs = await History.find({ users: { $in: [userId] } });


    return res.json({ historyLogs });

});




module.exports = {
    getExchangeRates,
    getCurrencyCodes,
    getHistory
}