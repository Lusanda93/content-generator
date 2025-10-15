import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, FileText, Code, Video } from "lucide-react";
import ImageGenerator from "./generators/ImageGenerator";
import TextGenerator from "./generators/TextGenerator";
import CodeGenerator from "./generators/CodeGenerator";
import VideoGenerator from "./generators/VideoGenerator";

const GenerationTabs = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <Tabs defaultValue="image" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8 bg-card/50 backdrop-blur-sm p-1">
          <TabsTrigger value="image" className="data-[state=active]:bg-primary">
            <Image className="w-4 h-4 mr-2" />
            Image
          </TabsTrigger>
          <TabsTrigger value="text" className="data-[state=active]:bg-primary">
            <FileText className="w-4 h-4 mr-2" />
            Text
          </TabsTrigger>
          <TabsTrigger value="code" className="data-[state=active]:bg-primary">
            <Code className="w-4 h-4 mr-2" />
            Code
          </TabsTrigger>
          <TabsTrigger value="video" className="data-[state=active]:bg-primary">
            <Video className="w-4 h-4 mr-2" />
            Video
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="image">
          <ImageGenerator />
        </TabsContent>
        
        <TabsContent value="text">
          <TextGenerator />
        </TabsContent>
        
        <TabsContent value="code">
          <CodeGenerator />
        </TabsContent>
        
        <TabsContent value="video">
          <VideoGenerator />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default GenerationTabs;
