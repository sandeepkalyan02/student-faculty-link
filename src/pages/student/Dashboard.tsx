
import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Calendar, MessageSquare, Bell, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Sample data for the dashboard
  const recentMaterials = [
    { id: 1, title: "Introduction to Computer Science", subject: "Computer Science", downloadCount: 156 },
    { id: 2, title: "Calculus I Study Guide", subject: "Mathematics", downloadCount: 234 },
    { id: 3, title: "Organic Chemistry Notes", subject: "Chemistry", downloadCount: 98 }
  ];

  const upcomingEvents = [
    { id: 1, title: "Annual Tech Symposium", date: "Dec 15, 2023", venue: "Main Auditorium" },
    { id: 2, title: "Career Fair 2023", date: "Nov 20, 2023", venue: "University Sports Complex" }
  ];

  const recentDiscussions = [
    { id: 1, title: "Tips for Final Year Project", replies: 2, upvotes: 15 },
    { id: 2, title: "Calculus Study Group", replies: 3, upvotes: 23 }
  ];

  const importantNotices = [
    { id: 1, title: "End Semester Examination Schedule", category: "Examination", importance: "High" },
    { id: 2, title: "Campus Recruitment Drive by Tech Innovators", category: "Placement", importance: "Medium" }
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
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Button variant="outline" onClick={() => navigate('/profile')} className="hover-scale focus-ring">
                My Profile
              </Button>
              <Button variant="outline" onClick={logout} className="hover-scale focus-ring">
                Sign Out
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="neo-glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Study Materials</CardTitle>
                <CardDescription>Recently uploaded materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{recentMaterials.length}</div>
                <p className="text-sm text-muted-foreground mt-1">New materials this week</p>
              </CardContent>
            </Card>
            
            <Card className="neo-glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Events</CardTitle>
                <CardDescription>Upcoming campus events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{upcomingEvents.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Events in next 30 days</p>
              </CardContent>
            </Card>
            
            <Card className="neo-glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Forum</CardTitle>
                <CardDescription>Active discussions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{recentDiscussions.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Recent discussions</p>
              </CardContent>
            </Card>
            
            <Card className="neo-glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Notices</CardTitle>
                <CardDescription>Important announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{importantNotices.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Unread notices</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="neo-glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Recent Study Materials</CardTitle>
                  <Link to="/study-materials">
                    <Button variant="outline" size="sm" className="hover-scale focus-ring">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMaterials.map(material => (
                    <div key={material.id} className="flex items-center justify-between p-3 rounded-md hover:bg-accent transition-colors">
                      <div>
                        <h3 className="font-medium">{material.title}</h3>
                        <p className="text-sm text-muted-foreground">{material.subject}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="hover-scale focus-ring">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="neo-glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Upcoming Events</CardTitle>
                  <Link to="/events">
                    <Button variant="outline" size="sm" className="hover-scale focus-ring">
                      <Calendar className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="flex items-center justify-between p-3 rounded-md hover:bg-accent transition-colors">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{event.date}</span>
                          <span className="mx-2">•</span>
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="hover-scale focus-ring">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="neo-glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Recent Discussions</CardTitle>
                  <Link to="/forum">
                    <Button variant="outline" size="sm" className="hover-scale focus-ring">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDiscussions.map(discussion => (
                    <div key={discussion.id} className="flex items-center justify-between p-3 rounded-md hover:bg-accent transition-colors">
                      <div>
                        <h3 className="font-medium">{discussion.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          <span>{discussion.replies} replies</span>
                          <span className="mx-2">•</span>
                          <span>{discussion.upvotes} upvotes</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="hover-scale focus-ring">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="neo-glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Important Notices</CardTitle>
                  <Link to="/notice-board">
                    <Button variant="outline" size="sm" className="hover-scale focus-ring">
                      <Bell className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {importantNotices.map(notice => (
                    <div key={notice.id} className="flex items-center justify-between p-3 rounded-md hover:bg-accent transition-colors">
                      <div>
                        <h3 className="font-medium">{notice.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="px-1.5 py-0.5 text-xs rounded-full bg-primary/10 text-primary mr-2">
                            {notice.category}
                          </span>
                          <span className="px-1.5 py-0.5 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                            {notice.importance} Priority
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="hover-scale focus-ring">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
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
