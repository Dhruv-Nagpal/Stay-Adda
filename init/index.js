const mongoose = require('mongoose');
const Listing = require('../models/listing/listing');
const Initdata = require('./data')

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/StayAdda')
}

main().then((res)=>{
    console.log('Connection Successful')
}).catch((err)=>{
    console.log('Some error occured!!')
})

const Initdb = async()=>{
    await Listing.deleteMany({}); //remove old data
    const UpdatedData = Initdata.data.map((obj)=>({
        ...obj,
        owner: ("6a59e2c06ac4af473c263f28")
    }))
    await Listing.insertMany(UpdatedData); //Insert new data
    console.log("Data Initialized!!")
}

Initdb();