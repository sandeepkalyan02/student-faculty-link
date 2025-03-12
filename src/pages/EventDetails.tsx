
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Download, 
  User, 
  Users, 
  FileText,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { getEventById, rsvpToEvent } from '@/api/events';
import { format } from 'date-fns';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => getEventById(id || ''),
    enabled: !!id
  });
  
  const rsvpMutation = useMutation({
    mutationFn: ({ status }: { status: string }) => 
      rsvpToEvent(id || '', user?.id || '', status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event', id] });
      toast.success('RSVP updated successfully');
    },
    onError: () => {
      toast.error('Failed to update RSVP');
    }
  });

  const handleRSVP = (status: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to RSVP');
      return;
    }
    
    rsvpMutation.mutate({ status });
  };
  
  const getUserRSVPStatus = () => {
    if (!user || !event) return null;
    
    const userRSVP = event.rsvps.find(rsvp => rsvp.user.id === user.id);
    return userRSVP ? userRSVP.status : null;
  };
  
  const userRSVPStatus = getUserRSVPStatus();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/events">
              <Button>Back to Events</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl animate-fade-in">
          <div className="mb-6">
            <Link to="/events" className="text-primary hover:underline inline-flex items-center">
              ← Back to Events
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="neo-glass overflow-hidden">
                {event.imageUrl && (
                  <div className="h-64 w-full overflow-hidden">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl md:text-3xl">{event.title}</CardTitle>
                      <CardDescription className="mt-2">
                        <Badge variant={event.eventType === 'Academic' ? 'default' : 'secondary'}>
                          {event.eventType}
                        </Badge>
                        {event.department && (
                          <Badge variant="outline" className="ml-2">
                            {event.department}
                          </Badge>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">
                          {format(new Date(event.startDate), 'MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">
                          {format(new Date(event.startDate), 'h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{event.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Organized by</p>
                        <p className="font-medium">{event.organizer}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{event.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6 neo-glass">
                <CardHeader>
                  <CardTitle className="text-xl">Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  {event.attachments.length > 0 ? (
                    <div className="space-y-3">
                      {event.attachments.map((attachment) => (
                        <div 
                          key={attachment.id} 
                          className="flex items-center justify-between p-3 rounded-md border hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-primary" />
                            <div>
                              <p className="font-medium">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">{attachment.fileSize} • {attachment.fileType}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="hover-scale">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-6">No attachments available for this event</p>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="neo-glass">
                <CardHeader>
                  <CardTitle className="text-xl">RSVP</CardTitle>
                  <CardDescription>Let the organizer know if you're attending</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <Button 
                        className={`w-full ${userRSVPStatus === 'going' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                        onClick={() => handleRSVP('going')}
                        disabled={rsvpMutation.isPending}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        I'm Going
                      </Button>
                      <Button 
                        variant="outline"
                        className={`w-full ${userRSVPStatus === 'not_going' ? 'bg-red-100 border-red-300 text-red-600' : ''}`}
                        onClick={() => handleRSVP('not_going')}
                        disabled={rsvpMutation.isPending}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Can't Go
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-muted-foreground mb-3">Please login to RSVP for this event</p>
                      <Link to="/auth/choice">
                        <Button className="w-full">Login</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {event.rsvps.filter(rsvp => rsvp.status === 'going').length} going
                    </span>
                  </div>
                </CardFooter>
              </Card>
              
              <Card className="mt-6 neo-glass">
                <CardHeader>
                  <CardTitle className="text-xl">Organizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={event.createdBy.avatar || ''} alt={event.createdBy.name} />
                      <AvatarFallback>{event.createdBy.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{event.createdBy.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{event.createdBy.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetails;
