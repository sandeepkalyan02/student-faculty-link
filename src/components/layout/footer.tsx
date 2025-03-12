
import React from 'react';
import { Logo } from '@/components/ui/logo';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full py-6 md:py-12 border-t bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              A modern platform that centralizes campus resources for students, faculty, and administrators.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium">Resources</div>
            <ul className="space-y-2">
              <li>
                <Link to="/study-materials" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Study Materials
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Events & Calendar
                </Link>
              </li>
              <li>
                <Link to="/forum" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Discussion Forum
                </Link>
              </li>
              <li>
                <Link to="/notice-board" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Notice Board
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium">Access</div>
            <ul className="space-y-2">
              <li>
                <Link to="/auth/student-login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/auth/faculty-login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Faculty Login
                </Link>
              </li>
              <li>
                <Link to="/auth/admin-login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium">Legal</div>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Campus Resource Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="#" className="text-muted-foreground hover:text-primary">
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
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary">
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
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary">
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
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
