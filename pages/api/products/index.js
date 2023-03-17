import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";


connectDB();

export default async(req, res)=>{
    switch (req.method) {
        case 'GET':
            await getProducts(req,res)   
        default:
            break;
    }
}

const getProducts = async(req,res) => {
    try {
        const products = await Products.find();
        res.status(200).json({
            status:"Success",
            result: products.length,
            products
        })
    } catch (error) {
        res.status(500).json({err:error.message})
    }

}
