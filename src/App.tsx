/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Search, 
  ChevronRight, 
  ChevronLeft,
  ExternalLink,
  Target,
  FlaskConical,
  BarChart3,
  Layers,
  Lock,
  LayoutDashboard,
  Save,
  RefreshCw,
  Trash2,
  Plus,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

// --- Types ---
interface Project {
  id: string;
  title: string;
  subtitle: string;
  brand: string;
  logo: string;
  problem: string;
  mission: string;
  action: string[];
  result: string;
  image?: string;
  images: string[];
}

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  desc: string;
}

interface PortfolioData {
  hero: {
    name: string;
    tagline: string;
    phone: string;
    email: string;
    location: string;
    birthDate: string;
    image?: string;
  };
  experiences: ExperienceItem[];
  skills: string[];
  awards: { date: string; title: string; subtitle: string }[];
  projects: Project[];
  timeline: TimelineItem[];
}

// --- Initial Data ---
const INITIAL_DATA: PortfolioData = {
  "hero": {
    "name": "CHAEBIN LYU",
    "tagline": "Driving results through data and teamwork",
    "phone": "+82 10 9132 6751",
    "email": "chaebin0522@naver.com",
    "location": "Seoul, South Korea",
    "birthDate": "May 22, 2002",
    "image": "https://www.image2url.com/r2/default/images/1776362155499-23328bb4-fabd-4549-90a4-1c1fde703838.jpg"
  },
  "experiences": [
    {
      "id": "exp-1",
      "company": "BAT (Marketing Agency)",
      "role": "Performance Marketing AE",
      "period": "Dec 2024 – Aug 2025",
      "desc": "Managed high-stakes campaigns for KakaoPage, optimizing creative strategies and system architectures to drive significant efficiency gains."
    },
    {
      "id": "exp-2",
      "company": "Sungkyunkwan University (SKKU)",
      "role": "BBA in Global Business Administration",
      "period": "Mar 2021 – Feb 2026",
      "desc": ""
    },
    {
      "id": "exp-3",
      "company": "Kelley School of Business (Indiana University)",
      "role": "Exchange Student",
      "period": "Aug 2023 – Dec 2023",
      "desc": ""
    }
  ],
  "skills": [
    "Google Analytics Certified",
    "Python & SQL for Data Analysis",
    "Advanced Data Analytics (ADsP)",
    "SNS Marketing Specialist L1",
    "OPIc English (Advanced Low)",
    "GTQ Photoshop L1",
    "Performance Creative Ideation"
  ],
  "awards": [
    {
      "date": "2024.12",
      "title": "Excellence Award: Mirae Asset Investment Project",
      "subtitle": "Team Leader / Academic-Industrial Cooperation Project"
    },
    {
      "date": "2023.02",
      "title": "Excellence Award: CJ LiveCity Business Camp",
      "subtitle": "2nd Joint Business Strategy Competition"
    }
  ],
  "projects": [
    {
      "id": "proj-1",
      "brand": "Meta",
      "logo": "https://www.image2url.com/r2/default/images/1776363590650-50b592a4-b683-4ef5-a848-cc06348325f1.png",
      "title": "KakaoPage Performance Marketing (BAT)",
      "subtitle": "CPA Reduced by 50%",
      "problem": "Fragmented performance in iOS campaigns compared to Android due to tracking limitations and generic creative assets.",
      "mission": "",
      "action": [
        "Reconstructed campaign architecture targeting gender-specific nuances.",
        "Developed creatives based on high-performing keywords",
        "Implemented meticulous daily quality monitoring and target filtering.."
      ],
      "result": "Strategic restructuring led to a 50% drop in CPA within 7 days, now serving as a benchmark for other accounts.",
      "image": "https://www.image2url.com/r2/default/images/1776363666402-8536d1d6-9251-4158-af6e-abd85c12a30d.jpg",
      "images": []
    },
    {
      "id": "proj-2",
      "brand": "LG Electronics",
      "logo": "https://www.image2url.com/r2/default/images/1776363449770-a4c528c0-6816-4751-8446-7d36f3f274b8.png",
      "title": "LG Electronics Sales Strategy (Team Leader)",
      "subtitle": "Pioneering the Subscription Economy",
      "problem": "",
      "mission": "Propose a new home appliance rental/subscription business model for LG Electronics.",
      "action": [
        "Discovered a 'Used Product' stigma among young consumers through focus groups.",
        "Re-positioned 'Rental' as 'Care-based Tech-Lifecycle' tailored for short-term studio apartments.",
        "Validated strategy through 10+ real estate interviews and 100+ local surveys."
      ],
      "result": "Presented a comprehensive 'My First LG' strategy targeting MZ-generation single households.",
      "image": "https://www.image2url.com/r2/default/images/1776362194977-c4796d68-1c57-4ff6-a68d-9231042d9723.png",
      "images": [
        "https://www.image2url.com/r2/default/images/1776362270498-4c869a20-1d45-47fd-9211-bb9e891ebde7.png"
      ]
    },
    {
      "id": "proj-3",
      "brand": "Olive International",
      "logo": "https://www.image2url.com/r2/default/images/1776363536957-a788bcf9-903f-4584-98c9-11244aec33df.png",
      "title": "Spanish Market Entry for 'Milk Touch'",
      "subtitle": "Global sales strategy for Korean cosmetic brand",
      "problem": "K-beauty visibility was low in the Spanish market despite growing interest, requiring a localized viral approach.",
      "mission": "Strategic entry plan for Olive International's cosmetic brand 'Milk Touch' in Spain.",
      "action": [
        "Analyzed successful K-beauty mapping in the EU to identify growth levers.",
        "Proposed image-centric SNS viral strategy leveraging 'Milk Touch's distinctive visualization assets.",
        "Leveraged exchange student network to conduct 100+ local surveys and 10+ deep interviews in Spanish."
      ],
      "result": "Recommended strategies and product selections were adopted by 'Miin Cosmetic', a major K-beauty retailer in Spain.",
      "image": "https://www.image2url.com/r2/default/images/1776362012159-4b9294d7-6823-464b-87ee-85b96e15ff06.png",
      "images": [
        "https://www.image2url.com/r2/default/images/1776362075423-85c613aa-941b-4889-92de-78fd3caff13f.png"
      ]
    }
  ],
  "timeline": [
    {
      "year": "2024-2025",
      "title": "President of MCL Marketing Strategy Club",
      "desc": "Led a 30-member elite marketing club, secured 3+ industrial cooperation projects with 30% improved contract value."
    },
    {
      "year": "2024",
      "title": "Galaxy Campus Ambassador",
      "desc": "4th generation ambassador focusing on youth engagement and community building for Samsung Galaxy."
    },
    {
      "year": "2023",
      "title": "Taylor Port Wine Rebranding",
      "desc": "Explored Gen-Z perception of traditional wine and restructured digital touchpoints."
    },
    {
      "year": "2022",
      "title": "CJ LiveCity CX Strategy",
      "desc": "Awarded for designing immersive brand experiences for the future K-culture arena."
    }
  ]
};

// --- Animations ---
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// --- Image Carousel Component ---
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full overflow-hidden group/carousel">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="min-w-full h-full">
            <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        ))}
      </div>
      
      {images.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-white"
          >
            <ChevronLeft className="w-5 h-5 text-blue-900" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-white"
          >
            <ChevronRight className="w-5 h-5 text-blue-900" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- Components ---
const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="text-4xl font-bold text-gray-900 border-l-4 border-blue-900 pl-4 mb-2 font-display uppercase tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && <p className="text-gray-500 text-lg">{subtitle}</p>}
  </div>
);

// --- Image Upload Helper ---
const ImageUpload = ({ label, currentImage, onImageChange, onRemove }: { label: string, currentImage?: string, onImageChange: (val: string) => void, onRemove?: () => void }) => {
  const [showUpload, setShowUpload] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
        setShowUpload(false); // Switch back to URL view (which shows the path/base64)
      };
      reader.readAsDataURL(file);
    }
  };

  const isBase64 = currentImage?.startsWith('data:');
  const isLocalFile = currentImage?.startsWith('/uploads/');

  return (
    <div className="space-y-3 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-bold text-blue-900 flex items-center gap-2">
          {label}
          {isLocalFile && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded uppercase">Cloud File</span>}
          {isBase64 && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase">Pending Upload</span>}
        </Label>
        <div className="flex gap-2">
          {onRemove && (
            <Button variant="ghost" size="sm" className="h-7 text-red-500 hover:text-red-700 text-xs px-2" onClick={onRemove}>
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg overflow-hidden border bg-white shadow-sm shrink-0 flex items-center justify-center">
            {currentImage ? (
              <img src={currentImage} className="w-full h-full object-cover" alt="Preview" referrerPolicy="no-referrer" />
            ) : (
              <Search className="w-6 h-6 text-gray-300" />
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            {!showUpload ? (
              <div className="flex gap-2">
                <Input 
                  placeholder="https://image-url.com/photo.jpg"
                  value={currentImage || ""} 
                  onChange={(e) => onImageChange(e.target.value)}
                  className="text-sm h-10 bg-white"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-10 border-blue-200 text-blue-900 hover:bg-blue-50 shrink-0"
                  onClick={() => setShowUpload(true)}
                >
                  Upload File
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input type="file" accept="image/*" onChange={handleFileChange} className="cursor-pointer text-sm h-10 bg-white flex-1" />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-10 text-gray-500"
                  onClick={() => setShowUpload(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
            <p className="text-[10px] text-gray-500 italic pl-1">
              * Recommended: Paste a URL for reliable GitHub syncing, or upload a file to save to cloud storage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Admin Sub-pages ---
const AdminHome = ({ data, updateData, reloadData }: { data: PortfolioData, updateData: (d: PortfolioData) => void, reloadData: () => Promise<boolean> }) => {
  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleHeroChange = (field: keyof typeof localData.hero, value: string) => {
    setLocalData({ ...localData, hero: { ...localData.hero, [field]: value } });
  };

  const handleSave = () => {
    updateData(localData);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <p className="text-sm text-gray-500">Manage your portfolio content and images</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" onClick={reloadData} className="flex-1 md:flex-none border-blue-200 text-blue-900">
            <RefreshCw className="w-4 h-4 mr-2" /> Sync from Cloud
          </Button>
          <Button onClick={handleSave} className="flex-1 md:flex-none bg-blue-900 hover:bg-blue-950">
            <Save className="w-4 h-4 mr-2" /> Save All Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="bg-gray-100 p-1">
          <TabsTrigger value="hero">Hero & Profile</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills & Awards</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={localData.hero.name} onChange={(e) => handleHeroChange("name", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Tagline</Label>
                <Input value={localData.hero.tagline} onChange={(e) => handleHeroChange("tagline", e.target.value)} />
              </div>
              <div className="space-y-4 md:col-span-2">
                <ImageUpload 
                  label="Profile Picture" 
                  currentImage={localData.hero.image} 
                  onImageChange={(b64) => handleHeroChange("image", b64)} 
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={localData.hero.phone} onChange={(e) => handleHeroChange("phone", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={localData.hero.email} onChange={(e) => handleHeroChange("email", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={localData.hero.location} onChange={(e) => handleHeroChange("location", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Birth Date</Label>
                <Input value={localData.hero.birthDate} onChange={(e) => handleHeroChange("birthDate", e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="mt-6 space-y-4">
          {localData.experiences.map((exp, idx) => (
            <Card key={exp.id}>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Institution/Company</Label>
                    <Input value={exp.company} onChange={(e) => {
                      const newExp = [...localData.experiences];
                      newExp[idx].company = e.target.value;
                      setLocalData({ ...localData, experiences: newExp });
                    }} />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input value={exp.role} onChange={(e) => {
                      const newExp = [...localData.experiences];
                      newExp[idx].role = e.target.value;
                      setLocalData({ ...localData, experiences: newExp });
                    }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Period</Label>
                  <Input value={exp.period} onChange={(e) => {
                    const newExp = [...localData.experiences];
                    newExp[idx].period = e.target.value;
                    setLocalData({ ...localData, experiences: newExp });
                  }} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={exp.desc} onChange={(e) => {
                    const newExp = [...localData.experiences];
                    newExp[idx].desc = e.target.value;
                    setLocalData({ ...localData, experiences: newExp });
                  }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="projects" className="mt-6 space-y-4">
          {localData.projects.map((proj, idx) => (
            <Card key={proj.id}>
              <CardHeader>
                <CardTitle>{proj.brand} Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={proj.title} onChange={(e) => {
                      const newProj = [...localData.projects];
                      newProj[idx].title = e.target.value;
                      setLocalData({ ...localData, projects: newProj });
                    }} />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtitle (Result Focus)</Label>
                    <Input value={proj.subtitle} onChange={(e) => {
                      const newProj = [...localData.projects];
                      newProj[idx].subtitle = e.target.value;
                      setLocalData({ ...localData, projects: newProj });
                    }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Problem Statement</Label>
                  <Textarea value={proj.problem} onChange={(e) => {
                    const newProj = [...localData.projects];
                    newProj[idx].problem = e.target.value;
                    setLocalData({ ...localData, projects: newProj });
                  }} />
                </div>
                <div className="space-y-2">
                  <Label>Action Points (Comma separated)</Label>
                  <Textarea value={proj.action.join(", ")} onChange={(e) => {
                    const newProj = [...localData.projects];
                    newProj[idx].action = e.target.value.split(",").map(s => s.trim());
                    setLocalData({ ...localData, projects: newProj });
                  }} />
                </div>
                <div className="space-y-4 md:col-span-2">
                  <div className="flex justify-between items-center">
                    <Label>Project Images</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-blue-200 text-blue-900 hover:bg-blue-50"
                      onClick={() => {
                        const newProj = [...localData.projects];
                        newProj[idx].images = [...(newProj[idx].images || []), ""];
                        setLocalData({ ...localData, projects: newProj });
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Image
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ImageUpload 
                      label="Main Thumbnail" 
                      currentImage={proj.image} 
                      onImageChange={(val) => {
                        const newProj = [...localData.projects];
                        newProj[idx].image = val;
                        setLocalData({ ...localData, projects: newProj });
                      }}
                    />
                    {(proj.images || []).map((img, imgIdx) => (
                      <div key={imgIdx}>
                        <ImageUpload 
                          label={`Slide ${imgIdx + 1}`} 
                          currentImage={img} 
                          onImageChange={(b64) => {
                            const newProj = [...localData.projects];
                            newProj[idx].images[imgIdx] = b64;
                            setLocalData({ ...localData, projects: newProj });
                          }}
                          onRemove={() => {
                            const newProj = [...localData.projects];
                            newProj[idx].images = newProj[idx].images.filter((_, i) => i !== imgIdx);
                            setLocalData({ ...localData, projects: newProj });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <ImageUpload 
                    label="Brand Logo" 
                    currentImage={proj.logo} 
                    onImageChange={(b64) => {
                      const newProj = [...localData.projects];
                      newProj[idx].logo = b64;
                      setLocalData({ ...localData, projects: newProj });
                    }} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Final Result</Label>
                  <Textarea value={proj.result} onChange={(e) => {
                    const newProj = [...localData.projects];
                    newProj[idx].result = e.target.value;
                    setLocalData({ ...localData, projects: newProj });
                  }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// --- View Pages ---
const PortfolioView = ({ data }: { data: PortfolioData }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-white py-12">
        <div className="absolute top-0 w-full h-[60%] bg-gradient-to-b from-blue-900 to-blue-800" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-white rounded-[2rem] shadow-2xl p-12 flex flex-col md:row-reverse lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-white shadow-xl flex-shrink-0"
            >
              <img 
                src={data.hero.image || "https://picsum.photos/seed/chaebin/400/400"} 
                alt={data.hero.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <div className="flex-1 text-center lg:text-left">
              <motion.div {...fadeIn}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 font-display uppercase tracking-tight">
                  {data.hero.name.split(" ").map((s, i) => i === 1 ? <span key={i} className="text-blue-900 underline decoration-4 underline-offset-8">{s} </span> : s + " ")}
                </h1>
                <p className="text-xl md:text-2xl font-medium text-gray-700 mb-8 italic">
                  {data.hero.tagline}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <Phone className="w-5 h-5 text-blue-900" />
                    <span>{data.hero.phone}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <Mail className="w-5 h-5 text-blue-900" />
                    <span>{data.hero.email}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-900" />
                    <span>{data.hero.location}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-900" />
                    <span>{data.hero.birthDate}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education & Experience */}
          <div>
            <SectionHeader title="Experience & Education" />
            <div className="space-y-12">
              {data.experiences.map((exp, idx) => (
                <div key={exp.id} className="relative pl-8 border-l-2 border-gray-100">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-900 shadow-sm" style={{ backgroundColor: idx === 0 ? '#003da5' : '#d1d5db' }} />
                  <h3 className="text-xl font-bold">{exp.company}</h3>
                  <p className="text-blue-900 font-semibold">{exp.role}</p>
                  <p className="text-gray-400 text-sm">{exp.period}</p>
                  {exp.desc && <p className="mt-2 text-gray-600">{exp.desc}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Awards */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-900" />
                Specialized Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                < Award className="w-6 h-6 text-blue-900" />
                Key Awards
              </h3>
              <ul className="space-y-4">
                {data.awards.map((award, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="text-blue-900 font-bold shrink-0">{award.date}</div>
                    <div>
                      <h4 className="font-bold">{award.title}</h4>
                      <p className="text-sm text-gray-500">{award.subtitle}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Project Case Studies */}
      <section className="py-24 container mx-auto px-6 max-w-6xl bg-gray-50/50 rounded-[3rem]">
        <SectionHeader title="Featured Projects" />
        <div className="space-y-32">
          {data.projects.map((proj, idx) => {
            // Create a normalized list of images for rendering
            const allImages = [...(proj.images || [])];
            if (proj.image && !allImages.includes(proj.image)) {
              allImages.unshift(proj.image);
            }

            return (
              <div key={proj.id} className={`grid grid-cols-1 items-center gap-12 ${allImages.length > 0 ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto'}`}>
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className={`space-y-6 ${idx % 2 !== 0 && allImages.length > 0 ? 'order-1 lg:order-2' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    {proj.logo && <img src={proj.logo} className="w-12 h-12 rounded-lg" referrerPolicy="no-referrer" alt={proj.brand} />}
                    <h4 className="text-2xl font-bold tracking-tight">{proj.title}</h4>
                  </div>
                  <h5 className="text-4xl font-extrabold text-blue-900 leading-tight">{proj.subtitle}</h5>
                  <div className="space-y-4 text-gray-600">
                    {proj.problem && <p><strong>Problem:</strong> {proj.problem}</p>}
                    {proj.mission && <p><strong>Mission:</strong> {proj.mission}</p>}
                    <div><strong>Action:</strong> 
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {proj.action.map((a, i) => <li key={i}>{a}</li>)}
                      </ul>
                    </div>
                    <p className="bg-blue-50 p-4 border-l-4 border-blue-900 rounded-r-lg font-medium text-blue-900 shadow-sm">
                      Result: {proj.result}
                    </p>
                  </div>
                </motion.div>
                
                {allImages.length > 0 && (
                  <div className={`bg-gray-100 rounded-3xl aspect-video relative overflow-hidden shadow-inner group ${idx % 2 !== 0 ? 'order-2 lg:order-1' : ''}`}>
                    {allImages.length === 1 ? (
                      <img src={allImages[0]} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" alt="Project" />
                    ) : (
                      <ImageCarousel images={allImages} />
                    )}
                    <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply pointer-events-none" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionHeader title="Project Timeline" subtitle="A 3-year journey of rapid growth and impact" />
          <div className="relative border-l border-gray-800 ml-4 space-y-16">
            {data.timeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative pl-12 group"
              >
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-blue-400 group-hover:scale-150 transition-transform" />
                <div className="text-blue-400 font-bold mb-1">{item.year}</div>
                <h4 className="text-xl font-bold group-hover:text-blue-300 transition-colors">{item.title}</h4>
                <p className="text-gray-400 mt-2 max-w-2xl text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}>
            <div className="flex flex-wrap justify-center gap-6">
              <a href={`mailto:${data.hero.email}`} className="bg-blue-900 text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-colors shadow-lg shadow-blue-200 flex items-center gap-2">
                <Mail className="w-5 h-5" /> Contact via Email
              </a>
              <a href={`tel:${data.hero.phone.replace(/\s/g, '')}`} className="bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                <Phone className="w-5 h-5" /> Call Directly
              </a>
            </div>
            
            <div className="mt-16 text-gray-400 text-xs flex items-center justify-center gap-4">
              <span>© 2026 {data.hero.name}</span>
              <span className="w-1 h-1 bg-gray-200 rounded-full" />
              <Link to="/admin" className="hover:text-blue-900 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Admin
              </Link>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [backupJSON, setBackupJSON] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleUpdateData = async (newData: PortfolioData) => {
    let finalData = newData;
    
    // 1. Try server save (no size limit)
    try {
      toast.loading("Saving to cloud...", { id: "save-toast" });
      const response = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData)
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          finalData = result.data;
          // Synchronize state with processed data (containing file paths)
          setData(finalData);
          // Also update local storage with the lightweight data
          localStorage.setItem("portfolio_data", JSON.stringify(finalData));
          toast.success("Cloud sync complete! Images converted to files.", { id: "save-toast" });
        } else {
          throw new Error(result.error || "Server processing failed");
        }
      } else {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} ${errorText}`);
      }
    } catch (err) {
      console.error("Server save failed:", err);
      toast.error(`Cloud save failed: ${err instanceof Error ? err.message : 'Unknown error'}`, { id: "save-toast" });
      
      // Fallback: Continue with local state and try local storage
      setData(newData);
      try {
        localStorage.setItem("portfolio_data", JSON.stringify(newData));
        toast.info("Saved to local storage only.");
      } catch (e) {
        console.error("Local storage quota exceeded", e);
        setBackupJSON(JSON.stringify(newData, null, 2));
        toast.error("Storage full! Use the emergency backup button.");
      }
    }
  };

  const reloadFromServer = async () => {
    try {
      const response = await fetch("/api/data");
      if (response.ok) {
        const serverData = await response.json();
        if (serverData) {
          setData(serverData);
          localStorage.setItem("portfolio_data", JSON.stringify(serverData));
          toast.success("Data reloaded matching server files.");
          return true;
        }
      }
    } catch (err) {
      toast.error("Could not sync with server.");
    }
    return false;
  };

  useEffect(() => {
    const loadData = async () => {
      // Preference: Server Data > LocalStorage > InitialData
      try {
        const response = await fetch("/api/data");
        if (response.ok) {
          const serverData = await response.json();
          if (serverData) {
            setData(serverData);
            return;
          }
        }
      } catch (err) {
        console.warn("Could not load from server, checking local storage.");
      }

      const savedData = localStorage.getItem("portfolio_data");
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    };
    loadData();
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "0522") {
      setIsAdminAuthenticated(true);
      toast.success("Welcome back, Chaebin!");
    } else {
      toast.error("Invalid password. Please try again.");
    }
  };

  const downloadBackup = () => {
    if (!backupJSON) return;
    const blob = new Blob([backupJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio_backup.json";
    a.click();
    URL.revokeObjectURL(url);
    setBackupJSON(null);
  };

  return (
    <>
      <Toaster position="top-center" />
      
      {/* Emergency Backup Modal */}
      {backupJSON && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm">
          <Card className="w-full max-w-lg border-2 border-blue-900 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <Save className="w-5 h-5" /> Critical: Storage Limit Reached
              </CardTitle>
              <CardDescription>
                Your browser's local storage is full due to high-quality images. 
                Your changes ARE currently in the app's memory but couldn't be permanently saved.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm font-medium">Please download this backup file before closing or refreshing.</p>
              <div className="flex gap-3">
                <Button onClick={downloadBackup} className="flex-1 bg-blue-900 hover:bg-blue-950">
                  Download Backup JSON
                </Button>
                <Button variant="outline" onClick={() => setBackupJSON(null)}>
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Routes>
        <Route path="/" element={<PortfolioView data={data} />} />
        <Route path="/admin" element={
          !isAdminAuthenticated ? (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
              <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-blue-900" />
                  </div>
                  <CardTitle>Admin Access</CardTitle>
                  <CardDescription>Please enter your access code</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••" 
                        value={passwordInput} 
                        onChange={(e) => setPasswordInput(e.target.value)}
                        autoFocus
                        className="text-center tracking-widest text-lg"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-950">Unlock Dashboard</Button>
                    <Link to="/" className="block text-center text-sm text-gray-500 hover:text-gray-900 mt-4 flex items-center justify-center gap-1">
                      <ArrowLeft className="w-3 h-3" /> Back to Portfolio
                    </Link>
                  </form>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="min-h-screen bg-gray-50 pb-20">
              <nav className="bg-white border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-blue-900">
                    <LayoutDashboard className="w-5 h-5" /> Admin Panel
                  </div>
                  <div className="flex items-center gap-4">
                    <Link to="/" className="text-sm border px-3 py-1 rounded-md hover:bg-gray-50">Preview Site</Link>
                    <Button variant="ghost" className="text-sm text-red-500 hover:text-red-600" onClick={() => setIsAdminAuthenticated(false)}>Log out</Button>
                  </div>
                </div>
              </nav>
              <div className="max-w-4xl mx-auto px-4 py-10">
                <AdminHome data={data} updateData={handleUpdateData} reloadData={reloadFromServer} />
              </div>
            </div>
          )
        } />
      </Routes>
    </>
  );
}
