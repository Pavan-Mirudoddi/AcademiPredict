
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, CheckCircle, Clock, Sparkles, BarChart, Star, BookCheck, Award, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[90vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
            filter: "brightness(0.6)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30" />
        
        <div className="container max-w-4xl mx-auto relative z-10 px-4 py-20">
          <div className="text-left space-y-6 animate-fade-up">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/90 text-white backdrop-blur-sm mb-4">
              <Crown className="h-4 w-4 mr-1" />
              <span>Advanced Student Analysis</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Predict Your Academic <span className="text-primary">Performance</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Our AI-powered system analyzes your subject knowledge and study habits to forecast
              your academic performance and provide personalized improvement strategies.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="px-8 py-6 text-lg transition-transform hover:scale-105 shadow-lg bg-gradient-to-r from-primary to-primary/80"
              >
                <Link to="/predict">
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white"
              >
                <Link to="/about">Learn How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl font-bold text-slate-800">How It Works</h2>
            <div className="w-20 h-1 bg-primary mx-auto my-4 rounded-full"></div>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our comprehensive assessment process analyzes your knowledge and habits
              to provide accurate predictions and personalized recommendations.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connection line */}
            <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-primary/20 -translate-x-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <ProcessStep
                icon={<BookOpen className="h-8 w-8 text-primary" />}
                title="Select Your Subjects"
                description="Choose the subjects you're currently studying this semester from our comprehensive list."
                step="1"
                position="right"
              />
              <div className="md:mt-32" /> {/* Spacing for right side on desktop */}
              <div className="md:mt-32" /> {/* Spacing for left side on desktop */}
              <ProcessStep
                icon={<BookCheck className="h-8 w-8 text-primary" />}
                title="Complete Subject Quizzes"
                description="Take short quizzes for each subject to assess your current knowledge and understanding."
                step="2"
                position="left"
              />
              <ProcessStep
                icon={<Clock className="h-8 w-8 text-primary" />}
                title="Share Study Habits"
                description="Provide information about your study routine, attendance, and previous performance."
                step="3"
                position="right"
              />
              <div className="md:mt-32" /> {/* Spacing for right side on desktop */}
              <div className="md:mt-32" /> {/* Spacing for left side on desktop */}
              <ProcessStep
                icon={<BarChart className="h-8 w-8 text-primary" />}
                title="Receive Predictions"
                description="Get detailed performance predictions with visual analytics and personalized insights."
                step="4"
                position="left"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl font-bold text-slate-800">Key Features</h2>
            <div className="w-20 h-1 bg-primary mx-auto my-4 rounded-full"></div>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our prediction system provides comprehensive analysis and actionable insights 
              to help you improve your academic performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Sparkles className="h-8 w-8 text-primary" />}
              title="AI-Powered Analysis"
              description="Advanced machine learning algorithms analyze multiple factors to generate accurate predictions."
            />
            <FeatureCard
              icon={<Star className="h-8 w-8 text-primary" />}
              title="Subject-Specific Insights"
              description="Get detailed feedback and recommendations for each of your selected subjects."
            />
            <FeatureCard
              icon={<Award className="h-8 w-8 text-primary" />}
              title="Actionable Recommendations"
              description="Receive personalized strategies to improve your academic performance based on your results."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container max-w-4xl mx-auto">
          <Card className="border-none shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-gradient-to-br from-primary to-primary/80 p-8 md:p-12 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Improve Your Academic Performance?</h2>
                  <p className="mb-6 text-white/90">
                    Take the first step towards better grades with our comprehensive assessment and personalized recommendations.
                  </p>
                  <Button 
                    asChild 
                    variant="secondary" 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/90 transition-transform hover:scale-105"
                  >
                    <Link to="/predict">
                      Start Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div 
                  className="bg-cover bg-center min-h-[300px]"
                  style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

interface ProcessStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: string;
  position: "left" | "right";
}

const ProcessStep = ({ icon, title, description, step, position }: ProcessStepProps) => {
  return (
    <div className={`flex flex-col items-center md:items-${position === "left" ? "end" : "start"} text-${position === "left" ? "right" : "left"} relative animate-fade-up`}>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
          {step}
        </div>
      </div>
      <div className="md:max-w-xs bg-white p-6 rounded-xl shadow-md border border-slate-100 transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-center mb-4 gap-3">
          <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
            {icon}
          </div>
          <span className="inline-block md:hidden py-1 px-2 bg-primary text-white text-xs rounded-full">Step {step}</span>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center text-center animate-fade-up bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-1 border border-slate-100">
      <div className="bg-primary/10 p-4 rounded-full mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
