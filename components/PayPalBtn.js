import React,{useEffect, useRef} from 'react'

const PayPalBtn = ({total, name, mobile, state, dispatch}) => {
    const refPayPalBtn = useRef();
    const {cart, auth} = state;

    useEffect(() => {
        paypal.Buttons({
            createOrder: function(data, actions){
              return actions.order.create({
                purchase_units:[{
                  amount: {
                    value:total
                  }
                }]
              })
            },
            onApprove: function(data,actions){
              return actions.order.capture().then((details)=>{
                console.log(data);
                alert("Transaction Completed by " + details.payer.name.given_name)
              })
            }
          }).render(refPayPalBtn.current);   
    },[])

  return (
    <div ref={refPayPalBtn}>

    </div>
  )
}

export default PayPalBtn