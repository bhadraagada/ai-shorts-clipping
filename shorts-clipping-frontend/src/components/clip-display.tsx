"use client";

import type { Clip } from "@prisma/client";
import { Download, Loader2, Play, VideoOff } from "lucide-react";
import { useEffect, useState } from "react";
import { getClipPlayUrl } from "~/actions/generation";
import { Button } from "./ui/button";
import { toast } from "sonner";

const ClipCard = ({ clip }: { clip: Clip }) => {
  const [playUrl, setPlayUrl] = useState<string | null>(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(true);

  useEffect(() => {
    const fetchPlayUrl = async () => {
      setIsLoadingUrl(true);
      try {
        const { success, error, url } = await getClipPlayUrl(clip.id);

        if (success && url) {
          setPlayUrl(url);
        } else if (error) {
          toast.error(error);
          console.log(error);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching play url");
      } finally {
        setIsLoadingUrl(false);
      }
    };

    void fetchPlayUrl();
  }, [clip.id]);

  const handleDownload = () => {
    if (playUrl) {
      const link = document.createElement("a");
      link.href = playUrl;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="group flex w-full max-w-xs flex-col gap-3 rounded-lg border border-border/40 bg-card/30 p-3 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:border-border/60">
      <div className="aspect-auto w-full overflow-hidden rounded-md bg-muted/40 border border-border/20 shadow-inner relative">
        {isLoadingUrl ? (
          <div className="flex h-full w-full items-center justify-center bg-background/20 backdrop-blur-sm">
            <Loader2 className="text-primary h-10 w-10 animate-spin opacity-75" />
          </div>
        ) : playUrl ? (
          <video
            src={playUrl}
            controls
            preload="metadata"
            className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-muted/20">
            <VideoOff className="text-muted-foreground/60 h-12 w-12 mb-2" />
            <p className="text-xs text-muted-foreground/80">Video not available</p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Button 
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={!playUrl || isLoadingUrl}
          className="border-accent text-accent bg-primary/5 hover:bg-accent hover:text-primary-foreground shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-200 ease-in-out transform hover:-translate-y-px active:translate-y-0 disabled:opacity-50 disabled:transform-none disabled:hover:bg-primary/5 disabled:hover:text-primary/90"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Clip
        </Button>
      </div>
    </div>
  );
};

export const ClipDisplay = ({ clips }: { clips: Clip[] }) => {
  if (clips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="border-border/40 bg-card/30 mx-auto w-full max-w-full rounded-lg border p-8 shadow-md backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-muted/20 border-border/30 rounded-full border p-4 shadow-sm">
              <VideoOff className="text-muted-foreground/70 h-8 w-8" />
            </div>
            <h3 className="from-primary/90 to-accent/90 bg-gradient-to-r bg-clip-text text-xl font-semibold text-transparent">
              No Clips Yet
            </h3>
            <p className="text-muted-foreground max-w-xs text-center">
              Upload a video and generate clips to see them appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {clips.map((clip) => (
        <ClipCard key={clip.id} clip={clip} />
      ))}
    </div>
  );
};
