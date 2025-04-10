
import ResultsChart from "@/components/ResultsChart";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AreaChart, BarChart2, RotateCcw } from "lucide-react";

type ResultDataType = {
  score: string;
  timestamp: string;
};

const Results = () => {
  const [resultData, setResultData] = useState<ResultDataType | null>(null);

  useEffect(() => {
    // In a real app, we'd get this from a state management solution or API
    const savedResult = localStorage.getItem("predictionResult");
    if (savedResult) {
      setResultData(JSON.parse(savedResult));
    }
  }, []);

  const score = resultData ? parseFloat(resultData.score) : 0;

  // Get recommendation based on score
  const getRecommendation = (score: number) => {
    if (score >= 90) {
      return "You're on track for excellent performance! Continue your current study habits and consider mentoring other students.";
    } else if (score >= 80) {
      return "You're doing well! Focus on maintaining consistency and consider increasing your class participation.";
    } else if (score >= 70) {
      return "You're on the right track. Consider increasing your study hours and improving assignment completion rate.";
    } else if (score >= 60) {
      return "You have room for improvement. Focus on attending more classes and dedicating more time to studying.";
    } else {
      return "Your current approach needs significant changes. Consider seeking academic support, increasing attendance, and creating a structured study plan.";
    }
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-4xl animate-fade-up">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Your Prediction Results</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your input data, our model has generated a prediction of your 
            expected academic performance.
          </p>
        </div>

        <ResultsChart />

        {resultData && (
          <div className="mt-10 max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-4">Personalized Recommendation</h2>
            <p className="text-lg mb-6 px-4 py-3 bg-secondary rounded-lg">
              {getRecommendation(score)}
            </p>

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
                asChild
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

export default Results;
