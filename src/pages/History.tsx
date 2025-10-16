import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText, Image, Code, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface Generation {
  id: string;
  type: string;
  prompt: string;
  result: string;
  created_at: string;
}

const History = () => {
  const navigate = useNavigate();
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setGenerations(data);
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="h-5 w-5" />;
      case 'image': return <Image className="h-5 w-5" />;
      case 'code': return <Code className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const handleViewResult = (gen: Generation) => {
    navigate(`/${gen.type}-result`, {
      state: {
        [gen.type === 'image' || gen.type === 'video' ? 'url' : gen.type]: gen.result,
        prompt: gen.prompt
      }
    });
  };

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
            
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : generations.length === 0 ? (
              <p className="text-muted-foreground">
                No generations yet. Start creating to see your history here!
              </p>
            ) : (
              <div className="space-y-4">
                {generations.map((gen) => (
                  <Card 
                    key={gen.id}
                    className="p-4 hover:border-primary/40 transition-colors cursor-pointer"
                    onClick={() => handleViewResult(gen)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-primary">
                        {getIcon(gen.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="capitalize">
                            {gen.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(gen.created_at).toLocaleDateString()} at{' '}
                            {new Date(gen.created_at).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {gen.prompt}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default History;
