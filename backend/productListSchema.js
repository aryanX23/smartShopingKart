const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const productListSchema= new Schema({
    name: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    customer:{
        type: String,
        required:true
    }
});
module.exports=mongoose.model('product_list',productListSchema);