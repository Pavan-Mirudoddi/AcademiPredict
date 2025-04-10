
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronRight, Check, X, AlertCircle, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { quizData } from "@/data/quizData";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import FullScreenQuiz from "./FullScreenQuiz";
import WrittenQuestion from "./WrittenQuestion";
import { useNavigate } from "react-router-dom";

interface QuizComponentProps {
  subjects: string[];
  onComplete: (results: Record<string, number>) => void;
}

type MultipleChoiceQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  type: "multiple-choice";
};

type WrittenQuestionType = {
  id: string;
  question: string;
  type: "written";
  minWords: number;
  maxWords: number;
};

type Question = MultipleChoiceQuestion | WrittenQuestionType;

const QuizComponent = ({ subjects, onComplete }: QuizComponentProps) => {
  const navigate = useNavigate();
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({});
  const [subjectScores, setSubjectScores] = useState<Record<string, number>>({});
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [quizTerminated, setQuizTerminated] = useState(false);
  
  const currentSubjectId = subjects[currentSubjectIndex];
  const currentSubjectName = quizData[currentSubjectId]?.name || "Unknown Subject";
  const totalQuestions = currentQuestions.length;
  const currentQuestion = currentQuestions[currentQuestionIndex];
  
  useEffect(() => {
    if (currentSubjectId && quizData[currentSubjectId]) {
      // Get multiple choice questions
      const multipleChoiceQuestions = quizData[currentSubjectId].questions.map(q => ({
        ...q,
        type: "multiple-choice" as const
      }));
      
      // Get written questions or use empty array if none defined
      const writtenQuestionsData = quizData[currentSubjectId].writtenQuestions || [];
      
      // Convert written questions to proper format
      const writtenQuestions: WrittenQuestionType[] = writtenQuestionsData.map(q => ({
        ...q,
        type: "written" as const,
        minWords: 15, // For 3-4 lines (shorter answers)
        maxWords: 40   // For 3-4 lines (shorter answers)
      }));
      
      // Combine and shuffle all questions
      const allQuestions: Question[] = [...multipleChoiceQuestions, ...writtenQuestions];
      
      // Make sure written questions are evenly distributed
      // We'll place the first written question after 3 MCQs and the second after 7 MCQs
      const sortedQuestions = allQuestions.sort((a, b) => {
        if (a.type === "written" && b.type === "multiple-choice") return 1;
        if (a.type === "multiple-choice" && b.type === "written") return -1;
        return 0;
      });
      
      // Move written questions to specific positions
      const finalQuestions: Question[] = [...sortedQuestions];
      if (writtenQuestions.length > 0) {
        // Find indexes of written questions
        const writtenIndexes = finalQuestions
          .map((q, i) => q.type === "written" ? i : -1)
          .filter(i => i !== -1);
        
        // If we have at least one written question, move it after 3 MCQs
        if (writtenIndexes.length > 0) {
          const question = finalQuestions.splice(writtenIndexes[0], 1)[0];
          finalQuestions.splice(3, 0, question);
        }
        
        // If we have a second written question, move it after 7 MCQs
        if (writtenIndexes.length > 1) {
          // Need to recalculate index because we moved a question
          const newWrittenIndexes = finalQuestions
            .map((q, i) => q.type === "written" && i !== 3 ? i : -1)
            .filter(i => i !== -1);
          
          if (newWrittenIndexes.length > 0) {
            const question = finalQuestions.splice(newWrittenIndexes[0], 1)[0];
            const insertPosition = Math.min(7, finalQuestions.length);
            finalQuestions.splice(insertPosition, 0, question);
          }
        }
      }
      
      setCurrentQuestions(finalQuestions);
      setCurrentQuestionIndex(0);
      setSelectedAnswer("");
      setShowFeedback(false);
    }
  }, [currentSubjectId]);

  const checkAnswer = () => {
    if (!selectedAnswer) {
      toast.error("Please select an answer");
      return;
    }
    
    // Mark this question as answered
    setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]));
    
    // Check if answer is correct
    const correct = selectedAnswer === (currentQuestion as MultipleChoiceQuestion).correctAnswer;
    setIsCorrect(correct);
    
    // Update score if answer is correct
    if (correct) {
      const currentScore = subjectScores[currentSubjectId] || 0;
      setSubjectScores({
        ...subjectScores,
        [currentSubjectId]: currentScore + 1
      });
    }
    
    // Show feedback
    setShowFeedback(true);
  };

  const handleWrittenAnswerComplete = (questionId: string, answer: string) => {
    // Store the written answer
    setWrittenAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Mark this question as answered
    setAnsweredQuestions(prev => new Set([...prev, questionId]));
    
    // For written answers, we grant half a point automatically
    // A real system would analyze the content for correctness
    const currentScore = subjectScores[currentSubjectId] || 0;
    setSubjectScores({
      ...subjectScores,
      [currentSubjectId]: currentScore + 0.5
    });
    
    // Wait a moment before moving to next question
    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
  };

  const moveToNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer("");
    
    if (currentQuestionIndex < totalQuestions - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSubjectIndex < subjects.length - 1) {
      // Move to next subject
      setCurrentSubjectIndex(currentSubjectIndex + 1);
      setCurrentQuestionIndex(0);
      toast.info(`Moving to the next subject: ${quizData[subjects[currentSubjectIndex + 1]]?.name}`);
    } else {
      // Quiz completed
      toast.success("Quiz completed! Proceeding to performance prediction.");
      // Store quiz results in localStorage
      localStorage.setItem("quizResults", JSON.stringify(subjectScores));
      
      // Store student info for history
      const studentInfoJson = localStorage.getItem("studentInfo");
      if (studentInfoJson) {
        localStorage.setItem("studentInfo", studentInfoJson);
      }
      
      onComplete(subjectScores);
    }
  };

  const handleQuizExit = () => {
    setQuizTerminated(true);
    toast.error("Quiz terminated due to exiting fullscreen mode. Please retry from the beginning.");
    
    // Navigate back to prediction page after a delay
    setTimeout(() => {
      navigate("/predict");
    }, 3000);
  };

  if (quizTerminated) {
    return (
      <Card className="shadow-md border-red-200 bg-red-50">
        <CardHeader className="text-center">
          <CardTitle className="text-red-600">Quiz Terminated</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="mb-4">
            Your quiz has been terminated because you exited fullscreen mode multiple times.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Please return to the prediction page to start again.
          </p>
          <Button onClick={() => navigate("/predict")}>
            Return to Prediction Page
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!currentQuestion) {
    return <div className="text-center">Loading questions...</div>;
  }

  const progressPercentage = Math.round(
    ((currentSubjectIndex * totalQuestions) + currentQuestionIndex + 1) / 
    (subjects.length * totalQuestions) * 100
  );
  
  const getProgressColor = () => {
    if (progressPercentage < 33) return "bg-blue-500";
    if (progressPercentage < 66) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  const getCurrentScore = () => {
    const currentScore = subjectScores[currentSubjectId] || 0;
    const questionsAnswered = [...answeredQuestions].filter(id => 
      currentQuestions.some(q => q.id === id)
    ).length;
    
    if (questionsAnswered === 0) return "N/A";
    return `${currentScore}/${questionsAnswered}`;
  };

  // Render the quiz inside a fullscreen container
  return (
    <FullScreenQuiz onExitQuiz={handleQuizExit}>
      <div className="space-y-6 max-w-4xl mx-auto p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Badge variant="outline" className="font-normal">
                Subject {currentSubjectIndex + 1}/{subjects.length}
              </Badge>
              <span className="text-sm font-medium ml-2">
                {currentSubjectName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-normal">
                Score: {getCurrentScore()}
              </Badge>
              <Badge variant="outline" className="font-normal">
                Q {currentQuestionIndex + 1}/{totalQuestions}
              </Badge>
            </div>
          </div>
          <Progress value={progressPercentage} className={`h-2 ${getProgressColor()}`} />
        </div>

        {currentQuestion.type === "written" ? (
          <WrittenQuestion 
            id={currentQuestion.id}
            question={currentQuestion.question}
            minWords={currentQuestion.minWords}
            maxWords={currentQuestion.maxWords}
            onComplete={handleWrittenAnswerComplete}
          />
        ) : (
          <>
            <Card className="shadow-sm border">
              <CardHeader className="pb-2 bg-muted/30">
                <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrectOption = option === currentQuestion.correctAnswer;
                    
                    let optionClass = "border p-3 rounded-md transition-all";
                    if (showFeedback) {
                      if (isCorrectOption) {
                        optionClass += " bg-green-50 border-green-300";
                      } else if (isSelected && !isCorrectOption) {
                        optionClass += " bg-red-50 border-red-300";
                      }
                    } else if (isSelected) {
                      optionClass += " bg-secondary border-primary/30";
                    } else {
                      optionClass += " hover:bg-muted";
                    }
                    
                    return (
                      <div key={index} className={optionClass}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value={option} 
                            id={`option-${index}`} 
                            disabled={showFeedback}
                          />
                          <Label htmlFor={`option-${index}`} className="text-base cursor-pointer flex-1">
                            {option}
                          </Label>
                          {showFeedback && isCorrectOption && (
                            <Check className="h-5 w-5 text-green-500" />
                          )}
                          {showFeedback && isSelected && !isCorrectOption && (
                            <X className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between pt-2 border-t">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>{answeredQuestions.size} of {subjects.length * 10} questions answered</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You need to answer all questions to complete the assessment</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                {!showFeedback ? (
                  <Button 
                    onClick={checkAnswer} 
                    className="px-6"
                    disabled={!selectedAnswer}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button 
                    onClick={moveToNextQuestion} 
                    className="px-6 flex items-center gap-2"
                  >
                    {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : 
                      currentSubjectIndex < subjects.length - 1 ? "Next Subject" : "Complete Quiz"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>

            {showFeedback && (
              <Card className={isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <div className="rounded-full bg-green-100 p-2">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="rounded-full bg-red-100 p-2">
                        <X className="h-5 w-5 text-red-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">
                        {isCorrect ? "Correct answer!" : "Incorrect answer"}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isCorrect 
                          ? "Well done! You've answered correctly." 
                          : `The correct answer is "${currentQuestion.correctAnswer}".`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </FullScreenQuiz>
  );
};

export default QuizComponent;
