
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, Download, BookOpen, Filter } from 'lucide-react';
import { toast } from 'sonner';

// Sample data for study materials
const SAMPLE_MATERIALS = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    description: "Fundamental concepts of computer science and programming",
    subject: "Computer Science",
    department: "Engineering",
    year: "First Year",
    uploadedBy: "Dr. Smith",
    uploadDate: "2023-09-15",
    fileType: "PDF",
    fileSize: "2.4 MB",
    downloads: 156
  },
  {
    id: 2,
    title: "Calculus I Study Guide",
    description: "Comprehensive guide covering limits, derivatives, and integrals",
    subject: "Mathematics",
    department: "Science",
    year: "First Year",
    uploadedBy: "Prof. Johnson",
    uploadDate: "2023-10-02",
    fileType: "PDF",
    fileSize: "3.8 MB",
    downloads: 234
  },
  {
    id: 3,
    title: "Organic Chemistry Notes",
    description: "Detailed notes on organic compounds and reactions",
    subject: "Chemistry",
    department: "Science",
    year: "Second Year",
    uploadedBy: "Dr. Williams",
    uploadDate: "2023-08-22",
    fileType: "DOCX",
    fileSize: "1.7 MB",
    downloads: 98
  },
  {
    id: 4,
    title: "Digital Electronics Slides",
    description: "Lecture slides for the digital electronics course",
    subject: "Electronics",
    department: "Engineering",
    year: "Third Year",
    uploadedBy: "Prof. Davis",
    uploadDate: "2023-11-05",
    fileType: "PPT",
    fileSize: "5.2 MB",
    downloads: 147
  },
  {
    id: 5,
    title: "Business Ethics Case Studies",
    description: "Collection of case studies on ethical business practices",
    subject: "Business Ethics",
    department: "Business",
    year: "Fourth Year",
    uploadedBy: "Dr. Brown",
    uploadDate: "2023-10-18",
    fileType: "PDF",
    fileSize: "4.1 MB",
    downloads: 89
  }
];

const StudyMaterials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMaterials, setFilteredMaterials] = useState(SAMPLE_MATERIALS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = SAMPLE_MATERIALS.filter(material => 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMaterials(filtered);
    
    if (filtered.length === 0) {
      toast.info("No materials found matching your search");
    } else {
      toast.success(`Found ${filtered.length} materials`);
    }
  };

  const handleDownload = (materialId: number) => {
    // In a real app, this would trigger a download
    toast.success("Download started", { 
      description: "Your file will be downloaded shortly." 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Study Materials</h1>
              <p className="text-muted-foreground mt-2">
                Access and download study resources for all courses
              </p>
            </div>
            <Button className="mt-4 md:mt-0 hover-scale focus-ring">
              <BookOpen className="mr-2 h-4 w-4" />
              Upload Material
            </Button>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, description, or subject..."
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
              <TabsTrigger value="all">All Materials</TabsTrigger>
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredMaterials.map(material => (
                <Card key={material.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{material.title}</CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Subject</p>
                        <p className="font-medium">{material.subject}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Department</p>
                        <p className="font-medium">{material.department}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Year</p>
                        <p className="font-medium">{material.year}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        {material.fileType}
                      </span>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        {material.fileSize}
                      </span>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        {material.downloads} downloads
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Uploaded by {material.uploadedBy} on {material.uploadDate}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleDownload(material.id)}
                      className="hover-scale focus-ring"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredMaterials.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No materials found</h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="engineering" className="space-y-4">
              {filteredMaterials.filter(m => m.department === "Engineering").map(material => (
                // Similar card structure as above
                <Card key={material.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{material.title}</CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Subject</p>
                        <p className="font-medium">{material.subject}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Department</p>
                        <p className="font-medium">{material.department}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Year</p>
                        <p className="font-medium">{material.year}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Uploaded by {material.uploadedBy} on {material.uploadDate}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleDownload(material.id)}
                      className="hover-scale focus-ring"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="science" className="space-y-4">
              {filteredMaterials.filter(m => m.department === "Science").map(material => (
                // Similar card structure as above
                <Card key={material.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{material.title}</CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Subject</p>
                        <p className="font-medium">{material.subject}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Department</p>
                        <p className="font-medium">{material.department}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Year</p>
                        <p className="font-medium">{material.year}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Uploaded by {material.uploadedBy} on {material.uploadDate}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleDownload(material.id)}
                      className="hover-scale focus-ring"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="business" className="space-y-4">
              {filteredMaterials.filter(m => m.department === "Business").map(material => (
                // Similar card structure as above
                <Card key={material.id} className="neo-glass hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{material.title}</CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Subject</p>
                        <p className="font-medium">{material.subject}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Department</p>
                        <p className="font-medium">{material.department}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Year</p>
                        <p className="font-medium">{material.year}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Uploaded by {material.uploadedBy} on {material.uploadDate}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleDownload(material.id)}
                      className="hover-scale focus-ring"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudyMaterials;
