import mongoose from 'mongoose';
const productScheme=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
   description:{
        type:Array,
        require:true,
    },
       price:{
        type:Number,
        require:true,
    },
          offerPrice:{
        type:Number,
        require:true,
    },
    image:{
        type:Array,
        require:true
    },
          catagory:{
        type:String,
        require:true,
    },
         inStock:{
        type:Boolean,
        require:true,
        default:true,
    },

});
const product =mongoose.model("Product",productScheme);
export default product

