import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";

connectDB();

export default async(req, res)=>{
    switch (req.method) {
        case 'GET':
            await getProduct(req,res)   
        default:
            break;
    }
}

const getProduct = async(req,res) => {
    const {id} = req.query;
    try {
        const product = await Products.findById(id);
        if(!product) res.status(400).json({err:"This product does not exist"});
        res.status(200).json({
            status:"Success",
            product
        })
    } catch (error) {
        res.status(500).json({err:error.message})
    }

}
