import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, History, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const VideoResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { prompt } = location.state || {};

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

          <Alert className="border-accent/50 bg-accent/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Video generation is coming soon! This feature will integrate with specialized AI video generation services.
            </AlertDescription>
          </Alert>

          <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Video Request Submitted</h2>
            {prompt && (
              <p className="text-muted-foreground mb-6">Prompt: {prompt}</p>
            )}
            
            <p className="text-foreground">
              Your video generation request has been recorded. Once this feature is fully implemented, 
              you'll be able to create amazing AI-generated videos from your prompts.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoResult;
