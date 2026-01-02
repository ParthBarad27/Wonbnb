const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_Url = "mongodb://127.0.0.1:27017/wonderlust";

main()
    .then(() => {
        console.log("connected to DB");

    })
    .catch((err) => {
        console.log(err);
        
    });

async function main() {
    await mongoose.connect(mongo_Url);
    await initDB();
    mongoose.connection.close();
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '69516d6e73e1ceda2f911893'}))
    await Listing.insertMany(initData.data);
    console.log("Data was initialize");
    
};

// const initDB = async () => {
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj) => {
//     const { owner, ...rest } = obj; 
//     return rest;
//   });
//     await Listing.insertMany(initData.data);
//     console.log("Data was initialized without owner field");
// };




// const initDB = async () => {
//   // Clear out all listings
//   await Listing.deleteMany({});

//   // Add correct owner ObjectId to each document
//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: new mongoose.Types.ObjectId("69516d6e73e1ceda2f911893"),
//   }));

//   // Insert updated data
//   await Listing.insertMany(initData.data);

//   console.log("Data was initialized with correct owner id");
// };
initDB();