'use client'

import React, { useState } from 'react'
// import Image from 'next/image'
import { ChevronLeft, ShoppingCart, Search, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom';


import img2 from '../assets/basket.png';
import img3 from '../assets/honey.png';
import img4 from '../assets/pot.png';
import img5 from '../assets/bag.png';
import img6 from '../assets/eco.png';
import img7 from '../assets/seed.png';
import bg from '../assets/village.jpeg';

const BrowseProducts = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [cart, setCart] = useState([])

  const navigate = useNavigate();

  

  const handleBack = () => {
    navigate('/'); 
  };

  const handleCheckout = () => {
    navigate('/billing'); 
  };

  

  const products = [
        {
          id: 1,
          name: "Handwoven Bamboo Basket",
          price: 499,
          image: img2,
          artisan: "Lakshmi Devi",
          village: "Madanapalle, AP"
        },
        {
          id: 2,
          name: "Organic Wild Honey",
          price: 299,
          image: img3,
          artisan: "Tribal Cooperative",
          village: "Araku Valley"
        },
        {
          id: 3,
          name: "Hand-painted Terracotta Pots",
          price: 399,
          image: img4,
          artisan: "Ram Kumar",
          village: "Kutch, Gujarat"
        },
        {
          id: 4,
          name: "Traditional Jute Bags",
          price: 199,
          image: img5,
          artisan: "Women's SHG",
          village: "Sundarbans, WB"
        },
        {
          id: 5,
          name: "Brass Bell Series",
          price: 599,
          image: img7,
          artisan: "Mohan Crafts",
          village: "Moradabad, UP"
        },
        {
          id: 6,
          name: "Organic Millet Pack",
          price: 249,
          image: img6,
          artisan: "Farmers Collective",
          village: "Anantapur, AP"
        }
      ];

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
          <button className="hover:bg-green-700 p-2 rounded-full" onClick={handleBack}>
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">RuralConnect</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-green-700" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-green-700 relative" onClick={() => setIsCartOpen(!isCartOpen)}>
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1">
                  {cart.length}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-green-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Image Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Rural Craftsmanship</h1>
            <p className="text-xl md:text-2xl mb-8">Authentic products from the heart of India</p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Explore Now
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="bg-white p-4 shadow-md">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg z-20 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.map(item => (
                <Card key={item.id} className="mb-2">
                  <CardContent className="p-2 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              ))}
              <div className="mt-4">
                <p className="font-bold">Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}</p>
                <Button className="w-full mt-2" onClick={handleCheckout}>Checkout</Button> 
              </div>
            </>
          )}
        </div>
      )}

      {/* Menu Sidebar */}
      {isMenuOpen && (
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-20 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <ul className="space-y-2">
            <li><Button variant="ghost" className="w-full justify-start">Home</Button></li>
            <li><Button variant="ghost" className="w-full justify-start">Categories</Button></li>
            <li><Button variant="ghost" className="w-full justify-start">About Us</Button></li>
            <li><Button variant="ghost" className="w-full justify-start">Contact</Button></li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Browse Rural Products</h2>
          <p className="text-gray-600">Discover authentic crafts and products from rural artisans</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600">By {product.artisan}</p>
                <p className="text-xs text-gray-500">{product.village}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                  <Button onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About RuralConnect</h3>
              <p className="text-gray-400">Bridging the gap between rural artisans and urban markets, promoting sustainable livelihoods.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Our Artisans</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@ruralconnect.in</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: Bangalore, India</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 RuralConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BrowseProducts