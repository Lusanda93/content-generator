import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Copy, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
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
      const { data, error } = await supabase.functions.invoke("generate-code", {
        body: { prompt },
      });

      if (error) throw error;

      if (data.code) {
        setGeneratedCode(data.code);
        toast({
          title: "Success!",
          description: "Code generated successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-lg">
        <div className="space-y-4">
          <Textarea
            placeholder="Describe what code you need... (e.g., 'Create a React component for a user profile card')"
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
                Generate Code
              </>
            )}
          </Button>
        </div>
      </Card>

      {generatedCode && (
        <Card className="mt-6 p-6 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-lg">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <pre className="text-sm text-foreground bg-input/30 p-4 rounded-lg">
                <code>{generatedCode}</code>
              </pre>
            </div>
            <Button
              onClick={handleCopy}
              variant="secondary"
              className="w-full"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Code
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CodeGenerator;
