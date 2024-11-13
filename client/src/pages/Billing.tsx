'use client'
import { ethers, BrowserProvider} from 'ethers';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, CreditCard, Truck, Bitcoin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Billing = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    walletAddress: '',
    paymentMethod: 'credit-card'
  })

  const cartItems = [
    { id: 1, name: "Handwoven Bamboo Basket", price: 499, quantity: 1 },
    { id: 2, name: "Organic Wild Honey", price: 299, quantity: 1 },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Proceed with blockchain payment if selected
    if (formData.paymentMethod === 'blockchain') {
        try {
          // Initialize the provider and signer
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner(); // Get the signer from the provider
    
          const totalInEther = ethers.parseEther((calculateTotal() / 1000).toString()); // Convert to Ether
    
          // Use the signer to send the transaction
          const tx = await signer.sendTransaction({
            to: formData.walletAddress,  // Receiver's wallet address
            value: totalInEther          // Amount in Wei
          });
    
          console.log('Transaction sent:', tx);
          await tx.wait(); // Wait for the transaction to be mined
          alert('Payment sent successfully');
        } catch (error) {
          console.error('Payment failed:', error);
          alert('Payment failed');
        }
      }
    
      // Navigate to the next page after successful payment
      navigate('/order-confirmation');
    };


  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-4 text-green-700 hover:text-green-900 hover:bg-green-100"
          onClick={() => navigate('/markets')}
          
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Cart
        </Button>

        <h1 className="text-3xl font-bold mb-8 text-green-800">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card className="border-green-200">
              <CardHeader className="bg-green-100">
                <CardTitle className="text-green-800">Billing Details</CardTitle>
              </CardHeader>
              <CardContent className='bg-white'>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <p><br /></p>
                      <Label htmlFor="fullName" className="text-green-700">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="border-green-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="email" className="text-green-700">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-green-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="address" className="text-green-700">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="border-green-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-green-700" >City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="border-green-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-green-700">State</Label>
                      <Select
                        name="state"
                        value={formData.state}
                        onValueChange={(value) => setFormData(prevData => ({ ...prevData, state: value }))}
                      >
                        <SelectTrigger className="border-green-300 focus:border-green-500 focus:ring-green-500">
                          <SelectValue placeholder="Select state" className="text-black"/>
                        </SelectTrigger>
                        <SelectContent className="text-black">
                          <SelectItem value="AP">Andhra Pradesh</SelectItem>
                          <SelectItem value="KA">Karnataka</SelectItem>
                          <SelectItem value="TN">Tamil Nadu</SelectItem>
                          <SelectItem value="MH">Maharashtra</SelectItem>
                          <SelectItem value="GJ">Gujarat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-green-700">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="border-green-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <CardTitle className="mb-4 text-green-800">Payment Method</CardTitle>
                    <RadioGroup
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData(prevData => ({ ...prevData, paymentMethod: value }))}
                      className="space-y-2"
                    >
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="blockchain" id="blockchain" className="border-green-500 text-green-600" />
                        <Label htmlFor="blockchain" className="flex items-center text-green-700">
                          <Bitcoin className="mr-2 h-4 w-4" />
                          Blockchain Payment
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit-card" id="credit-card" className="border-green-500 text-green-600" />
                        <Label htmlFor="credit-card" className="flex items-center text-green-700">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Credit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" className="border-green-500 text-green-600" />
                        <Label htmlFor="cash-on-delivery" className="flex items-center text-green-700">
                          <Truck className="mr-2 h-4 w-4" />
                          Cash on Delivery
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.paymentMethod === 'credit-card' && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber" className="text-green-700">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          className="border-green-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate" className="text-green-700">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                            className="border-green-300 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-green-700">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                            className="border-green-300 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'blockchain' && (
                    <div className="mt-4">
                      <Label htmlFor="walletAddress" className="text-green-700">Wallet Address</Label>
                      <Input
                        id="walletAddress"
                        name="walletAddress"
                        value={formData.walletAddress}
                        onChange={handleInputChange}
                        required
                        className="border-green-300 focus:border-green-500 focus:ring-green-500"
                        placeholder="Enter your blockchain wallet address"
                      />
                    </div>
                  )}

                  {formData.paymentMethod === 'cash-on-delivery' && (
                    <div className="mt-4 p-4 bg-green-100 rounded-md">
                      <p className="text-green-700">
                        You have selected Cash on Delivery. Please have the exact amount ready when your order arrives.
                      </p>
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Place Order
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-green-200">
              <CardHeader className="bg-green-100">
                <CardTitle className="text-green-800">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className='bg-white'>
                <p><br /></p>
                <ul className="space-y-2">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between text-green-700">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-green-200">
                  <div className="flex justify-between font-bold text-green-800">
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billing