"use client";

import type { Clip } from "@prisma/client";
import { CreditCard, Loader, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Dropzone, { type DropzoneState } from "shadcn-dropzone";
import { toast } from "sonner";
import { generateUploadUrl } from "~/actions/s3";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { processVideo } from "~/actions/generation";

export const DashboardClient = ({
  uploadedFiles,
  clips,
}: {
  uploadedFiles: {
    id: string;
    s3Key: string;
    filename: string;
    status: string;
    clipsCount: number;
    createdAt: Date;
  }[];
  clips: Clip[];
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select a file to upload");
      return;
    }

    const file = files[0]!;
    setUploading(true);

    try {
      const { success, signedUrl, key, uploadedFileId } =
        await generateUploadUrl({
          filename: file.name,
          contentType: file.type,
        });

      if (!success) {
        toast.error("Failed to generate upload URL");
        return;
      }

      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });
      if (!uploadResponse.ok) {
        toast.error(`Failed to upload file ${file.name}`);
        toast.error(`${uploadResponse.statusText}`);
        return;
      }

      await processVideo(uploadedFileId);

      setFiles([]);

      toast.success(`Video ${file.name} uploaded successfully!`, {
        description: "Your video is scheduled for processing.",
        duration: 5000,
      });
    } catch (error) {
      toast.error("Failed to upload file", {
        description: "An error occurred while uploading your video.",
        duration: 5000,
      });
    } finally {
      setUploading(false);
      // setFiles([]);
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="from-primary to-accent bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            Podcast Clipper
          </h1>
          <p className="text-muted-foreground/80 text-lg leading-relaxed">
            Upload your podcast and get AI-generated clips instantly
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          asChild
          className="from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 hover:border-primary/40 border-primary/20 text-foreground focus-visible:ring-primary-500 focus-visible:ring-offset-background h-9 bg-gradient-to-r px-4 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-gradient-to-r hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <Link href="/dashboard/billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Buy more
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="my-clips">My Clips</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader className="space-y-4 pb-6">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  Upload Podcast
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base">
                  Upload your audio or video file to generate AI-powered clips
                  automatically
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="group-[&:hover]:">
              <Dropzone
                onDrop={handleDrop}
                accept={{
                  "video/mp4": [".mp4"],
                }}
                maxSize={500 * 1024 * 1024} // 500MB
                maxFiles={1}
                disabled={uploading}
                containerClassName=" w-full rounded-xl transition-all hover:bg-none "
              >
                {(dropzone: DropzoneState) => (
                  <div className="from-background/50 to-muted/30 rounded-xlbg-gradient-to-b relative flex flex-col items-center justify-center space-y-5 p-10 text-center transition-all">
                    {/* Decorative elements */}
                    <div className="from-primary/10 to-accent/20 absolute -top-4 -left-4 h-16 w-16 rounded-full bg-gradient-to-br blur-2xl" />
                    <div className="from-accent/10 to-primary/20 absolute -right-4 -bottom-4 h-16 w-16 rounded-full bg-gradient-to-br blur-2xl" />

                    <div className="from-primary/10 via-accent/10 to-secondary/10 rounded-full bg-gradient-to-br p-4 shadow-md">
                      <UploadCloud className="text-primary/70 h-12 w-12" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-xl font-semibold tracking-tight">
                        Drop your podcast file here
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Drag and drop or click to browse
                      </p>
                      <p className="text-muted-foreground/70 text-xs">
                        Supports MP4 up to 500MB
                      </p>
                    </div>
                    <Button
                      className="from-primary/80 to-accent/80 hover:from-primary hover:to-accent relative mt-2 bg-gradient-to-r px-6 font-medium shadow-md transition-all duration-200 hover:shadow-lg"
                      size="default"
                      disabled={uploading}
                    >
                      <span className="mr-2">Select File</span>
                      <UploadCloud className="h-4 w-4" />
                    </Button>

                    {/* You could add this for a nicer effect */}
                    <p className="text-muted-foreground/60 text-xs italic">
                      Your file will be securely processed by our AI
                    </p>
                  </div>
                )}
              </Dropzone>

              <div className="mt-2 flex items-start justify-between">
                <div>
                  {files.length > 0 && (
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">Selected file:</p>
                      {files.map((file) => (
                        <p key={file.name} className="text-muted-foreground">
                          {file.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  className="from-primary/80 to-accent/80 hover:from-primary hover:to-accent relative mt-2 bg-gradient-to-r px-6 font-medium shadow-md transition-all duration-200 hover:shadow-lg"
                  size="default"
                  disabled={files.length === 0 || uploading}
                  onClick={handleUpload}
                >
                  {uploading ? (
                    <>
                      <Loader className="mr-1 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload and Generate Clips"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="my-clips"></TabsContent>
      </Tabs>
    </div>
  );
};
