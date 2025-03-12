
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Upload, MapPin, FileText, X, Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { createEvent } from '@/api/events';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const departmentOptions = [
  'Engineering',
  'Science',
  'Business',
  'Arts',
  'Medicine',
  'Law',
  'All Departments'
];

const eventTypeOptions = [
  'Academic',
  'Cultural',
  'Sports',
  'Workshop',
  'Seminar',
  'Conference',
  'Other'
];

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    department: '',
    organizer: user?.name || '',
    eventType: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    startTime: '',
    endTime: '',
    imageUrl: ''
  });
  
  const [attachments, setAttachments] = useState<Array<{
    name: string;
    fileUrl: string;
    fileType: string;
    fileSize: string;
    file: File;
  }>>([]);
  
  const eventMutation = useMutation({
    mutationFn: (data: any) => createEvent(data, user?.id || ''),
    onSuccess: () => {
      toast.success('Event created successfully');
      navigate('/events');
    },
    onError: () => {
      toast.error('Failed to create event');
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDateChange = (name: string, date: Date | null) => {
    setFormData(prev => ({ ...prev, [name]: date }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Format file size
      let size = file.size;
      let sizeLabel = 'B';
      
      if (size > 1024) {
        size = size / 1024;
        sizeLabel = 'KB';
      }
      
      if (size > 1024) {
        size = size / 1024;
        sizeLabel = 'MB';
      }
      
      // In a real app, we would upload the file to storage and get a URL
      // For this demo, we'll create a fake URL
      const fileUrl = `https://example.com/files/${file.name}`;
      
      setAttachments(prev => [...prev, {
        name: file.name,
        fileUrl,
        fileType: file.type.split('/')[1].toUpperCase(),
        fileSize: `${size.toFixed(1)} ${sizeLabel}`,
        file
      }]);
      
      // Clear the input
      e.target.value = '';
    }
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const { title, description, location, department, organizer, eventType, startDate, endDate, startTime, endTime } = formData;
    
    if (!title || !description || !location || !department || !organizer || !eventType || !startDate || !endDate || !startTime || !endTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Combine date and time
    const startDateTime = new Date(startDate.getTime());
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    startDateTime.setHours(startHours, startMinutes);
    
    const endDateTime = new Date(endDate.getTime());
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    endDateTime.setHours(endHours, endMinutes);
    
    if (startDateTime >= endDateTime) {
      toast.error('End time must be after start time');
      return;
    }
    
    // Prepare attachments data
    const attachmentsData = attachments.map(({ name, fileUrl, fileType, fileSize }) => ({
      name,
      fileUrl,
      fileType,
      fileSize
    }));
    
    // Submit event
    eventMutation.mutate({
      title,
      description,
      location,
      department,
      organizer,
      eventType,
      startDate: startDateTime,
      endDate: endDateTime,
      imageUrl: formData.imageUrl,
      attachments: attachmentsData
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl animate-fade-in">
          <div className="flex flex-col items-center text-center mb-8">
            <Calendar className="h-12 w-12 text-primary mb-4" />
            <h1 className="text-3xl font-bold">Create Event</h1>
            <p className="text-muted-foreground mt-2 max-w-md">
              Organize and schedule a new event for the campus community
            </p>
          </div>
          
          <Card className="neo-glass">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input 
                    id="title" 
                    name="title"
                    placeholder="E.g., Annual Programming Contest" 
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Provide details about the event" 
                    className="min-h-32"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      name="location"
                      placeholder="E.g., Main Auditorium" 
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select 
                      value={formData.department} 
                      onValueChange={(value) => handleSelectChange('department', value)}
                      required
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departmentOptions.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organizer">Organizer</Label>
                    <Input 
                      id="organizer" 
                      name="organizer"
                      placeholder="Name of the organizer or department" 
                      value={formData.organizer}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Select 
                      value={formData.eventType} 
                      onValueChange={(value) => handleSelectChange('eventType', value)}
                      required
                    >
                      <SelectTrigger id="eventType">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypeOptions.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={formData.startDate || undefined}
                          onSelect={(date) => handleDateChange('startDate', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input 
                      id="startTime" 
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={formData.endDate || undefined}
                          onSelect={(date) => handleDateChange('endDate', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input 
                      id="endTime" 
                      name="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Event Image URL (Optional)</Label>
                  <Input 
                    id="imageUrl" 
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg" 
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-accent/50 transition-colors cursor-pointer">
                    <input 
                      type="file" 
                      id="attachments" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                    <label htmlFor="attachments" className="cursor-pointer flex flex-col items-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX (Max 10MB)
                      </p>
                    </label>
                  </div>
                  
                  {attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <Label>Uploaded Attachments</Label>
                      <div className="space-y-2">
                        {attachments.map((attachment, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between p-3 rounded-md border"
                          >
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-3 text-primary" />
                              <div>
                                <p className="font-medium truncate max-w-xs">{attachment.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {attachment.fileType} • {attachment.fileSize}
                                </p>
                              </div>
                            </div>
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeAttachment(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/events')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={eventMutation.isPending}
                  >
                    {eventMutation.isPending ? (
                      <>
                        <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                        Creating...
                      </>
                    ) : 'Create Event'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateEvent;
