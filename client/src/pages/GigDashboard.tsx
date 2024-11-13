import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Briefcase, DollarSign, Clock, Star, ChevronRight, Search } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'


// Mock data for the dashboard
const activePrograms = [
  { id: 1, title: "Sustainable Agriculture Workshop", org: "Community Development Center", progress: 75, endDate: "2024-04-15" },
  { id: 2, title: "Digital Literacy Training", org: "Rural Empowerment Initiative", progress: 40, endDate: "2024-05-20" },
  { id: 3, title: "Small Business Mentorship", org: "Youth Entrepreneurship Club", progress: 90, endDate: "2024-03-31" },
]
const pastTours = [
  { 
    id: 1, 
    title: "Rural Village Tour", 
    date: "2024-03-15",
    participants: 35,
    rating: 4.8
  },
  {
    id: 2,
    title: "Eco-Tourism Trek",
    date: "2024-02-20",
    participants: 28,
    rating: 4.2
  },
  {
    id: 3, 
    title: "Cultural Immersion",
    date: "2024-01-31",
    participants: 42,
    rating: 4.5
  }
]

const recentImpact = [
  { id: 1, description: "Participants Completed Sustainable Agriculture Workshop", impact: 25, date: "2024-03-15" },
  { id: 2, title: "Digital Literacy Training Milestone", impact: 15, date: "2024-03-10" },
  { id: 3, title: "Small Business Mentorship Graduation", impact: 10, date: "2024-03-01" },
]

const impactData = [
  { month: 'Jan', impact: 30 },
  { month: 'Feb', impact: 35 },
  { month: 'Mar', impact: 43 },
  { month: 'Apr', impact: 38 },
  { month: 'May', impact: 45 },
  { month: 'Jun', impact: 50 },
]

export default function RuralYouthGuideDashboard() {
  const {id } = useParams();
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Guide Dashboard</h1>
          <div className='gap-2'>


          <Link  to="/explore">
          <Button>
            <Search className="mr-2 h-4 w-4" /> Search nearby visit
          </Button>
          </Link>

          <Link  to={`/profile/gig/673320037e07f2482a611526`}>
          <Button>
            View Profile
          </Button>
          </Link>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="programs">Active Programs</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={Briefcase} title="Active Programs" value="3" />
              <StatCard icon={DollarSign} title="Total Impact" value="100" />
              <StatCard icon={Clock} title="Avg. Program Duration" value="10 weeks" />
              <StatCard icon={Star} title="Guide Rating" value="4.9" />
            </div>

            <div className="grid gap-4 mt-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Tours</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={impactData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="impact" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Past Tours </CardTitle>
                </CardHeader>
                <CardContent>
                <ul className="space-y-4">
  {pastTours.map((tour) => (
    <li key={tour.id} className="flex items-center justify-between">
      <div>
        <p className="font-medium">{tour.title}</p>
        <p className="text-sm text-gray-500">{tour.date}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{tour.participants} Participants</p>
        <Badge 
          variant={
            tour.rating >= 4.5 ? "success" : 
            tour.rating >= 4.0 ? "warning" : 
            "default"
          }
        >
          {tour.rating} ★
        </Badge>
      </div>
    </li>
  ))}
</ul>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 mt-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={impactData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="impact" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {activePrograms.map((program) => (
                      <li key={program.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{program.title}</p>
                          <p className="text-sm text-gray-500">{program.org}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{program.progress}%</p>
                          <Progress value={program.progress} className="w-20" />
                        </div>
                        
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="programs">
            <Card>
              <CardHeader>
                <CardTitle>Your Active Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {activePrograms.map((program) => (
                    <li key={program.id}>
                      <ProgramCard program={program} />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact">
            <Card>
              <CardHeader>
                <CardTitle>Recent Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentImpact.map((impact) => (
                    <li key={impact.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{impact.description}</p>
                        <p className="text-sm text-gray-500">{impact.date}</p>
                      </div>
                      <p className="font-medium text-green-600">{impact.impact}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Program Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {['Agriculture Workshop', 'Digital Literacy Training', 'Small Business Mentorship', 'Youth Leadership Program', 'Vocational Skills Training'].map((application, index) => (
                    <li key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{application}</p>
                        <p className="text-sm text-gray-500">Submitted: {new Date().toLocaleDateString()}</p>
                      </div>
                      <Badge variant={index === 0 ? "success" : index === 1 ? "warning" : "default"}>
                        {index === 0 ? "Accepted" : index === 1 ? "Pending" : "Submitted"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, title, value }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center p-6">
        <Icon className="h-8 w-8 text-green-600 mb-2" />
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}

function ProgramCard({ program }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold">{program.title}</h3>
            <p className="text-sm text-gray-500">{program.org}</p>
          </div>
          <Badge variant={program.progress >= 90 ? "success" : program.progress >= 50 ? "warning" : "default"}>
            {program.progress}% Complete
          </Badge>
        </div>
        <Progress value={program.progress} className="mb-2" />
        <div className="flex justify-between text-sm">
          <span>Ends: {program.endDate}</span>
          <Link to="#" className="text-green-600 hover:underline">View Details</Link>
        </div>
      </CardContent>
    </Card>
  )
}