import express from "express";
import path from "path";
import bodyParser from "body-parser";

import {fileURLToPath} from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set the view engine to ejs
app.set('view engine', 'ejs');
// serve static js and css files to ejs
app.use(express.static(__dirname + '/public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//Hardcoded values for funds.
const lgim = {
    short: "lgim",
    name: "Legal & General Asset Management",
    nav: 3_000_000,
    priorNav: 2_990_000,
    realisedGainLoss: 0.05,
    cashBalance: 10_000,
    baseCurrency: "GBP",
    unrealisedGainLoss: 0.10,
    transactions:[
        ['APPL','BUY',10,100],
        ['MSFT','BUY',70,98],
        ['GOOG','SELL', 240]
    ],
    img: "lgim.webp",
    services: ["Fund Accounting", "Transfer Agency", "Custody"],
}

const vanguard = {
    short: "vanguard",
    name: "Vanguard Asset Management",
    nav: 10_000_000,
    priorNav: 9_000_000,
    realisedGainLoss: 0.02,
    cashBalance: 30_000,
    baseCurrency: "EUR",
    unrealisedGainLoss: 0.50,
    transactions:[
        ['RIO','BUY',550,68.9],
        ['AIR BNB','SELL',70_000,3.45],
        ['TOYOTA','BUY', 240, 689]
    ],
    img: "vanguard.png",
    services: ["Fund Accounting", "Middle Office"],
}

const jupiter = {
    short: "jupiter",
    name: "Jupiter Asset Management",
    nav: 90_000,
    priorNav: 80_000,
    realisedGainLoss: 0.001,
    cashBalance: 1000,
    baseCurrency: "USD",
    unrealisedGainLoss: 0.05,
    transactions:[
        ['APPL','BUY',10,100],
        ['MSFT','BUY',70,98],
        ['GOOG','SELL', 240]
    ],
    img: "jupiter.svg",
    services: ["Fund Accounting", "Transfer Agency", "Middle Office", "Custody"],
}
const clientData = [lgim, vanguard, jupiter]


// LOGIN PAGE
app.get('/', (req, res) => {
    res.render('poll.ejs');
})
app.post('/',(req,res)=>{
    const clientShortName = req.body.userlogin;
    res.redirect(`/landing?client=${clientShortName}`);
})

// LANDING PAGE
app.get('/landing',(req,res)=>{
    const clientShortName = req.query.client; // Get the client identifier from query parameters
    const clientObj = clientData.find(client => client.short === clientShortName);
    if (clientObj) {
        res.render('landing.ejs', { clientObj: clientObj });
    } else {
        // Handle case where no matching client is found, perhaps redirect back or show an error
        res.redirect('/');
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})