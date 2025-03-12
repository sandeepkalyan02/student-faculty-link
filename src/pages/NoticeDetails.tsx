
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertTriangle, Bell } from 'lucide-react';
import { format } from 'date-fns';
import { getNoticeById } from '@/api/notices';

const NoticeDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: notice, isLoading, error } = useQuery({
    queryKey: ['notice', id],
    queryFn: () => getNoticeById(id || ''),
    enabled: !!id
  });
  
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
  
  if (error || !notice) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Notice Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The notice you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/notice-board">
              <Button>Back to Notice Board</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getImportanceBadge = (importance: string) => {
    switch (importance.toLowerCase()) {
      case 'high':
        return <Badge className="bg-red-500">High Importance</Badge>;
      case 'medium':
        return <Badge className="bg-orange-500">Medium Importance</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low Importance</Badge>;
      default:
        return <Badge>{importance}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl animate-fade-in">
          <div className="mb-6">
            <Link to="/notice-board" className="text-primary hover:underline inline-flex items-center">
              ← Back to Notice Board
            </Link>
          </div>
          
          <Card className="neo-glass overflow-hidden">
            <CardHeader className={`${notice.importance.toLowerCase() === 'high' ? 'bg-red-500/10' : ''}`}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  {notice.importance.toLowerCase() === 'high' && (
                    <div className="flex items-center text-red-600 mb-2">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <span className="font-semibold">Important Notice</span>
                    </div>
                  )}
                  <CardTitle className="text-2xl">{notice.title}</CardTitle>
                  <CardDescription className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="outline">{notice.category}</Badge>
                    {getImportanceBadge(notice.importance)}
                  </CardDescription>
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(notice.createdAt), 'MMMM d, yyyy')}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={notice.author.avatar || ''} alt={notice.author.name} />
                  <AvatarFallback>{notice.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{notice.author.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{notice.author.role}</p>
                </div>
              </div>
              
              <div className="prose prose-sm max-w-none md:prose-base dark:prose-invert">
                <p className="whitespace-pre-line">{notice.content}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NoticeDetails;
