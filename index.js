const express = require("express");
const dotenv = require("dotenv");
const needle = require("needle");


const app = express()


dotenv.config();

//Get Bearer Token from .env
const BearerToken = process.env.BEARER_TOKEN;
// console.log(process.env.BEARER_TOKEN)

// const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";


//Get Tweets from Twitter API
const getUserId = async (username) => {
    const endpointUrl = `https://api.twitter.com/2/users/by/username/${username}`
    const response = await needle('get', endpointUrl, {}, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${BearerToken}`
        }
    })
    if (response.statusCode !== 200) {
        if (response.statusCode === 403) {
            res.status(403).send(response.body);
        }
        else {
            throw new Error(response.body.error.message);
        }
    }
    if (response.body)
        return response.body.data.id;
    else
        throw new Error("Unsuccessful Request");
}

getUserId("mwseibel").then((userId) => {
    console.log(userId)
})



//You can specify the port in .env file
// app.listen(process.env.PORT || 3000, () => {
//     console.log('Currently Listening to the Server')
// })

module.exports = app