'use client'

import React from 'react'
import { CheckCircle, ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'

export default function OrderConfirmation() {
  // Mock order details
  const orderDetails = {
    id: 'ORD123456',
    date: new Date().toLocaleDateString(),
    total: 1097,
    items: [
      { id: 1, name: "Handwoven Bamboo Basket", price: 499, quantity: 1 },
      { id: 2, name: "Organic Wild Honey", price: 299, quantity: 2 },
    ],
    shippingAddress: "123 Rural Lane, Green Village, Nature State, 543210"
  }
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/billing'); 
  };

  const handleShopping = () => {
    navigate('/profile/client/6734412f7e07f2482a61152a'); 
  };

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-4 text-green-700 hover:text-green-900 hover:bg-green-100"
          onClick={handleBack}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <Card className="border-green-200 max-w-2xl mx-auto">
          <CardHeader className="bg-green-100">
            <div className="flex items-center justify-center text-green-600 mb-4">
              <CheckCircle className="h-16 w-16" />
            </div>
            <CardTitle className="text-center text-2xl text-green-800">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="bg-white" >
            <p className="text-center text-green-700 mb-6">
                <br></br>
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-green-800">Order Details</h3>
                <p className="text-green-700">Order ID: {orderDetails.id}</p>
                <p className="text-green-700">Date: {orderDetails.date}</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Items Ordered</h3>
                <ul className="space-y-2">
                  {orderDetails.items.map((item) => (
                    <li key={item.id} className="flex justify-between text-green-700">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-green-200">
                <div className="flex justify-between font-bold text-green-800">
                  <span>Total</span>
                  <span>₹{orderDetails.total}</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Shipping Address</h3>
                <p className="text-green-700">{orderDetails.shippingAddress}</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleShopping}
              >
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}