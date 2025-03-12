
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Bell, Download, Filter, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Sample data for notices
const SAMPLE_NOTICES = [
  {
    id: 1,
    title: "Final Examination Schedule",
    content: "The final examination schedule for the Fall semester has been posted. Please check your email for details or download the schedule from the link below.",
    category: "Academics",
    priority: "High",
    date: "2023-12-01",
    author: "Academic Affairs Office",
    department: "Administration",
    attachments: [
      { name: "Final_Exam_Schedule.pdf", size: "415 KB" }
    ]
  },
  {
    id: 2,
    title: "Campus Library Holiday Hours",
    content: "The campus library will have adjusted hours during the upcoming holiday break. Please note that the library will be closed from December 24th to January 2nd.",
    category: "Facilities",
    priority: "Medium",
    date: "2023-12-03",
    author: "Library Services",
    department: "Administration",
    attachments: []
  },
  {
    id: 3,
    title: "Scholarship Application Deadline Extended",
    content: "The deadline for submitting scholarship applications for the Spring semester has been extended to January 15th. Don't miss this opportunity to apply for financial aid.",
    category: "Scholarships",
    priority: "High",
    date: "2023-12-05",
    author: "Financial Aid Office",
    department: "Administration",
    attachments: [
      { name: "Scholarship_Application_Form.pdf", size: "320 KB" },
      { name: "Eligibility_Criteria.docx", size: "178 KB" }
    ]
  },
  {
    id: 4,
    title: "Campus Wi-Fi Maintenance",
    content: "The campus Wi-Fi network will undergo scheduled maintenance on December 12th from 2:00 AM to 5:00 AM. Internet services may be intermittently unavailable during this period.",
    category: "IT Services",
    priority: "Medium",
    date: "2023-12-08",
    author: "IT Department",
    department: "Administration",
    attachments: []
  },
  {
    id: 5,
    title: "Guest Lecture: Artificial Intelligence Ethics",
    content: "We are pleased to announce a guest lecture on 'Ethical Considerations in Artificial Intelligence' by Dr. Sarah Johnson from Tech University on December 15th at 3:00 PM in the Main Auditorium.",
    category: "Events",
    priority: "Medium",
    date: "2023-12-10",
    author: "Dr. Smith",
    department: "Computer Science",
    attachments: [
      { name: "AI_Ethics_Lecture_Details.pdf", size: "285 KB" }
    ]
  },
  {
    id: 6,
    title: "Campus Closure Due to Weather Forecast",
    content: "Due to the severe weather forecast for December 18th, the campus will be closed. All classes and activities are canceled. Stay safe and check your email for updates.",
    category: "Emergency",
    priority: "High",
    date: "2023-12-17",
    author: "Campus Security",
    department: "Administration",
    attachments: []
  }
];

const NoticeBoard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotices, setFilteredNotices] = useState(SAMPLE_NOTICES);
  const { user, checkAccess } = useAuth();
  
  const canPostNotice = user && checkAccess(['faculty', 'admin']);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = SAMPLE_NOTICES.filter(notice => 
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotices(filtered);
    
    if (filtered.length === 0) {
      toast.info("No notices found matching your search");
    } else {
      toast.success(`Found ${filtered.length} notices`);
    }
  };

  const handleDownloadAttachment = (attachmentName: string) => {
    // In a real app, this would trigger a download
    toast.success("Download started", { 
      description: `${attachmentName} will be downloaded shortly.` 
    });
  };

  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Notice Board</h1>
              <p className="text-muted-foreground mt-2">
                Stay updated with important announcements and notices
              </p>
            </div>
            {canPostNotice && (
              <Button className="mt-4 md:mt-0 hover-scale focus-ring">
                <PlusCircle className="mr-2 h-4 w-4" />
                Post Notice
              </Button>
            )}
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notices..."
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
              <TabsTrigger value="all">All Notices</TabsTrigger>
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="important">Important</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              {filteredNotices.map(notice => (
                <Card key={notice.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          {notice.title}
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getPriorityStyle(notice.priority)}`}>
                            {notice.priority} Priority
                          </span>
                        </CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-2 mt-1">
                          <span>{notice.category}</span>
                          <span>•</span>
                          <span>
                            Posted on {new Date(notice.date).toLocaleDateString()}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm mb-4">{notice.content}</p>
                    
                    {notice.attachments.length > 0 && (
                      <div className="border-t pt-3">
                        <p className="text-sm font-medium mb-2">Attachments:</p>
                        <div className="flex flex-wrap gap-2">
                          {notice.attachments.map((attachment, index) => (
                            <Button 
                              key={index}
                              size="sm"
                              variant="outline"
                              className="text-xs flex items-center"
                              onClick={() => handleDownloadAttachment(attachment.name)}
                            >
                              <Download className="mr-1 h-3 w-3" />
                              {attachment.name} ({attachment.size})
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Posted by {notice.author} • {notice.department}
                    </div>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredNotices.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No notices found</h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your search or filters to find notices.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="academics" className="space-y-6">
              {filteredNotices.filter(notice => notice.category === "Academics").map(notice => (
                // Same card structure as above for academic notices
                <Card key={notice.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          {notice.title}
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getPriorityStyle(notice.priority)}`}>
                            {notice.priority} Priority
                          </span>
                        </CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-2 mt-1">
                          <span>{notice.category}</span>
                          <span>•</span>
                          <span>
                            Posted on {new Date(notice.date).toLocaleDateString()}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm mb-4">{notice.content}</p>
                    
                    {notice.attachments.length > 0 && (
                      <div className="border-t pt-3">
                        <p className="text-sm font-medium mb-2">Attachments:</p>
                        <div className="flex flex-wrap gap-2">
                          {notice.attachments.map((attachment, index) => (
                            <Button 
                              key={index}
                              size="sm"
                              variant="outline"
                              className="text-xs flex items-center"
                              onClick={() => handleDownloadAttachment(attachment.name)}
                            >
                              <Download className="mr-1 h-3 w-3" />
                              {attachment.name} ({attachment.size})
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Posted by {notice.author} • {notice.department}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="events" className="space-y-6">
              {filteredNotices.filter(notice => notice.category === "Events").map(notice => (
                // Same card structure as above for event notices
                <Card key={notice.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          {notice.title}
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getPriorityStyle(notice.priority)}`}>
                            {notice.priority} Priority
                          </span>
                        </CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-2 mt-1">
                          <span>{notice.category}</span>
                          <span>•</span>
                          <span>
                            Posted on {new Date(notice.date).toLocaleDateString()}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm mb-4">{notice.content}</p>
                    
                    {notice.attachments.length > 0 && (
                      <div className="border-t pt-3">
                        <p className="text-sm font-medium mb-2">Attachments:</p>
                        <div className="flex flex-wrap gap-2">
                          {notice.attachments.map((attachment, index) => (
                            <Button 
                              key={index}
                              size="sm"
                              variant="outline"
                              className="text-xs flex items-center"
                              onClick={() => handleDownloadAttachment(attachment.name)}
                            >
                              <Download className="mr-1 h-3 w-3" />
                              {attachment.name} ({attachment.size})
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Posted by {notice.author} • {notice.department}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="important" className="space-y-6">
              {filteredNotices.filter(notice => notice.priority === "High").map(notice => (
                // Same card structure as above for important notices
                <Card key={notice.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          {notice.title}
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getPriorityStyle(notice.priority)}`}>
                            {notice.priority} Priority
                          </span>
                        </CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-2 mt-1">
                          <span>{notice.category}</span>
                          <span>•</span>
                          <span>
                            Posted on {new Date(notice.date).toLocaleDateString()}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm mb-4">{notice.content}</p>
                    
                    {notice.attachments.length > 0 && (
                      <div className="border-t pt-3">
                        <p className="text-sm font-medium mb-2">Attachments:</p>
                        <div className="flex flex-wrap gap-2">
                          {notice.attachments.map((attachment, index) => (
                            <Button 
                              key={index}
                              size="sm"
                              variant="outline"
                              className="text-xs flex items-center"
                              onClick={() => handleDownloadAttachment(attachment.name)}
                            >
                              <Download className="mr-1 h-3 w-3" />
                              {attachment.name} ({attachment.size})
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Posted by {notice.author} • {notice.department}
                    </div>
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

export default NoticeBoard;
