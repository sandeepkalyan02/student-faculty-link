
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessageSquare, PlusCircle, ThumbsUp, MessagesSquare, Filter, Flag } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Sample data for forum posts
const SAMPLE_POSTS = [
  {
    id: 1,
    title: "Help with Java assignment",
    content: "I'm struggling with inheritance in Java. Can someone explain how the 'extends' keyword works with concrete examples?",
    author: {
      id: 's1',
      name: "John Student",
      role: "student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    date: "2023-12-05T14:30:00",
    category: "Programming",
    upvotes: 8,
    replies: [
      {
        id: 101,
        content: "Inheritance in Java allows one class to inherit properties and methods from another class. Here's an example...",
        author: {
          id: 'f1',
          name: "Dr. Smith",
          role: "faculty",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Smith"
        },
        date: "2023-12-05T15:45:00",
        upvotes: 3
      },
      {
        id: 102,
        content: "Thanks for the explanation Dr. Smith! Could you also explain method overriding in this context?",
        author: {
          id: 's1',
          name: "John Student",
          role: "student",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        },
        date: "2023-12-05T16:20:00",
        upvotes: 1
      }
    ]
  },
  {
    id: 2,
    title: "Study group for finals",
    content: "Looking to form a study group for the upcoming calculus final exam. Anyone interested in joining?",
    author: {
      id: 's2',
      name: "Alice Student",
      role: "student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
    },
    date: "2023-12-04T09:15:00",
    category: "Mathematics",
    upvotes: 12,
    replies: [
      {
        id: 201,
        content: "I'm interested! I've been working on past papers and have some good resources to share.",
        author: {
          id: 's3',
          name: "Bob Student",
          role: "student",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
        },
        date: "2023-12-04T10:30:00",
        upvotes: 2
      },
      {
        id: 202,
        content: "Count me in too. I'm struggling with integration by parts if anyone can help with that.",
        author: {
          id: 's4',
          name: "Charlie Student",
          role: "student",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie"
        },
        date: "2023-12-04T11:45:00",
        upvotes: 1
      },
      {
        id: 203,
        content: "I've booked a study room for tomorrow at 3 PM in the library. All are welcome!",
        author: {
          id: 's2',
          name: "Alice Student",
          role: "student",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
        },
        date: "2023-12-04T14:00:00",
        upvotes: 5
      }
    ]
  },
  {
    id: 3,
    title: "Research paper recommendations",
    content: "I'm looking for recent research papers on renewable energy for my term project. Any recommendations?",
    author: {
      id: 's5',
      name: "David Student",
      role: "student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    },
    date: "2023-12-03T16:20:00",
    category: "Research",
    upvotes: 6,
    replies: [
      {
        id: 301,
        content: "I'd recommend checking the Journal of Renewable Energy. They have several recent publications that might be relevant.",
        author: {
          id: 'f2',
          name: "Prof. Johnson",
          role: "faculty",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Johnson"
        },
        date: "2023-12-03T17:30:00",
        upvotes: 4
      }
    ]
  },
  {
    id: 4,
    title: "Career paths in cybersecurity",
    content: "I'm a CS major interested in cybersecurity. What are some potential career paths and certifications I should consider?",
    author: {
      id: 's6',
      name: "Eve Student",
      role: "student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eve"
    },
    date: "2023-12-02T11:10:00",
    category: "Career",
    upvotes: 15,
    replies: [
      {
        id: 401,
        content: "The CompTIA Security+ is a good starting certification. For career paths, you might consider roles like...",
        author: {
          id: 'f3',
          name: "Dr. Davis",
          role: "faculty",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Davis"
        },
        date: "2023-12-02T13:25:00",
        upvotes: 6
      },
      {
        id: 402,
        content: "I'm currently interning at a cybersecurity firm. Happy to share my experience if you want to chat.",
        author: {
          id: 's7',
          name: "Frank Student",
          role: "student",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frank"
        },
        date: "2023-12-02T15:40:00",
        upvotes: 3
      }
    ]
  },
  {
    id: 5,
    title: "Best books for learning Python",
    content: "Can anyone recommend good books for learning Python from scratch? Preferably with practical examples.",
    author: {
      id: 's8',
      name: "Grace Student",
      role: "student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace"
    },
    date: "2023-12-01T09:45:00",
    category: "Programming",
    upvotes: 10,
    replies: [
      {
        id: 501,
        content: "'Python Crash Course' by Eric Matthes is excellent for beginners. It has practical projects too.",
        author: {
          id: 's9',
          name: "Hank Student",
          role: "student",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hank"
        },
        date: "2023-12-01T10:30:00",
        upvotes: 5
      }
    ]
  }
];

const Forum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(SAMPLE_POSTS);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [newReply, setNewReply] = useState('');
  const { user } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = SAMPLE_POSTS.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
    
    if (filtered.length === 0) {
      toast.info("No discussions found matching your search");
    } else {
      toast.success(`Found ${filtered.length} discussions`);
    }
  };

  const handleUpvote = (postId: number) => {
    toast.success("Upvoted successfully");
    // In a real app, this would update the upvote count
  };

  const handleUpvoteReply = (replyId: number) => {
    toast.success("Upvoted reply successfully");
    // In a real app, this would update the reply upvote count
  };

  const handleSubmitReply = (postId: number) => {
    if (!newReply.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }
    
    toast.success("Reply submitted successfully");
    setNewReply('');
    // In a real app, this would add the reply to the post
  };

  const handleReportPost = (postId: number) => {
    toast.success("Post reported successfully", {
      description: "A moderator will review this post."
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
                Connect with peers and faculty through academic discussions
              </p>
            </div>
            <Button className="mt-4 md:mt-0 hover-scale focus-ring">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions..."
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
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="my-posts">My Posts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              {filteredPosts.map(post => (
                <Card key={post.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row justify-between w-full">
                      <div className="flex gap-4 items-center">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <CardTitle className="text-xl">{post.title}</CardTitle>
                          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                            <span>{post.author.name}</span>
                            <span>•</span>
                            <span>{formatDate(post.date)}</span>
                            <span>•</span>
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                              {post.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleUpvote(post.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.upvotes}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                        >
                          <MessagesSquare className="h-4 w-4" />
                          <span>{post.replies.length}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleReportPost(post.id)}
                        >
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">{post.content}</p>
                    
                    {expandedPost === post.id && (
                      <div className="mt-6 space-y-4">
                        <div className="h-px bg-border"></div>
                        <h3 className="font-medium text-lg">Replies ({post.replies.length})</h3>
                        
                        <div className="space-y-4">
                          {post.replies.map(reply => (
                            <div key={reply.id} className="p-3 rounded-md bg-background/50 border border-border">
                              <div className="flex gap-3">
                                <img 
                                  src={reply.author.avatar}
                                  alt={reply.author.name} 
                                  className="h-8 w-8 rounded-full"
                                />
                                <div className="flex-1">
                                  <div className="flex flex-wrap justify-between">
                                    <div>
                                      <p className="font-medium text-sm">{reply.author.name}</p>
                                      <p className="text-xs text-muted-foreground">{formatDate(reply.date)}</p>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="flex items-center gap-1 h-6"
                                      onClick={() => handleUpvoteReply(reply.id)}
                                    >
                                      <ThumbsUp className="h-3 w-3" />
                                      <span className="text-xs">{reply.upvotes}</span>
                                    </Button>
                                  </div>
                                  <p className="text-sm mt-2">{reply.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {user && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Add your reply</h4>
                            <div className="flex gap-3">
                              <img 
                                src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
                                alt={user.name}
                                className="h-8 w-8 rounded-full"
                              />
                              <div className="flex-1">
                                <textarea
                                  className="w-full p-3 border rounded-md text-sm min-h-[80px]"
                                  placeholder="Write your reply..."
                                  value={newReply}
                                  onChange={(e) => setNewReply(e.target.value)}
                                ></textarea>
                                <div className="flex justify-end mt-2">
                                  <Button 
                                    size="sm"
                                    onClick={() => handleSubmitReply(post.id)}
                                    className="hover-scale focus-ring"
                                  >
                                    Post Reply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-2">
                    {expandedPost !== post.id && (
                      <Button 
                        variant="link" 
                        onClick={() => setExpandedPost(post.id)}
                        className="p-0 h-auto text-primary hover:no-underline"
                      >
                        Show replies ({post.replies.length})
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No discussions found</h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your search or start a new discussion.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="popular" className="space-y-6">
              {filteredPosts.sort((a, b) => b.upvotes - a.upvotes).map(post => (
                // Same card structure as above for popular posts
                <Card key={post.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row justify-between w-full">
                      <div className="flex gap-4 items-center">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <CardTitle className="text-xl">{post.title}</CardTitle>
                          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                            <span>{post.author.name}</span>
                            <span>•</span>
                            <span>{formatDate(post.date)}</span>
                            <span>•</span>
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                              {post.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleUpvote(post.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.upvotes}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                        >
                          <MessagesSquare className="h-4 w-4" />
                          <span>{post.replies.length}</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">{post.content}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="link" 
                      onClick={() => setExpandedPost(post.id)}
                      className="p-0 h-auto text-primary hover:no-underline"
                    >
                      Show replies ({post.replies.length})
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-6">
              {filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(post => (
                // Same card structure as above for recent posts
                <Card key={post.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row justify-between w-full">
                      <div className="flex gap-4 items-center">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <CardTitle className="text-xl">{post.title}</CardTitle>
                          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                            <span>{post.author.name}</span>
                            <span>•</span>
                            <span>{formatDate(post.date)}</span>
                            <span>•</span>
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                              {post.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleUpvote(post.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.upvotes}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                        >
                          <MessagesSquare className="h-4 w-4" />
                          <span>{post.replies.length}</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">{post.content}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="link" 
                      onClick={() => setExpandedPost(post.id)}
                      className="p-0 h-auto text-primary hover:no-underline"
                    >
                      Show replies ({post.replies.length})
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="my-posts" className="space-y-6">
              {user ? (
                filteredPosts.filter(post => post.author.id === user.id).map(post => (
                  // Same card structure as above for user's posts
                  <Card key={post.id} className="neo-glass hover:shadow-md transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row justify-between w-full">
                        <div className="flex gap-4 items-center">
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name} 
                            className="h-10 w-10 rounded-full"
                          />
                          <div>
                            <CardTitle className="text-xl">{post.title}</CardTitle>
                            <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                              <span>{post.author.name}</span>
                              <span>•</span>
                              <span>{formatDate(post.date)}</span>
                              <span>•</span>
                              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                {post.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex items-center gap-1"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.upvotes}</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                          >
                            <MessagesSquare className="h-4 w-4" />
                            <span>{post.replies.length}</span>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">{post.content}</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="link" 
                        onClick={() => setExpandedPost(post.id)}
                        className="p-0 h-auto text-primary hover:no-underline"
                      >
                        Show replies ({post.replies.length})
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Please log in</h3>
                  <p className="mt-2 text-muted-foreground">
                    You need to log in to view your posts.
                  </p>
                </div>
              )}
              {user && filteredPosts.filter(post => post.author.id === user.id).length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No posts yet</h3>
                  <p className="mt-2 text-muted-foreground">
                    You haven't created any discussions yet.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Forum;
