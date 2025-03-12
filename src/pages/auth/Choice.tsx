
import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { User, BookOpen, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Choice = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 md:py-24">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl mb-3 animate-fade-in">
              Choose Your Role
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Access the Campus Resource Hub with the appropriate role to get personalized resources and features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="neo-glass hover-scale animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full mb-3">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Student</CardTitle>
                <CardDescription>
                  Access study materials, register for events, participate in forums
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  For enrolled students looking to access resources and engage with campus activities
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/auth/student-login">
                  <Button className="w-full hover-scale focus-ring">Continue as Student</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="neo-glass hover-scale animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full mb-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Faculty</CardTitle>
                <CardDescription>
                  Upload materials, create events, post notices and moderate discussions
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  For professors and instructors who need to share resources and manage academic activities
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/auth/faculty-login">
                  <Button className="w-full hover-scale focus-ring">Continue as Faculty</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="neo-glass hover-scale animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full mb-3">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Administrator</CardTitle>
                <CardDescription>
                  Manage all aspects of the platform including users, content, and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  For campus administrators responsible for overseeing the entire platform
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/auth/admin-login">
                  <Button className="w-full hover-scale focus-ring">Continue as Admin</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Don't have an account yet? You can register after selecting your role.
            </p>
            <Link to="/">
              <Button variant="outline" className="hover-scale focus-ring">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Choice;
