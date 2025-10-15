import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Copy, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const TextGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
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
      const { data, error } = await supabase.functions.invoke("generate-text", {
        body: { prompt },
      });

      if (error) throw error;

      if (data.text) {
        setGeneratedText(data.text);
        toast({
          title: "Success!",
          description: "Text generated successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate text",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-lg">
        <div className="space-y-4">
          <Textarea
            placeholder="What would you like me to write? (e.g., 'Write a short story about a robot learning to paint')"
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
                Generate Text
              </>
            )}
          </Button>
        </div>
      </Card>

      {generatedText && (
        <Card className="mt-6 p-6 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-lg">
          <div className="space-y-4">
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-foreground bg-input/30 p-4 rounded-lg font-[Arial,sans-serif]">
                {generatedText}
              </pre>
            </div>
            <Button
              onClick={handleCopy}
              variant="secondary"
              className="w-full"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Text
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TextGenerator;
