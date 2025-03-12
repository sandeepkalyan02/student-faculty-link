
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Calendar, Filter, MapPin, Users, Clock, CalendarPlus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Sample data for events
const SAMPLE_EVENTS = [
  {
    id: 1,
    title: "Programming Contest",
    description: "Participate in our annual programming competition and showcase your coding skills",
    category: "Competition",
    date: "2023-12-15",
    time: "10:00 AM - 4:00 PM",
    location: "Computer Science Building, Room 302",
    organizer: "Dr. Smith",
    department: "Computer Science",
    registrations: 42,
    maxRegistrations: 50,
    attachments: [
      { name: "Contest Rules.pdf", size: "245 KB" },
      { name: "Registration Form.docx", size: "125 KB" }
    ]
  },
  {
    id: 2,
    title: "Business Ethics Workshop",
    description: "A workshop on ethical practices in modern business environments",
    category: "Workshop",
    date: "2023-12-18",
    time: "2:00 PM - 5:00 PM",
    location: "Business School, Auditorium A",
    organizer: "Prof. Johnson",
    department: "Business",
    registrations: 28,
    maxRegistrations: 75,
    attachments: [
      { name: "Workshop Outline.pdf", size: "320 KB" },
      { name: "Preparation Materials.pdf", size: "1.2 MB" }
    ]
  },
  {
    id: 3,
    title: "Chemistry Research Symposium",
    description: "Annual symposium showcasing recent advances in chemistry research",
    category: "Symposium",
    date: "2023-12-20",
    time: "9:00 AM - 6:00 PM",
    location: "Science Building, Conference Hall",
    organizer: "Dr. Williams",
    department: "Chemistry",
    registrations: 65,
    maxRegistrations: 100,
    attachments: [
      { name: "Schedule.pdf", size: "410 KB" },
      { name: "Abstract Booklet.pdf", size: "2.3 MB" }
    ]
  },
  {
    id: 4,
    title: "Literature Reading Club",
    description: "Monthly meeting of the campus literature reading club",
    category: "Club Meeting",
    date: "2023-12-22",
    time: "4:00 PM - 6:00 PM",
    location: "Arts Building, Room 104",
    organizer: "Prof. Davis",
    department: "English Literature",
    registrations: 18,
    maxRegistrations: 30,
    attachments: [
      { name: "Reading List.pdf", size: "185 KB" }
    ]
  },
  {
    id: 5,
    title: "Career Fair",
    description: "Connect with potential employers and explore career opportunities",
    category: "Career Development",
    date: "2024-01-10",
    time: "10:00 AM - 3:00 PM",
    location: "Student Center, Main Hall",
    organizer: "Career Services",
    department: "Administration",
    registrations: 120,
    maxRegistrations: 200,
    attachments: [
      { name: "Participating Companies.pdf", size: "520 KB" },
      { name: "Resume Tips.pdf", size: "275 KB" }
    ]
  }
];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(SAMPLE_EVENTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user, checkAccess } = useAuth();
  
  const canCreateEvent = user && checkAccess(['faculty', 'admin']);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = SAMPLE_EVENTS.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
    
    if (filtered.length === 0) {
      toast.info("No events found matching your search");
    } else {
      toast.success(`Found ${filtered.length} events`);
    }
  };

  const handleRegister = (eventId: number) => {
    // In a real app, this would register the user for the event
    toast.success("Registration successful", { 
      description: "You have been registered for this event." 
    });
  };

  const handleDownloadAttachment = (attachmentName: string) => {
    // In a real app, this would trigger a download
    toast.success("Download started", { 
      description: `${attachmentName} will be downloaded shortly.` 
    });
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
                Discover and register for upcoming events on campus
              </p>
            </div>
            {canCreateEvent && (
              <Button className="mt-4 md:mt-0 hover-scale focus-ring">
                <CalendarPlus className="mr-2 h-4 w-4" />
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
                    placeholder="Search by title, description, or category..."
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
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="registered">My Registrations</TabsTrigger>
              {canCreateEvent && (
                <TabsTrigger value="created">My Events</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              {filteredEvents.map(event => (
                <Card key={event.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                      </div>
                      <div className="flex flex-shrink-0 items-center">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {event.category}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-muted-foreground">Date & Time</p>
                          <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
                          <p className="text-xs">{event.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p className="font-medium">{event.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-muted-foreground">Registration</p>
                          <p className="font-medium">
                            {event.registrations}/{event.maxRegistrations} spots filled
                          </p>
                          <div className="w-full bg-secondary h-1.5 rounded-full mt-1">
                            <div 
                              className="bg-primary h-1.5 rounded-full" 
                              style={{ width: `${(event.registrations / event.maxRegistrations) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {event.attachments.length > 0 && (
                      <div className="border-t pt-3 mt-2">
                        <p className="text-sm font-medium mb-2">Attachments:</p>
                        <div className="flex flex-wrap gap-2">
                          {event.attachments.map((attachment, index) => (
                            <Button 
                              key={index}
                              size="sm"
                              variant="outline"
                              className="text-xs"
                              onClick={() => handleDownloadAttachment(attachment.name)}
                            >
                              {attachment.name} ({attachment.size})
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Organized by {event.organizer} • {event.department} Department
                    </div>
                    <Button 
                      onClick={() => handleRegister(event.id)}
                      disabled={event.registrations >= event.maxRegistrations}
                      className="hover-scale focus-ring"
                    >
                      {event.registrations >= event.maxRegistrations ? "Fully Booked" : "Register"}
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
            
            <TabsContent value="upcoming" className="space-y-6">
              {/* Filter for upcoming events (would use date filtering in a real app) */}
              {filteredEvents.filter(e => new Date(e.date) >= new Date()).map(event => (
                <Card key={event.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  {/* Same card content as above */}
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                      </div>
                      <div className="flex flex-shrink-0 items-center">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {event.category}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-muted-foreground">Date & Time</p>
                          <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
                          <p className="text-xs">{event.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p className="font-medium">{event.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-muted-foreground">Registration</p>
                          <p className="font-medium">
                            {event.registrations}/{event.maxRegistrations} spots filled
                          </p>
                          <div className="w-full bg-secondary h-1.5 rounded-full mt-1">
                            <div 
                              className="bg-primary h-1.5 rounded-full" 
                              style={{ width: `${(event.registrations / event.maxRegistrations) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {event.attachments.length > 0 && (
                      <div className="border-t pt-3 mt-2">
                        <p className="text-sm font-medium mb-2">Attachments:</p>
                        <div className="flex flex-wrap gap-2">
                          {event.attachments.map((attachment, index) => (
                            <Button 
                              key={index}
                              size="sm"
                              variant="outline"
                              className="text-xs"
                              onClick={() => handleDownloadAttachment(attachment.name)}
                            >
                              {attachment.name} ({attachment.size})
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Organized by {event.organizer} • {event.department} Department
                    </div>
                    <Button 
                      onClick={() => handleRegister(event.id)}
                      disabled={event.registrations >= event.maxRegistrations}
                      className="hover-scale focus-ring"
                    >
                      {event.registrations >= event.maxRegistrations ? "Fully Booked" : "Register"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="registered" className="space-y-6">
              {/* In a real app, this would show events the user has registered for */}
              <div className="text-center py-12">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No registered events</h3>
                <p className="mt-2 text-muted-foreground">
                  You haven't registered for any events yet.
                </p>
              </div>
            </TabsContent>
            
            {canCreateEvent && (
              <TabsContent value="created" className="space-y-6">
                {/* In a real app, this would show events created by faculty/admin */}
                <div className="text-center py-12">
                  <CalendarPlus className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No events created</h3>
                  <p className="mt-2 text-muted-foreground">
                    You haven't created any events yet.
                  </p>
                  <Button className="mt-6 hover-scale focus-ring">
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Create Your First Event
                  </Button>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
