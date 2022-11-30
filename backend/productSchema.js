const { Int32 } = require('mongodb');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const productSchema= new Schema({
    name: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    rfid:{
        type: String,
        required:true
    }
});
module.exports=mongoose.model('product_details',productSchema);