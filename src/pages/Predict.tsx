
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import StudentInfoForm from "@/components/StudentInfoForm";
import SubjectSelection from "@/components/SubjectSelection";
import QuizComponent from "@/components/QuizComponent";
import EnhancedPredictionForm from "@/components/EnhancedPredictionForm";

type Stage = "info" | "subjects" | "quiz" | "prediction";

interface StudentInfoType {
  name: string;
  department: string;
  collegeName: string;
  collegeId: string;
}

const Predict = () => {
  const [stage, setStage] = useState<Stage>("info");
  const [studentInfo, setStudentInfo] = useState<StudentInfoType | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [quizResults, setQuizResults] = useState<Record<string, number>>({});
  
  const handleStudentInfoComplete = (data: StudentInfoType) => {
    setStudentInfo(data);
    setStage("subjects");
  };
  
  const handleSubjectsComplete = (subjects: string[]) => {
    setSelectedSubjects(subjects);
    setStage("quiz");
  };
  
  const handleQuizComplete = (results: Record<string, number>) => {
    setQuizResults(results);
    setStage("prediction");
    // Show a summary of quiz results
    const totalQuestions = Object.values(results).reduce((sum, score) => sum + 10, 0);
    const correctAnswers = Object.values(results).reduce((sum, score) => sum + score, 0);
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    toast.success(`Quiz completed with ${correctAnswers}/${totalQuestions} correct answers (${percentage}%)`);
  };

  const renderStageContent = () => {
    switch (stage) {
      case "info":
        return <StudentInfoForm onComplete={handleStudentInfoComplete} />;
      case "subjects":
        return <SubjectSelection onComplete={handleSubjectsComplete} />;
      case "quiz":
        return <QuizComponent subjects={selectedSubjects} onComplete={handleQuizComplete} />;
      case "prediction":
        return <EnhancedPredictionForm quizResults={quizResults} />;
      default:
        return null;
    }
  };

  const getStageTitle = () => {
    switch (stage) {
      case "info":
        return "Student Information";
      case "subjects":
        return "Subject Selection";
      case "quiz":
        return "Knowledge Assessment";
      case "prediction":
        return "Performance Prediction";
      default:
        return "";
    }
  };

  const getStageDescription = () => {
    switch (stage) {
      case "info":
        return "Let's start by getting to know you. Please enter your basic information below.";
      case "subjects":
        return "Select the subjects you're currently studying this semester.";
      case "quiz":
        return "Let's assess your knowledge in the selected subjects with a short quiz.";
      case "prediction":
        return "Based on your quiz results and other factors, we can predict your academic performance.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-4xl animate-fade-up">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{getStageTitle()}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {getStageDescription()}
          </p>
        </div>

        <Card className="border shadow-sm">
          <CardHeader className="text-center border-b bg-muted/30">
            <CardTitle>
              {studentInfo && stage !== "info" ? `${studentInfo.name} - ${studentInfo.collegeName} (${studentInfo.department})` : getStageTitle()}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 px-6">
            {renderStageContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Predict;
