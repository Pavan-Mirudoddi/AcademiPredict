
import { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Maximize } from "lucide-react";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface FullScreenQuizProps {
  children: ReactNode;
  onExitQuiz: () => void;
}

const FullScreenQuiz = ({ children, onExitQuiz }: FullScreenQuizProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [exitAttempted, setExitAttempted] = useState(false);
  const [exitWarningOpen, setExitWarningOpen] = useState(false);
  const [exitCount, setExitCount] = useState(0);

  // Request fullscreen when component mounts
  useEffect(() => {
    const requestFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
          setIsFullScreen(true);
          toast.success("Entered fullscreen mode. Please stay in this mode during the assessment.");
        } else {
          toast.error("Fullscreen mode is not supported by your browser.");
        }
      } catch (error) {
        console.error("Error requesting fullscreen:", error);
        toast.error("Failed to enter fullscreen mode. Please allow fullscreen to continue.");
      }
    };

    // Request fullscreen after a short delay to allow the component to mount properly
    const timer = setTimeout(() => {
      requestFullscreen();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullScreen = !!document.fullscreenElement;
      setIsFullScreen(isCurrentlyFullScreen);
      
      // If exiting fullscreen without permission
      if (!isCurrentlyFullScreen && !exitAttempted) {
        setExitCount(prev => prev + 1);
        
        if (exitCount >= 2) {
          // User has exited fullscreen too many times
          toast.error("You've exited fullscreen mode too many times. Your assessment has been terminated.");
          onExitQuiz();
        } else {
          setExitWarningOpen(true);
          // Try to re-enter fullscreen after warning
          document.documentElement.requestFullscreen().catch(error => {
            console.error("Error re-requesting fullscreen:", error);
          });
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [exitAttempted, exitCount, onExitQuiz]);

  const handleEnterFullscreen = () => {
    document.documentElement.requestFullscreen().catch(error => {
      console.error("Error requesting fullscreen:", error);
    });
  };

  const handleContinueAssessment = () => {
    setExitWarningOpen(false);
    // Try to re-enter fullscreen
    handleEnterFullscreen();
  };
  
  const handleExitAssessment = () => {
    setExitWarningOpen(false);
    setExitAttempted(true);
    onExitQuiz();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-slate-50/50">
      {/* Fullscreen controls - Only show enter fullscreen button, not exit */}
      {!isFullScreen && (
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEnterFullscreen}
            className="flex items-center gap-1 bg-primary/10 hover:bg-primary/20 border-primary/20"
          >
            <Maximize className="h-4 w-4" />
            <span className="hidden sm:inline">Enter Fullscreen</span>
          </Button>
        </div>
      )}

      {/* Warning banner when not in fullscreen */}
      {!isFullScreen && !exitAttempted && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 shadow-sm">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
            <p className="text-sm text-amber-700">
              Please enter fullscreen mode to continue with your assessment. 
              Exiting fullscreen mode multiple times may result in termination of your assessment.
            </p>
          </div>
        </div>
      )}

      {/* Children content (the actual quiz) */}
      <div className="h-full">
        {children}
      </div>

      {/* Exit warning dialog */}
      <AlertDialog open={exitWarningOpen} onOpenChange={setExitWarningOpen}>
        <AlertDialogContent className="border-amber-200 bg-gradient-to-b from-white to-amber-50/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-amber-700">Warning: Fullscreen Exited</AlertDialogTitle>
            <AlertDialogDescription>
              You have exited fullscreen mode. This is against the assessment rules.
              <br /><br />
              You have <strong>{3 - exitCount} warning(s)</strong> remaining before your assessment is terminated.
              <br /><br />
              Please return to fullscreen mode to continue your assessment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleExitAssessment} className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">Exit Assessment</AlertDialogCancel>
            <AlertDialogAction onClick={handleContinueAssessment} className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80">Return to Fullscreen</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FullScreenQuiz;
