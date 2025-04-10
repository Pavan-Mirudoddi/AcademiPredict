
import EnhancedResultsChart from "@/components/EnhancedResultsChart";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart2, RotateCcw, BookOpen, Award, AlertTriangle, FileDown } from "lucide-react";
import { quizData } from "@/data/quizData";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { generateResultPDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";

type ResultDataType = {
  score: string;
  inputData: {
    attendance: number;
    studyHours: number;
    previousGrade: number;
    assignmentsCompleted: number;
    classParticipation: number;
    sleepHours: number;
    extracurricular: number;
    screenTime: number;
  };
  quizData: Record<string, number>;
  timestamp: string;
};

interface StudentInfoType {
  name: string;
  department: string;
  collegeName: string;
  collegeId: string;
}

const EnhancedResults = () => {
  const [resultData, setResultData] = useState<ResultDataType | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfoType | null>(null);

  useEffect(() => {
    const savedResult = localStorage.getItem("predictionResult");
    const savedStudentInfo = localStorage.getItem("studentInfo");
    
    if (savedResult) {
      setResultData(JSON.parse(savedResult));
    }
    
    if (savedStudentInfo) {
      setStudentInfo(JSON.parse(savedStudentInfo));
    }
  }, []);

  const score = resultData ? parseFloat(resultData.score) : 0;

  const getSubjectRecommendations = (subjectId: string, score: number) => {
    const subjectName = quizData[subjectId]?.name || subjectId;
    const percentage = (score / 10) * 100;
    
    if (percentage >= 80) {
      return {
        status: "Excellent",
        color: "text-green-500",
        icon: <Award className="h-5 w-5 text-green-500" />,
        advice: `You have a strong understanding of ${subjectName}. Consider exploring advanced topics or helping peers who struggle with this subject.`,
        resources: [
          "Look for research papers or advanced textbooks",
          "Participate in competitive programming or subject competitions",
          "Consider contributing to open-source projects related to this field"
        ]
      };
    } else if (percentage >= 70) {
      return {
        status: "Good",
        color: "text-blue-500",
        icon: <BookOpen className="h-5 w-5 text-blue-500" />,
        advice: `You have a good grasp of ${subjectName} but there's room for improvement. Focus on strengthening your weak areas.`,
        resources: [
          "Create comprehensive notes on topics you're less comfortable with",
          "Practice more examples and problem-solving exercises",
          "Join study groups to discuss complex concepts"
        ]
      };
    } else if (percentage >= 60) {
      return {
        status: "Average",
        color: "text-yellow-500",
        icon: <BookOpen className="h-5 w-5 text-yellow-500" />,
        advice: `Your knowledge of ${subjectName} is average. Dedicate more time to understanding key concepts.`,
        resources: [
          "Revisit fundamental concepts through video tutorials or simpler textbooks",
          "Increase practice with simple to moderate difficulty problems",
          "Consider seeking help from instructors during office hours"
        ]
      };
    } else {
      return {
        status: "Needs Improvement",
        color: "text-red-500",
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        advice: `You need significant improvement in ${subjectName}. Consider seeking additional help and resources.`,
        resources: [
          "Schedule regular tutoring sessions or additional classes",
          "Focus on building a strong foundation before moving to complex topics",
          "Use flashcards and frequent revision to reinforce basic concepts",
          "Consider a structured study plan with daily goals for this subject"
        ]
      };
    }
  };

  const getComprehensiveRecommendation = (score: number, quizResults: Record<string, number> | undefined, inputData: any) => {
    if (!quizResults || !inputData) return "";

    let weakestSubject = "";
    let lowestScore = Infinity;
    let strongestSubject = "";
    let highestScore = -1;
    
    Object.entries(quizResults).forEach(([subjectId, score]) => {
      const percentage = (score / 10) * 100;
      if (percentage < lowestScore) {
        lowestScore = percentage;
        weakestSubject = quizData[subjectId]?.name || subjectId;
      }
      if (percentage > highestScore) {
        highestScore = percentage;
        strongestSubject = quizData[subjectId]?.name || subjectId;
      }
    });

    const studyHabitIssues = [];
    if (inputData.attendance < 80) studyHabitIssues.push("low attendance");
    if (inputData.studyHours < 10) studyHabitIssues.push("insufficient study hours");
    if (inputData.sleepHours < 6) studyHabitIssues.push("inadequate sleep");
    if (inputData.screenTime > 6) studyHabitIssues.push("excessive screen time");
    
    const studyHabitStrengths = [];
    if (inputData.assignmentsCompleted > 85) studyHabitStrengths.push("consistent assignment completion");
    if (inputData.classParticipation > 75) studyHabitStrengths.push("active class participation");
    if (inputData.extracurricular > 2 && inputData.extracurricular < 8) studyHabitStrengths.push("balanced extracurricular activities");
    
    let feedback = "";
    
    if (score >= 90) {
      feedback = `<strong>Excellent Performance:</strong> You're performing at an outstanding level. Your strongest subject is ${strongestSubject}, and you've shown great competence across most subjects. `;
      
      if (weakestSubject && lowestScore < 90) {
        feedback += `Even though you're doing great overall, you could still improve in ${weakestSubject} to achieve perfect mastery. `;
      }
      
      if (studyHabitStrengths.length > 0) {
        feedback += `Your ${studyHabitStrengths.join(", ")} contribute greatly to your success. `;
      }
      
      feedback += `To maintain this performance, consider challenging yourself with advanced topics or competitions, and perhaps mentor other students who could benefit from your knowledge.`;
    } 
    else if (score >= 80) {
      feedback = `<strong>Strong Performance:</strong> You're performing well above average. You excel in ${strongestSubject}, which shows your potential for academic excellence. `;
      
      if (weakestSubject) {
        feedback += `Focus on improving your understanding of ${weakestSubject} to balance your knowledge. `;
      }
      
      if (studyHabitIssues.length > 0) {
        feedback += `Consider addressing your ${studyHabitIssues.join(", ")} to potentially reach the excellent category. `;
      }
      
      feedback += `Your current study methods are largely effective, but fine-tuning your approach could help you reach the next level.`;
    } 
    else if (score >= 70) {
      feedback = `<strong>Good Performance:</strong> You're performing above average with particular strength in ${strongestSubject}. `;
      
      if (weakestSubject) {
        feedback += `You should prioritize improving in ${weakestSubject}, which is currently your weakest area. `;
      }
      
      if (studyHabitIssues.length > 0) {
        feedback += `Addressing your ${studyHabitIssues.join(", ")} would likely improve your overall performance. `;
      }
      
      if (studyHabitStrengths.length > 0) {
        feedback += `Continue with your positive habits like ${studyHabitStrengths.join(", ")}. `;
      }
      
      feedback += `Consider forming or joining study groups to enhance your learning experience and knowledge retention.`;
    } 
    else if (score >= 60) {
      feedback = `<strong>Average Performance:</strong> Your academic performance is currently average. Your strongest subject is ${strongestSubject}, which shows you have potential to improve. `;
      
      if (weakestSubject) {
        feedback += `${weakestSubject} requires significant attention as it's bringing down your overall performance. `;
      }
      
      if (studyHabitIssues.length > 0) {
        feedback += `Your ${studyHabitIssues.join(", ")} are likely contributing to your academic challenges. Addressing these should be a priority. `;
      }
      
      feedback += `Consider establishing a more structured study routine, seeking additional help from instructors, and possibly using different learning resources that might better suit your learning style.`;
    } 
    else {
      feedback = `<strong>Needs Improvement:</strong> Your current academic performance requires significant improvement. `;
      
      if (strongestSubject) {
        feedback += `Even in your strongest subject, ${strongestSubject}, there's substantial room for improvement. `;
      }
      
      if (weakestSubject) {
        feedback += `${weakestSubject} needs immediate attention as you're struggling most with this subject. `;
      }
      
      feedback += `It's essential to address your study habits, particularly ${studyHabitIssues.join(", ")}. Consider seeking academic counseling, tutoring, or additional resources to help improve your understanding of fundamental concepts. A complete revision of your study approach and time management may be necessary.`;
    }
    
    return feedback;
  };

  const handlePrintToPDF = () => {
    try {
      if (!resultData || !studentInfo) {
        toast.error("Cannot generate PDF without complete data");
        return;
      }
      
      const fileName = generateResultPDF(resultData, studentInfo);
      toast.success(`PDF report "${fileName}" has been downloaded successfully`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF report. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-4xl animate-fade-up">
        {studentInfo && (
          <div className="text-center mb-4">
            <h2 className="text-xl text-muted-foreground">
              Performance Analysis for <span className="font-medium text-foreground">{studentInfo.name}</span> - {studentInfo.department}
            </h2>
          </div>
        )}
      
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Your Prediction Results</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your quiz performance and input data, our model has generated a prediction of your 
            expected academic performance.
          </p>
        </div>

        <EnhancedResultsChart />

        {resultData && (
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="flex justify-end mb-4">
              <Button 
                onClick={handlePrintToPDF}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FileDown className="h-4 w-4" />
                Export as PDF
              </Button>
            </div>

            <Card className="mb-8 p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardTitle className="text-2xl font-semibold mb-4">
                Comprehensive Analysis
              </CardTitle>
              <CardContent className="p-0">
                <p 
                  className="text-lg space-y-1" 
                  dangerouslySetInnerHTML={{ 
                    __html: getComprehensiveRecommendation(
                      score, 
                      resultData.quizData, 
                      resultData.inputData
                    ) 
                  }}
                />
              </CardContent>
            </Card>

            <h2 className="text-2xl font-semibold mb-4">Subject-by-Subject Analysis</h2>
            <div className="grid grid-cols-1 gap-4 mb-8">
              {Object.entries(resultData.quizData).map(([subjectId, score]) => {
                const recommendation = getSubjectRecommendations(subjectId, score);
                const subjectName = quizData[subjectId]?.name || subjectId;
                const percentage = (score / 10) * 100;
                
                return (
                  <Card key={subjectId} className="overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {recommendation.icon}
                          <h3 className="font-medium text-lg">{subjectName}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${recommendation.color}`}>
                            {recommendation.status}
                          </span>
                          <span className="font-medium">{percentage}%</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              percentage >= 80 ? "bg-green-500" : 
                              percentage >= 70 ? "bg-blue-500" : 
                              percentage >= 60 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground">{recommendation.advice}</p>
                      
                      <Separator className="my-3" />
                      
                      <div>
                        <h4 className="font-medium mb-2">Recommended Resources:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {recommendation.resources.map((resource, index) => (
                            <li key={index}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="bg-muted p-5 rounded-lg mb-8">
              <h3 className="font-medium mb-3">Study Habits Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Areas of Strength</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {resultData.inputData.attendance >= 80 && (
                      <li>Good attendance rate ({resultData.inputData.attendance}%)</li>
                    )}
                    {resultData.inputData.studyHours >= 12 && (
                      <li>Adequate study hours ({resultData.inputData.studyHours} hours/week)</li>
                    )}
                    {resultData.inputData.assignmentsCompleted >= 85 && (
                      <li>Excellent assignment completion ({resultData.inputData.assignmentsCompleted}%)</li>
                    )}
                    {resultData.inputData.classParticipation >= 75 && (
                      <li>Active class participation ({resultData.inputData.classParticipation}%)</li>
                    )}
                    {resultData.inputData.sleepHours >= 7 && (
                      <li>Good sleep habits ({resultData.inputData.sleepHours} hours/day)</li>
                    )}
                    {resultData.inputData.extracurricular >= 2 && resultData.inputData.extracurricular <= 6 && (
                      <li>Balanced extracurricular activities ({resultData.inputData.extracurricular} hours/week)</li>
                    )}
                    {resultData.inputData.screenTime <= 4 && (
                      <li>Controlled screen time ({resultData.inputData.screenTime} hours/day)</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Areas for Improvement</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {resultData.inputData.attendance < 80 && (
                      <li>Increase attendance (currently {resultData.inputData.attendance}%)</li>
                    )}
                    {resultData.inputData.studyHours < 12 && (
                      <li>Dedicate more time to studying (currently {resultData.inputData.studyHours} hours/week)</li>
                    )}
                    {resultData.inputData.assignmentsCompleted < 85 && (
                      <li>Complete more assignments (currently {resultData.inputData.assignmentsCompleted}%)</li>
                    )}
                    {resultData.inputData.classParticipation < 75 && (
                      <li>Participate more actively in class (currently {resultData.inputData.classParticipation}%)</li>
                    )}
                    {resultData.inputData.sleepHours < 7 && (
                      <li>Improve sleep habits (currently {resultData.inputData.sleepHours} hours/day)</li>
                    )}
                    {resultData.inputData.extracurricular > 6 && (
                      <li>Consider reducing extracurricular commitments (currently {resultData.inputData.extracurricular} hours/week)</li>
                    )}
                    {resultData.inputData.screenTime > 4 && (
                      <li>Reduce screen time (currently {resultData.inputData.screenTime} hours/day)</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2"
              >
                <Link to="/predict">
                  <RotateCcw className="h-4 w-4" />
                  Try Another Prediction
                </Link>
              </Button>
              <Button
                onClick={handlePrintToPDF}
                className="flex items-center gap-2"
              >
                <FileDown className="h-4 w-4" />
                Print Results
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2"
              >
                <Link to="/about">
                  <BarChart2 className="h-4 w-4" />
                  Learn About the Features
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedResults;
