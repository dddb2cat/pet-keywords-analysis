// Dog breed data for programmatic SEO pages
export interface BreedInfo {
  id: string;
  name: string;
  slug: string;
  averageWeight: { min: number; max: number; unit: 'kg' };
  lifeExpectancy: { min: number; max: number };
  size: 'small' | 'medium' | 'large' | 'giant';
  activityLevel: 'low' | 'moderate' | 'high' | 'very-high';
  description: string;
  calorieNotes: string;
  image: string;
  popularNames: string[];
  healthConsiderations: string[];
}

export const breeds: BreedInfo[] = [
  {
    id: 'golden-retriever',
    name: 'Golden Retriever',
    slug: 'golden-retriever',
    averageWeight: { min: 25, max: 34, unit: 'kg' },
    lifeExpectancy: { min: 10, max: 12 },
    size: 'large',
    activityLevel: 'high',
    description: 'Golden Retrievers are friendly, intelligent, and devoted dogs known for their beautiful golden coats and gentle temperament.',
    calorieNotes: 'Golden Retrievers are prone to obesity, so careful calorie management is essential. They have high energy needs due to their active nature.',
    image: '/breeds/golden-retriever.jpg',
    popularNames: ['Max', 'Charlie', 'Cooper', 'Buddy', 'Tucker'],
    healthConsiderations: ['Hip dysplasia', 'Obesity tendency', 'Heart conditions'],
  },
  {
    id: 'labrador-retriever',
    name: 'Labrador Retriever',
    slug: 'labrador-retriever',
    averageWeight: { min: 25, max: 36, unit: 'kg' },
    lifeExpectancy: { min: 10, max: 14 },
    size: 'large',
    activityLevel: 'high',
    description: 'Labrador Retrievers are outgoing, active, and friendly dogs. They are America\'s most popular breed for good reason.',
    calorieNotes: 'Labs are notorious for their love of food and tendency to overeat. Strict portion control is crucial to prevent obesity.',
    image: '/breeds/labrador-retriever.jpg',
    popularNames: ['Bella', 'Lucy', 'Daisy', 'Molly', 'Sadie'],
    healthConsiderations: ['Obesity (very prone)', 'Hip dysplasia', 'Exercise-induced collapse'],
  },
  {
    id: 'french-bulldog',
    name: 'French Bulldog',
    slug: 'french-bulldog',
    averageWeight: { min: 8, max: 14, unit: 'kg' },
    lifeExpectancy: { min: 10, max: 12 },
    size: 'small',
    activityLevel: 'low',
    description: 'French Bulldogs are adaptable, playful, and smart companion dogs with their signature bat ears and charming personality.',
    calorieNotes: 'Frenchies have lower calorie needs due to their brachycephalic nature and reduced exercise tolerance. Overfeeding leads to breathing difficulties.',
    image: '/breeds/french-bulldog.jpg',
    popularNames: ['Gus', 'Winston', 'Louie', 'Frank', 'Stella'],
    healthConsiderations: ['Brachycephalic syndrome', 'Heat sensitivity', 'Spinal issues'],
  },
  {
    id: 'german-shepherd',
    name: 'German Shepherd',
    slug: 'german-shepherd',
    averageWeight: { min: 22, max: 40, unit: 'kg' },
    lifeExpectancy: { min: 9, max: 13 },
    size: 'large',
    activityLevel: 'very-high',
    description: 'German Shepherds are confident, courageous, and smart working dogs known for their versatility and loyalty.',
    calorieNotes: 'GSDs have high calorie requirements due to their active nature and muscular build. Working dogs may need even more calories.',
    image: '/breeds/german-shepherd.jpg',
    popularNames: ['Rex', 'Zeus', 'Duke', 'Bear', 'Rocky'],
    healthConsiderations: ['Hip dysplasia', 'Degenerative myelopathy', 'Bloat'],
  },
  {
    id: 'poodle',
    name: 'Poodle',
    slug: 'poodle',
    averageWeight: { min: 18, max: 32, unit: 'kg' },
    lifeExpectancy: { min: 12, max: 15 },
    size: 'medium',
    activityLevel: 'high',
    description: 'Poodles are exceptionally smart and active dogs that come in three sizes. They are known for their curly, hypoallergenic coats.',
    calorieNotes: 'Standard Poodles are athletic dogs with moderate to high calorie needs. Their intelligence means they benefit from food puzzles and enrichment.',
    image: '/breeds/poodle.jpg',
    popularNames: ['Coco', 'Sophie', 'Teddy', 'Milo', 'Oliver'],
    healthConsiderations: ['Hip dysplasia', 'Progressive retinal atrophy', 'Bloat'],
  },
];

export function getBreedBySlug(slug: string): BreedInfo | undefined {
  return breeds.find(breed => breed.slug === slug);
}

export function getBreedCalorieMultiplier(breed: BreedInfo): number {
  // Adjust base calories based on breed-specific factors
  const activityMultipliers = {
    'low': 0.9,
    'moderate': 1.0,
    'high': 1.1,
    'very-high': 1.2,
  };
  return activityMultipliers[breed.activityLevel];
}

// SEO-optimized titles and descriptions for each breed
export function getBreedSEO(breed: BreedInfo) {
  return {
    title: `${breed.name} Calorie Calculator - Daily Food Requirements | PawCalc`,
    description: `Calculate exactly how many calories your ${breed.name} needs daily. Free calculator with breed-specific recommendations for ${breed.name.toLowerCase()}s.`,
    keywords: `${breed.name.toLowerCase()} calorie calculator, ${breed.name.toLowerCase()} food calculator, how much to feed ${breed.name.toLowerCase()}, ${breed.name.toLowerCase()} diet, ${breed.name.toLowerCase()} nutrition`,
  };
}
