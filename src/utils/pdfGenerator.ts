
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
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

// Helper function to get subject-specific recommendations
const getSubjectRecommendations = (subjectId: string, score: number) => {
  const subjectName = quizData[subjectId]?.name || subjectId;
  const percentage = (score / 10) * 100;
  
  if (percentage >= 80) {
    return {
      status: "Excellent",
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

// Helper function to get comprehensive recommendation
const getComprehensiveRecommendation = (score: number, quizResults: Record<string, number> | undefined, inputData: any) => {
  if (!quizResults || !inputData) return "";

  // Find weakest and strongest subjects
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

  // Analyze study habits
  const studyHabitIssues = [];
  if (inputData.attendance < 80) studyHabitIssues.push("low attendance");
  if (inputData.studyHours < 10) studyHabitIssues.push("insufficient study hours");
  if (inputData.sleepHours < 6) studyHabitIssues.push("inadequate sleep");
  if (inputData.screenTime > 6) studyHabitIssues.push("excessive screen time");
  
  const studyHabitStrengths = [];
  if (inputData.assignmentsCompleted > 85) studyHabitStrengths.push("consistent assignment completion");
  if (inputData.classParticipation > 75) studyHabitStrengths.push("active class participation");
  if (inputData.extracurricular > 2 && inputData.extracurricular < 8) studyHabitStrengths.push("balanced extracurricular activities");
  
  // Building the comprehensive feedback
  let feedback = "";
  
  if (score >= 90) {
    feedback = `Excellent Performance: You're performing at an outstanding level. Your strongest subject is ${strongestSubject}, and you've shown great competence across most subjects. `;
    
    if (weakestSubject && lowestScore < 90) {
      feedback += `Even though you're doing great overall, you could still improve in ${weakestSubject} to achieve perfect mastery. `;
    }
    
    if (studyHabitStrengths.length > 0) {
      feedback += `Your ${studyHabitStrengths.join(", ")} contribute greatly to your success. `;
    }
    
    feedback += `To maintain this performance, consider challenging yourself with advanced topics or competitions, and perhaps mentor other students who could benefit from your knowledge.`;
  } 
  else if (score >= 80) {
    feedback = `Strong Performance: You're performing well above average. You excel in ${strongestSubject}, which shows your potential for academic excellence. `;
    
    if (weakestSubject) {
      feedback += `Focus on improving your understanding of ${weakestSubject} to balance your knowledge. `;
    }
    
    if (studyHabitIssues.length > 0) {
      feedback += `Consider addressing your ${studyHabitIssues.join(", ")} to potentially reach the excellent category. `;
    }
    
    feedback += `Your current study methods are largely effective, but fine-tuning your approach could help you reach the next level.`;
  } 
  else if (score >= 70) {
    feedback = `Good Performance: You're performing above average with particular strength in ${strongestSubject}. `;
    
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
    feedback = `Average Performance: Your academic performance is currently average. Your strongest subject is ${strongestSubject}, which shows you have potential to improve. `;
    
    if (weakestSubject) {
      feedback += `${weakestSubject} requires significant attention as it's bringing down your overall performance. `;
    }
    
    if (studyHabitIssues.length > 0) {
      feedback += `Your ${studyHabitIssues.join(", ")} are likely contributing to your academic challenges. Addressing these should be a priority. `;
    }
    
    feedback += `Consider establishing a more structured study routine, seeking additional help from instructors, and possibly using different learning resources that might better suit your learning style.`;
  } 
  else {
    feedback = `Needs Improvement: Your current academic performance requires significant improvement. `;
    
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

// Get grade letter and color
const getGradeLetter = (score: number) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
};

export const generateResultPDF = (resultData: ResultDataType, studentInfo: { name: string; department: string; collegeName: string; collegeId: string } | null) => {
  if (!resultData || !studentInfo) return;

  const score = parseFloat(resultData.score);
  const doc = new jsPDF();
  
  // Add logo/header
  doc.setFillColor(65, 84, 241); // Primary color
  doc.rect(0, 0, doc.internal.pageSize.width, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("Academic Performance Prediction Report", 105, 15, { align: "center" });
  
  // Student info section
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(`Student: ${studentInfo.name}`, 14, 40);
  doc.text(`Department: ${studentInfo.department}`, 14, 48);
  doc.text(`College: ${studentInfo.collegeName}`, 14, 56);
  doc.text(`ID: ${studentInfo.collegeId}`, 14, 64);
  doc.text(`Date: ${new Date(resultData.timestamp).toLocaleDateString()}`, 14, 72);
  
  // Overall grade
  doc.setFillColor(240, 240, 250);
  doc.rect(140, 40, 55, 32, 'F');
  doc.setFontSize(14);
  doc.text("Overall Grade", 167.5, 50, { align: "center" });
  doc.setFontSize(24);
  doc.text(`${getGradeLetter(score)} (${score}%)`, 167.5, 65, { align: "center" });
  
  // Comprehensive analysis
  doc.setFillColor(240, 240, 250);
  doc.rect(14, 80, 182, 8, 'F');
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text("Comprehensive Analysis", 20, 86);
  doc.setFont(undefined, 'normal');
  
  const comprehensiveAnalysis = getComprehensiveRecommendation(score, resultData.quizData, resultData.inputData);
  const splitText = doc.splitTextToSize(comprehensiveAnalysis, 170);
  doc.text(splitText, 14, 98);
  
  // Calculate where to start subject table based on comprehensive analysis text
  let yPos = 100 + (splitText.length * 7);
  
  // Subject-by-subject analysis
  doc.setFillColor(240, 240, 250);
  doc.rect(14, yPos, 182, 8, 'F');
  doc.setFont(undefined, 'bold');
  doc.text("Subject Analysis", 20, yPos + 6);
  doc.setFont(undefined, 'normal');
  
  yPos += 15;
  
  // Create subject table data
  const tableData = Object.entries(resultData.quizData).map(([subjectId, subjectScore]) => {
    const subject = quizData[subjectId]?.name || subjectId;
    const percentage = (subjectScore / 10) * 100;
    const recommendation = getSubjectRecommendations(subjectId, subjectScore);
    
    return [
      subject,
      `${percentage.toFixed(0)}%`,
      recommendation.status,
      recommendation.advice
    ];
  });
  
  // Add the subject table
  autoTable(doc, {
    head: [['Subject', 'Score', 'Status', 'Recommendation']],
    body: tableData,
    startY: yPos,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [65, 84, 241] },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 20 },
      2: { cellWidth: 25 },
      3: { cellWidth: 97 }
    }
  });
  
  // Move position after table
  yPos = (doc as any).lastAutoTable.finalY + 15;
  
  // Study habits section
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setFillColor(240, 240, 250);
  doc.rect(14, yPos, 182, 8, 'F');
  doc.setFont(undefined, 'bold');
  doc.text("Study Habits Analysis", 20, yPos + 6);
  doc.setFont(undefined, 'normal');
  
  yPos += 15;
  
  // Prepare study habits data
  const strengths = [];
  const improvements = [];
  
  if (resultData.inputData.attendance >= 80) strengths.push(`Good attendance rate (${resultData.inputData.attendance}%)`);
  else improvements.push(`Increase attendance (currently ${resultData.inputData.attendance}%)`);
  
  if (resultData.inputData.studyHours >= 12) strengths.push(`Adequate study hours (${resultData.inputData.studyHours} hours/week)`);
  else improvements.push(`Dedicate more time to studying (currently ${resultData.inputData.studyHours} hours/week)`);
  
  if (resultData.inputData.assignmentsCompleted >= 85) strengths.push(`Excellent assignment completion (${resultData.inputData.assignmentsCompleted}%)`);
  else improvements.push(`Complete more assignments (currently ${resultData.inputData.assignmentsCompleted}%)`);
  
  if (resultData.inputData.classParticipation >= 75) strengths.push(`Active class participation (${resultData.inputData.classParticipation}%)`);
  else improvements.push(`Participate more actively in class (currently ${resultData.inputData.classParticipation}%)`);
  
  if (resultData.inputData.sleepHours >= 7) strengths.push(`Good sleep habits (${resultData.inputData.sleepHours} hours/day)`);
  else improvements.push(`Improve sleep habits (currently ${resultData.inputData.sleepHours} hours/day)`);
  
  if (resultData.inputData.extracurricular >= 2 && resultData.inputData.extracurricular <= 6) 
    strengths.push(`Balanced extracurricular activities (${resultData.inputData.extracurricular} hours/week)`);
  else if (resultData.inputData.extracurricular > 6)
    improvements.push(`Consider reducing extracurricular commitments (currently ${resultData.inputData.extracurricular} hours/week)`);
  
  if (resultData.inputData.screenTime <= 4) strengths.push(`Controlled screen time (${resultData.inputData.screenTime} hours/day)`);
  else improvements.push(`Reduce screen time (currently ${resultData.inputData.screenTime} hours/day)`);
  
  // Add study habits table
  const habitsData = [];
  if (strengths.length > 0) {
    habitsData.push(['Areas of Strength', strengths.join('\n')]);
  }
  if (improvements.length > 0) {
    habitsData.push(['Areas for Improvement', improvements.join('\n')]);
  }
  
  autoTable(doc, {
    body: habitsData,
    startY: yPos,
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: 'bold' },
      1: { cellWidth: 132 }
    }
  });
  
  // Footer with report generation date
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      `Report generated on ${new Date().toLocaleString()} - Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2, 
      doc.internal.pageSize.height - 10, 
      { align: 'center' }
    );
  }
  
  // Save the PDF with the student's name
  const fileName = `${studentInfo.name.replace(/\s+/g, '_')}_academic_report.pdf`;
  doc.save(fileName);
  
  return fileName;
};
