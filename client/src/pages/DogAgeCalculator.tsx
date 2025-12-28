import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Check, Calendar, Dog } from 'lucide-react';
import { Link } from 'wouter';
import { SEO, generateCalculatorSchema, generateFAQSchema } from '@/components/SEO';
import { Breadcrumb } from '@/components/Breadcrumb';

type DogSize = 'small' | 'medium' | 'large' | 'giant';

interface FormData {
  dogName: string;
  dogAge: number;
  ageUnit: 'years' | 'months';
  dogSize: DogSize;
}

interface AgeResult {
  humanAge: number;
  lifeStage: string;
  stageEmoji: string;
  stageDescription: string;
  healthTips: string[];
}

const dogAgeFAQs = [
  {
    question: "Is 1 dog year really equal to 7 human years?",
    answer: "No, this is a myth! Dogs age much faster in their first two years, then slow down. A 1-year-old dog is actually about 15 in human years, and a 2-year-old is about 24. After that, each dog year equals roughly 4-7 human years depending on size."
  },
  {
    question: "Why does dog size affect their age in human years?",
    answer: "Larger dogs tend to age faster and have shorter lifespans than smaller dogs. A Great Dane is considered senior at 6-7 years, while a Chihuahua might not be senior until 10-11 years. Scientists believe this is related to how quickly large dogs grow."
  },
  {
    question: "What are the life stages of a dog?",
    answer: "Dogs go through Puppy (0-1 year), Adolescent (1-2 years), Adult (2-7 years), and Senior (7+ years) stages. However, these ranges vary by size - large breeds become seniors earlier than small breeds."
  },
  {
    question: "How can I help my dog live longer?",
    answer: "Regular vet checkups, proper nutrition, daily exercise, dental care, and maintaining a healthy weight are key. Mental stimulation through play and training also contributes to longevity and quality of life."
  }
];

export default function DogAgeCalculator() {
  const [step, setStep] = useState<'input' | 'size' | 'results'>('input');
  const [formData, setFormData] = useState<FormData>({
    dogName: '',
    dogAge: 1,
    ageUnit: 'years',
    dogSize: 'medium',
  });

  // More accurate dog age calculation based on size
  const calculateHumanAge = (): AgeResult => {
    let ageInYears = formData.ageUnit === 'months' ? formData.dogAge / 12 : formData.dogAge;
    
    // Size-based aging rates (dogs age faster when young, slower when older)
    // Based on American Kennel Club research
    const sizeMultipliers: Record<DogSize, { firstYear: number; secondYear: number; afterTwo: number }> = {
      small: { firstYear: 15, secondYear: 9, afterTwo: 4 },    // <20 lbs
      medium: { firstYear: 15, secondYear: 9, afterTwo: 5 },   // 21-50 lbs
      large: { firstYear: 15, secondYear: 9, afterTwo: 6 },    // 51-100 lbs
      giant: { firstYear: 12, secondYear: 10, afterTwo: 7 },   // >100 lbs
    };

    const multiplier = sizeMultipliers[formData.dogSize];
    let humanAge: number;

    if (ageInYears <= 1) {
      humanAge = ageInYears * multiplier.firstYear;
    } else if (ageInYears <= 2) {
      humanAge = multiplier.firstYear + (ageInYears - 1) * multiplier.secondYear;
    } else {
      humanAge = multiplier.firstYear + multiplier.secondYear + (ageInYears - 2) * multiplier.afterTwo;
    }

    // Determine life stage
    let lifeStage: string;
    let stageEmoji: string;
    let stageDescription: string;
    let healthTips: string[];

    if (ageInYears < 0.5) {
      lifeStage = 'Puppy';
      stageEmoji = '🐕';
      stageDescription = 'Your pup is in the rapid growth phase! Everything is new and exciting.';
      healthTips = [
        'Complete puppy vaccination series',
        'Start socialization training early',
        'Feed puppy-specific food for proper growth',
        'Begin basic obedience training',
      ];
    } else if (ageInYears < 1) {
      lifeStage = 'Junior';
      stageEmoji = '🦮';
      stageDescription = 'Adolescent phase - full of energy and still learning!';
      healthTips = [
        'Continue training and socialization',
        'Discuss spaying/neutering with your vet',
        'Transition to adult food gradually',
        'Establish regular exercise routine',
      ];
    } else if (ageInYears < 3) {
      lifeStage = 'Young Adult';
      stageEmoji = '🐕‍🦺';
      stageDescription = 'Prime of life! Peak energy and physical condition.';
      healthTips = [
        'Annual vet checkups recommended',
        'Maintain healthy weight with proper diet',
        'Regular dental care is important',
        'Keep up with heartworm and flea prevention',
      ];
    } else if (ageInYears < 7) {
      lifeStage = 'Adult';
      stageEmoji = '🐶';
      stageDescription = 'Mature and settled. A wonderful companion!';
      healthTips = [
        'Watch for weight gain as metabolism slows',
        'Regular exercise remains important',
        'Consider joint supplements if needed',
        'Monitor for any behavioral changes',
      ];
    } else if (ageInYears < 10) {
      lifeStage = 'Mature';
      stageEmoji = '🐕';
      stageDescription = 'Entering the golden years with wisdom and grace.';
      healthTips = [
        'Bi-annual vet checkups recommended',
        'Consider senior dog food formula',
        'Watch for signs of arthritis',
        'Adjust exercise to lower impact activities',
      ];
    } else {
      lifeStage = 'Senior';
      stageEmoji = '👴🐕';
      stageDescription = 'A treasured senior! Extra love and care needed.';
      healthTips = [
        'More frequent vet visits (every 6 months)',
        'Senior blood panel tests recommended',
        'Orthopedic bed for joint comfort',
        'Gentle, regular exercise to maintain mobility',
        'Monitor cognitive function',
      ];
    }

    return {
      humanAge: Math.round(humanAge),
      lifeStage,
      stageEmoji,
      stageDescription,
      healthTips,
    };
  };

  const renderProgressBar = () => {
    const steps = ['input', 'size', 'results'];
    const currentIndex = steps.indexOf(step);
    
    return (
      <div className="container mb-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-0">
            {['Age', 'Size', 'Result'].map((label, index) => {
              const isActive = currentIndex >= index;
              const isCompleted = currentIndex > index;
              
              return (
                <div key={label} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-md ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-400 border-2 border-gray-200'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 2 && (
                    <div className={`w-20 md:w-24 h-1 transition-all ${
                      isCompleted
                        ? 'bg-blue-500'
                        : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <SEO
        title="Dog Age Calculator - Convert Dog Years to Human Years | PawCalc"
        description="Accurately calculate your dog's age in human years with our free calculator. Uses the latest research considering dog size for precise age conversion."
        canonical={`${baseUrl}/calculator/dog-age`}
        keywords={['dog age calculator', 'dog years to human years', 'how old is my dog', 'dog age converter', 'pet age calculator']}
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            generateCalculatorSchema(
              "Dog Age Calculator",
              "Free online calculator to convert your dog's age to human years, accounting for size differences.",
              `${baseUrl}/calculator/dog-age`
            ),
            generateFAQSchema(dogAgeFAQs)
          ]
        }}
      />
      {/* Header */}
      <header className="container py-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src="/logo.png" alt="PawCalc Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-gray-900">PawCalc</span>
          </div>
        </Link>
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </header>

      {/* Breadcrumb */}
      <div className="container">
        <Breadcrumb items={[
          { label: 'Calculators', href: '/#tools' },
          { label: 'Dog Age Calculator' }
        ]} />
      </div>

      {/* Progress Indicator */}
      {renderProgressBar()}

      {/* Main Content */}
      <main className="flex-1 container flex items-start justify-center py-8">
        <div className="w-full max-w-xl">
          
          {/* Step: Input */}
          {step === 'input' && (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="w-10 h-10 text-blue-600" />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Dog Age Calculator
              </h1>
              <p className="text-gray-500 mb-8">
                Find out your dog's age in human years! 🐕
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your dog's name (optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Max, Bella..."
                    value={formData.dogName}
                    onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                    className="text-center text-lg py-5 border-2 border-blue-200 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How old is your dog?
                  </label>
                  <div className="flex items-center justify-center gap-4">
                    <Input
                      type="number"
                      min="0"
                      max="30"
                      value={formData.dogAge}
                      onChange={(e) => setFormData({ ...formData, dogAge: parseFloat(e.target.value) || 0 })}
                      className="text-center text-2xl py-5 w-24 border-2 border-blue-200 focus:border-blue-500"
                    />
                    <div className="flex rounded-xl overflow-hidden border-2 border-gray-200">
                      <button
                        onClick={() => setFormData({ ...formData, ageUnit: 'years' })}
                        className={`px-4 py-2 font-medium transition-all ${
                          formData.ageUnit === 'years'
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-600'
                        }`}
                      >
                        Years
                      </button>
                      <button
                        onClick={() => setFormData({ ...formData, ageUnit: 'months' })}
                        className={`px-4 py-2 font-medium transition-all ${
                          formData.ageUnit === 'months'
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-600'
                        }`}
                      >
                        Months
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => setStep('size')}
                disabled={formData.dogAge <= 0}
                className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white py-6 text-lg rounded-xl"
              >
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step: Size */}
          {step === 'size' && (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                <Dog className="w-10 h-10 text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                What size is {formData.dogName || 'your dog'}?
              </h2>
              <p className="text-gray-500 mb-6">
                Size affects how dogs age - smaller dogs live longer!
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { value: 'small', label: 'Small', weight: '< 10 kg', emoji: '🐕', example: 'Chihuahua, Pomeranian' },
                  { value: 'medium', label: 'Medium', weight: '10-25 kg', emoji: '🦮', example: 'Beagle, Cocker Spaniel' },
                  { value: 'large', label: 'Large', weight: '25-45 kg', emoji: '🐕‍🦺', example: 'Labrador, Golden Retriever' },
                  { value: 'giant', label: 'Giant', weight: '> 45 kg', emoji: '🐶', example: 'Great Dane, Mastiff' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, dogSize: option.value as DogSize })}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      formData.dogSize === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    <div className="font-bold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.weight}</div>
                    <div className="text-xs text-gray-400 mt-1">{option.example}</div>
                  </button>
                ))}
              </div>
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep('input')} className="flex-1 py-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={() => setStep('results')}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-6"
                >
                  Calculate Age
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step: Results */}
          {step === 'results' && (() => {
            const result = calculateHumanAge();
            return (
              <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {formData.dogName ? `${formData.dogName} is` : 'Your dog is'}
                </h2>
                
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 mb-6">
                  <div className="text-5xl font-bold text-white mb-1">
                    {result.humanAge}
                  </div>
                  <div className="text-white/80">in human years</div>
                </div>
                
                <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                  <div className="text-3xl mb-2">{result.stageEmoji}</div>
                  <div className="text-lg font-bold text-blue-800">{result.lifeStage}</div>
                  <p className="text-sm text-blue-600 mt-1">{result.stageDescription}</p>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-3">💡 Health Tips for {result.lifeStage} Dogs</h3>
                  <ul className="space-y-2">
                    {result.healthTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-blue-500">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-3 mb-6 text-sm text-purple-700">
                  📊 Based on the latest research from the American Kennel Club, accounting for {formData.dogSize} breed aging patterns.
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setStep('input');
                      setFormData({
                        dogName: '',
                        dogAge: 1,
                        ageUnit: 'years',
                        dogSize: 'medium',
                      });
                    }}
                    className="flex-1 py-6"
                  >
                    Calculate Again
                  </Button>
                  <Link href="/" className="flex-1">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>
      </main>

      {/* Footer */}
      <footer className="container py-6 text-center text-sm text-gray-500">
        ⚠️ Dog age conversion is an estimate. Individual dogs may age differently based on genetics and health.
      </footer>
    </div>
  );
}
