"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Database, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <div className="min-h-screen bg-zinc-950 text-zinc-400 flex flex-col">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded flex items-center justify-center bg-white text-black">
                <Database className="w-3.5 h-3.5" />
              </div>
              <span className="text-zinc-100 font-medium tracking-tight text-sm">
                BitArray
              </span>
            </div>

            {/* Right content */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {/* Status – sempre visível */}
              <div className="flex items-center gap-2 text-zinc-500 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="whitespace-nowrap">Client-side</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden min-h-screen bg-black">
          {/* Background Effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"
            style={{
              backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=")`,
            }}
          />

          <div className="relative z-10 max-w-md w-full text-center">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-zinc-900/50 border border-white/5 shadow-2xl flex items-center justify-center mb-8 ring-1 ring-white/10 backdrop-blur-sm">
              <FileQuestion
                className="text-zinc-500"
                size={32}
                strokeWidth={1.5}
              />
            </div>

            {/* Error Code */}
            <div className="inline-block px-3 py-1 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-[10px] font-mono mb-6">
              ERROR_CODE_404
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
              Page not found
            </h1>

            {/* Description */}
            <p className="text-sm text-zinc-500 leading-relaxed mb-10 max-w-[320px] mx-auto">
              The bit sequence you are looking for has been moved, deleted, or
              possibly never existed in this array.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              <Button
                onClick={() => (window.location.href = "/")}
                className="w-full sm:w-auto px-5 h-10 bg-white text-black rounded-lg text-xs font-medium hover:bg-zinc-200"
              >
                <ArrowLeft size={14} strokeWidth={1.5} />
                Return Home
              </Button>
            </div>

            {/* Terminal output decoration */}
            <div className="mt-12 text-left bg-zinc-950/50 border border-white/5 rounded-lg p-4 font-mono text-[10px] text-zinc-600 overflow-hidden relative">
              <div className="absolute top-3 right-3 flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
              </div>
              <p>
                <span className="text-emerald-500">➜</span>{" "}
                <span className="text-zinc-400">~</span> curl
                https://bitarray/missing
              </p>
              <p className="mt-1 text-red-400">Error: 404 Not Found</p>
              <p className="mt-1 opacity-50">
                at /var/www/html/routes.ts:42:12
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
