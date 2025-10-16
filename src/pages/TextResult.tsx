import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, ArrowLeft, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { text, prompt } = location.state || {};

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
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
            <h2 className="text-2xl font-bold mb-4">Generated Text</h2>
            {prompt && (
              <p className="text-muted-foreground mb-6">Prompt: {prompt}</p>
            )}
            
            {text ? (
              <div className="space-y-4">
                <div className="text-foreground bg-input/30 p-6 rounded-lg leading-relaxed">
                  {text}
                </div>
                <Button
                  onClick={handleCopy}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Text
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">No text data available</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TextResult;
