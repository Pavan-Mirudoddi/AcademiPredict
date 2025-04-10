
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ChevronRight, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type FormDataType = {
  attendance: number;
  studyHours: number;
  previousGrade: number;
  assignmentsCompleted: number;
  classParticipation: number;
  sleepHours: number;
  extracurricular: number;
  screenTime: number;
};

// This would normally be an API call to your Python backend
const mockPrediction = (data: FormDataType) => {
  // Simplified mock prediction calculation
  const weighted = 
    data.attendance * 0.2 + 
    data.studyHours * 0.25 + 
    data.previousGrade * 0.3 + 
    data.assignmentsCompleted * 0.15 + 
    data.classParticipation * 0.05 + 
    data.sleepHours * 0.03 - 
    data.screenTime * 0.01 + 
    data.extracurricular * 0.02;
  
  // Add some randomness
  const prediction = Math.min(100, Math.max(0, weighted + (Math.random() * 10 - 5)));
  
  // Just for demo - we'd store this in a state management solution in a real app
  localStorage.setItem('predictionResult', JSON.stringify({
    score: prediction.toFixed(1),
    inputData: data,
    timestamp: new Date().toISOString()
  }));
  
  return prediction;
};

const FeatureHelp = ({ children }: { children: React.ReactNode }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="ml-1 inline-flex">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p className="text-sm">{children}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const PredictionForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormDataType>({
    attendance: 85,
    studyHours: 12,
    previousGrade: 75,
    assignmentsCompleted: 90,
    classParticipation: 70,
    sleepHours: 7,
    extracurricular: 3,
    screenTime: 4,
  });

  const handleSliderChange = (value: number[], name: keyof FormDataType) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value[0],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof FormDataType) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API call delay
    setTimeout(() => {
      try {
        mockPrediction(formData);
        toast.success("Prediction generated successfully!");
        navigate("/results");
      } catch (error) {
        toast.error("Error generating prediction. Please try again.");
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance */}
        <FeatureCard 
          title="Attendance" 
          value={formData.attendance} 
          unit="%" 
          tooltip="Percentage of classes attended throughout the term."
          min={0}
          max={100}
          onChange={(value) => handleSliderChange(value, "attendance")}
          onInputChange={(e) => handleInputChange(e, "attendance")}
        />

        {/* Study Hours */}
        <FeatureCard 
          title="Weekly Study Hours" 
          value={formData.studyHours} 
          unit="hours" 
          tooltip="Average number of hours spent studying per week outside of class."
          min={0}
          max={40}
          onChange={(value) => handleSliderChange(value, "studyHours")}
          onInputChange={(e) => handleInputChange(e, "studyHours")}
        />

        {/* Previous Grade */}
        <FeatureCard 
          title="Previous Grade" 
          value={formData.previousGrade} 
          unit="%" 
          tooltip="Last term's grade in this or a similar subject."
          min={0}
          max={100}
          onChange={(value) => handleSliderChange(value, "previousGrade")}
          onInputChange={(e) => handleInputChange(e, "previousGrade")}
        />

        {/* Assignments Completed */}
        <FeatureCard 
          title="Assignments Completed" 
          value={formData.assignmentsCompleted} 
          unit="%" 
          tooltip="Percentage of assignments completed on time."
          min={0}
          max={100}
          onChange={(value) => handleSliderChange(value, "assignmentsCompleted")}
          onInputChange={(e) => handleInputChange(e, "assignmentsCompleted")}
        />

        {/* Class Participation */}
        <FeatureCard 
          title="Class Participation" 
          value={formData.classParticipation} 
          unit="%" 
          tooltip="How actively the student participates during classes."
          min={0}
          max={100}
          onChange={(value) => handleSliderChange(value, "classParticipation")}
          onInputChange={(e) => handleInputChange(e, "classParticipation")}
        />

        {/* Sleep Hours */}
        <FeatureCard 
          title="Daily Sleep Hours" 
          value={formData.sleepHours} 
          unit="hours" 
          tooltip="Average hours of sleep per night."
          min={3}
          max={12}
          step={0.5}
          onChange={(value) => handleSliderChange(value, "sleepHours")}
          onInputChange={(e) => handleInputChange(e, "sleepHours")}
        />

        {/* Extracurricular */}
        <FeatureCard 
          title="Extracurricular Activities" 
          value={formData.extracurricular} 
          unit="hours" 
          tooltip="Weekly hours spent on sports, clubs, or other extracurricular activities."
          min={0}
          max={20}
          onChange={(value) => handleSliderChange(value, "extracurricular")}
          onInputChange={(e) => handleInputChange(e, "extracurricular")}
        />

        {/* Screen Time */}
        <FeatureCard 
          title="Daily Screen Time" 
          value={formData.screenTime} 
          unit="hours" 
          tooltip="Average hours spent on phone, social media, or entertainment daily."
          min={0}
          max={12}
          onChange={(value) => handleSliderChange(value, "screenTime")}
          onInputChange={(e) => handleInputChange(e, "screenTime")}
        />
      </div>

      <div className="flex justify-center mt-10">
        <Button 
          type="submit" 
          className="px-8 py-6 text-lg flex items-center gap-2 animate-fade-in transition-all duration-300 hover:scale-105"
          disabled={isSubmitting}
        >
          Generate Prediction
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

interface FeatureCardProps {
  title: string;
  value: number;
  unit: string;
  tooltip: string;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number[]) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FeatureCard = ({
  title,
  value,
  unit,
  tooltip,
  min,
  max,
  step = 1,
  onChange,
  onInputChange,
}: FeatureCardProps) => {
  return (
    <Card className="p-5 transition-all duration-300 hover:shadow-md">
      <div className="space-y-3">
        <div className="flex items-center">
          <Label className="text-base font-medium">{title}</Label>
          <FeatureHelp>{tooltip}</FeatureHelp>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Slider
              value={[value]}
              min={min}
              max={max}
              step={step}
              onValueChange={onChange}
              className="py-2"
            />
          </div>
          <div className="flex items-center w-24 gap-1">
            <Input
              type="number"
              value={value}
              onChange={onInputChange}
              min={min}
              max={max}
              step={step}
              className="h-8 w-16 text-right"
            />
            <span className="text-sm text-muted-foreground whitespace-nowrap">{unit}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PredictionForm;
