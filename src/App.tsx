
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Choice from "./pages/auth/Choice";
import StudentLogin from "./pages/auth/StudentLogin";
import FacultyLogin from "./pages/auth/FacultyLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import Register from "./pages/auth/Register";
import StudyMaterials from "./pages/StudyMaterials";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Forum from "./pages/Forum";
import ForumPostDetails from "./pages/ForumPostDetails";
import NoticeBoard from "./pages/NoticeBoard";
import NoticeDetails from "./pages/NoticeDetails";
import StudentDashboard from "./pages/student/Dashboard";
import FacultyDashboard from "./pages/faculty/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import UploadMaterial from "./pages/UploadMaterial";
import CreateForumPost from "./pages/CreateForumPost";
import CreateNotice from "./pages/CreateNotice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth/choice" element={<Choice />} />
            <Route path="/auth/student-login" element={<StudentLogin />} />
            <Route path="/auth/faculty-login" element={<FacultyLogin />} />
            <Route path="/auth/admin-login" element={<AdminLogin />} />
            <Route path="/auth/register" element={<Register />} />
            
            {/* Student Routes */}
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Faculty Routes */}
            <Route 
              path="/faculty/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['faculty']}>
                  <FacultyDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-event" 
              element={
                <ProtectedRoute allowedRoles={['faculty', 'admin']}>
                  <CreateEvent />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-notice" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <CreateNotice />
                </ProtectedRoute>
              } 
            />
            
            {/* Semi-Protected Routes (all authenticated users) */}
            <Route 
              path="/upload-material" 
              element={
                <ProtectedRoute allowedRoles={['student', 'faculty', 'admin']}>
                  <UploadMaterial />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-forum-post" 
              element={
                <ProtectedRoute allowedRoles={['student', 'faculty', 'admin']}>
                  <CreateForumPost />
                </ProtectedRoute>
              } 
            />
            
            {/* Public Content Routes */}
            <Route path="/study-materials" element={<StudyMaterials />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/:id" element={<ForumPostDetails />} />
            <Route path="/notice-board" element={<NoticeBoard />} />
            <Route path="/notice-board/:id" element={<NoticeDetails />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
