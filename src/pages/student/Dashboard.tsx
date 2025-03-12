
import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, CalendarDays, MessageSquare, Bell, LogOut } from 'lucide-react';

const StudentDashboard = () => {
  const { user, logout } = useAuth();

  // Sample data for dashboard
  const recentMaterials = [
    { id: 1, title: "Introduction to Computer Science", subject: "Computer Science" },
    { id: 2, title: "Calculus I Study Guide", subject: "Mathematics" },
    { id: 3, title: "Organic Chemistry Notes", subject: "Chemistry" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Programming Contest", date: "2023-12-15", location: "Computer Lab" },
    { id: 2, title: "Math Workshop", date: "2023-12-18", location: "Room 204" },
  ];

  const recentDiscussions = [
    { id: 1, title: "Help with Java assignment", replies: 5 },
    { id: 2, title: "Study group for finals", replies: 8 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link to="/study-materials" className="block hover:no-underline">
              <Card className="h-full neo-glass hover-scale transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    Study Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Access lecture notes, guides and resources</p>
                  <div className="space-y-2">
                    {recentMaterials.map(material => (
                      <div key={material.id} className="p-2 rounded-md bg-background/50">
                        <p className="font-medium text-sm">{material.title}</p>
                        <p className="text-xs text-muted-foreground">{material.subject}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/events" className="block hover:no-underline">
              <Card className="h-full neo-glass hover-scale transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl">
                    <CalendarDays className="mr-2 h-5 w-5 text-primary" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">View and register for campus events</p>
                  <div className="space-y-2">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="p-2 rounded-md bg-background/50">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} • {event.location}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/forum" className="block hover:no-underline">
              <Card className="h-full neo-glass hover-scale transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Discussions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Join conversations with peers and faculty</p>
                  <div className="space-y-2">
                    {recentDiscussions.map(discussion => (
                      <div key={discussion.id} className="p-2 rounded-md bg-background/50">
                        <p className="font-medium text-sm">{discussion.title}</p>
                        <p className="text-xs text-muted-foreground">{discussion.replies} replies</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card className="neo-glass">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Recent Announcements
                </CardTitle>
                <CardDescription>Important notices from faculty and administration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-md bg-background/50 border-l-4 border-primary">
                    <p className="font-medium">Final Exam Schedule Posted</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      The final examination schedule for the Fall semester has been posted. Please check your email for details.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Posted by Admin • 2 days ago</p>
                  </div>
                  
                  <div className="p-3 rounded-md bg-background/50 border-l-4 border-yellow-500">
                    <p className="font-medium">Campus Library Holiday Hours</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      The campus library will have adjusted hours during the upcoming holiday break. See announcement for details.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Posted by Dr. Smith • 4 days ago</p>
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

export default StudentDashboard;
