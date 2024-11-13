import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';  // Import Firebase auth
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthPage = () => {
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer',
  });
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (!isLoginMode) {
      await handleSignup();
    } else {
      await handleLogin();
    }
  };

  // Handle login using Firebase Authentication
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert('Logged in successfully!');
      // Redirect based on the role if needed
      navigator(`/profile/${formData.role}`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign-up using Firebase Authentication
  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      alert('Account created successfully!');
      // Redirect to the profile page after successful signup based on the role
      navigator(`/profile/${formData.role}`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md bg-green-50 border-green-200">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="login"
              onClick={() => {
                setIsLoginMode(true);
                setFormData({ name: '', email: '', password: '', role: 'buyer' });
              }}
              className="bg-green-200 text-green-900 hover:bg-green-300"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              onClick={() => {
                setIsLoginMode(false);
                setFormData({ name: '', email: '', password: '', role: 'buyer' });
              }}
              className="bg-green-200 text-green-900 hover:bg-green-300"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="text-green-900">Login</CardTitle>
                <CardDescription className="text-green-700">
                  Enter your credentials to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-green-900">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={handleChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-green-900">
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    required
                    onChange={handleChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="text-green-900">Sign Up</CardTitle>
                <CardDescription className="text-green-700">
                  Create an account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-green-900">
                    Full Name
                  </Label>
                  <Input
                    id="signup-name"
                    name="name"
                    placeholder="John Doe"
                    required
                    onChange={handleChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-green-900">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={handleChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-green-900">
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    required
                    onChange={handleChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-green-900">Account Role</Label>
                  <RadioGroup
                    defaultValue={formData.role}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))} 
                    className="flex flex-wrap"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="buyer" id="buyer" />
                      <Label htmlFor="buyer" className="text-green-900">Traveller</Label>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <RadioGroupItem value="guide" id="guide" />
                      <Label htmlFor="guide" className="text-green-900">Guide</Label>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <RadioGroupItem value="seller" id="seller" />
                      <Label htmlFor="seller" className="text-green-900">Seller</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthPage;
