import { useState, useCallback, useEffect } from 'react';
import { Search, ExternalLink, Copy, Shield, Terminal, AlertTriangle, Zap, Cpu, Radar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IOCTypeBadge, IOCTypeBadgeLarge } from '@/components/IOCTypeBadge';
import { LookupGrid } from '@/components/LookupCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ExportMenu } from '@/components/ExportMenu';
import { CreatorFooter } from '@/components/CreatorFooter';
import { detectIOCType, IOCInfo } from '@/lib/ioc-detection';
import { getSourcesForType, LookupSource } from '@/lib/lookup-sources';
import { toast } from 'sonner';
import { FallingDots } from '@/components/FallingDots';
import { GlowingText } from "@/components/GlowingText";
import { AnimatedBadge } from "@/components/AnimatedBadge";
import { BinaryRain } from '@/components/BinaryRain';
import { LoadingScreen } from '@/components/LoadingScreen';

export function IOCDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [iocInfo, setIocInfo] = useState<IOCInfo | null>(null);
  const [sources, setSources] = useState<LookupSource[]>([]);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanEffect, setScanEffect] = useState(false);

  // Simulate loading on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000); // Show loading screen for 8 seconds for slow animation

    return () => clearTimeout(timer);
  }, []);

  const handleLookup = useCallback(() => {
    if (!inputValue.trim()) {
      toast.error('Please enter an IOC to analyze');
      return;
    }

    setIsAnalyzing(true);
    setScanEffect(true);

    // Reset scan effect after animation
    setTimeout(() => {
      const detected = detectIOCType(inputValue);
      const lookupSources = getSourcesForType(detected.type);

      setIocInfo(detected);
      setSources(lookupSources);
      setIsAnalyzed(true);
      setIsAnalyzing(false);

      toast.success(`Detected ${detected.type.toUpperCase()} - ${lookupSources.length} lookup sources available`);
    }, 800);
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLookup();
    }
  };

  const handleOpenAll = useCallback(() => {
    if (!iocInfo || sources.length === 0) return;

    // Add a cool effect when opening all
    const button = document.querySelector('[data-open-all]');
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => button.classList.remove('animate-pulse'), 1000);
    }

    sources.forEach((source, index) => {
      setTimeout(() => {
        window.open(source.getUrl(iocInfo.value), '_blank');
      }, index * 100);
    });

    toast.success(`Opening ${sources.length} tabs...`, {
      icon: '🚀',
    });
  }, [iocInfo, sources]);

  const handleCopyNormal = useCallback(() => {
    if (!iocInfo) return;
    navigator.clipboard.writeText(iocInfo.value);

    // Add copy animation
    const button = document.querySelector('[data-copy-normal]');
    if (button) {
      button.classList.add('animate-bounce');
      setTimeout(() => button.classList.remove('animate-bounce'), 500);
    }

    toast.success('Copied to clipboard (normal)', {
      icon: '📋',
    });
  }, [iocInfo]);

  const handleCopyDefanged = useCallback(() => {
    if (!iocInfo) return;
    navigator.clipboard.writeText(iocInfo.defanged);

    // Add copy animation
    const button = document.querySelector('[data-copy-defanged]');
    if (button) {
      button.classList.add('animate-bounce');
      setTimeout(() => button.classList.remove('animate-bounce'), 500);
    }

    toast.success('Copied to clipboard (defanged)', {
      icon: '🛡️',
    });
  }, [iocInfo]);

  const handleClear = useCallback(() => {
    // Add fade out animation
    const resultsSection = document.querySelector('[data-results-section]');
    if (resultsSection) {
      resultsSection.classList.add('animate-fade-out');
      setTimeout(() => {
        setInputValue('');
        setIocInfo(null);
        setSources([]);
        setIsAnalyzed(false);
        resultsSection.classList.remove('animate-fade-out');
      }, 300);
    } else {
      setInputValue('');
      setIocInfo(null);
      setSources([]);
      setIsAnalyzed(false);
    }
  }, []);

  const handleExampleClick = useCallback((example: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setInputValue(example);
    // Add click effect
    const button = event.currentTarget;
    if (button) {
      button.classList.add('animate-bounce');
      setTimeout(() => button.classList.remove('animate-bounce'), 500);
    }
  }, []);

  const currentType = inputValue.trim() ? detectIOCType(inputValue).type : null;

  // Show loading screen as a separate component
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Main app content - only shows after loading
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background Effects */}
      <FallingDots />
      <BinaryRain />

      {/* Scan line effect */}
      {scanEffect && (
        <div
          className="fixed inset-0 pointer-events-none z-10"
          onAnimationEnd={() => setScanEffect(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scan" />
        </div>
      )}

      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 border border-primary/50 group">
                <Terminal className="w-5 h-5 text-primary animate-pulse" />
                <div className="absolute inset-0 rounded-lg bg-primary/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-foreground">
                    <GlowingText text="SOC Analyst Toolkit" />
                  </h1>
                  <AnimatedBadge text="v1.0" />
                </div>
                <p className="text-xs text-muted-foreground font-mono">IOC Investigation Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="relative">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="relative overflow-hidden">
                  <span className="text-xs font-mono bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                    PASSIVE OSINT ONLY
                  </span>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-20 animate-fade-in">
        {/* Input Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="relative overflow-hidden rounded-xl">
            {/* Animated glow effect - Moved inside and reduced blur */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl blur-sm animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-xl animate-shine" />

            <div className="relative bg-card/90 backdrop-blur-sm border border-primary/20 rounded-xl p-6 shadow-2xl">
              <div className="flex flex-col gap-4">
                {/* Input row */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter IOC: domain, IP, URL, email, hash, or text..."
                      className="pl-12 h-14 text-lg bg-terminal-bg/80 border-border/50 focus:border-primary/70 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    />
                    {currentType && !isAnalyzed && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-fade-in">
                        <IOCTypeBadge type={currentType} />
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={handleLookup}
                    size="xl"
                    variant="default"
                    className="h-14 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 border border-primary/30 transition-all duration-300 shadow-lg shadow-primary/10"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Radar className="w-5 h-5 mr-2" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>

                {/* Animated helper text */}
                <div className="flex justify-center">
                  <p className="text-xs font-mono text-center bg-gradient-to-r from-muted-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                    Auto-detects: Domain • IPv4 • URL • Email • MD5/SHA1/SHA256 • Text
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {isAnalyzed && iocInfo && (
          <section
            data-results-section
            className="max-w-6xl mx-auto animate-fade-in-up"
          >
            {/* IOC Info Card with glow effect */}
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-6 group hover:border-primary/50 transition-all duration-300">
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/50 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/50 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/50 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/50 rounded-br-lg" />

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <IOCTypeBadgeLarge type={iocInfo.type} hashType={iocInfo.hashType} className="mb-4 animate-scale-in" />

                  <div className="space-y-3">
                    <div className="group/normal">
                      <label className="text-xs text-muted-foreground font-mono uppercase tracking-wider flex items-center gap-2">
                        <Zap className="w-3 h-3" />
                        Normal
                      </label>
                      <p className="text-lg text-card-foreground font-mono break-all bg-terminal-bg rounded px-3 py-2 mt-1 border border-border/30 group-hover/normal:border-primary/50 transition-colors">
                        {iocInfo.value}
                      </p>
                    </div>
                    <div className="group/defanged">
                      <label className="text-xs text-muted-foreground font-mono uppercase tracking-wider flex items-center gap-2">
                        <Shield className="w-3 h-3" />
                        Defanged
                      </label>
                      <p className="text-lg text-cyber-orange font-mono break-all bg-terminal-bg rounded px-3 py-2 mt-1 border border-border/30 group-hover/defanged:border-cyber-orange/50 transition-colors">
                        {iocInfo.defanged}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap lg:flex-col gap-2">
                  <Button
                    onClick={handleOpenAll}
                    variant="default"
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary border border-primary/40 shadow-md"
                    data-open-all
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open All ({sources.length})
                  </Button>
                  <Button
                    onClick={handleCopyNormal}
                    variant="cyber-blue"
                    size="lg"
                    className="group"
                    data-copy-normal
                  >
                    <Copy className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Copy Normal
                  </Button>
                  <Button
                    onClick={handleCopyDefanged}
                    variant="outline"
                    size="lg"
                    className="group border-cyber-orange/50 text-cyber-orange hover:bg-cyber-orange/10"
                    data-copy-defanged
                  >
                    <Copy className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Copy Defanged
                  </Button>
                  <ExportMenu iocInfo={iocInfo} sources={sources} />
                  <Button onClick={handleClear} variant="ghost" size="lg" className="hover:bg-destructive/10 hover:text-destructive">
                    Clear
                  </Button>
                </div>
              </div>
            </div>

            {/* Lookup Sources */}
            <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary animate-pulse" />
                  Lookup Sources
                </h2>
                <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono font-bold animate-pulse">
                  {sources.length} AVAILABLE
                </span>
              </div>
              <LookupGrid sources={sources} value={iocInfo.value} />
            </div>
          </section>
        )}

        {/* Empty State */}
        {!isAnalyzed && (
          <section className="max-w-2xl mx-auto text-center py-12 animate-fade-in">
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-muted/50 border border-border/50 mb-6 group">
              <Shield className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500 animate-pulse" />
            </div>
            <h2 className="text-2xl font-semibold text-card-foreground mb-3">
              <GlowingText text="Ready to Investigate" />
            </h2>
            <p className="text-muted-foreground mb-6">
              Enter a domain, IP address, URL, email, hash, or any text to begin your investigation.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['google.com', '188.114.97.3', 'test@example.com', '0733351879b2fa9bd05c7ca3061529c0'].map((example) => (
                <button
                  key={example}
                  onClick={(e) => handleExampleClick(example, e)}
                  className="px-3 py-1.5 rounded-md bg-muted/50 border border-border/50 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {example}
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer - Only shows after loading */}
      <footer className="border-t border-border/50 bg-card/30 mt-auto relative z-20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="relative">
                <AlertTriangle className="w-4 h-4 text-cyber-yellow animate-pulse" />
                <div className="absolute inset-0 bg-cyber-yellow/20 rounded-full animate-ping" />
              </div>
              <p className="text-xs font-mono text-center sm:text-left">
                This tool performs <span className="text-cyber-yellow font-bold">passive OSINT lookups only</span>. No indicators are executed or detonated.
              </p>
            </div>
            <CreatorFooter />
          </div>
          {/* Developer signature */}
          <div className="mt-4 pt-4 border-t border-border/30 text-center">
            <p className="text-xs text-muted-foreground font-mono">
              Developed by <span className="text-primary font-bold">Yukeshwaran N</span> with 🔐 for SOC Analysts
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}