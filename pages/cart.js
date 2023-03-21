import React, {useState, useEffect,useContext} from 'react'
import Head from "next/head";
import {DataContext} from "../store/GlobalState";
import CartItem from '../components/CartItem';
import Link from "next/link";
import {getData} from "../utils/fetchData"

const Cart = () => {
  const [total ,setTotal] = useState(0);
  const {state, dispatch} = useContext(DataContext);
  const {cart, auth} = state;

  if(cart.length ===0){
    return (
      <div className="container">
        <h2 className="">Empty Cart</h2>
        {/* <div className="empty-cart">
          
        </div> */}
      </div>
    )
  }

  useEffect(() => {
    const getTotal = ()=>{
      const tol = cart.reduce((acc, item) =>{
        return acc + (item.price * item.quantity)
      },0);
      setTotal(tol)
    }
    getTotal();
  },[cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("__next__cart01__grk"));
    if(cartLocal && cartLocal.length > 0){
      let newArr = [];
      const updateCart = async()=>{
        for(let item of cartLocal){
          const res = await getData(`product/${item._id}`);
          const {_id, title,images, price,inStock, sold} = res.product
          if(inStock > 0){
            newArr.push({
              _id, title,images, price,inStock, sold,
              quantity: item.quantity > inStock - sold ? 1 : item.quantity
            })
          }
        }
        dispatch({
          type:"ADD_CART",
          payload:newArr
        })
      }
      updateCart()
    }
  },[])

  return (
    <div>
      <Head>
        <title>Cart Page</title>
      </Head>

      <div className="col-md-8 text-secondary table-responsive my-3">
        <h2 className='text-uppercase'>Shopping Cart</h2>
        <table className="table my-3">
          <tbody>
            {cart.map((item)=>(
              <CartItem 
              key={item._id} 
              item={item}
              dispatch={dispatch}
              cart={cart}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="col-md-4 text-secondary">
        <h2 className='text-secondary'>Shipping Details</h2>
        <form>
          <label htmlFor="address">Adrress</label>
          <input type="text" name="address" 
          // value="" 
          id="address" 
          className='form-control mb-2'/>

          <label htmlFor="mobile">Mobile No.</label>
          <input type="phone" name="phone" 
          // value=""  
          id ="mobile"
          className='form-control mb-2'/>
        </form>

        <h3>Total: <span className="text-info">${total}</span></h3>
        <Link href= { auth.user ? "#" : "/signin"} legacyBehavior>
          <a className='btn btn-dark my-2'>Proceed With Payment</a>
        </Link>
      </div>
    </div>
  )
}

export default Cart