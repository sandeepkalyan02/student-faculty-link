
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, MessageSquare, Eye, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { getForumPostById, createForumComment, voteForumPost } from '@/api/forum';

const ForumPostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const [replyText, setReplyText] = useState<{[key: string]: string}>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['forumPost', id],
    queryFn: () => getForumPostById(id || ''),
    enabled: !!id
  });

  const commentMutation = useMutation({
    mutationFn: (data: { content: string, parentId?: string }) => 
      createForumComment(id || '', data.content, user?.id || '', data.parentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forumPost', id] });
      toast.success('Comment posted successfully');
      setComment('');
      setReplyText({});
      setReplyingTo(null);
    },
    onError: () => {
      toast.error('Failed to post comment');
    }
  });

  const voteMutation = useMutation({
    mutationFn: (voteType: 'upvote' | 'downvote') => 
      voteForumPost(id || '', voteType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forumPost', id] });
    },
    onError: () => {
      toast.error('Failed to record vote');
    }
  });

  const handlePostComment = () => {
    if (!isAuthenticated) {
      toast.error('Please login to comment');
      return;
    }
    
    if (!comment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    commentMutation.mutate({ content: comment });
  };

  const handlePostReply = (parentId: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to reply');
      return;
    }
    
    const replyContent = replyText[parentId];
    
    if (!replyContent || !replyContent.trim()) {
      toast.error('Reply cannot be empty');
      return;
    }
    
    commentMutation.mutate({ 
      content: replyContent,
      parentId
    });
  };

  const handleVote = (voteType: 'upvote' | 'downvote') => {
    if (!isAuthenticated) {
      toast.error('Please login to vote');
      return;
    }
    
    voteMutation.mutate(voteType);
  };

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
  
  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/forum">
              <Button>Back to Forum</Button>
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
        <div className="container mx-auto max-w-4xl animate-fade-in">
          <div className="mb-6">
            <Link to="/forum" className="text-primary hover:underline inline-flex items-center">
              ← Back to Forum
            </Link>
          </div>
          
          <Card className="neo-glass mb-6">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                  <CardDescription className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="default">{post.category}</Badge>
                    {post.tags.map((tag, i) => (
                      <Badge key={i} variant="outline">{tag}</Badge>
                    ))}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {post.views}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {post.comments.length}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(new Date(post.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={post.author.avatar || ''} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{post.author.role}</p>
                </div>
              </div>
              
              <div className="prose prose-sm max-w-none md:prose-base dark:prose-invert">
                <p className="whitespace-pre-line">{post.content}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center space-x-1"
                    onClick={() => handleVote('upvote')}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.upvotes}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center space-x-1"
                    onClick={() => handleVote('downvote')}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span>{post.downvotes}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Comments ({post.comments.length})</h2>
            
            {isAuthenticated ? (
              <div className="mb-6">
                <Textarea 
                  placeholder="Add your comment..." 
                  className="min-h-24 mb-3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handlePostComment}
                    disabled={commentMutation.isPending}
                  >
                    {commentMutation.isPending ? 'Posting...' : 'Post Comment'}
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="bg-muted/50 mb-6">
                <CardContent className="p-4 text-center">
                  <p className="mb-3">Please login to join the discussion</p>
                  <Link to="/auth/choice">
                    <Button>Login</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
            
            <div className="space-y-6">
              {post.comments.length > 0 ? (
                post.comments.map(comment => (
                  <div key={comment.id} className="space-y-4">
                    <Card className="neo-glass">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={comment.author.avatar || ''} alt={comment.author.name} />
                              <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{comment.author.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(comment.createdAt), 'MMM d, yyyy • h:mm a')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 px-2 text-xs"
                              onClick={() => handleVote('upvote')}
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              <span>{comment.upvotes}</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 px-2 text-xs"
                              onClick={() => handleVote('downvote')}
                            >
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              <span>{comment.downvotes}</span>
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-sm whitespace-pre-line">{comment.content}</p>
                        
                        <div className="mt-3 flex justify-end">
                          {isAuthenticated && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs"
                              onClick={() => {
                                if (replyingTo === comment.id) {
                                  setReplyingTo(null);
                                } else {
                                  setReplyingTo(comment.id);
                                  if (!replyText[comment.id]) {
                                    setReplyText({
                                      ...replyText,
                                      [comment.id]: ''
                                    });
                                  }
                                }
                              }}
                            >
                              Reply
                            </Button>
                          )}
                        </div>
                        
                        {replyingTo === comment.id && (
                          <div className="mt-3 space-y-2">
                            <Textarea 
                              placeholder="Write your reply..." 
                              className="min-h-20 text-sm"
                              value={replyText[comment.id] || ''}
                              onChange={(e) => setReplyText({
                                ...replyText,
                                [comment.id]: e.target.value
                              })}
                            />
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setReplyingTo(null)}
                              >
                                Cancel
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handlePostReply(comment.id)}
                                disabled={commentMutation.isPending}
                              >
                                {commentMutation.isPending ? 'Posting...' : 'Post Reply'}
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    {comment.replies.length > 0 && (
                      <div className="ml-12 space-y-3">
                        {comment.replies.map(reply => (
                          <Card key={reply.id} className="neo-glass border-l-4 border-l-primary/50">
                            <CardContent className="pt-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center">
                                  <Avatar className="h-7 w-7 mr-2">
                                    <AvatarImage src={reply.author.avatar || ''} alt={reply.author.name} />
                                    <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-sm">{reply.author.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {format(new Date(reply.createdAt), 'MMM d, yyyy • h:mm a')}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <p className="text-sm whitespace-pre-line">{reply.content}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground opacity-50" />
                  <p className="mt-4 text-muted-foreground">No comments yet</p>
                  <p className="text-sm text-muted-foreground">Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForumPostDetails;
