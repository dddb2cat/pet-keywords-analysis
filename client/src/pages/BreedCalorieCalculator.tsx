import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Check, Info } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { getBreedBySlug, getBreedCalorieMultiplier, getBreedSEO, breeds, type BreedInfo } from '@/lib/breeds';

type Step = 'info' | 'name' | 'weight' | 'body-condition' | 'activity' | 'results';

interface FormData {
  dogName: string;
  weight: number;
  weightUnit: 'kg' | 'lbs';
  bodyCondition: 'underweight' | 'ideal' | 'overweight';
  activityLevel: 'sedentary' | 'moderate' | 'active' | 'very-active';
}

export default function BreedCalorieCalculator() {
  const params = useParams<{ breed: string }>();
  const breedSlug = params.breed || '';
  const breed = getBreedBySlug(breedSlug);
  
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [formData, setFormData] = useState<FormData>({
    dogName: '',
    weight: 0,
    weightUnit: 'kg',
    bodyCondition: 'ideal',
    activityLevel: 'moderate',
  });

  // Set SEO meta tags
  useEffect(() => {
    if (breed) {
      const seo = getBreedSEO(breed);
      document.title = seo.title;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', seo.description);
      }
    }
  }, [breed]);

  // Pre-fill weight with breed average
  useEffect(() => {
    if (breed && formData.weight === 0) {
      const avgWeight = (breed.averageWeight.min + breed.averageWeight.max) / 2;
      setFormData(prev => ({ ...prev, weight: Math.round(avgWeight) }));
    }
  }, [breed]);

  if (!breed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Breed Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, we couldn't find information for this breed.</p>
        <Link href="/calculator/dog-calorie">
          <Button>Try General Calculator</Button>
        </Link>
      </div>
    );
  }

  const calculateCalories = (): number => {
    const weightInKg = formData.weightUnit === 'lbs' ? formData.weight * 0.453592 : formData.weight;
    const rer = 70 * Math.pow(weightInKg, 0.75);
    
    const activityMultipliers = {
      'sedentary': 1.2,
      'moderate': 1.4,
      'active': 1.6,
      'very-active': 1.8,
    };
    
    const bodyConditionMultipliers = {
      'underweight': 1.2,
      'ideal': 1.0,
      'overweight': 0.8,
    };
    
    // Apply breed-specific multiplier
    const breedMultiplier = getBreedCalorieMultiplier(breed);
    
    const dailyCalories = rer * activityMultipliers[formData.activityLevel] * bodyConditionMultipliers[formData.bodyCondition] * breedMultiplier;
    
    return Math.round(dailyCalories);
  };

  const steps: Step[] = ['info', 'name', 'weight', 'body-condition', 'activity', 'results'];
  
  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
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

  const renderProgressBar = () => {
    const displaySteps = ['info', 'name', 'weight', 'body', 'activity', 'result'];
    return (
      <div className="container mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-0">
            {displaySteps.map((step, index) => {
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
                  {index < displaySteps.length - 1 && (
                    <div className={`w-12 md:w-16 h-1 transition-all ${
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
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex flex-col">
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

      {/* Progress Bar */}
      {renderProgressBar()}

      {/* Main Content */}
      <main className="flex-1 container flex items-start justify-center py-8">
        <div className="w-full max-w-xl">
          {/* Step: Breed Info */}
          {currentStep === 'info' && (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-5xl">🐕</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {breed.name} Calorie Calculator
              </h1>
              <p className="text-gray-600 mb-6">{breed.description}</p>
              
              <div className="bg-orange-50 rounded-2xl p-4 mb-6 text-left">
                <h3 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Breed-Specific Insights
                </h3>
                <p className="text-sm text-orange-700">{breed.calorieNotes}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-gray-500">Average Weight</div>
                  <div className="font-bold text-gray-900">
                    {breed.averageWeight.min}-{breed.averageWeight.max} kg
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-gray-500">Life Expectancy</div>
                  <div className="font-bold text-gray-900">
                    {breed.lifeExpectancy.min}-{breed.lifeExpectancy.max} years
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-gray-500">Size Category</div>
                  <div className="font-bold text-gray-900 capitalize">{breed.size}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-gray-500">Activity Level</div>
                  <div className="font-bold text-gray-900 capitalize">{breed.activityLevel.replace('-', ' ')}</div>
                </div>
              </div>

              <Button 
                onClick={handleNext}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg rounded-xl"
              >
                Calculate My {breed.name}'s Calories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step: Name */}
          {currentStep === 'name' && (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                What's your {breed.name}'s name?
              </h2>
              <p className="text-gray-500 mb-6">Let's personalize this experience! 🐕</p>
              
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Popular {breed.name} names:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {breed.popularNames.map(name => (
                    <button
                      key={name}
                      onClick={() => setFormData({ ...formData, dogName: name })}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        formData.dogName === name
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
              
              <Input
                type="text"
                placeholder="Or type a custom name..."
                value={formData.dogName}
                onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                className="text-center text-lg py-6 mb-6 border-2 border-orange-200 focus:border-orange-500"
              />
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={handleBack} className="flex-1 py-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-6"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step: Weight */}
          {currentStep === 'weight' && (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                How much does {formData.dogName || 'your dog'} weigh?
              </h2>
              <p className="text-gray-500 mb-2">
                {breed.name}s typically weigh {breed.averageWeight.min}-{breed.averageWeight.max} kg
              </p>
              <p className="text-sm text-orange-600 mb-6">
                We've pre-filled the average weight for you
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <Input
                  type="number"
                  value={formData.weight || ''}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
                  className="text-center text-2xl py-6 w-32 border-2 border-orange-200 focus:border-orange-500"
                />
                <div className="flex rounded-xl overflow-hidden border-2 border-gray-200">
                  <button
                    onClick={() => setFormData({ ...formData, weightUnit: 'kg' })}
                    className={`px-4 py-2 font-medium transition-all ${
                      formData.weightUnit === 'kg'
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    kg
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, weightUnit: 'lbs' })}
                    className={`px-4 py-2 font-medium transition-all ${
                      formData.weightUnit === 'lbs'
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    lbs
                  </button>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={handleBack} className="flex-1 py-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-6"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step: Body Condition */}
          {currentStep === 'body-condition' && (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                How would you describe {formData.dogName}'s body?
              </h2>
              <p className="text-gray-500 mb-6">Select the option that best matches</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { value: 'underweight', label: 'Underweight', emoji: '🦴', desc: 'Ribs visible' },
                  { value: 'ideal', label: 'Ideal Weight', emoji: '✨', desc: 'Ribs felt easily' },
                  { value: 'overweight', label: 'Overweight', emoji: '🍔', desc: 'Ribs hard to feel' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, bodyCondition: option.value as any })}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      formData.bodyCondition === option.value
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.emoji}</div>
                    <div className="font-semibold text-gray-900 text-sm">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.desc}</div>
                  </button>
                ))}
              </div>
              
              {breed.healthConsiderations.includes('Obesity tendency') || breed.healthConsiderations.includes('Obesity (very prone)') ? (
                <div className="bg-yellow-50 rounded-xl p-3 mb-6 text-sm text-yellow-800">
                  ⚠️ {breed.name}s are prone to obesity. Regular weight monitoring is recommended.
                </div>
              ) : null}
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={handleBack} className="flex-1 py-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-6"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step: Activity Level */}
          {currentStep === 'activity' && (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                How active is {formData.dogName}?
              </h2>
              <p className="text-gray-500 mb-6">
                {breed.name}s are typically <span className="font-semibold capitalize">{breed.activityLevel.replace('-', ' ')}</span> activity dogs
              </p>
              
              <div className="space-y-3 mb-6">
                {[
                  { value: 'sedentary', label: 'Couch Potato 🛋️', desc: 'Minimal exercise, mostly resting' },
                  { value: 'moderate', label: 'Casual Walker 🚶', desc: '30-60 min walks daily' },
                  { value: 'active', label: 'Active Explorer 🏃', desc: '1-2 hours of activity daily' },
                  { value: 'very-active', label: 'Super Athlete 🏆', desc: 'Working dog or intense training' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, activityLevel: option.value as any })}
                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                      formData.activityLevel === option.value
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.desc}</div>
                  </button>
                ))}
              </div>
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={handleBack} className="flex-1 py-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-6"
                >
                  Calculate
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step: Results */}
          {currentStep === 'results' && (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {formData.dogName}'s Daily Calorie Needs
              </h2>
              <p className="text-sm text-gray-500 mb-4">Optimized for {breed.name}s</p>
              
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 mb-6">
                <div className="text-5xl font-bold text-white mb-1">
                  {calculateCalories()}
                </div>
                <div className="text-white/80">calories per day</div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-3">📋 {breed.name}-Specific Recommendations</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✅</span>
                    <span>{breed.calorieNotes}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">🍽️</span>
                    <span>Divide daily calories into 2-3 meals for better digestion.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">💧</span>
                    <span>Always provide fresh water alongside meals.</span>
                  </li>
                  {formData.bodyCondition === 'overweight' && (
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">⚠️</span>
                      <span>Consider a gradual weight loss plan. Reduce treats and increase exercise.</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="bg-orange-50 rounded-2xl p-4 mb-6 text-left">
                <h3 className="font-semibold text-orange-800 mb-2">🏥 Health Considerations for {breed.name}s</h3>
                <div className="flex flex-wrap gap-2">
                  {breed.healthConsiderations.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-white rounded-full text-sm text-orange-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCurrentStep('info');
                    setFormData({
                      dogName: '',
                      weight: 0,
                      weightUnit: 'kg',
                      bodyCondition: 'ideal',
                      activityLevel: 'moderate',
                    });
                  }}
                  className="flex-1 py-6"
                >
                  Calculate Again
                </Button>
                <Link href="/" className="flex-1">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="container py-6 text-center text-sm text-gray-500">
        ⚠️ This calculator provides estimates for educational purposes. Consult your veterinarian for personalized advice.
      </footer>
    </div>
  );
}
