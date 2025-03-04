
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 backdrop-blur-sm fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="text-xl font-bold text-gradient">TradeBot HQ</div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Button asChild className="bg-purple hover:bg-purple-light transition-colors">
              <Link to="/dashboard">
                Launch App
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <section className="py-20 md:py-32 flex flex-col items-center text-center">
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Automated Trading Bots for Crypto Enthusiasts
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Create, deploy, and manage powerful trading bots with an intuitive interface. Maximize your profits with automated strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-purple hover:bg-purple-light">
                <Link to="/dashboard">
                  Get Started <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
                <a href="#features">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </section>
        
        <section id="features" className="py-20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Powerful Trading Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers everything you need to create sophisticated trading bots
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-morphism p-6 rounded-xl card-glow card-glow-hover animate-slide-in" style={{animationDelay: "0ms"}}>
              <div className="bg-purple/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Bot size={24} className="text-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customizable Bots</h3>
              <p className="text-muted-foreground">
                Create bots with custom parameters tailored to your trading strategy and risk tolerance.
              </p>
            </div>
            
            <div className="glass-morphism p-6 rounded-xl card-glow card-glow-hover animate-slide-in" style={{animationDelay: "100ms"}}>
              <div className="bg-purple/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Zap size={24} className="text-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast Execution</h3>
              <p className="text-muted-foreground">
                Our system ensures your trades execute at the optimal moment with minimal slippage.
              </p>
            </div>
            
            <div className="glass-morphism p-6 rounded-xl card-glow card-glow-hover animate-slide-in" style={{animationDelay: "200ms"}}>
              <div className="bg-purple/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield size={24} className="text-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Security Focused</h3>
              <p className="text-muted-foreground">
                Your API keys are encrypted and secure. We never have access to your funds.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="glass-morphism rounded-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="md:max-w-lg">
                <h2 className="text-3xl font-bold mb-4">Ready to start trading smarter?</h2>
                <p className="text-muted-foreground mb-6">
                  Join thousands of traders who have already automated their trading strategies with our platform.
                </p>
                <Button asChild size="lg" className="bg-purple hover:bg-purple-light">
                  <Link to="/dashboard">
                    Launch Dashboard <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-lg font-bold text-gradient">TradeBot HQ</div>
              <p className="text-sm text-muted-foreground">Automated trading solutions</p>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} TradeBot HQ. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
