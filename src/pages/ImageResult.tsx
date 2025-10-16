import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ArrowLeft, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImageResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { imageUrl, prompt } = location.state || {};

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "ai-generated-image.png";
    link.click();
  };

  const handleHistory = () => {
    navigate("/history");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex gap-4 items-center">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Studio
            </Button>
            <Button
              onClick={handleHistory}
              variant="outline"
              className="gap-2"
            >
              <History className="h-4 w-4" />
              History
            </Button>
          </div>

          <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Generated Image</h2>
            {prompt && (
              <p className="text-muted-foreground mb-6">Prompt: {prompt}</p>
            )}
            
            {imageUrl ? (
              <div className="space-y-4">
                <img
                  src={imageUrl}
                  alt="Generated"
                  className="w-full rounded-lg shadow-xl"
                />
                <Button
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Image
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">No image data available</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImageResult;
