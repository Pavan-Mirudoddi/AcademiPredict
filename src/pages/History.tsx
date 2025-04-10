
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, User, School, GraduationCap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type PredictionRecord = {
  score: string;
  inputData: Record<string, any>;
  quizData: Record<string, number>;
  timestamp: string;
  studentInfo?: {
    name: string;
    department: string;
    collegeName: string;
    collegeId: string;
  };
};

const History = () => {
  const [history, setHistory] = useState<PredictionRecord[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get all history records from localStorage
    const loadHistory = () => {
      const historyRecords: PredictionRecord[] = [];
      
      // Look for recent prediction result
      const recentPrediction = localStorage.getItem("predictionResult");
      if (recentPrediction) {
        try {
          const parsedResult = JSON.parse(recentPrediction);
          
          // Get student info if available
          const studentInfoJson = localStorage.getItem("studentInfo");
          if (studentInfoJson) {
            const studentInfo = JSON.parse(studentInfoJson);
            parsedResult.studentInfo = studentInfo;
          }
          
          // Add to history if not already present
          historyRecords.push(parsedResult);
        } catch (error) {
          console.error("Failed to parse recent prediction", error);
        }
      }
      
      // Look for saved history
      const savedHistory = localStorage.getItem("predictionHistory");
      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);
          
          // Add unique records to history
          parsedHistory.forEach((record: PredictionRecord) => {
            const isDuplicate = historyRecords.some(
              (existingRecord) => existingRecord.timestamp === record.timestamp
            );
            
            if (!isDuplicate) {
              historyRecords.push(record);
            }
          });
        } catch (error) {
          console.error("Failed to parse history", error);
        }
      }
      
      // Sort by date (newest first)
      historyRecords.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      // Save back to localStorage as a consolidated history
      localStorage.setItem("predictionHistory", JSON.stringify(historyRecords));
      
      setHistory(historyRecords);
    };
    
    loadHistory();
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatSubjects = (quizData: Record<string, number>) => {
    const subjectIds = Object.keys(quizData);
    return `${subjectIds.length} subjects`;
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-4xl animate-fade-up">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Prediction History</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            View your previous prediction results and academic performance assessments.
          </p>
        </div>

        <Card className="border shadow-sm">
          <CardHeader className="text-center border-b bg-muted/30">
            <CardTitle>Your Academic Progress Timeline</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 px-6">
            {history.length === 0 ? (
              <div className="text-center py-10">
                <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No prediction history found</h3>
                <p className="text-muted-foreground mb-6">
                  Complete a prediction assessment to see your results here.
                </p>
                <Button onClick={() => navigate("/predict")}>
                  Take an Assessment
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  {history.map((record, index) => (
                    <Card key={index} className="relative border shadow-sm hover:shadow-md transition-shadow">
                      <div className="absolute top-0 right-0 m-4">
                        <Badge 
                          className={
                            parseFloat(record.score) >= 80 ? "bg-green-500" : 
                            parseFloat(record.score) >= 60 ? "bg-blue-500" : 
                            parseFloat(record.score) >= 40 ? "bg-yellow-500" : "bg-red-500"
                          }
                        >
                          Score: {record.score}%
                        </Badge>
                      </div>
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                            <div>
                              <h3 className="text-lg font-medium">
                                {record.studentInfo?.name || "Anonymous Student"}
                              </h3>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <School className="h-3.5 w-3.5" />
                                {record.studentInfo?.collegeName || "College not specified"}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground flex flex-col">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {formatDate(record.timestamp)}
                              </div>
                              <div className="flex items-center gap-1">
                                <GraduationCap className="h-3.5 w-3.5" />
                                {formatSubjects(record.quizData)}
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Attendance</p>
                              <p className="text-sm font-medium">{record.inputData.attendance}%</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Study Hours</p>
                              <p className="text-sm font-medium">{record.inputData.studyHours} hrs/week</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Assignments</p>
                              <p className="text-sm font-medium">{record.inputData.assignmentsCompleted}%</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Previous Grade</p>
                              <p className="text-sm font-medium">{record.inputData.previousGrade}%</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button variant="outline" size="sm" onClick={() => navigate("/results")}>
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;
