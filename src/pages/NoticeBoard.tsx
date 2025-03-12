
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Bell, Filter, Download, Calendar, Tag, User } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { format, parseISO } from 'date-fns';

// Sample data for notices
const SAMPLE_NOTICES = [
  {
    id: 1,
    title: "End Semester Examination Schedule",
    content: "The end semester examinations for all departments will commence from December 10, 2023. The detailed schedule is attached. Students are advised to check their respective department's examination timings.",
    category: "Examination",
    importance: "High",
    postedBy: {
      name: "Prof. Williams",
      role: "faculty",
      department: "Examination Controller"
    },
    postedAt: "2023-11-15T10:30:00Z",
    attachments: [
      { name: "Exam_Schedule_Dec2023.pdf", size: "1.5 MB" }
    ]
  },
  {
    id: 2,
    title: "Campus Recruitment Drive by Tech Innovators",
    content: "Tech Innovators Inc. will be conducting a campus recruitment drive for final year students from the Computer Science, Information Technology, and Electronics departments on November 25, 2023. Eligible students must register by November 20.",
    category: "Placement",
    importance: "Medium",
    postedBy: {
      name: "Ms. Johnson",
      role: "faculty",
      department: "Placement Cell"
    },
    postedAt: "2023-11-12T14:45:00Z",
    attachments: [
      { name: "TechInnovators_JD.pdf", size: "850 KB" },
      { name: "Eligibility_Criteria.docx", size: "420 KB" }
    ]
  },
  {
    id: 3,
    title: "Library Timings Extended During Examination Period",
    content: "The university library will remain open from 8:00 AM to 12:00 AM during the examination period (December 10-30, 2023) to facilitate student preparation. Students are requested to carry their ID cards at all times.",
    category: "General",
    importance: "Medium",
    postedBy: {
      name: "Dr. Thompson",
      role: "faculty",
      department: "Library Sciences"
    },
    postedAt: "2023-11-18T09:15:00Z",
    attachments: []
  },
  {
    id: 4,
    title: "Workshop on Research Methodologies",
    content: "The Department of Social Sciences is organizing a two-day workshop on 'Advanced Research Methodologies in Social Sciences' on December 2-3, 2023. Research scholars and final year postgraduate students are encouraged to participate.",
    category: "Workshop",
    importance: "Medium",
    postedBy: {
      name: "Prof. Garcia",
      role: "faculty",
      department: "Social Sciences"
    },
    postedAt: "2023-11-14T11:20:00Z",
    attachments: [
      { name: "Workshop_Details.pdf", size: "1.2 MB" }
    ]
  },
  {
    id: 5,
    title: "University Infrastructure Maintenance Notice",
    content: "Please be informed that the university will be undertaking infrastructure maintenance work from November 28-30, 2023. During this period, certain areas of the campus may have restricted access. The main administrative building will remain closed on November 29.",
    category: "General",
    importance: "Low",
    postedBy: {
      name: "Mr. Anderson",
      role: "admin",
      department: "Infrastructure & Maintenance"
    },
    postedAt: "2023-11-20T16:10:00Z",
    attachments: [
      { name: "Areas_Affected.pdf", size: "950 KB" }
    ]
  }
];

const NoticeBoard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotices, setFilteredNotices] = useState(SAMPLE_NOTICES);
  const { user } = useAuth();
  
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

  const handleDownload = (attachmentName: string) => {
    // In a real app, this would trigger a download
    toast.success("Download started", { 
      description: `${attachmentName} will be downloaded shortly` 
    });
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'PPP');
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
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
                Stay updated with important campus announcements
              </p>
            </div>
            {(user?.role === 'faculty' || user?.role === 'admin') && (
              <Button className="mt-4 md:mt-0 hover-scale focus-ring">
                <Bell className="mr-2 h-4 w-4" />
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
                    placeholder="Search notices by title, content, or category..."
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
              <TabsTrigger value="examination">Examination</TabsTrigger>
              <TabsTrigger value="placement">Placement</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredNotices.map(notice => (
                <Card key={notice.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{notice.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getImportanceColor(notice.importance)}`}>
                          {notice.importance} Priority
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {notice.category}
                        </span>
                      </div>
                    </div>
                    <CardDescription className="mt-1">
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{formatDate(notice.postedAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{notice.postedBy.name}, {notice.postedBy.department}</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{notice.content}</p>
                    
                    {notice.attachments.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Attachments</h4>
                        <div className="space-y-2">
                          {notice.attachments.map((attachment, index) => (
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
                  <CardFooter className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover-scale focus-ring"
                    >
                      View Full Notice
                    </Button>
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
            
            <TabsContent value="examination" className="space-y-4">
              {filteredNotices.filter(n => n.category === "Examination").map(notice => (
                // Similar card structure as above
                <Card key={notice.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{notice.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getImportanceColor(notice.importance)}`}>
                          {notice.importance} Priority
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {notice.category}
                        </span>
                      </div>
                    </div>
                    <CardDescription className="mt-1">
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{formatDate(notice.postedAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{notice.postedBy.name}, {notice.postedBy.department}</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{notice.content}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="placement" className="space-y-4">
              {filteredNotices.filter(n => n.category === "Placement").map(notice => (
                // Similar card structure as above
                <Card key={notice.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{notice.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getImportanceColor(notice.importance)}`}>
                          {notice.importance} Priority
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {notice.category}
                        </span>
                      </div>
                    </div>
                    <CardDescription className="mt-1">
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{formatDate(notice.postedAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{notice.postedBy.name}, {notice.postedBy.department}</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{notice.content}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="general" className="space-y-4">
              {filteredNotices.filter(n => n.category === "General").map(notice => (
                // Similar card structure as above
                <Card key={notice.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{notice.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getImportanceColor(notice.importance)}`}>
                          {notice.importance} Priority
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {notice.category}
                        </span>
                      </div>
                    </div>
                    <CardDescription className="mt-1">
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{formatDate(notice.postedAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{notice.postedBy.name}, {notice.postedBy.department}</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{notice.content}</p>
                  </CardContent>
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
