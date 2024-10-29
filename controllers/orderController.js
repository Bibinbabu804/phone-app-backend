



// place order using cod

import orderModel from "../Models/orderModel.js"
import userModel from "../Models/userModel.js"
import razorpay from 'razorpay'


//global vr
const currency= 'inr'
const deliveryCharge= 10

const razorpayInstance = new  razorpay({

    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET





})

const placeOrder = async (req,res)=>{

   try {



    const {userId, items,amount,address}=req.body 

    const orderData={

        userId,
        items,
        address,
        amount,
        paymentMethod:'COD',
        payment:false,
        date:Date.now()

    }

    const newOrder =new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId,{cartData:{}})
    res.json({success:true,message:'Order Placed'})
    
   } catch (error) {
    console.log(error);
    
    res.json({success:false,message:error.message})
    
   }

   






}


// place order using stripe

const placeOrderStripe = async (req,res)=>{
    
}



// place order using Razopay Method

const placeOrderRazorpay = async (req,res)=>{
    try {

        const {userId, items,amount,address}=req.body 

    const orderData={

        userId,
        items,
        address,
        amount,
        paymentMethod:'Razorpay',
        payment:false,
        date:Date.now()

    }

    const newOrder =new orderModel(orderData)
    await newOrder.save()

    const options= {
        amount:amount*100,
        currency: currency.toUpperCase(),
        receipt: newOrder._id.toString()
    }

    await razorpayInstance.orders.create(options,(error,order)=>{
        if (error) {
            console.log(error);
            return res.json({success:false,message:error})
            
        }
        res.json({success:true,order})
        

    })

        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
    
}

//   all ORDER DATA admin panel 


const allOrders = async (req,res)=>{

    try {

        const orders =await orderModel.find({})
        res.json({success:true,orders})
        
    } catch (error) {

        console.log(error);
    
        res.json({success:false,message:error.message})
        
        
    }




    
}


 // user Order Data for Frontend

const userOrders = async (req,res)=>{

    try {
        const {userId}=req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})



        
    } catch (error) {

        console.log(error);
    
        res.json({success:false,message:error.message})
        
    }




    
}

// update order status

// place order using cod




// place order using cod

const updateStatus = async (req,res)=>{

    try {
        const {orderId,status} =req.body
         await orderModel.findByIdAndUpdate(orderId,{status})
         res.json({success:true,message:"Order status updated successfully"})
        
        
    } catch (error) {

        console.log(error);
    
        res.json({success:false,message:error.message})
        
    }


    
}

export  {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}
