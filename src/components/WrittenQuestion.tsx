
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Check, HelpCircle, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WrittenQuestionProps {
  id: string;
  question: string;
  minWords: number;
  maxWords: number;
  onComplete: (id: string, answer: string) => void;
}

const WrittenQuestion = ({ id, question, minWords, maxWords, onComplete }: WrittenQuestionProps) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };
  
  const wordCount = countWords(answer);
  const isValid = wordCount >= minWords && wordCount <= maxWords;
  
  const handleSubmit = () => {
    if (isValid) {
      setIsSubmitted(true);
      onComplete(id, answer);
    }
  };
  
  const getWordCountColor = () => {
    if (wordCount < minWords) return "text-red-500";
    if (wordCount > maxWords) return "text-red-500";
    return "text-green-500";
  };

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-2 bg-muted/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{question}</CardTitle>
          <Badge variant="outline" className="font-normal">
            Written Answer
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">
                Write {minWords}-{maxWords} words (approx. 3-4 lines)
              </span>
            </div>
            <span className={getWordCountColor()}>
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </span>
          </div>
          
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-[100px] resize-none"
            disabled={isSubmitted}
          />
          
          {wordCount < minWords && (
            <p className="text-sm text-red-500">
              Please write at least {minWords} words
            </p>
          )}
          {wordCount > maxWords && (
            <p className="text-sm text-red-500">
              Please write no more than {maxWords} words
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-sm text-muted-foreground">
                <HelpCircle className="h-4 w-4 mr-1" />
                <span>Write a brief answer covering key points</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>A short, concise answer is all that's needed (3-4 lines)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {!isSubmitted ? (
          <Button 
            onClick={handleSubmit} 
            className="px-6"
            disabled={!isValid}
          >
            Submit Answer
          </Button>
        ) : (
          <div className="flex items-center text-green-600">
            <Check className="h-4 w-4 mr-1" />
            <span>Answer submitted</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default WrittenQuestion;
