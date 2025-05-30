import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ShortsAI
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <Button variant={"secondary"} className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/20 transition-colors">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background"></div>
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/10 to-transparent"></div>
        </div>
        
        <div className="mx-auto max-w-6xl text-center">
          {/* Main Heading */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent blur-2xl opacity-10"></div>
            <h1 className="relative from-primary to-accent mb-6 bg-gradient-to-r bg-clip-text text-6xl font-bold text-transparent md:text-8xl py-20">
              Create Viral Shorts
              <br />
              <span className="text-foreground animate-pulse">In Seconds</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-muted-foreground mx-auto mb-12 max-w-3xl text-xl leading-relaxed md:text-2xl">
            Transform your long-form videos into engaging short clips with
            AI-powered editing. Perfect for <span className="text-primary">TikTok</span>, <span className="text-accent">YouTube Shorts</span>, and
            <span className="text-secondary"> Instagram Reels</span>.
          </p>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <button className="group bg-gradient-to-r from-primary to-accent min-w-[200px] rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
              Start Creating 
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </button>
            <button className="relative overflow-hidden bg-card text-card-foreground border-border min-w-[200px] rounded-xl border px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-xl">
              <span className="relative z-10">Watch Demo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 transform scale-x-0 transition-transform duration-300 origin-left hover:scale-x-100"></div>
            </button>
          </div>

          {/* Feature Preview */}
          <div className="bg-card/50 backdrop-blur-sm border-border relative mx-auto max-w-4xl rounded-2xl border p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent rounded-2xl"></div>
            <div className="relative bg-muted/50 flex h-80 items-center justify-center rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/5"></div>
              <div className="relative text-center">
                <div className="bg-primary/20 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full backdrop-blur-sm">
                  <svg
                    className="text-primary h-10 w-10 animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-muted-foreground font-medium">
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card/30 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-4xl font-bold md:text-5xl">
            Why Choose Our Platform?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-card border-border rounded-xl border p-8 shadow-md transition-all duration-200 hover:shadow-lg">
              <div className="bg-primary/20 mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
                <svg
                  className="text-primary h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">AI-Powered Editing</h3>
              <p className="text-muted-foreground">
                Our smart AI identifies the best moments in your videos and
                creates engaging clips automatically.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border-border rounded-xl border p-8 shadow-md transition-all duration-200 hover:shadow-lg">
              <div className="bg-accent/20 mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
                <svg
                  className="text-accent h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Generate multiple short clips from your content in minutes, not
                hours.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border-border rounded-xl border p-8 shadow-md transition-all duration-200 hover:shadow-lg">
              <div className="bg-secondary/20 mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
                <svg
                  className="text-secondary h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">
                Multi-Platform Ready
              </h3>
              <p className="text-muted-foreground">
                Export in perfect formats for TikTok, Instagram Reels, YouTube
                Shorts, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Ready to Go Viral?
          </h2>
          <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-xl">
            Join thousands of creators who are already using our platform to
            create engaging short-form content.
          </p>

          {/* Email Signup */}
          <div className="bg-card border-border mx-auto max-w-2xl rounded-2xl border p-8 shadow-xl">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring flex-1 rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
              />
              <button className="bg-primary text-primary-foreground rounded-lg px-8 py-3 font-semibold whitespace-nowrap transition-all duration-200 hover:opacity-90">
                Get Started Free
              </button>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-16 grid grid-cols-2 gap-8 opacity-60 md:grid-cols-4">
            <div className="text-center">
              <div className="text-primary text-2xl font-bold">10K+</div>
              <div className="text-muted-foreground text-sm">Creators</div>
            </div>
            <div className="text-center">
              <div className="text-accent text-2xl font-bold">1M+</div>
              <div className="text-muted-foreground text-sm">Clips Created</div>
            </div>
            <div className="text-center">
              <div className="text-secondary text-2xl font-bold">50M+</div>
              <div className="text-muted-foreground text-sm">
                Views Generated
              </div>
            </div>
            <div className="text-center">
              <div className="text-primary text-2xl font-bold">4.9★</div>
              <div className="text-muted-foreground text-sm">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border bg-card/50 border-t px-4 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground">
            © 2025 Shorts Clipping. Made with ❤️ for creators everywhere.
          </p>
        </div>
      </footer>
    </main>
  );
}
