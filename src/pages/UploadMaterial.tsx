
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { BookText, Upload, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { uploadStudyMaterial } from '@/api/studyMaterials';

const departmentOptions = [
  'Engineering',
  'Science',
  'Business',
  'Arts',
  'Medicine',
  'Law'
];

const yearOptions = [
  'First Year',
  'Second Year',
  'Third Year',
  'Fourth Year',
  'Postgraduate'
];

const UploadMaterial = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    department: '',
    year: '',
    file: null as File | null
  });
  
  const [filePreview, setFilePreview] = useState({
    name: '',
    type: '',
    size: ''
  });
  
  const uploadMutation = useMutation({
    mutationFn: (data: any) => uploadStudyMaterial(data, user?.id || ''),
    onSuccess: () => {
      toast.success('Material uploaded successfully');
      navigate('/study-materials');
    },
    onError: () => {
      toast.error('Failed to upload material');
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
      
      // Format file size
      let size = file.size;
      let sizeLabel = 'B';
      
      if (size > 1024) {
        size = size / 1024;
        sizeLabel = 'KB';
      }
      
      if (size > 1024) {
        size = size / 1024;
        sizeLabel = 'MB';
      }
      
      setFilePreview({
        name: file.name,
        type: file.type.split('/')[1].toUpperCase(),
        size: `${size.toFixed(1)} ${sizeLabel}`
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const { title, description, subject, department, year, file } = formData;
    
    if (!title || !description || !subject || !department || !year || !file) {
      toast.error('Please fill in all fields and upload a file');
      return;
    }
    
    // In a real app, we would upload the file to storage and get a URL
    // For this demo, we'll create a fake URL
    const fileUrl = `https://example.com/files/${file.name}`;
    
    uploadMutation.mutate({
      title,
      description,
      subject,
      department,
      year,
      fileType: filePreview.type,
      fileSize: filePreview.size,
      fileUrl,
      downloads: 0
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl animate-fade-in">
          <div className="flex flex-col items-center text-center mb-8">
            <BookText className="h-12 w-12 text-primary mb-4" />
            <h1 className="text-3xl font-bold">Upload Study Material</h1>
            <p className="text-muted-foreground mt-2 max-w-md">
              Share your notes, presentations, and other educational resources with the community
            </p>
          </div>
          
          <Card className="neo-glass">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    name="title"
                    placeholder="E.g., Introduction to Calculus Notes" 
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Provide a brief description of the material" 
                    className="min-h-20"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      name="subject"
                      placeholder="E.g., Mathematics" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select 
                      value={formData.department} 
                      onValueChange={(value) => handleSelectChange('department', value)}
                      required
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departmentOptions.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Select 
                      value={formData.year} 
                      onValueChange={(value) => handleSelectChange('year', value)}
                      required
                    >
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-accent/50 transition-colors cursor-pointer">
                    <input 
                      type="file" 
                      id="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      required
                    />
                    <label htmlFor="file" className="cursor-pointer flex flex-col items-center">
                      {formData.file ? (
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-primary mr-2" />
                          <div className="text-left">
                            <p className="font-medium truncate max-w-xs">{filePreview.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {filePreview.type} • {filePreview.size}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="font-medium">Click to upload or drag and drop</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX (Max 10MB)
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/study-materials')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={uploadMutation.isPending}
                  >
                    {uploadMutation.isPending ? (
                      <>
                        <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                        Uploading...
                      </>
                    ) : 'Upload Material'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UploadMaterial;
