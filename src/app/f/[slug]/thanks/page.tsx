"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function Thanks() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
  const [responseUrl, setResponseUrl] = useState("");

  useEffect(() => {
    if (slug) {
      setResponseUrl(`${window.location.origin}/app/forms/${slug}/response`);
    }
  }, [slug]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(responseUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="mx-auto max-w-xl p-10 text-center space-y-6">
      <h1 className="text-3xl font-bold">🎉 Thanks for your submission!</h1>
      <p className="text-muted-foreground">
        You can close this window now, or share your form to collect responses.
      </p>

      <Card className="shadow-lg border border-muted">
        <CardHeader>
          <CardTitle className="text-lg">Share your form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              readOnly
              value={responseUrl}
              className="text-sm font-mono"
            />
            <Button onClick={copyToClipboard} variant="secondary">
              {copied ? "✅ Copied!" : "Copy"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
