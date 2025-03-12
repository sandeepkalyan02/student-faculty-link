
import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BookText, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Users, 
  Shield, 
  DownloadCloud 
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary animate-fade-in">
                Introducing Campus Resource Hub
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Centralize Your Campus Resources
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                A modern platform that streamlines access to study materials, events, forums, and notices for students, faculty, and administrators.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/auth/choice">
                <Button size="lg" className="hover-scale focus-ring animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="hover-scale focus-ring animate-slide-up" style={{ animationDelay: '0.5s' }}>
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-accent">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl animate-fade-in">
                Powerful Features
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Everything you need to enhance your campus experience in one place.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 neo-glass hover-scale animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="rounded-full bg-primary/10 p-3">
                <BookText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Study Materials</h3>
              <p className="text-sm text-muted-foreground text-center">
                Access and share lecture notes, presentations, and past papers organized by department and subject.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 neo-glass hover-scale animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="rounded-full bg-primary/10 p-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Events & Calendar</h3>
              <p className="text-sm text-muted-foreground text-center">
                Discover, create, and register for campus events with calendar integration for reminders.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 neo-glass hover-scale animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="rounded-full bg-primary/10 p-3">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Discussion Forum</h3>
              <p className="text-sm text-muted-foreground text-center">
                Engage in academic discussions, ask questions, and share insights with peers and faculty.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 neo-glass hover-scale animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="rounded-full bg-primary/10 p-3">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Notice Board</h3>
              <p className="text-sm text-muted-foreground text-center">
                Stay updated with important announcements about exams, placements, and campus activities.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 neo-glass hover-scale animate-scale-in" style={{ animationDelay: '0.5s' }}>
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Role-Based Access</h3>
              <p className="text-sm text-muted-foreground text-center">
                Tailored experiences for students, faculty, and administrators with personalized dashboards.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4 neo-glass hover-scale animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <div className="rounded-full bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Secure Authentication</h3>
              <p className="text-sm text-muted-foreground text-center">
                Protected access with role verification for students, faculty, and administrators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Enhance Your Campus Experience?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join students and faculty already benefiting from Campus Resource Hub.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/auth/student-login">
                <Button className="hover-scale focus-ring">
                  Student Login
                </Button>
              </Link>
              <Link to="/auth/faculty-login">
                <Button variant="outline" className="hover-scale focus-ring">
                  Faculty Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
