
import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, CalendarDays, MessageSquare, Bell, LogOut, Upload, PlusCircle } from 'lucide-react';

const FacultyDashboard = () => {
  const { user, logout } = useAuth();

  // Sample data for dashboard
  const myMaterials = [
    { id: 1, title: "Digital Electronics Slides", status: "Approved", downloads: 147 },
    { id: 2, title: "Network Theory Notes", status: "Pending Approval", downloads: 0 },
  ];

  const myEvents = [
    { id: 1, title: "Programming Contest", date: "2023-12-15", registrations: 24 },
    { id: 2, title: "Guest Lecture Series", date: "2023-12-20", registrations: 18 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="neo-glass">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center text-xl">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    My Materials
                  </CardTitle>
                  <Link to="/study-materials">
                    <Button size="sm" variant="outline" className="hover-scale focus-ring">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {myMaterials.map(material => (
                    <div key={material.id} className="p-3 rounded-md bg-background/50 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{material.title}</p>
                        <div className="flex gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            material.status === 'Approved' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {material.status}
                          </span>
                          {material.status === 'Approved' && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                              {material.downloads} downloads
                            </span>
                          )}
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">Edit</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="neo-glass">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center text-xl">
                    <CalendarDays className="mr-2 h-5 w-5 text-primary" />
                    My Events
                  </CardTitle>
                  <Link to="/events">
                    <Button size="sm" variant="outline" className="hover-scale focus-ring">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Event
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {myEvents.map(event => (
                    <div key={event.id} className="p-3 rounded-md bg-background/50 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            Date: {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {event.registrations} registrations
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">Manage</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="neo-glass">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center text-xl">
                    <Bell className="mr-2 h-5 w-5 text-primary" />
                    Post Announcement
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="announcement-title">
                      Title
                    </label>
                    <input 
                      id="announcement-title"
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Announcement title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="announcement-content">
                      Content
                    </label>
                    <textarea
                      id="announcement-content"
                      className="w-full p-2 border rounded-md min-h-[100px]"
                      placeholder="Announcement details..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <Button className="hover-scale focus-ring">
                      Post Announcement
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="neo-glass">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                  Recent Forum Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-md bg-background/50">
                    <p className="font-medium">Help with Java assignment</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Student asking about inheritance in Java programming...
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">Posted by John Student • 2 hours ago</p>
                      <Link to="/forum">
                        <Button size="sm" variant="ghost">Reply</Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-md bg-background/50">
                    <p className="font-medium">Study group for finals</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Students organizing a study group for the upcoming final exams...
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">Posted by Student Name • 1 day ago</p>
                      <Link to="/forum">
                        <Button size="sm" variant="ghost">Reply</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FacultyDashboard;
