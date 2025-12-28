import { Button } from '@/components/ui/button';
import { Calculator, Heart, TrendingUp, Calendar, Dog } from 'lucide-react';
import { Link } from 'wouter';
import { breeds } from '@/lib/breeds';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-blue-50" style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Header */}
      <header className="container py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="PawCalc Logo" className="w-12 h-12" />
          <span className="text-2xl font-bold text-gray-900">PawCalc</span>
        </div>
        <Link href="/research">
          <Button variant="ghost" className="text-gray-600 hover:text-orange-500">
            Research
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-28">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
              <Heart className="w-4 h-4 fill-current" />
              Trusted by 50,000+ Pet Parents
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Smart Tools for
            <span className="text-orange-500"> Happy Pets</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Free, science-backed calculators designed to help you make the best decisions for your furry friends' health and happiness.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculator/dog-calorie">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg">
                <Calculator className="w-5 h-5 mr-2" />
                Try Dog Calorie Calculator
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-6 text-lg"
              onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View All Tools
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Pet Tools</h2>
          <p className="text-gray-600">Choose a calculator to get started</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Dog Calorie Calculator Card */}
          <Link href="/calculator/dog-calorie">
            <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-orange-200">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dog Calorie Calculator</h3>
              <p className="text-gray-600 mb-4">
                Find the perfect daily calorie intake for your dog based on weight, activity, and body condition.
              </p>
              <div className="flex items-center text-orange-600 font-medium">
                Start Calculator
                <TrendingUp className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* Dog Age Calculator Card - NOW ACTIVE */}
          <Link href="/calculator/dog-age">
            <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dog Age Calculator</h3>
              <p className="text-gray-600 mb-4">
                Convert your dog's age to human years with size-specific accuracy.
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                Start Calculator
                <TrendingUp className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* Coming Soon - Cat Calorie */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100 opacity-60">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cat Calorie Calculator</h3>
            <p className="text-gray-600 mb-4">
              Determine the ideal daily calories for your cat's health and weight goals.
            </p>
            <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              Coming Soon
            </div>
          </div>
        </div>
      </section>

      {/* Breed-Specific Calculators Section */}
      <section className="container py-16 bg-gradient-to-b from-white to-orange-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            <Dog className="w-8 h-8 inline-block mr-2 text-orange-500" />
            Breed-Specific Calculators
          </h2>
          <p className="text-gray-600">Tailored nutrition advice for your specific breed</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {breeds.map((breed) => (
            <Link key={breed.id} href={`/calculator/${breed.slug}`}>
              <div className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-orange-300 text-center">
                <div className="text-3xl mb-2">🐕</div>
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">
                  {breed.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">Calorie Calculator</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Each breed has unique nutritional needs. Our calculators account for breed-specific metabolism and activity levels.
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="container py-16">
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl p-12 text-white text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Why Pet Parents Love PawCalc</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-orange-100">Happy Pet Parents</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-orange-100">Free Forever</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">Science</div>
                <div className="text-orange-100">Backed Results</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-12 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p className="mb-4">© 2025 PawCalc. Made with ❤️ for pets worldwide.</p>
          <div className="flex justify-center gap-6">
            <Link href="/research" className="hover:text-orange-500 transition-colors">Research</Link>
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
