import React, {useState, useEffect,useContext} from 'react'
import Head from "next/head";
import {DataContext} from "../store/GlobalState";
import CartItem from '../components/CartItem';
import Link from "next/link";
import {getData} from "../utils/fetchData"
import PayPalBtn from '../components/PayPalBtn';

const Cart = () => {
  const [total ,setTotal] = useState(0);
  const {state, dispatch} = useContext(DataContext);
  const {cart, auth} = state;
  const [userData , setUserData] = useState({
     name:"", phone:"",address:"",
  });
  const {name, phone, address} = userData;
  const [payment, setPayment] = useState(false);
  const [callback, setCallback] = useState(false)

  useEffect(() => {
    const getTotal = ()=>{
      const tol = cart.reduce((acc, item) => acc + (item.price * item.quantity) , 0);
      setTotal(tol)
    }
    getTotal();
  },[cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("__next__cart01__grk"));
    if(cartLocal && cartLocal.length > 0){
      let newArr = [];
      const updateCart = async()=>{
        for(const item of cartLocal){
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
  },[callback])

  const handleChange =(e)=>{
    let {name,value} = e.target;
    setUserData({...userData, [name]:value})
  }

  const handlePayment = async(e)=>{
    e.preventDefault();
    if(!name || !address || !mobile)
    return dispatch({type:"NOTIFY", payload:{error:"Please add your address and mobile."}})
    setPayment(true);
  
  }

  if(cart.length === 0){
    return (
      <div className="container my-4">
        <h2 className="text-center">Empty Cart</h2>
      </div>
    )
  }

  return (
    <div className="row gap-5">
      <Head>
        <title>Cart Page</title>
      </Head>

        <h2 className='text-uppercase text-center my-3'>Shopping Cart</h2>
      <div className="col-md-7 text-secondary table-responsive ">
        <table className="table table-responsive">
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
          <label htmlFor="name">Name</label>
            <input type="text" name="name" 
            value={name}  
            id ="name"
            className='form-control mb-2'
            onChange={handleChange}
            required
          />
            <label htmlFor="phone">Mobile</label>
            <input type="phone" name="phone" 
            value={phone}  
            id ="mobile"
            className='form-control mb-2'
            required
            onChange={handleChange}
          />
          <label htmlFor="address">Adrress</label>
          <textarea type="text" name="address" 
            value={address}
            id="address" 
            className='form-control mb-2'
            onChange={handleChange}
            required
            />
        </form>

        <h3>Total: <span className="text-info">${total}</span></h3>
        { payment ? 
        <PayPalBtn
          total={total}
          name={name}
          mobile={phone}
          address={address}
          state={state}
          dispatch={dispatch}
        />
          :
          <Link href= { auth.user ? "#!" : "/signin"} legacyBehavior>
            <button className='btn btn-dark my-2' onClick={handlePayment}>
              Proceed With Payment
            </button>
          </Link>
        }
        
      </div>
    </div>
  )
}

export default Cart