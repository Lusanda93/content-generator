import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

const VideoGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-video", {
        body: { prompt },
      });

      if (error) throw error;

      toast({
        title: "Coming Soon",
        description: data.message || "Video generation feature is in development",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Alert className="mb-6 border-accent/50 bg-accent/10">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Video generation is coming soon! This feature will integrate with specialized AI video generation services to create stunning videos from your prompts.
        </AlertDescription>
      </Alert>

      <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-lg">
        <div className="space-y-4">
          <Textarea
            placeholder="Describe the video you want to create... (e.g., 'A cinematic shot of a spaceship landing on Mars')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-32 bg-input/50 border-border resize-none"
          />
          
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Request Video Generation
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VideoGenerator;
