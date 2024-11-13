'use client'

import { useState } from 'react'
import { ethers, BrowserProvider } from 'ethers'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Clock, Users, GraduationCap, Bitcoin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import bgd from '../assets/dp.png'

export default function CourseEnrollment({ courseId = '1' }) {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('traditional')
  const [walletAddress, setWalletAddress] = useState('')
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/courses'); 
  };

  // Mock course data (in a real app, this would be fetched based on the courseId)
  const course = {
    id: 1,
    name: "Digital Payments & UPI",
    category: "Financial Literacy",
    duration: "2 weeks",
    language: "Hindi, English",
    enrolled: 1240,
    image: bgd,
    instructor: "Priya Sharma",
    price: 199,
    cryptoPrice: 0.001, // Example crypto price in ETH
    level: "Beginner",
    description: "Learn the basics of digital payments and how to use UPI safely and effectively."
  }

  const handleBlockchainPayment = async () => {
    if (!window.ethereum) {
      alert("Please install a Web3 wallet like MetaMask.")
      return
    }

    setLoading(true)

    try {
      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      const tx = await signer.sendTransaction({
        to: '0xB7AA1989aa2AD13ACDC1B922b8890d58ca81974a',  // Receiver's wallet address
        value: ethers.parseEther(course.cryptoPrice.toString()),  // Amount in Wei
      })

      console.log('Transaction sent:', tx)
      await tx.wait() // Wait for the transaction to be mined
      alert('Payment sent successfully')
    //   router.push('/courses') // Navigate back to explore courses
      navigate('/courses');
    } catch (error) {
      console.error(error)
      alert("Transaction failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (paymentMethod === 'blockchain') {
      if (!walletAddress) {
        alert("Please enter your wallet address.")
        return
      }
      await handleBlockchainPayment()
    } else {
      // Traditional payment mock
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        alert(`Enrollment Successful! You have successfully enrolled in ${course.name}.`)
        // router.push('/explore-courses') // Navigate back to explore courses
        navigate('/courses');
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <Button variant="ghost" size="icon" className="mr-4" onClick={handleBack}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Course Enrollment</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={course.image} alt={course.name} className="w-full h-65 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{course.name}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-2 h-4 w-4" />
                {course.duration}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="mr-2 h-4 w-4" />
                {course.enrolled.toLocaleString()} students
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <BookOpen className="mr-2 h-4 w-4" />
                {course.language}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <GraduationCap className="mr-2 h-4 w-4" />
                {course.level}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email address" required />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" required />
              </div>
              <div>
                <Label>Preferred Language</Label>
                <RadioGroup defaultValue="hindi">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hindi" id="hindi" />
                    <Label htmlFor="hindi">Hindi</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="english" id="english" />
                    <Label htmlFor="english">English</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                //   id="blockchain-payment"
                //   checked={paymentMethod === 'blockchain'}
                //   onCheckedChange={(checked) => setPaymentMethod(checked ? 'blockchain' : 'traditional')}
                //   className="border-2 border-green-600 bg-green-100 data-[state=checked]:bg-green-200 relative inline-flex h-6 w-11 items-center rounded-full"
                //   />
                //   <Switch
  id="blockchain-payment"
  checked={paymentMethod === 'blockchain'}
  onCheckedChange={(checked) => setPaymentMethod(checked ? 'blockchain' : 'traditional')}
  className="border-2 border-green-600 bg-green-100 data-[state=checked]:bg-green-600 relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
>
  <span
    className={`${
      paymentMethod === 'blockchain' ? 'translate-x-5 bg-white' : 'translate-x-1 bg-gray-400'
    } inline-block h-4 w-4 rounded-full transition-transform`}
  />
</Switch>
                <Label htmlFor="blockchain-payment">Pay with Cryptocurrency</Label>
              </div>
              {paymentMethod === 'blockchain' && (
                <div>
                  <Label htmlFor="wallet-address">Wallet Address</Label>
                  <Input
                    id="wallet-address"
                    placeholder="Enter your Ethereum wallet address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">
                  {paymentMethod === 'blockchain' ? (
                    <span className="flex items-center">
                      <Bitcoin className="mr-2 h-6 w-6" />
                      {course.cryptoPrice} ETH
                    </span>
                  ) : (
                    `₹${course.price}`
                  )}
                </span>
                <Button type="submit" disabled={loading}>
                  {loading ? "Processing..." : "Confirm Enrollment"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}