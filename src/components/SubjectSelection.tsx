
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, BookOpen, Search, Check, Sparkles } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const AVAILABLE_SUBJECTS = [
  { id: "ds", name: "Data Structures", category: "Programming" },
  { id: "csa", name: "Computer Systems and Architecture", category: "Systems" },
  { id: "cn", name: "Computer Networks", category: "Networks" },
  { id: "dbms", name: "Database Management Systems", category: "Database" },
  { id: "daa", name: "Design and Analysis of Algorithms", category: "Programming" },
  { id: "dm", name: "Discrete Mathematics", category: "Mathematics" },
  { id: "oops", name: "Object Oriented Programming using Java", category: "Programming" },
  { id: "cprog", name: "C Programming", category: "Programming" },
  { id: "flat", name: "Formal Language and Automata Theory", category: "Theory" },
  { id: "se", name: "Software Engineering", category: "Engineering" },
  { id: "py", name: "Python Programming", category: "Programming" },
  { id: "cd", name: "Compiler Design", category: "Systems" },
  { id: "os", name: "Operating Systems", category: "Systems" }
];

// Group subjects by category
const SUBJECT_CATEGORIES = [...new Set(AVAILABLE_SUBJECTS.map(subject => subject.category))].sort();

interface SubjectSelectionProps {
  onComplete: (subjects: string[]) => void;
}

const SubjectSelection = ({ onComplete }: SubjectSelectionProps) => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState(AVAILABLE_SUBJECTS);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Check if there are saved subjects in localStorage
  useEffect(() => {
    const savedSubjects = localStorage.getItem("selectedSubjects");
    if (savedSubjects) {
      try {
        const parsedSubjects = JSON.parse(savedSubjects);
        if (Array.isArray(parsedSubjects)) {
          setSelectedSubjects(parsedSubjects);
        }
      } catch (error) {
        console.error("Error parsing saved subjects:", error);
      }
    }
  }, []);
  
  // Filter subjects based on search term and active category
  useEffect(() => {
    let filtered = AVAILABLE_SUBJECTS;
    
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(subject => 
        subject.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeCategory) {
      filtered = filtered.filter(subject => subject.category === activeCategory);
    }
    
    setFilteredSubjects(filtered);
  }, [searchTerm, activeCategory]);

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId);
      } else {
        return [...prev, subjectId];
      }
    });
  };
  
  const getSubjectById = (id: string) => {
    return AVAILABLE_SUBJECTS.find(subject => subject.id === id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSubjects.length === 0) {
      toast.error("Please select at least one subject");
      return;
    }
    
    // Store selected subjects in localStorage
    localStorage.setItem("selectedSubjects", JSON.stringify(selectedSubjects));
    
    toast.success(`${selectedSubjects.length} subjects selected successfully!`);
    onComplete(selectedSubjects);
  };

  const selectCategory = (category: string | null) => {
    setActiveCategory(prev => prev === category ? null : category);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border border-primary/20 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b pb-4">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Select Your Current Semester Subjects
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <p className="text-sm text-muted-foreground mb-2">
            Choose the subjects you are currently studying this semester. Your selection will be used
            to create a personalized assessment plan.
          </p>
          
          {/* Search and filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input 
                className="pl-10"
                placeholder="Search subjects..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center text-sm font-medium">
              <span className="mr-2 hidden sm:inline-block">Selected:</span>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {selectedSubjects.length} of {AVAILABLE_SUBJECTS.length}
              </Badge>
            </div>
          </div>
          
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <Button 
              type="button"
              size="sm" 
              variant={!activeCategory ? "default" : "outline"}
              onClick={() => selectCategory(null)}
              className="rounded-full text-xs h-8"
            >
              All Subjects
            </Button>
            {SUBJECT_CATEGORIES.map(category => (
              <Button
                key={category}
                type="button" 
                size="sm"
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => selectCategory(category)}
                className="rounded-full text-xs h-8"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Subject grid */}
          <div className="bg-slate-50 rounded-lg p-5 border">
            {filteredSubjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-2">
                {filteredSubjects.map(subject => {
                  const isSelected = selectedSubjects.includes(subject.id);
                  
                  return (
                    <div 
                      key={subject.id}
                      className={`flex items-center gap-3 p-3 rounded-md transition-all cursor-pointer hover:bg-primary/5 ${
                        isSelected 
                          ? 'bg-primary/10 border border-primary/30 shadow-sm' 
                          : 'bg-white border border-slate-200'
                      }`}
                      onClick={() => toggleSubject(subject.id)}
                    >
                      <div className="flex-shrink-0">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-primary border-primary text-white'
                            : 'border-slate-300 text-transparent'
                        }`}>
                          {isSelected && <Check className="h-4 w-4" />}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{subject.name}</p>
                        <p className="text-xs text-muted-foreground">{subject.category}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 text-center text-muted-foreground">
                No subjects match your search criteria
              </div>
            )}
          </div>
          
          {/* Selected subjects */}
          {selectedSubjects.length > 0 && (
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <div className="font-medium mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Selected subjects:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSubjects.map(subjectId => {
                  const subject = getSubjectById(subjectId);
                  return subject ? (
                    <Badge 
                      key={subjectId}
                      className="bg-primary text-white px-3 py-1 h-7"
                    >
                      {subject.name}
                      <button 
                        type="button" 
                        className="ml-2 hover:bg-white/20 rounded-full w-4 h-4 inline-flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubject(subjectId);
                        }}
                      >
                        ×
                      </button>
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          type="submit" 
          className="px-8 py-6 text-base flex items-center gap-2 shadow-md transition-transform hover:scale-105"
          disabled={selectedSubjects.length === 0}
        >
          Continue to Quiz
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default SubjectSelection;
