import { Button } from '@/components/ui/button';
import { Calculator, Heart, TrendingUp, Calendar, Dog, Sparkles, Leaf, Shield } from 'lucide-react';
import { Link } from 'wouter';
import { breeds } from '@/lib/breeds';

export default function LandingPage() {
  return (
    <div className="min-h-screen organic-texture bg-background">
      {/* Header */}
      <header className="container py-8 flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src="/logo.png" alt="PawCalc Logo" className="w-14 h-14 rounded-2xl shadow-lg" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-3 h-3 text-primary-foreground" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-foreground font-serif">PawCalc</span>
            <div className="text-xs text-muted-foreground tracking-wider">SMART PET HEALTH</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Shield className="w-3 h-3" />
            <span>Vet-Verified</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20 md:py-32 relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-primary/5 rounded-full animate-float blur-xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />

        <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10 animate-slide-up">
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-5 py-3 bg-primary/10 text-primary rounded-full text-base font-medium backdrop-blur-sm border border-primary/20">
              <Heart className="w-5 h-5 fill-primary/30" />
              <Sparkles className="w-4 h-4" />
              Trusted by 50,000+ Pet Parents
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-none tracking-tight">
            <span className="block">Science for</span>
            <span className="text-primary mt-2 block">Happy Pets</span>
          </h1>

          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Precision health tools backed by veterinary science. Make informed decisions for your furry family members with our free, research-based calculators.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8">
            <Link href="/calculator/dog-calorie">
              <button className="refined-btn flex items-center gap-3 text-lg px-10 py-5">
                <Calculator className="w-6 h-6" />
                <span>Try Dog Calorie Calculator</span>
              </button>
            </Link>
            <button
              className="refined-btn-secondary flex items-center gap-3 text-lg px-10 py-5"
              onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <TrendingUp className="w-6 h-6" />
              <span>Explore All Tools</span>
            </button>
          </div>

          {/* Stats preview */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground mt-2">Free Forever</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary">Vet</div>
              <div className="text-sm text-muted-foreground mt-2">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">24/7</div>
              <div className="text-sm text-muted-foreground mt-2">Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="container py-24 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Featured Tools</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Essential Pet Health Calculators</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional-grade tools designed with veterinary input for accurate, reliable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Dog Calorie Calculator Card */}
          <Link href="/calculator/dog-calorie">
            <div className="refined-card group p-10 cursor-pointer h-full flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Calculator className="w-8 h-8 text-primary" />
                </div>
                <div className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                  Most Popular
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Dog Calorie Calculator</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Calculate the perfect daily calorie intake for your dog based on weight, activity level, and body condition score.
              </p>
              <div className="flex items-center text-primary font-medium mt-auto pt-6 border-t border-border/30">
                <span>Start Calculation</span>
                <TrendingUp className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Dog Age Calculator Card */}
          <Link href="/calculator/dog-age">
            <div className="refined-card group p-10 cursor-pointer h-full flex flex-col">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Calendar className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Dog Age Calculator</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Convert your dog's age to human years with breed-size specificity. Understand their life stage for better care.
              </p>
              <div className="flex items-center text-secondary font-medium mt-auto pt-6 border-t border-border/30">
                <span>Calculate Age</span>
                <TrendingUp className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Coming Soon - Cat Calorie */}
          <div className="refined-card p-10 opacity-80 border-dashed border-2 border-border/50">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-6">
              <Calculator className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Cat Calorie Calculator</h3>
            <p className="text-muted-foreground mb-6">
              Determine the ideal daily calories for your feline friend's health and weight management goals.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Coming Soon</span>
            </div>
            <div className="mt-6 text-sm text-muted-foreground/70">
              Sign up to be notified when this tool launches.
            </div>
          </div>
        </div>
      </section>

      {/* Breed-Specific Calculators Section */}
      <section className="container py-24 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            <Dog className="w-4 h-4" />
            <span>Breed-Specific Precision</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Tailored Nutrition by Breed</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Different breeds have unique metabolic rates and nutritional requirements. Get personalized calculations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {breeds.map((breed, index) => (
            <Link key={breed.id} href={`/calculator/${breed.slug}`}>
              <div
                className="refined-card group p-6 cursor-pointer text-center transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
                  <span className="text-2xl">🐕</span>
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                  {breed.name}
                </h3>
                <p className="text-sm text-muted-foreground">Calorie Calculator</p>
                <div className="mt-4 pt-4 border-t border-border/30 text-xs text-primary/70 font-medium">
                  View Calculator →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground">
            Our algorithms consider breed-specific factors like metabolism, typical activity levels, and common health considerations.
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="container py-24 animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="refined-card bg-gradient-to-br from-primary/90 via-primary to-secondary/90 p-12 md:p-16 text-center overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-4 border-white/30" />
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border-4 border-white/30" />
          </div>

          <div className="max-w-4xl mx-auto space-y-10 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
              Trusted by Pet Parents & Professionals
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
              <div className="space-y-4">
                <div className="text-5xl font-bold text-primary-foreground">50K+</div>
                <div className="text-lg text-primary-foreground/90">Happy Pet Parents</div>
                <p className="text-sm text-primary-foreground/70">
                  From first-time owners to experienced breeders
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-bold text-primary-foreground">100%</div>
                <div className="text-lg text-primary-foreground/90">Free Forever</div>
                <p className="text-sm text-primary-foreground/70">
                  No subscriptions, no hidden fees
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-bold text-primary-foreground">Vet</div>
                <div className="text-lg text-primary-foreground/90">Approved Formulas</div>
                <p className="text-sm text-primary-foreground/70">
                  Based on latest veterinary research
                </p>
              </div>
            </div>

            <div className="pt-10 border-t border-primary-foreground/20">
              <p className="text-xl text-primary-foreground/90 italic">
                "Finally, a pet health tool that combines scientific accuracy with practical usability."
              </p>
              <div className="mt-4 text-primary-foreground/70">
                — Dr. Sarah Chen, Veterinary Nutritionist
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-16 border-t border-border animate-fade-in">
        <div className="text-center space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="PawCalc Logo" className="w-10 h-10 rounded-xl" />
              <span className="text-2xl font-bold text-foreground font-serif">PawCalc</span>
            </div>
            <div className="text-sm text-muted-foreground tracking-wider">PRECISION PET HEALTH</div>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering pet owners with science-backed tools for healthier, happier pets.
          </p>

          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <span>•</span>
            <a href="mailto:hello@pawcalc.com" className="hover:text-primary transition-colors">Contact</a>
          </div>

          <p className="text-sm text-muted-foreground/70 pt-8 border-t border-border/30">
            © 2025 PawCalc. Made with ❤️ for pets worldwide. All tools are for educational purposes only.
            <br />
            Always consult your veterinarian for specific health advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
