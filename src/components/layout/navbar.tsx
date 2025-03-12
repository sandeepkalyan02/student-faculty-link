
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  CalendarDays, 
  MessageSquare, 
  Bell, 
  LogIn
} from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? "text-primary font-medium" : "hover:text-primary";
  };

  return (
    <header className="w-full fixed top-0 z-50 glass-morphism">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/study-materials" 
            className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${isActive('/study-materials')}`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Study Materials</span>
          </Link>
          <Link 
            to="/events" 
            className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${isActive('/events')}`}
          >
            <CalendarDays className="h-4 w-4" />
            <span>Events</span>
          </Link>
          <Link 
            to="/forum" 
            className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${isActive('/forum')}`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Forum</span>
          </Link>
          <Link 
            to="/notice-board" 
            className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${isActive('/notice-board')}`}
          >
            <Bell className="h-4 w-4" />
            <span>Notices</span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth/student-login">
              <Button variant="outline" size="sm" className="hover-scale focus-ring">
                <LogIn className="h-4 w-4 mr-2" />
                Log in
              </Button>
            </Link>
            <Link to="/auth/choice">
              <Button size="sm" className="hover-scale focus-ring">Get Started</Button>
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
