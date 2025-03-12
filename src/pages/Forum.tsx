
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessageSquare, ThumbsUp, Filter, Clock, User } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistance } from 'date-fns';

// Sample data for forum discussions
const SAMPLE_DISCUSSIONS = [
  {
    id: 1,
    title: "Tips for Final Year Project",
    content: "I'm starting my final year project in AI and looking for some advice on choosing a specific area to focus on. Has anyone completed a project in this field?",
    author: {
      id: "s2",
      name: "Alex Johnson",
      role: "student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    category: "Academic",
    tags: ["Projects", "AI", "Final Year"],
    createdAt: "2023-11-10T14:30:00Z",
    updatedAt: "2023-11-10T14:30:00Z",
    upvotes: 15,
    views: 124,
    replies: [
      {
        id: 101,
        content: "I did my project on natural language processing. It's a fascinating area with a lot of practical applications. Happy to share my experience if you're interested.",
        author: {
          id: "s3",
          name: "Emma Williams",
          role: "student",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
        },
        createdAt: "2023-11-10T15:45:00Z",
        upvotes: 8
      },
      {
        id: 102,
        content: "Computer vision is another good area to explore, especially if you have an interest in image processing or autonomous systems.",
        author: {
          id: "f2",
          name: "Dr. Roberts",
          role: "faculty",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberts"
        },
        createdAt: "2023-11-11T09:20:00Z",
        upvotes: 12
      }
    ]
  },
  {
    id: 2,
    title: "Calculus Study Group",
    content: "Is anyone interested in forming a study group for advanced calculus? We could meet twice a week at the library to solve problems together.",
    author: {
      id: "s4",
      name: "Michael Chen",
      role: "student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    category: "Study Group",
    tags: ["Mathematics", "Calculus", "Group Study"],
    createdAt: "2023-11-08T10:15:00Z",
    updatedAt: "2023-11-09T16:40:00Z",
    upvotes: 23,
    views: 198,
    replies: [
      {
        id: 201,
        content: "I'm interested! I've been struggling with some of the concepts and think a group would really help.",
        author: {
          id: "s5",
          name: "Sarah Miller",
          role: "student",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        },
        createdAt: "2023-11-08T11:30:00Z",
        upvotes: 5
      },
      {
        id: 202,
        content: "Count me in! What days were you thinking?",
        author: {
          id: "s6",
          name: "David Wilson",
          role: "student",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
        },
        createdAt: "2023-11-08T14:20:00Z",
        upvotes: 4
      },
      {
        id: 203,
        content: "I'd recommend focusing on problem-solving rather than just reviewing notes. That approach worked well for our group last semester.",
        author: {
          id: "s7",
          name: "Jennifer Lee",
          role: "student",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer"
        },
        createdAt: "2023-11-09T09:15:00Z",
        upvotes: 10
      }
    ]
  },
  {
    id: 3,
    title: "Internship Opportunities in Software Development",
    content: "Has anyone had a good experience with summer internships at tech companies? I'm looking for recommendations for places that offer meaningful work for CS students.",
    author: {
      id: "s8",
      name: "Ryan Garcia",
      role: "student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan"
    },
    category: "Career",
    tags: ["Internships", "Computer Science", "Software Development"],
    createdAt: "2023-11-05T16:45:00Z",
    updatedAt: "2023-11-07T11:20:00Z",
    upvotes: 32,
    views: 245,
    replies: [
      {
        id: 301,
        content: "I interned at Google last summer and had a great experience. They have a structured program for interns with real projects and good mentorship.",
        author: {
          id: "s9",
          name: "Lisa Brown",
          role: "student",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa"
        },
        createdAt: "2023-11-05T17:30:00Z",
        upvotes: 15
      },
      {
        id: 302,
        content: "Don't overlook smaller companies! I had an amazing internship at a local startup where I got to contribute to their main product directly.",
        author: {
          id: "s10",
          name: "Kevin Taylor",
          role: "student",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin"
        },
        createdAt: "2023-11-06T09:15:00Z",
        upvotes: 18
      },
      {
        id: 303,
        content: "The university has partnerships with several tech companies that offer internships. You can check with the career office for a list of these opportunities.",
        author: {
          id: "f3",
          name: "Prof. Anderson",
          role: "faculty",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anderson"
        },
        createdAt: "2023-11-07T10:40:00Z",
        upvotes: 22
      }
    ]
  }
];

const Forum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDiscussions, setFilteredDiscussions] = useState(SAMPLE_DISCUSSIONS);
  const { user } = useAuth();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = SAMPLE_DISCUSSIONS.filter(discussion => 
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredDiscussions(filtered);
    
    if (filtered.length === 0) {
      toast.info("No discussions found matching your search");
    } else {
      toast.success(`Found ${filtered.length} discussions`);
    }
  };

  const handleUpvote = (discussionId: number) => {
    // In a real app, this would call an API to upvote
    toast.success("Upvoted successfully");
  };

  const formatTimeAgo = (dateString: string) => {
    return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Discussion Forum</h1>
              <p className="text-muted-foreground mt-2">
                Engage in academic discussions with your peers and faculty
              </p>
            </div>
            <Button className="mt-4 md:mt-0 hover-scale focus-ring">
              <MessageSquare className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions by title, content, category or tags..."
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
              <TabsTrigger value="all">All Discussions</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="study-group">Study Groups</TabsTrigger>
              <TabsTrigger value="career">Career</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredDiscussions.map(discussion => (
                <Card key={discussion.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-xl">{discussion.title}</CardTitle>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {discussion.category}
                      </span>
                    </div>
                    <CardDescription className="line-clamp-2">{discussion.content}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {discussion.tags.map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-0.5 rounded-full border">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <img 
                            src={discussion.author.avatar} 
                            alt={discussion.author.name}
                            className="h-5 w-5 rounded-full"
                          />
                          <span className="text-sm font-medium">{discussion.author.name}</span>
                          {discussion.author.role === 'faculty' && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              Faculty
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTimeAgo(discussion.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {discussion.replies.length} replies
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {discussion.views} views
                        </span>
                      </div>
                    </div>
                    
                    {discussion.replies.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">Recent Replies</h4>
                        <div className="space-y-3">
                          {discussion.replies.slice(0, 2).map(reply => (
                            <div key={reply.id} className="p-2 rounded-md bg-slate-50 dark:bg-slate-900">
                              <div className="flex items-center space-x-2 mb-1">
                                <img 
                                  src={reply.author.avatar} 
                                  alt={reply.author.name}
                                  className="h-4 w-4 rounded-full"
                                />
                                <span className="text-xs font-medium">{reply.author.name}</span>
                                {reply.author.role === 'faculty' && (
                                  <span className="text-xs px-1 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                    Faculty
                                  </span>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {formatTimeAgo(reply.createdAt)}
                                </span>
                              </div>
                              <p className="text-xs line-clamp-2">{reply.content}</p>
                              <div className="flex justify-end mt-1">
                                <span className="text-xs text-muted-foreground flex items-center">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  {reply.upvotes}
                                </span>
                              </div>
                            </div>
                          ))}
                          {discussion.replies.length > 2 && (
                            <div className="text-center text-xs text-primary hover:underline cursor-pointer">
                              View all {discussion.replies.length} replies
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleUpvote(discussion.id)}
                      className="hover-scale focus-ring"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Upvote ({discussion.upvotes})
                    </Button>
                    <Button 
                      size="sm"
                      className="hover-scale focus-ring"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredDiscussions.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No discussions found</h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your search or filters to find discussions.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="academic" className="space-y-4">
              {filteredDiscussions.filter(d => d.category === "Academic").map(discussion => (
                // Similar card structure as above
                <Card key={discussion.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-xl">{discussion.title}</CardTitle>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {discussion.category}
                      </span>
                    </div>
                    <CardDescription className="line-clamp-2">{discussion.content}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {discussion.tags.map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-0.5 rounded-full border">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleUpvote(discussion.id)}
                      className="hover-scale focus-ring"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Upvote ({discussion.upvotes})
                    </Button>
                    <Button 
                      size="sm"
                      className="hover-scale focus-ring"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="study-group" className="space-y-4">
              {filteredDiscussions.filter(d => d.category === "Study Group").map(discussion => (
                // Similar card structure as above
                <Card key={discussion.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-xl">{discussion.title}</CardTitle>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {discussion.category}
                      </span>
                    </div>
                    <CardDescription className="line-clamp-2">{discussion.content}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {discussion.tags.map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-0.5 rounded-full border">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleUpvote(discussion.id)}
                      className="hover-scale focus-ring"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Upvote ({discussion.upvotes})
                    </Button>
                    <Button 
                      size="sm"
                      className="hover-scale focus-ring"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="career" className="space-y-4">
              {filteredDiscussions.filter(d => d.category === "Career").map(discussion => (
                // Similar card structure as above
                <Card key={discussion.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-xl">{discussion.title}</CardTitle>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {discussion.category}
                      </span>
                    </div>
                    <CardDescription className="line-clamp-2">{discussion.content}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {discussion.tags.map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-0.5 rounded-full border">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleUpvote(discussion.id)}
                      className="hover-scale focus-ring"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Upvote ({discussion.upvotes})
                    </Button>
                    <Button 
                      size="sm"
                      className="hover-scale focus-ring"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
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

export default Forum;
