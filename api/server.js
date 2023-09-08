const express = require('express');
const dotenv = require('dotenv');
const {Web3} = require('web3');
const ABI = require('./ABI.json');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

///////////// WEB3 /////////////

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.GANACHE_ENDPOINT));
const contract = new web3.eth.Contract(ABI,process.env.CONTRACT_ADDRESS);

///////////// API /////////////

app.listen(process.env.API_PORT, () => {
    console.log(`[server.js] Server listening to port ${process.env.API_PORT}`);
});

app.get('/', (req, res) => {
    
});

app.get('/api/get/allItems', async (req, res) => {
    const itemDetails = await contract.methods.getItemDetails().call();

    if (itemDetails) {
        const itemList = itemDetails.map( ({id, name, description, currentHighestBid, highestBidder}) => {
            const itemId = Number(id);
            const itemCurrentHighestBid = Number(currentHighestBid);
            
            return {
                itemId, name, description, itemCurrentHighestBid, highestBidder
            }
        }
        )

        res.status(200).json({status:200, itemList, msg: 'All items listed!'});
    }
    else {
        res.status(404).json({status:404, msg: 'No items found!'});
    }
});

app.post('/api/post/placeBid', (req, res) => {
    res.status(200).json({status:200});
});