const { restart } = require("nodemon");
const productModel = require("../models/product");

module.exports.add = async(req,res)=>{
    try{
        const {name ,quantity} = req.body;
        console.log(name ,quantity);
        if(name==undefined && quantity== undefined)
        {
           return res.status(400).json({message : "name and quantity must have value"});
        }
        const existingProduct = await productModel.findOne({name:name});
        if(existingProduct)
        {
           return res.status(400).json({message:"product all ready exist"});
        }
        const product = await productModel.create({
            name:name,
            quantity:quantity
        });
        return res.status(200).json({message:"sucessfully product added ",product:{
            name:name,quantity:quantity
        }})

    }
    catch(error){
        return res.status(500).json({message:"something went wrong"});
    }
}
module.exports.test = (req,res) =>{
    res.send("hello");
}
module.exports.allProduct = async (req,res)=>{
    try{
        const product = await productModel.find();
        return res.status(500).json({message:"sucessfully get data" , data:{product}});
    }
    catch{
        return res.status(500).json({message:"something went Wrong "});
    }
}

module.exports.delete =async (req,res)=>{
    const item=req.params.id;
    try{
        const product = await productModel.findByIdAndRemove(item);
        if(!product)
        {
            return res.status(404).json({ message: 'Item not found' });
        }
        return res.json({ message: "product deleted", product });

    }
    catch{
        return res.status(500).json({message:"something went Wrong" , data : {item} })
    }
}

module.exports.update = async (req, res) => {
    let productId = req.params.id; // Captured from the URL route parameter
    let newQuantity = parseInt(req.query.number); // Convert query parameter to integer
    console.log(productId, newQuantity);
    try {
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Increment quantity and ensure it's not smaller than 0
        product.quantity = Math.max(0, product.quantity + newQuantity);

        await product.save();

        return res.status(200).json({ message: 'Quantity updated successfully', data: { product } });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
