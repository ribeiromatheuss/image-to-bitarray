// app/page.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Binary,
  Check,
  Copy,
  Database,
  Download,
  Eye,
  FileCode2,
  Github,
  Image,
  Loader2,
  Upload,
  UploadCloud,
  Wand2,
} from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

function byteaHexToUint8Array(bytea: string): Uint8Array {
  const clean = bytea.startsWith("\\x") ? bytea.slice(2) : bytea;
  const bytes = new Uint8Array(clean.length / 2);

  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.substr(i, 2), 16);
  }

  return bytes;
}

function detectMime(bytes: Uint8Array): string {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }

  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }

  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
    return "image/gif";
  }

  return "application/octet-stream";
}

export default function BitArrayConverter() {
  // Image to BitArray state
  const [imagePreview, setImagePreview] = useState<string>("");
  const [bitOutput, setBitOutput] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);
  const [convertStatus, setConvertStatus] = useState<string>("");
  const [showCheck, setShowCheck] = useState(false);

  // BitArray to Image state
  const [bitInput, setBitInput] = useState<string>("");
  const [renderedImage, setRenderedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bitFileInputRef = useRef<HTMLInputElement>(null);

  // Handle image file selection
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setBitOutput("");
      setConvertStatus("");
    }
  };

  // Convert image to bitarray
  const handleConvertToBit = async () => {
    if (!fileInputRef.current?.files?.[0]) return;

    setIsConverting(true);
    setConvertStatus("Processing...");

    const file = fileInputRef.current.files[0];
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    // PostgreSQL BYTEA format (hex)
    let hex = "\\x";
    for (const b of bytes) {
      hex += b.toString(16).padStart(2, "0");
    }

    setBitOutput(hex);

    // Calculate size in KB
    const sizeKB = (bytes.length / 1024).toFixed(2);
    setConvertStatus(`Done (${sizeKB}kb)`);
    setIsConverting(false);
    setShowCheck(true);

    setTimeout(() => setShowCheck(false), 2000);
  };

  // Render bitarray to image
  const handleRenderImage = () => {
    if (!bitInput) return;

    try {
      const bytes = byteaHexToUint8Array(bitInput);
      const mime = detectMime(bytes);

      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: mime });
      const url = URL.createObjectURL(blob);

      setRenderedImage(url);
    } catch (e) {
      alert("Invalid BYTEA format");
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Download bitarray as file
  const downloadBitArray = () => {
    if (!bitOutput) return;

    const blob = new Blob([bitOutput], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "image.bytea";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download rendered image
  const downloadRenderedImage = () => {
    if (!renderedImage) return;

    const a = document.createElement("a");
    a.href = renderedImage;
    a.download = "rendered-image.png";
    a.click();
  };

  // Handle bitarray file upload
  const handleBitFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const text = await file.text();
      setBitInput(text);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-400 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded flex items-center justify-center bg-white text-black">
              <Database className="w-3.5 h-3.5" />
            </div>
            <span className="text-zinc-100 font-medium tracking-tight text-sm group-hover:text-white transition-colors">
              BitArray<span className="text-zinc-500 font-normal">.io</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-xs font-medium hover:text-white transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-xs font-medium hover:text-white transition-colors"
            >
              API (coming soon)
            </a>
            <div className="h-4 w-px bg-white/10"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              <span className="text-xs text-zinc-500">
                Client-side Processing
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Header */}
          <div className="lg:col-span-2 text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-3">
              Binary Image Transformation
            </h1>
            <p className="text-zinc-500 max-w-lg mx-auto text-sm leading-relaxed">
              Visual tools to encode images into binary formats and rebuild them
              from raw byte streams. Process handled entirely client-side.
            </p>
          </div>

          {/* Card 1: Image to BitArray */}
          <Card className="group bg-zinc-900/40 border-white/5 hover:border-white/10 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900 ring-1 ring-white/10 text-zinc-300">
                    <Image className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm text-zinc-200">
                      Image to BitArray
                    </CardTitle>
                    <CardDescription className="text-xs">
                      JPG, PNG, WEBP supported
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-[10px] font-mono text-zinc-500 border-white/5"
                >
                  img::bytea
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative border border-dashed border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/50 rounded-lg h-48 transition-all flex flex-col items-center justify-center gap-3 overflow-hidden"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {!imagePreview ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 text-zinc-400">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-zinc-400 font-medium">
                      Click or drag image here
                    </p>
                    <p className="text-[10px] text-zinc-600">Max size 5MB</p>
                  </div>
                ) : (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-contain p-2 opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-xs text-white bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur">
                        Change Image
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Output Area */}
              <div className="mt-6 flex-grow flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-zinc-500">
                    Bit String Output
                  </label>
                  {convertStatus && (
                    <span
                      className={`text-[10px] font-mono ${
                        convertStatus.includes("Done")
                          ? "text-emerald-500"
                          : "text-zinc-600"
                      }`}
                    >
                      {convertStatus}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Textarea
                    readOnly
                    value={bitOutput}
                    className="h-32 bg-zinc-900/50 border-white/5 text-[10px] font-mono text-zinc-400 resize-none pr-10 
                    scrollbar-custom"
                    placeholder="// Binary data will appear here..."
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-4 h-6 w-6 text-zinc-500 hover:text-white hover:bg-white/10 disabled:opacity-0 transition-opacity"
                    onClick={() => copyToClipboard(bitOutput)}
                    disabled={!bitOutput}
                    title="Copy to clipboard"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex gap-3 pt-4 border-t border-white/5">
              <Button
                className="flex-1 gap-2 hover:bg-zinc-200 transition-colors"
                variant="outline"
                disabled={!imagePreview || isConverting}
                onClick={handleConvertToBit}
              >
                {isConverting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : showCheck ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Binary className="w-3.5 h-3.5" />
                )}
                {isConverting
                  ? "Converting..."
                  : showCheck
                  ? "Converted"
                  : "Convert"}
              </Button>
              <Button
                size="icon"
                className="border border-white/10 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                onClick={downloadBitArray}
                disabled={!bitOutput}
              >
                <Download className="w-3.5 h-3.5" />
              </Button>
            </CardFooter>
          </Card>

          {/* Card 2: BitArray to Image */}
          <Card className="group bg-zinc-900/40 border-white/5 hover:border-white/10 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900 ring-1 ring-white/10 text-zinc-300">
                    <FileCode2 className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm text-zinc-200">
                      BitArray to Image
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Render binary strings
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-[10px] font-mono text-zinc-500 border-white/5"
                >
                  bytea::img
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Input Area */}
              <div className="flex-col flex gap-2 h-48">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-zinc-500">
                    Input Source
                  </label>
                  <Button
                    variant="inline"
                    size="sm"
                    onClick={() => bitFileInputRef.current?.click()}
                  >
                    <Upload className="w-2.5 h-2.5 mr-1" />
                    Upload File
                  </Button>
                  <input
                    ref={bitFileInputRef}
                    type="file"
                    className="hidden"
                    accept=".bytea,.txt"
                    onChange={handleBitFileUpload}
                  />
                </div>
                <Textarea
                  value={bitInput}
                  onChange={(e) => setBitInput(e.target.value)}
                  className="w-full h-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-[10px] font-mono text-zinc-400 resize-none focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600/50 transition-all placeholder-zinc-700 scrollbar-custom"
                  placeholder="Paste bitarray string here (e.g. \x89504e47...)"
                />
              </div>

              {/* Preview Area */}
              <div className="mt-6 flex-grow flex flex-col gap-3">
                <label className="text-xs font-medium text-zinc-500">
                  Render Preview
                </label>
                <div className="relative h-32 bg-[repeating-conic-gradient(#111_0%_25%,#222_0%_50%)] bg-[length:8px_8px] rounded-lg border border-dashed border-zinc-800 flex items-center justify-center overflow-hidden">
                  {!renderedImage ? (
                    <div className="text-zinc-700 flex flex-col items-center">
                      <Eye className="w-5 h-5" />
                      <span className="text-[10px] mt-1">
                        No data to render
                      </span>
                    </div>
                  ) : (
                    <img
                      src={renderedImage}
                      alt="Rendered"
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex gap-3 pt-4 border-t border-white/5">
              <Button
                variant="outline"
                className="flex-1 gap-2 hover:bg-zinc-200 transition-colors"
                disabled={!bitInput}
                onClick={handleRenderImage}
              >
                <Wand2 className="w-3.5 h-3.5" />
                Render
              </Button>
              <Button
                size="icon"
                className="border border-white/10 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                onClick={downloadRenderedImage}
                disabled={!renderedImage}
                title="Download image"
              >
                <Download className="w-3.5 h-3.5" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="flex items-center justify-center gap-6 mb-4">
            <a
              href="https://github.com/ribeiromatheuss/image-to-bitarray"
              className="text-zinc-600 hover:text-zinc-400 transition-colors"
              target="_blank"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
          <p className="text-[10px] text-zinc-700 font-medium">
            © 2026 BitArray. Client-side processing only. No data stored.
          </p>
        </footer>
      </main>
    </div>
  );
}
