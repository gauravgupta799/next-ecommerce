import React from 'react';
import Link from "next/link";
import {BiTrash} from "react-icons/bi"
import {descreaseQuantity,increaseQuantity,deleteItem } from "../store/Actions"

const CartItem = ({item,dispatch,cart}) => {
  return (
    <tr>
      <td style={{width:"100px", overflow: "hidden"}}>
        <img src={item.images[0].url} alt={item.images[0].url}
         className="img-thumbnail w-100"
         style={{minWidth:"80px", height:"80px"}}
         />
      </td>
      <td className="w-50 align-middle" style={{minWidth:"200px"}}>
          <h5 className="text-capitalize text-secondary">
            <Link href={`/product/${item._id}`} legacyBehavior>
              <a>{item.title}</a>
            </Link>
          </h5>
          <h6 className='text-danger'>${item.quantity * item.price}</h6>
            {
              item.inStock > 0 ?
              <p className='mb-1 text-danger'>In Stock: {item.inStock}</p> :
              <p className='mb-1 text-danger'>Out Stock</p>
            }
      </td>
      <td className='align-middle' style={{minWidth:"150px"}}>
        <button className='btn btn-outline-secondary'
         onClick={()=>dispatch(descreaseQuantity(cart,item._id))}
         disabled = { item.quantity === 1 ? true : false }
        > 
         - 
        </button>
        <span className='px-3'>{item.quantity}</span>
        <button className={`btn btn-outline-secondary ${item.quantity === 1 ? "cursor-none":"cursor-pointer"}`}
         onClick={()=>dispatch(increaseQuantity(cart, item._id))}
         disabled = { item.quantity === item.inStock ? true : false }
        > 
          + 
        </button>
      </td>
      <td className='align-middle' style={{
        minWidth:"50px",
        cursor:"pointer"
      }}>
       <BiTrash className='text-danger' 
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
       style={{fontSize:"24px"}}
        onClick={()=>dispatch({
          type:"ADD_MODAL",
          payload: {
            data:cart, id:item._id, title:item.title
          }
        })}
       />
      </td>
    </tr>
  )
}

export default CartItem