import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Map, Camera } from 'lucide-react';

const SupportPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-8 text-green-800">Get Support</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <MessageCircle className="h-8 w-8 text-green-600" />
          </CardHeader>
          <CardContent>
            <CardTitle>Chat with Us</CardTitle>
            <p>Connect with our customer support team for real-time assistance.</p>
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">Chat Now</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Map className="h-8 w-8 text-green-600" />
          </CardHeader>
          <CardContent>
            <CardTitle>Explore our Locations</CardTitle>
            <p>Find local guides and experiences in your area of interest.</p>
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">Explore Locations</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Camera className="h-8 w-8 text-green-600" />
          </CardHeader>
          <CardContent>
            <CardTitle>Share Feedback</CardTitle>
            <p>Let us know how we can improve our platform and services.</p>
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">Submit Feedback</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportPage;