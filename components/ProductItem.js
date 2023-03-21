import React,{useContext} from 'react';
import Link from "next/link";
import {DataContext} from "../store/GlobalState";
import { addToCart} from "../store/Actions"

const ProductItem = ({product}) => {
    const {images, title, description, price,inStock, _id} = product;
    const {state,dispatch} = useContext(DataContext)
    const {cart} = state

    const userLink= ()=>{
        return (
            <>
                <Link href={`product/${_id}`} legacyBehavior>
                    <a className="btn btn-info mr-1 flex-fill"
                        style={{width:"40%"}}
                    >
                        View
                    </a>
                </Link>
                <button className='btn btn-success mr-1 flex-fill'
                 style={{width:"40%"}}
                 disabled={product.inStock === 0 ? true: false}
                 onClick={()=>dispatch(addToCart(product,cart))}
                >
                    Buy
                </button>
            </>
        )
    }
  return (
    <div className="card m-auto" style={{ width: "18rem"}}>
        <img src={images[0].url} 
        className="card-img-top" 
        alt="product_image" 
            style={{width:"100%",height:"250px"}}
        />
        <div className="card-body">
            <h5 className="card-title text-capitalize">
             {title}
            </h5>
            <div className="row justify-content-between mx-0">
                <h6 className="text-danger">{price}</h6>
               { inStock > 0 
               ?  <h6 className="text-danger">In Stock: {inStock}</h6> 
               :  <h6 className="text-danger">Out Off Stock</h6> 
               }
            </div>
            <p className="card-text">{description}</p>
            <div className="row mx-0"
                style={{display:"flex", 
                justifyContent: "space-between",
                gap:"10px"
                }}
            >
             {userLink()}
            </div>
        </div>
    </div>
  )
}

export default ProductItem