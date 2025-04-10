
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BarChart2, PieChart as PieChartIcon, Activity } from "lucide-react";
import { quizData } from "@/data/quizData";

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

const EnhancedResultsChart = () => {
  const [resultData, setResultData] = useState<ResultDataType | null>(null);
  const [activeTab, setActiveTab] = useState("bar");

  useEffect(() => {
    // In a real app, we'd get this from a state management solution
    const savedResult = localStorage.getItem("predictionResult");
    if (savedResult) {
      setResultData(JSON.parse(savedResult));
    }
  }, []);

  if (!resultData) {
    return (
      <Card className="w-full max-w-3xl mx-auto animate-fade-in">
        <CardHeader>
          <CardTitle className="text-center">No Prediction Results</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground mb-6">
            You haven't generated any prediction results yet.
          </p>
          <a
            href="/predict"
            className="inline-flex items-center text-primary hover:underline"
          >
            Go to prediction form
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </CardContent>
      </Card>
    );
  }

  const score = parseFloat(resultData.score);
  const { inputData, quizData: quizResults } = resultData;

  // Prepare bar chart data
  const barData = [
    {
      name: "Attendance",
      value: inputData.attendance,
      fill: "#22c55e",
    },
    {
      name: "Study Hours",
      value: inputData.studyHours / 0.4, // Normalize to percentage
      fill: "#3b82f6",
    },
    {
      name: "Previous Grade",
      value: inputData.previousGrade,
      fill: "#8b5cf6",
    },
    {
      name: "Assignments",
      value: inputData.assignmentsCompleted,
      fill: "#ec4899",
    },
    {
      name: "Participation",
      value: inputData.classParticipation,
      fill: "#f97316",
    },
  ];

  // Prepare pie chart data
  const pieData = [
    { name: "Study Hours", value: inputData.studyHours, fill: "#3b82f6" },
    { name: "Sleep Hours", value: inputData.sleepHours, fill: "#8b5cf6" },
    {
      name: "Extracurricular",
      value: inputData.extracurricular,
      fill: "#22c55e",
    },
    { name: "Screen Time", value: inputData.screenTime, fill: "#f97316" },
  ];

  // Prepare radar chart data (quiz results)
  const radarData = Object.entries(quizResults).map(([subjectId, score]) => {
    const subjectName = quizData[subjectId]?.name || subjectId;
    return {
      subject: subjectName,
      score: (score / 10) * 100, // Convert to percentage
      fullMark: 100,
    };
  });

  // Get grade letter
  const getGradeLetter = (score: number) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  // Get grade color
  const getGradeColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-blue-500";
    if (score >= 70) return "text-purple-500";
    if (score >= 60) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <Card className="w-full max-w-4xl mx-auto animate-fade-in">
      <CardHeader className="pb-0">
        <CardTitle className="text-center flex flex-col items-center">
          <div className="text-lg text-muted-foreground mb-2">
            Predicted Performance
          </div>
          <div className="flex items-baseline gap-3">
            <span
              className={`text-6xl font-bold ${getGradeColor(score)}`}
            >
              {getGradeLetter(score)}
            </span>
            <span className="text-4xl">{score}%</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs
          defaultValue="bar"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="bar" className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" />
                <span>Factors</span>
              </TabsTrigger>
              <TabsTrigger value="pie" className="flex items-center gap-1">
                <PieChartIcon className="h-4 w-4" />
                <span>Time Allocation</span>
              </TabsTrigger>
              <TabsTrigger value="radar" className="flex items-center gap-1">
                <Activity className="h-4 w-4" />
                <span>Quiz Results</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="bar" className="mt-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 30,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis 
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "Value"]}
                    contentStyle={{ 
                      borderRadius: "6px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" 
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  >
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="pie" className="mt-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={1500}
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.fill} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} hours`, "Time"]}
                    contentStyle={{ 
                      borderRadius: "6px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" 
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="radar" className="mt-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Quiz Score"
                    dataKey="score"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Score"]}
                    contentStyle={{ 
                      borderRadius: "6px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" 
                    }}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedResultsChart;
