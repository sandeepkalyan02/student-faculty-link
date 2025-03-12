
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Calendar, Clock, MapPin, Users, Download, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

// Sample data for events
const SAMPLE_EVENTS = [
  {
    id: 1,
    title: "Annual Tech Symposium",
    description: "Join us for the annual technology symposium featuring guest speakers from leading tech companies.",
    category: "Academic",
    department: "Computer Science",
    venue: "Main Auditorium",
    date: "2023-12-15",
    time: "09:00 AM - 05:00 PM",
    organizer: "Dr. James Wilson",
    capacity: 500,
    registered: 327,
    attachments: [
      { name: "Event Schedule.pdf", size: "1.2 MB" }
    ]
  },
  {
    id: 2,
    title: "Career Fair 2023",
    description: "Connect with over 50 companies looking to hire students and graduates for internships and full-time positions.",
    category: "Career",
    department: "Placement Cell",
    venue: "University Sports Complex",
    date: "2023-11-20",
    time: "10:00 AM - 04:00 PM",
    organizer: "Placement Office",
    capacity: 1000,
    registered: 756,
    attachments: [
      { name: "Company List.pdf", size: "2.1 MB" },
      { name: "CV Format.docx", size: "550 KB" }
    ]
  },
  {
    id: 3,
    title: "Chemical Engineering Workshop",
    description: "Hands-on workshop on advanced chemical engineering principles and laboratory techniques.",
    category: "Academic",
    department: "Chemical Engineering",
    venue: "Chemical Engineering Lab",
    date: "2023-12-05",
    time: "02:00 PM - 05:00 PM",
    organizer: "Prof. Sarah Johnson",
    capacity: 60,
    registered: 42,
    attachments: [
      { name: "Workshop Material.pdf", size: "3.5 MB" }
    ]
  },
  {
    id: 4,
    title: "Entrepreneurship Seminar",
    description: "Learn from successful entrepreneurs about starting your own business and securing funding.",
    category: "Career",
    department: "Business School",
    venue: "Business School Seminar Hall",
    date: "2023-11-25",
    time: "01:00 PM - 03:00 PM",
    organizer: "Prof. Robert Miller",
    capacity: 120,
    registered: 98,
    attachments: []
  },
  {
    id: 5,
    title: "Cultural Festival",
    description: "Annual cultural festival featuring music, dance, art, and food from diverse cultures.",
    category: "Cultural",
    department: "Student Affairs",
    venue: "Campus Grounds",
    date: "2023-12-10",
    time: "11:00 AM - 10:00 PM",
    organizer: "Cultural Committee",
    capacity: 2000,
    registered: 1256,
    attachments: [
      { name: "Festival Schedule.pdf", size: "1.8 MB" },
      { name: "Campus Map.pdf", size: "900 KB" }
    ]
  }
];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(SAMPLE_EVENTS);
  const { user } = useAuth();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = SAMPLE_EVENTS.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
    
    if (filtered.length === 0) {
      toast.info("No events found matching your search");
    } else {
      toast.success(`Found ${filtered.length} events`);
    }
  };

  const handleRegister = (eventId: number) => {
    // In a real app, this would call an API to register the user
    toast.success("Registration successful", { 
      description: "You have been registered for this event" 
    });
  };

  const handleDownload = (attachmentName: string) => {
    // In a real app, this would trigger a download
    toast.success("Download started", { 
      description: `${attachmentName} will be downloaded shortly` 
    });
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Campus Events</h1>
              <p className="text-muted-foreground mt-2">
                Discover and register for upcoming events
              </p>
            </div>
            {(user?.role === 'faculty' || user?.role === 'admin') && (
              <Button className="mt-4 md:mt-0 hover-scale focus-ring">
                <Calendar className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            )}
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, description, category or department..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="hover-scale focus-ring">
                  Search
                </Button>
                <Button type="button" variant="outline" className="hover-scale focus-ring">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </form>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="career">Career</TabsTrigger>
              <TabsTrigger value="cultural">Cultural</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredEvents.map(event => (
                <Card key={event.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Category: </span>
                          <span className="font-medium">{event.category}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Department: </span>
                          <span className="font-medium">{event.department}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Organizer: </span>
                          <span className="font-medium">{event.organizer}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{event.registered} / {event.capacity} registered</span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {event.category}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {event.attachments.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Attachments</h4>
                        <div className="space-y-2">
                          {event.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center justify-between p-2 rounded-md bg-slate-100 dark:bg-slate-800">
                              <span className="text-sm">{attachment.name} ({attachment.size})</span>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleDownload(attachment.name)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs text-muted-foreground">
                      {event.registered < event.capacity 
                        ? `${event.capacity - event.registered} spots remaining` 
                        : "Event fully booked"}
                    </div>
                    <Button 
                      onClick={() => handleRegister(event.id)}
                      disabled={event.registered >= event.capacity}
                      className="hover-scale focus-ring"
                    >
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No events found</h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your search or filters to find events.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="academic" className="space-y-4">
              {filteredEvents.filter(e => e.category === "Academic").map(event => (
                // Similar card structure as above
                <Card key={event.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Category: </span>
                          <span className="font-medium">{event.category}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Department: </span>
                          <span className="font-medium">{event.department}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Organizer: </span>
                          <span className="font-medium">{event.organizer}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs text-muted-foreground">
                      {event.registered < event.capacity 
                        ? `${event.capacity - event.registered} spots remaining` 
                        : "Event fully booked"}
                    </div>
                    <Button 
                      onClick={() => handleRegister(event.id)}
                      disabled={event.registered >= event.capacity}
                      className="hover-scale focus-ring"
                    >
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="career" className="space-y-4">
              {filteredEvents.filter(e => e.category === "Career").map(event => (
                // Similar card structure as above
                <Card key={event.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Category: </span>
                          <span className="font-medium">{event.category}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Department: </span>
                          <span className="font-medium">{event.department}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Organizer: </span>
                          <span className="font-medium">{event.organizer}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs text-muted-foreground">
                      {event.registered < event.capacity 
                        ? `${event.capacity - event.registered} spots remaining` 
                        : "Event fully booked"}
                    </div>
                    <Button 
                      onClick={() => handleRegister(event.id)}
                      disabled={event.registered >= event.capacity}
                      className="hover-scale focus-ring"
                    >
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="cultural" className="space-y-4">
              {filteredEvents.filter(e => e.category === "Cultural").map(event => (
                // Similar card structure as above
                <Card key={event.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Category: </span>
                          <span className="font-medium">{event.category}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Department: </span>
                          <span className="font-medium">{event.department}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Organizer: </span>
                          <span className="font-medium">{event.organizer}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs text-muted-foreground">
                      {event.registered < event.capacity 
                        ? `${event.capacity - event.registered} spots remaining` 
                        : "Event fully booked"}
                    </div>
                    <Button 
                      onClick={() => handleRegister(event.id)}
                      disabled={event.registered >= event.capacity}
                      className="hover-scale focus-ring"
                    >
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
