
import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

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

type QuizResultsType = Record<string, number>;

interface EnhancedPredictionFormProps {
  quizResults: QuizResultsType;
}

// This would normally be an API call to a Python backend with a ML model
const mockPrediction = (data: FormDataType, quizResults: QuizResultsType) => {
  // Calculate average quiz score (out of 100)
  const quizScores = Object.values(quizResults);
  const totalQuizScore = quizScores.reduce((acc, score) => acc + score, 0);
  const averageQuizScore = (totalQuizScore / (quizScores.length * 10)) * 100;
  
  // Calculate subject-specific impact factors
  const subjectPerformance = Object.values(quizResults).map(score => (score / 10) * 100);
  const subjectVariance = calculateVariance(subjectPerformance);
  
  // Simulate a more complex model with non-linear relationships and interactions
  // Attendance has diminishing returns after 85%
  const attendanceEffect = data.attendance < 85 
    ? data.attendance * 0.15 
    : 85 * 0.15 + (data.attendance - 85) * 0.05;
  
  // Study hours have higher returns between 10-20 hours
  const studyHoursEffect = data.studyHours < 10 
    ? data.studyHours * 0.8 
    : data.studyHours < 20 
      ? 10 * 0.8 + (data.studyHours - 10) * 1.2 
      : 10 * 0.8 + 10 * 1.2 + (data.studyHours - 20) * 0.5;
  
  // Sleep has optimal range of 7-8 hours
  const sleepEffect = data.sleepHours < 7 
    ? data.sleepHours * 0.5 
    : data.sleepHours <= 8 
      ? 7 * 0.5 + (data.sleepHours - 7) * 0.7 
      : 7 * 0.5 + 1 * 0.7 - (data.sleepHours - 8) * 0.3;
  
  // Complex interaction: Screen time impact is worse if study hours are low
  const screenTimeImpact = data.screenTime * (1.5 - (data.studyHours / 40));
  
  // Extracurricular has an optimal range (2-5 hours)
  const extracurricularEffect = data.extracurricular < 2 
    ? data.extracurricular * 0.5 
    : data.extracurricular <= 5 
      ? 2 * 0.5 + (data.extracurricular - 2) * 0.7 
      : 2 * 0.5 + 3 * 0.7 - (data.extracurricular - 5) * 0.8;
  
  // Previous grade has a strong influence
  const previousGradeEffect = data.previousGrade * 0.2;
  
  // Assignments completion with threshold effects
  const assignmentsEffect = data.assignmentsCompleted >= 90 
    ? 18 // above 90% is excellent
    : data.assignmentsCompleted >= 75 
      ? 15 
      : data.assignmentsCompleted >= 60 
        ? 10 
        : data.assignmentsCompleted * 0.1;
        
  // Class participation with threshold effects
  const participationEffect = data.classParticipation >= 80 
    ? 8 // high participation is very beneficial
    : data.classParticipation >= 60 
      ? 6 
      : data.classParticipation * 0.05;
  
  // Quiz results are the most important factor (30%)
  const quizEffect = averageQuizScore * 0.3;
  
  // Subject consistency (lower variance is better)
  const consistencyEffect = Math.max(0, 5 - (subjectVariance / 4));
  
  // Calculate weighted sum of all factors
  const weightedSum = 
    attendanceEffect + 
    studyHoursEffect / 4 + 
    previousGradeEffect + 
    assignmentsEffect +
    participationEffect +
    sleepEffect + 
    extracurricularEffect - 
    screenTimeImpact +
    quizEffect +
    consistencyEffect;
  
  // Add some randomness to simulate model uncertainty
  const noise = (Math.random() * 6) - 3; // -3 to +3
  
  // Ensure prediction is between 0 and 100
  const prediction = Math.min(100, Math.max(0, weightedSum + noise));
  
  // Store prediction results in localStorage for the results page
  localStorage.setItem('predictionResult', JSON.stringify({
    score: prediction.toFixed(1),
    inputData: data,
    quizData: quizResults,
    timestamp: new Date().toISOString()
  }));
  
  return prediction;
};

// Helper function to calculate variance of an array
function calculateVariance(array: number[]): number {
  if (array.length === 0) return 0;
  
  const mean = array.reduce((sum, val) => sum + val, 0) / array.length;
  const squaredDiffs = array.map(val => Math.pow(val - mean, 2));
  return squaredDiffs.reduce((sum, val) => sum + val, 0) / array.length;
}

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

const EnhancedPredictionForm = ({ quizResults }: EnhancedPredictionFormProps) => {
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
        mockPrediction(formData, quizResults);
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

  // Calculate average quiz score
  const quizScores = Object.values(quizResults);
  const totalQuizScore = quizScores.reduce((acc, score) => acc + score, 0);
  const totalPossibleScore = quizScores.length * 10; // 10 questions per subject
  const quizPercentage = Math.round((totalQuizScore / totalPossibleScore) * 100);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <Card className="p-5 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <div className="space-y-2">
          <div className="flex items-center">
            <Label className="text-base font-medium">Quiz Performance</Label>
            <FeatureHelp>Your performance on the subject quizzes you just completed</FeatureHelp>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              You scored {totalQuizScore} out of {totalPossibleScore} questions correctly
            </div>
            <div className="text-lg font-semibold">{quizPercentage}%</div>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                quizPercentage >= 80 ? "bg-green-500" : 
                quizPercentage >= 60 ? "bg-blue-500" : 
                quizPercentage >= 40 ? "bg-yellow-500" : "bg-red-500"
              }`} 
              style={{ width: `${quizPercentage}%` }}
            ></div>
          </div>
        </div>
      </Card>

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

export default EnhancedPredictionForm;
