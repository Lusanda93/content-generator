import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Download, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
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
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt },
      });

      if (error) throw error;

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
        toast({
          title: "Success!",
          description: "Image generated successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "ai-generated-image.png";
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-lg">
        <div className="space-y-4">
          <Textarea
            placeholder="Describe the image you want to create... (e.g., 'A futuristic city at sunset with flying cars')"
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
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Image
              </>
            )}
          </Button>
        </div>
      </Card>

      {imageUrl && (
        <Card className="mt-6 p-6 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-lg">
          <div className="space-y-4">
            <img
              src={imageUrl}
              alt="Generated"
              className="w-full rounded-lg shadow-xl"
            />
            <Button
              onClick={handleDownload}
              variant="secondary"
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Image
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ImageGenerator;
