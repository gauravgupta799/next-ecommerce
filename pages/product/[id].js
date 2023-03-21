import React,{useState, useContext} from 'react';
import Head from "next/head";
import {getData} from "../../utils/fetchData";
import { DataContext } from '../../store/GlobalState';
import {addToCart} from "../../store/Actions"

const ProductDetail = (props) => {
  const [product] = useState(props.product);
  const [ tab, setTab] = useState(0);
  const {state, dispatch} =  useContext(DataContext);
  const {cart} = state;
  
  const isActive =(index)=>{
    if(tab=== index) return " active"
    return ""
  }
  
  console.log("Prod",product);
  return (
    <div>
        <Head>
            <title>Product Detail</title>
        </Head>
        <div className="row">
          <div className="col-md-6">
            <img src={product.images[tab].url} alt="product-img" className="w-100"/>
            <div className="" style={{cursor: 'pointer',border:"1px solid red",height:"80px"}}>
              {product.images.map((img)=>{
                {/* <img src={img.url} alt="thumbnail-img" style={{height:"40px", width:"20%"}}/> */}
                {/* {console.log("img", img)} */}
                <>
                    <img src={img.url} alt="thumbnail" key ={img.url}  
                    className={`img-thumbnail rounded`}
                    style={{height:"40px", width:"20%"}}
                    onClick={()=>setTab(index)}
                    />
                    <h2>{img.public_id}</h2>
                </>
                })
              }
            </div>
          </div>
          <div className="col-md-6 mt-3 ">
              <h2 className="text-uppercase">{product.title}</h2>
              <h2 className="text-danger mx-2">	&#8377;	{product.price}</h2>
              
              <div className="row mx-0 d-flex justify-content-between">
                {product.inStock > 0 
                ? <h6>In Stock: {product.inStock}</h6>
                : <h6>Out Stock</h6>
                }
                <h6 className='text-danger'>Sold: {product.sold}</h6>
              </div>
              <div className="my-2">
                {product.description}
              </div>
              <div className="my-2">
                {product.content}
              </div>

              <button className="btn btn-dark d-block my-3 px-5"
              onClick={(()=>dispatch(addToCart(product,cart)))}
              >
                Buy
              </button>
          </div>
        </div>
    </div>
  )
}
export async function getServerSideProps({params: {id}}){
  const res = await getData(`products/${id}`);
  return {
    props:{
      product: res.product
    }
  }
}

export default ProductDetail;
