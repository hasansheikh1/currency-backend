const  axios  = require("axios");
const { response } = require("express");
const asyncHandler = require("express-async-handler");

const ApiKey = process.env.API_KEY;

const getExchangeRates =asyncHandler(async(req,res)=>{

const exchangeRates = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${ApiKey}`)
const currencies = await axios.get(`https://api.freecurrencyapi.com/v1/currencies?apikey=${ApiKey}`)

// console.log("response",exchangeRates.data)

const currenciesData = currencies.data.data;

    // Get only the currency codes
    const currencyCodes = Object.keys(currenciesData);

    // Log the codes to the console
    console.log("Currency codes:", currencyCodes);
   res.json({currencyCodes})
});



module.exports={
    getExchangeRates
}