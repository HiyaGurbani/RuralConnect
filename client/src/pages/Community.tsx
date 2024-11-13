import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Star } from 'lucide-react';

const CommunityPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-8 text-green-800">Join the RuralConnect Community</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-green-600" />
          </CardHeader>
          <CardContent>
            <CardTitle>Connect with Locals</CardTitle>
            <p>Interact with guides, artisans, and other community members to learn about rural culture and traditions.</p>
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">Join Now</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <MessageCircle className="h-8 w-8 text-green-600" />
          </CardHeader>
          <CardContent>
            <CardTitle>Share Experiences</CardTitle>
            <p>Post reviews, photos, and stories from your rural travels to inspire others.</p>
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">Share Now</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Star className="h-8 w-8 text-green-600" />
          </CardHeader>
          <CardContent>
            <CardTitle>Earn Rewards</CardTitle>
            <p>Gain points and badges for your contributions to the community.</p>
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">Learn More</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunityPage;