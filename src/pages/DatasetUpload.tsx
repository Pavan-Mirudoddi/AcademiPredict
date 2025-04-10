
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FileIcon, Upload } from "lucide-react";

const DatasetUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check for CSV file
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith('.csv')) {
        toast.error("Please upload a CSV file");
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setIsUploading(true);

    // In a real application, this would be an API call to upload and train the model
    // For now, we'll simulate it with a timeout
    setTimeout(() => {
      // Store that the model is trained in localStorage
      localStorage.setItem("modelTrained", "true");
      
      setIsUploading(false);
      toast.success("Dataset uploaded and model trained successfully!");
      
      // Navigate to the prediction page
      navigate("/predict");
    }, 2000);
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-4xl animate-fade-up">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Upload Training Dataset</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your CSV dataset to train the student performance prediction model.
            Once trained, you can make predictions on new data.
          </p>
        </div>

        <Card className="border shadow-sm">
          <CardHeader className="text-center border-b bg-muted/30">
            <CardTitle>Dataset Upload</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 px-6">
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
                <div className="flex flex-col items-center justify-center gap-4">
                  <FileIcon className="h-10 w-10 text-muted-foreground" />
                  <div className="space-y-2">
                    <h3 className="font-medium">Upload your dataset</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload a CSV file with your student data.
                      The file should include columns for attendance, study hours, grades, etc.
                    </p>
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="max-w-xs"
                  />
                  {file && (
                    <p className="text-sm">
                      Selected file: <span className="font-medium">{file.name}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="px-8 py-6 text-lg flex items-center gap-2 animate-fade-in transition-all duration-300 hover:scale-105"
                >
                  {isUploading ? "Training Model..." : "Upload and Train Model"}
                  <Upload className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatasetUpload;
