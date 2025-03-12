
import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BookOpen, CalendarDays, MessageSquare, Bell, LogOut, CheckCircle, XCircle, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  // Sample data for dashboard
  const pendingApprovals = [
    { id: 1, title: "Advanced Physics Notes", type: "material", uploader: "Dr. Williams", date: "2023-12-01" },
    { id: 2, title: "Tech Conference", type: "event", organizer: "Prof. Davis", date: "2023-12-03" },
    { id: 3, title: "New Faculty Registration", type: "user", name: "Dr. Martinez", email: "martinez@example.com", date: "2023-12-05" },
  ];

  const recentActivities = [
    { id: 1, action: "Uploaded", item: "Calculus Study Guide", user: "Dr. Smith", time: "2 hours ago" },
    { id: 2, action: "Created", item: "Programming Contest", user: "Prof. Johnson", time: "4 hours ago" },
    { id: 3, action: "Posted", item: "Final Exam Schedule", user: "Admin User", time: "1 day ago" },
  ];

  const stats = [
    { label: "Total Users", value: 856, icon: Users },
    { label: "Study Materials", value: 324, icon: BookOpen },
    { label: "Upcoming Events", value: 18, icon: CalendarDays },
    { label: "Active Discussions", value: 47, icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Welcome back, {user?.name}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button variant="outline" onClick={logout} className="hover-scale focus-ring">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="neo-glass">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="neo-glass md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Pending Approvals
                </CardTitle>
                <CardDescription>Review and manage pending approvals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map(item => (
                    <div key={item.id} className="p-3 rounded-md bg-background/50 border border-border">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{item.title}</p>
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                              item.type === 'material' 
                                ? 'bg-blue-100 text-blue-800' 
                                : item.type === 'event'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {item.type}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.type === 'user' 
                              ? `${item.name} (${item.email})` 
                              : item.type === 'material'
                              ? `Uploaded by: ${item.uploader}`
                              : `Organized by: ${item.organizer}`
                            }
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Date: {new Date(item.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="neo-glass">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                  Platform Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>User Engagement</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Material Downloads</span>
                      <span className="font-medium">64%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Event Registrations</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Forum Activity</span>
                      <span className="font-medium">89%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="neo-glass">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Bell className="mr-2 h-5 w-5 text-primary" />
                Recent Platform Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-md bg-background/50">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {activity.action === "Uploaded" ? (
                        <BookOpen className="h-4 w-4 text-primary" />
                      ) : activity.action === "Created" ? (
                        <CalendarDays className="h-4 w-4 text-primary" />
                      ) : (
                        <Bell className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action.toLowerCase()} <span className="font-medium">{activity.item}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
