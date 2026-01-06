"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email) {
      try {
        const response = await fetch("/api/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        })

        if (response.ok) {
          setIsFormSubmitted(true)
        } else {
          console.error("Failed to submit form")
        }
      } catch (error) {
        console.error("Error submitting form:", error)
        // Still show success to user even if API fails
        setIsFormSubmitted(true)
      }
    }
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/miless_0.1.8_x64-setup.exe"
    link.download = "miless_0.1.8_x64-setup.exe"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <span className="text-lg font-medium">Miless</span>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#download" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Download
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-6 text-balance leading-tight">
            Your invisible AI assistant for meetings
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed max-w-2xl mx-auto">
            Get real-time AI help during interviews, meetings, and calls—without anyone knowing. Miless transcribes
            conversations and provides instant responses exactly when you need them.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() => document.getElementById("download")?.scrollIntoView({ behavior: "smooth" })}
            >
              Download for Free
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">Available for Windows • ~20MB</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="pt-16 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-24">
            <div>
              <h2 className="text-2xl font-medium mb-6 text-center">Real-Time AI Help</h2>
              <p className="text-muted-foreground leading-relaxed text-center">
                Miless listens to system audio, transcribes speech in real time, and gives you instant AI-powered
                responses—without interrupting the conversation. Works with Zoom, Teams, Meet, and more.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4 text-center">Two Meeting Modes</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Interview Mode Table */}
                <div>
                  <h3 className="text-lg font-medium mb-4 text-center">Interview Mode</h3>
                  <div className="border border-border/50 rounded">
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="p-4 text-sm font-medium">Auto-detection</td>
                          <td className="p-4 text-sm text-muted-foreground">Detects questions automatically</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="p-4 text-sm font-medium">Response</td>
                          <td className="p-4 text-sm text-muted-foreground">Instant AI responses</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="p-4 text-sm font-medium">Best for</td>
                          <td className="p-4 text-sm text-muted-foreground">Job interviews, Q&A sessions</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-sm font-medium">Interaction</td>
                          <td className="p-4 text-sm text-muted-foreground">Fully automatic</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Meeting Mode Table */}
                <div>
                  <h3 className="text-lg font-medium mb-4 text-center">Meeting Mode</h3>
                  <div className="border border-border/50 rounded">
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="p-4 text-sm font-medium">Transcription</td>
                          <td className="p-4 text-sm text-muted-foreground">Continuous real-time</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="p-4 text-sm font-medium">Response</td>
                          <td className="p-4 text-sm text-muted-foreground">AI help on demand</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="p-4 text-sm font-medium">Best for</td>
                          <td className="p-4 text-sm text-muted-foreground">General meetings, calls</td>
                        </tr>
                        <tr>
                          <td className="p-4 text-sm font-medium">Interaction</td>
                          <td className="p-4 text-sm text-muted-foreground">Manual trigger</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4 text-center">Invisible & Undetectable</h2>
              <p className="text-muted-foreground leading-relaxed text-center">
                Hidden from screen sharing, screenshots, and recordings. A translucent, movable overlay that only you
                can see. Screenshot-proof and content-protected.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4 text-center">Lightweight & Fast</h2>
              <p className="text-muted-foreground leading-relaxed text-center">
                Only ~20MB with minimal CPU and memory usage. Launches instantly and stays ready. 25× smaller than
                competitors with near real-time transcription results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-medium mb-6">Privacy-first design</h2>
          <p className="text-muted-foreground mb-12 leading-relaxed">
            Each meeting has a unique ID. You control when meetings start. No visible UI to others. Designed for
            discretion and safety.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="font-medium mb-2">Unique Meeting IDs</h3>
              <p className="text-sm text-muted-foreground">Every session is isolated and secure</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">You're in Control</h3>
              <p className="text-sm text-muted-foreground">Start and stop recording anytime</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">No Data Sharing</h3>
              <p className="text-sm text-muted-foreground">Your conversations stay private</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-medium mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground">Download Miless for free. No credit card required.</p>
          </div>

          {!isFormSubmitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <Input
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
              />
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              <Button type="submit" size="lg" className="w-full">
                Continue to Download
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div>
                <Check className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-medium mb-2">Thank you, {name}!</h3>
                <p className="text-muted-foreground mb-4">Your download is ready</p>
              </div>
              <Button onClick={handleDownload} size="lg" className="w-full">
                Download Miless for Windows
              </Button>
              <p className="text-sm text-muted-foreground">Version 0.1.8 • ~20MB • Windows 64-bit</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-sm font-medium">Miless</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#download" className="hover:text-foreground transition-colors">
                Download
              </a>
            </div>
          </div>
          <div className="border-t border-border/50 mt-6 pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Miless. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
