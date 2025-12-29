import { useState, useCallback } from 'react';
import { Search, ExternalLink, Copy, Shield, Terminal, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IOCTypeBadge, IOCTypeBadgeLarge } from '@/components/IOCTypeBadge';
import { LookupGrid } from '@/components/LookupCard';
import { detectIOCType, IOCInfo } from '@/lib/ioc-detection';
import { getSourcesForType, LookupSource } from '@/lib/lookup-sources';
import { toast } from 'sonner';

export function IOCDashboard() {
  const [inputValue, setInputValue] = useState('');
  const [iocInfo, setIocInfo] = useState<IOCInfo | null>(null);
  const [sources, setSources] = useState<LookupSource[]>([]);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleLookup = useCallback(() => {
    if (!inputValue.trim()) {
      toast.error('Please enter an IOC to analyze');
      return;
    }

    const detected = detectIOCType(inputValue);
    const lookupSources = getSourcesForType(detected.type);
    
    setIocInfo(detected);
    setSources(lookupSources);
    setIsAnalyzed(true);
    
    toast.success(`Detected ${detected.type.toUpperCase()} - ${lookupSources.length} lookup sources available`);
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLookup();
    }
  };

  const handleOpenAll = useCallback(() => {
    if (!iocInfo || sources.length === 0) return;
    
    sources.forEach((source, index) => {
      setTimeout(() => {
        window.open(source.getUrl(iocInfo.value), '_blank');
      }, index * 100);
    });
    
    toast.success(`Opening ${sources.length} tabs...`);
  }, [iocInfo, sources]);

  const handleCopyNormal = useCallback(() => {
    if (!iocInfo) return;
    navigator.clipboard.writeText(iocInfo.value);
    toast.success('Copied to clipboard (normal)');
  }, [iocInfo]);

  const handleCopyDefanged = useCallback(() => {
    if (!iocInfo) return;
    navigator.clipboard.writeText(iocInfo.defanged);
    toast.success('Copied to clipboard (defanged)');
  }, [iocInfo]);

  const handleClear = useCallback(() => {
    setInputValue('');
    setIocInfo(null);
    setSources([]);
    setIsAnalyzed(false);
  }, []);

  const currentType = inputValue.trim() ? detectIOCType(inputValue).type : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 border border-primary/50">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground text-glow">SOC Analyst Toolkit</h1>
                <p className="text-xs text-muted-foreground font-mono">IOC Investigation Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary animate-glow-pulse" />
              <span className="text-xs text-muted-foreground font-mono hidden sm:inline">PASSIVE OSINT ONLY</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Input Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            {/* Glow effect behind input */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-xl blur-xl opacity-50" />
            
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-2xl">
              <div className="flex flex-col gap-4">
                {/* Input row */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter IOC: domain, IP, URL, email, hash, or text..."
                      className="pl-12 h-14 text-lg bg-terminal-bg border-border/50 focus:border-primary"
                    />
                    {currentType && !isAnalyzed && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <IOCTypeBadge type={currentType} />
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={handleLookup}
                    size="xl"
                    variant="default"
                    className="h-14 px-8"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Analyze
                  </Button>
                </div>

                {/* Helper text */}
                <p className="text-xs text-muted-foreground font-mono text-center">
                  Auto-detects: Domain • IPv4 • URL • Email • MD5/SHA1/SHA256 • Text
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {isAnalyzed && iocInfo && (
          <section className="max-w-6xl mx-auto animate-fade-in">
            {/* IOC Info Card */}
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <IOCTypeBadgeLarge type={iocInfo.type} hashType={iocInfo.hashType} className="mb-4" />
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Normal</label>
                      <p className="text-lg text-card-foreground font-mono break-all bg-terminal-bg rounded px-3 py-2 mt-1 border border-border/30">
                        {iocInfo.value}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Defanged</label>
                      <p className="text-lg text-cyber-orange font-mono break-all bg-terminal-bg rounded px-3 py-2 mt-1 border border-border/30">
                        {iocInfo.defanged}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap lg:flex-col gap-2">
                  <Button onClick={handleOpenAll} variant="cyber" size="lg">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open All ({sources.length})
                  </Button>
                  <Button onClick={handleCopyNormal} variant="cyber-blue" size="lg">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Normal
                  </Button>
                  <Button onClick={handleCopyDefanged} variant="outline" size="lg">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Defanged
                  </Button>
                  <Button onClick={handleClear} variant="ghost" size="lg">
                    Clear
                  </Button>
                </div>
              </div>
            </div>

            {/* Lookup Sources */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold text-foreground">Lookup Sources</h2>
                <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-mono font-bold">
                  {sources.length} AVAILABLE
                </span>
              </div>
              <LookupGrid sources={sources} value={iocInfo.value} />
            </div>
          </section>
        )}

        {/* Empty State */}
        {!isAnalyzed && (
          <section className="max-w-2xl mx-auto text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-muted/50 border border-border/50 mb-6">
              <Shield className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-card-foreground mb-3">Ready to Investigate</h2>
            <p className="text-muted-foreground mb-6">
              Enter a domain, IP address, URL, email, hash, or any text to begin your investigation.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['google.com', '188.114.97.3', 'test@example.com', '0733351879b2fa9bd05c7ca3061529c0'].map((example) => (
                <button
                  key={example}
                  onClick={() => setInputValue(example)}
                  className="px-3 py-1.5 rounded-md bg-muted/50 border border-border/50 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertTriangle className="w-4 h-4 text-cyber-yellow" />
              <p className="text-xs font-mono text-center sm:text-left">
                This tool performs <span className="text-cyber-yellow">passive OSINT lookups only</span>. No indicators are executed or detonated.
              </p>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              SOC Toolkit v1.0
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
