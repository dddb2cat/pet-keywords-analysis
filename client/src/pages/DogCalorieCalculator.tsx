import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Link } from 'wouter';
import { SEO, generateCalculatorSchema, generateFAQSchema } from '@/components/SEO';
import { Breadcrumb } from '@/components/Breadcrumb';

type Step = 'name' | 'weight' | 'body-condition' | 'activity' | 'results';

interface FormData {
  dogName: string;
  weight: number;
  weightUnit: 'kg' | 'lbs';
  bodyCondition: 'underweight' | 'ideal' | 'overweight';
  activityLevel: 'sedentary' | 'moderate' | 'active' | 'very-active';
}

const dogCalorieFAQs = [
  {
    question: "How many calories does my dog need per day?",
    answer: "A dog's daily calorie needs depend on their weight, age, activity level, and body condition. Generally, dogs need 25-30 calories per pound of body weight for maintenance. Our calculator uses the scientifically-backed RER formula (70 × weight^0.75) adjusted for activity level."
  },
  {
    question: "How do I know if my dog is overweight?",
    answer: "You can assess your dog's weight by feeling their ribs - you should be able to feel them with light pressure. Look for a visible waist when viewed from above, and a tucked abdomen when viewed from the side. If ribs are hard to feel or there's no visible waist, your dog may be overweight."
  },
  {
    question: "Should I feed my dog more if they're very active?",
    answer: "Yes! Active dogs burn more calories and need more food. A highly active dog (like working dogs or those who exercise vigorously for over an hour daily) may need 1.5-2x the calories of a sedentary dog of the same weight."
  },
  {
    question: "How accurate is this dog calorie calculator?",
    answer: "Our calculator uses the RER (Resting Energy Requirement) formula recommended by veterinary nutritionists. While it provides a good starting point, individual dogs may vary. Monitor your dog's weight and adjust portions accordingly, and consult your vet for personalized advice."
  }
];

export default function DogCalorieCalculator() {
  const [currentStep, setCurrentStep] = useState<Step>('name');
  const [formData, setFormData] = useState<FormData>({
    dogName: '',
    weight: 0,
    weightUnit: 'kg',
    bodyCondition: 'ideal',
    activityLevel: 'moderate',
  });

  const calculateCalories = (): number => {
    // Convert weight to kg if needed
    const weightInKg = formData.weightUnit === 'lbs' ? formData.weight * 0.453592 : formData.weight;
    
    // Calculate Resting Energy Requirement (RER) = 70 * (weight in kg)^0.75
    const rer = 70 * Math.pow(weightInKg, 0.75);
    
    // Activity multipliers
    const activityMultipliers = {
      'sedentary': 1.2,
      'moderate': 1.4,
      'active': 1.6,
      'very-active': 1.8,
    };
    
    // Body condition adjustments
    const bodyConditionMultipliers = {
      'underweight': 1.2,
      'ideal': 1.0,
      'overweight': 0.8,
    };
    
    const dailyCalories = rer * activityMultipliers[formData.activityLevel] * bodyConditionMultipliers[formData.bodyCondition];
    
    return Math.round(dailyCalories);
  };

  const handleNext = () => {
    const steps: Step[] = ['name', 'weight', 'body-condition', 'activity', 'results'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: Step[] = ['name', 'weight', 'body-condition', 'activity', 'results'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 'name':
        return formData.dogName.trim().length > 0;
      case 'weight':
        return formData.weight > 0;
      default:
        return true;
    }
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex flex-col">
      <SEO
        title="Dog Calorie Calculator - Daily Food Requirements | PawCalc"
        description="Calculate your dog's daily calorie needs with our free, science-backed calculator. Get personalized feeding recommendations based on weight, activity level, and body condition."
        canonical={`${baseUrl}/calculator/dog-calorie`}
        keywords={['dog calorie calculator', 'dog food calculator', 'how many calories dog', 'dog feeding guide', 'pet nutrition calculator']}
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            generateCalculatorSchema(
              "Dog Calorie Calculator",
              "Free online calculator to determine your dog's daily calorie requirements based on weight, activity level, and body condition.",
              `${baseUrl}/calculator/dog-calorie`
            ),
            generateFAQSchema(dogCalorieFAQs)
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
          { label: 'Dog Calorie Calculator' }
        ]} />
      </div>

      {/* Progress Bar */}
      <div className="container mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-0">
            {['name', 'weight', 'body-condition', 'activity', 'results'].map((step, index) => {
              const steps = ['name', 'weight', 'body-condition', 'activity', 'results'];
              const currentIndex = steps.indexOf(currentStep);
              const isActive = currentIndex >= index;
              const isCompleted = currentIndex > index;
              
              return (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-md ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-400 border-2 border-gray-200'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 4 && (
                    <div className={`w-16 md:w-20 h-1 transition-all ${
                      isCompleted
                        ? 'bg-orange-500'
                        : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container flex-1 flex items-center justify-center pb-16">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 md:p-12">
          
          {/* Step 1: Dog Name */}
          {currentStep === 'name' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">What's your dog's name?</h2>
                <p className="text-gray-600">Let's personalize this experience! 🐕</p>
              </div>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="e.g., Max, Bella, Charlie..."
                  value={formData.dogName}
                  onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                  className="text-lg p-6 text-center"
                  autoFocus
                />
              </div>
              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                >
                  Next <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Weight */}
          {currentStep === 'weight' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">How much does {formData.dogName} weigh?</h2>
                <p className="text-gray-600">This helps us calculate the perfect calorie amount</p>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-center justify-center">
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.weight || ''}
                    onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
                    className="text-2xl p-6 text-center w-40"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button
                      variant={formData.weightUnit === 'kg' ? 'default' : 'outline'}
                      onClick={() => setFormData({ ...formData, weightUnit: 'kg' })}
                      className="px-6"
                    >
                      kg
                    </Button>
                    <Button
                      variant={formData.weightUnit === 'lbs' ? 'default' : 'outline'}
                      onClick={() => setFormData({ ...formData, weightUnit: 'lbs' })}
                      className="px-6"
                    >
                      lbs
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack} className="px-8">
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                >
                  Next <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Body Condition */}
          {currentStep === 'body-condition' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">What's {formData.dogName}'s body condition?</h2>
                <p className="text-gray-600">Choose the one that best matches</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setFormData({ ...formData, bodyCondition: 'underweight' })}
                  className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                    formData.bodyCondition === 'underweight'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <img src="/bcs-underweight.png" alt="Underweight" className="w-full h-32 object-contain mb-4" />
                  <h3 className="font-bold text-lg mb-2">Underweight</h3>
                  <p className="text-sm text-gray-600">Ribs & spine visible</p>
                  {formData.bodyCondition === 'underweight' && (
                    <div className="mt-3 flex justify-center">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setFormData({ ...formData, bodyCondition: 'ideal' })}
                  className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                    formData.bodyCondition === 'ideal'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <img src="/bcs-ideal.png" alt="Ideal Weight" className="w-full h-32 object-contain mb-4" />
                  <h3 className="font-bold text-lg mb-2">Ideal Weight ❤️</h3>
                  <p className="text-sm text-gray-600">Visible waist, ribs palpable</p>
                  {formData.bodyCondition === 'ideal' && (
                    <div className="mt-3 flex justify-center">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setFormData({ ...formData, bodyCondition: 'overweight' })}
                  className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                    formData.bodyCondition === 'overweight'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <img src="/bcs-overweight.png" alt="Overweight" className="w-full h-32 object-contain mb-4" />
                  <h3 className="font-bold text-lg mb-2">Overweight</h3>
                  <p className="text-sm text-gray-600">No visible waist, fat deposits</p>
                  {formData.bodyCondition === 'overweight' && (
                    <div className="mt-3 flex justify-center">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack} className="px-8">
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <Button
                  size="lg"
                  onClick={handleNext}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                >
                  Next <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Activity Level */}
          {currentStep === 'activity' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">How active is {formData.dogName}?</h2>
                <p className="text-gray-600">Think about a typical day</p>
              </div>
              <div className="space-y-3">
                {[
                  { value: 'sedentary', label: 'Couch Potato 🛋️', description: 'Mostly resting, short walks only' },
                  { value: 'moderate', label: 'Casual Walker 🚶', description: '1-2 walks per day, some playtime' },
                  { value: 'active', label: 'Energetic Player 🎾', description: 'Multiple walks, regular play sessions' },
                  { value: 'very-active', label: 'Athletic Champion 🏃', description: 'Running, hiking, or working dog' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, activityLevel: option.value as FormData['activityLevel'] })}
                    className={`w-full p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] text-left ${
                      formData.activityLevel === option.value
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{option.label}</h3>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                      {formData.activityLevel === option.value && (
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack} className="px-8">
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <Button
                  size="lg"
                  onClick={handleNext}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                >
                  Calculate <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Results */}
          {currentStep === 'results' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{formData.dogName}'s Daily Calorie Needs</h2>
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-3xl p-8 my-6">
                  <div className="text-6xl font-bold mb-2">{calculateCalories()}</div>
                  <div className="text-xl">calories per day</div>
                </div>
              </div>

              <div className="space-y-4 bg-blue-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg">📋 Personalized Recommendations</h3>
                <ul className="space-y-3 text-gray-700">
                  {formData.bodyCondition === 'underweight' && (
                    <li className="flex gap-3">
                      <span>💡</span>
                      <span>Consider gradually increasing food portions and consulting your vet about nutritional supplements.</span>
                    </li>
                  )}
                  {formData.bodyCondition === 'overweight' && (
                    <li className="flex gap-3">
                      <span>💡</span>
                      <span>Focus on portion control and increase daily exercise gradually. Consult your vet for a weight loss plan.</span>
                    </li>
                  )}
                  {formData.bodyCondition === 'ideal' && (
                    <li className="flex gap-3">
                      <span>✅</span>
                      <span>{formData.dogName} is at a healthy weight! Maintain current diet and exercise routine.</span>
                    </li>
                  )}
                  <li className="flex gap-3">
                    <span>🥘</span>
                    <span>Divide daily calories into 2-3 meals for better digestion.</span>
                  </li>
                  <li className="flex gap-3">
                    <span>💧</span>
                    <span>Always provide fresh water alongside meals.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" onClick={() => setCurrentStep('name')} className="flex-1">
                  Calculate Again
                </Button>
                <Link href="/" className="flex-1">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="container py-8 text-center text-gray-600 text-sm">
        <p>⚠️ This calculator provides estimates. Always consult your veterinarian for personalized advice.</p>
      </footer>
    </div>
  );
}
