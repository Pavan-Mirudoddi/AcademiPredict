
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, BookText, User, Building2, IdCard } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface StudentInfoFormProps {
  onComplete: (data: { 
    name: string; 
    department: string; 
    collegeName: string; 
    collegeId: string;
  }) => void;
}

const StudentInfoForm = ({ onComplete }: StudentInfoFormProps) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("CSE");
  const [collegeName, setCollegeName] = useState("");
  const [collegeId, setCollegeId] = useState("");

  // Check if there is saved student info in localStorage
  useEffect(() => {
    const savedInfo = localStorage.getItem("studentInfo");
    if (savedInfo) {
      try {
        const parsedInfo = JSON.parse(savedInfo);
        setName(parsedInfo.name || "");
        setDepartment(parsedInfo.department || "CSE");
        setCollegeName(parsedInfo.collegeName || "");
        setCollegeId(parsedInfo.collegeId || "");
      } catch (error) {
        console.error("Error parsing saved student info:", error);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!collegeName.trim()) {
      toast.error("Please enter your college name");
      return;
    }

    if (!collegeId.trim()) {
      toast.error("Please enter your college ID");
      return;
    }
    
    // Store student info in localStorage
    const studentInfo = { name, department, collegeName, collegeId };
    localStorage.setItem("studentInfo", JSON.stringify(studentInfo));
    
    toast.success("Student information saved!");
    onComplete(studentInfo);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border shadow-md overflow-hidden">
        <CardContent className="p-6 space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <Label htmlFor="name" className="text-base font-medium">Student Name</Label>
            </div>
            <Input 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <Label htmlFor="collegeName" className="text-base font-medium">College Name</Label>
            </div>
            <Input 
              id="collegeName"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              placeholder="Enter your college name"
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <IdCard className="h-4 w-4 text-primary" />
              <Label htmlFor="collegeId" className="text-base font-medium">College ID</Label>
            </div>
            <Input 
              id="collegeId"
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              placeholder="Enter your college ID"
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookText className="h-4 w-4 text-primary" />
              <Label className="text-base font-medium">Department</Label>
            </div>
            <RadioGroup defaultValue="CSE" value={department} onValueChange={setDepartment}>
              <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-50">
                <RadioGroupItem value="CSE" id="cse" />
                <Label htmlFor="cse">Computer Science and Engineering</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button type="submit" className="px-6 flex items-center gap-2 shadow-md">
          Continue to Subject Selection
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default StudentInfoForm;
