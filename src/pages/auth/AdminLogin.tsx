
import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, LogIn, Shield } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin login logic would go here
    console.log('Admin login attempt');
    // Simulate successful login with redirect message
    toast.success('Login successful', {
      description: 'Redirecting to admin dashboard...',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-3 animate-fade-in">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tighter md:text-3xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Admin Portal
            </h1>
            <p className="text-sm text-muted-foreground mt-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Secure access to administrative controls
            </p>
          </div>
          
          <Card className="neo-glass animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <form onSubmit={handleLogin}>
              <CardHeader>
                <CardTitle>Admin Authentication</CardTitle>
                <CardDescription>
                  Enter your credentials to access the admin dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      placeholder="admin@campus.edu"
                      type="email"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/auth/admin-reset"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    Note: Admin accounts cannot be created via registration. Please contact system management for access.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full hover-scale focus-ring">
                  <LogIn className="mr-2 h-4 w-4" />
                  Secure Login
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Not an administrator?{" "}
              <Link to="/auth/choice" className="text-primary hover:underline">
                Choose another role
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;
