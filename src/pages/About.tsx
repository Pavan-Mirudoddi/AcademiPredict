
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FeatureExplanation from "@/components/FeatureExplanation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BrainCircuit, Lightbulb, School, BookOpen, Gauge, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-24 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto max-w-4xl animate-fade-up">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-primary">
            About the Student Performance Prediction System
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn how our AI-powered system analyzes student skills and predicts academic performance
            through personalized assessments and data-driven insights.
          </p>
        </div>

        <div className="space-y-12">
          {/* Hero Banner with Background Image */}
          <div className="relative rounded-xl overflow-hidden h-64 md:h-80 mb-12">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
                filter: "brightness(0.6)"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
            <div className="relative h-full flex flex-col justify-center px-8 md:px-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Smart Predictions Through Assessment</h2>
              <p className="max-w-md text-white/90 text-lg">
                Using a combination of subject-specific quizzes and academic habit analysis to
                provide personalized performance predictions.
              </p>
            </div>
          </div>

          {/* How it Works Section */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-6 w-6 text-primary" />
                How the Prediction System Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <p className="text-lg">
                Our prediction system combines a multi-faceted approach to analyze your academic potential:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <PredictionStep 
                  icon={<BookOpen className="h-8 w-8 text-primary" />} 
                  title="Subject Knowledge Assessment" 
                  description="Take subject-specific quizzes to assess your current understanding of course content."
                  number="1"
                />
                <PredictionStep 
                  icon={<Gauge className="h-8 w-8 text-primary" />} 
                  title="Academic Habits Analysis" 
                  description="We analyze factors like attendance, study hours, and previous performance."
                  number="2"
                />
                <PredictionStep 
                  icon={<Award className="h-8 w-8 text-primary" />} 
                  title="Performance Prediction" 
                  description="Our AI model combines all data points to generate personalized predictions and recommendations."
                  number="3"
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg mt-6">
                <h4 className="font-semibold mb-2">The science behind our predictions:</h4>
                <p>
                  Our system uses a machine learning model that has been trained on historical student data. 
                  By analyzing the correlation between quiz performance, study habits, and final grades, 
                  we're able to predict future performance with impressive accuracy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Factors Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Influential Factors</h2>
            </div>
            <p className="text-muted-foreground mb-8">
              Our model considers these key factors that research has shown to
              influence academic performance. Each factor is weighted differently
              based on its predictive importance.
            </p>
            <FeatureExplanation />
          </div>

          {/* Quiz Explanation */}
          <Card className="shadow-md border border-primary/10">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <School className="h-6 w-6 text-primary" />
                The Role of Quizzes in Prediction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <p>
                Our subject-specific quizzes are carefully designed to assess your understanding of key concepts
                in each course. These assessments provide valuable data points that our model uses to:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <span className="font-medium">Identify knowledge gaps</span> that might affect your performance
                </li>
                <li>
                  <span className="font-medium">Measure concept mastery</span> across different subject areas
                </li>
                <li>
                  <span className="font-medium">Compare your understanding</span> with expected levels for success
                </li>
                <li>
                  <span className="font-medium">Provide targeted recommendations</span> for improvement
                </li>
              </ul>
              <div className="mt-4">
                <p className="italic text-muted-foreground">
                  "Our research shows that quiz performance, when combined with other academic factors,
                  is a strong predictor of overall course success."
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-primary to-primary-foreground/90 text-white">
            <CardContent className="flex flex-col md:flex-row items-center justify-between p-8 gap-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">Ready to try it out?</h3>
                <p className="text-white/90">
                  Get your personalized academic performance prediction now.
                </p>
              </div>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="whitespace-nowrap bg-white text-primary hover:bg-white/90"
              >
                <Link to="/predict">
                  Start Your Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Future Improvements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-6 w-6 text-primary" />
                Future Enhancements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We're continuously improving our prediction system. Future
                enhancements will include:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  Integration with learning management systems for real-time data
                </li>
                <li>
                  Additional factors like sleep patterns and mental health metrics
                </li>
                <li>
                  More sophisticated models including ensemble methods and deep
                  learning
                </li>
                <li>
                  Personalized learning path recommendations based on prediction
                  results
                </li>
                <li>
                  Historical tracking to show improvement over time
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface PredictionStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
}

const PredictionStep = ({ icon, title, description, number }: PredictionStepProps) => {
  return (
    <div className="relative flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-slate-100 transition-all hover:shadow-md">
      <div className="absolute -top-3 -left-3 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="bg-primary/10 p-3 rounded-full mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default About;
