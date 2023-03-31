export const ACTIONS ={
    NOTIFY:"NOTIFY",
    AUTH: "AUTH",
    ADD_CART: "ADD_CART",
    ADD_MODAL: "ADD_MODAL",
}

export const addToCart = (product, cart)=>{
    // console.log(product,cart);
    if(product.isStock === 0)
    return ({ type:"NOTIFY", payload:{
                error:"This product is out of stock."
            }}
        )
    const check = cart.every(item=>{
        return item._id !== product._id
    }) 
    if(!check) return ( { type:"NOTIFY", payload:{error:"The product has been already added to cart."}})

    return ( { type:"ADD_CART", payload:[...cart, {
        ...product, quantity:1,
        success:"The Product has been added to cart."
    }]})
}

export const descreaseQuantity = (data,id)=>{
    const newData = [...data];
    newData.forEach((item)=>{
        if(item._id === id){
            item.quantity -= 1 
        }
    })
    return ( { type:"ADD_CART", payload:newData})
}

export const increaseQuantity = (data,id)=>{
    const newData = [...data];
    newData.forEach(item=>{
        if(item._id === id){
            item.quantity += 1
        }
    })
    return ( { type:"ADD_CART", payload:newData})
}

export const deleteItem =(data, id, type) => {
    const newData = data.filter(item => item._id !== id)
    return ({type, payload: newData})
}

// export default ACTIONS;