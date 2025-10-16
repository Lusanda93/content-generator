import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const History = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Studio
          </Button>

          <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Generation History</h1>
            <p className="text-muted-foreground">
              Your generation history will appear here. This feature is coming soon and will allow you to 
              view, manage, and re-download all your previously generated content.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default History;
