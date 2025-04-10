
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  CheckSquare,
  Clock,
  MessageSquare,
  Moon,
  PlayCircle,
  Smartphone,
} from "lucide-react";

const features = [
  {
    name: "Attendance",
    description:
      "Regular attendance is strongly correlated with better academic performance. It ensures students don't miss important material and shows commitment to learning.",
    icon: <Calendar className="h-6 w-6 text-purple-500" />,
    weight: "High",
  },
  {
    name: "Study Hours",
    description:
      "The amount of time dedicated to studying outside of class is one of the strongest predictors of academic success. Quality of study time matters as much as quantity.",
    icon: <BookOpen className="h-6 w-6 text-blue-500" />,
    weight: "Very High",
  },
  {
    name: "Previous Grade",
    description:
      "Past performance often predicts future results. Previous grades in related subjects give insight into a student's foundation in the subject matter.",
    icon: <CheckSquare className="h-6 w-6 text-green-500" />,
    weight: "Very High",
  },
  {
    name: "Assignments Completed",
    description:
      "Completing assignments demonstrates understanding of the material and provides practice. It also builds discipline and organizational skills.",
    icon: <CheckSquare className="h-6 w-6 text-yellow-500" />,
    weight: "High",
  },
  {
    name: "Class Participation",
    description:
      "Active participation in discussions enhances understanding and engagement with the material. It helps clarify concepts and reinforces learning.",
    icon: <MessageSquare className="h-6 w-6 text-red-500" />,
    weight: "Medium",
  },
  {
    name: "Sleep Hours",
    description:
      "Adequate sleep is essential for cognitive function, memory consolidation, and focus. Poor sleep habits can significantly impair academic performance.",
    icon: <Moon className="h-6 w-6 text-indigo-500" />,
    weight: "Medium",
  },
  {
    name: "Extracurricular Activities",
    description:
      "Moderate involvement in extracurriculars can improve time management and provide a balanced lifestyle. However, excessive commitments can detract from study time.",
    icon: <PlayCircle className="h-6 w-6 text-orange-500" />,
    weight: "Low",
  },
  {
    name: "Screen Time",
    description:
      "Excessive recreational screen time can distract from studies and affect sleep quality. Managing digital distractions is important for academic focus.",
    icon: <Smartphone className="h-6 w-6 text-rose-500" />,
    weight: "Low (Negative)",
  },
];

const FeatureExplanation = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      {features.map((feature, index) => (
        <Card 
          key={feature.name} 
          className="transition-all duration-300 hover:shadow-md" 
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-xl">{feature.name}</CardTitle>
              <CardDescription>Weight: {feature.weight}</CardDescription>
            </div>
            <div>{feature.icon}</div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureExplanation;
