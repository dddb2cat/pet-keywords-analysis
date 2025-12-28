export interface KeywordData {
  id: string;
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  trend: 'stable' | 'rising' | 'explosive';
  growth: number;
  opportunityScore: number;
  category: 'calculator' | 'generator' | 'health' | 'other';
  recommendation: string;
  uxGap?: string; // New field for UX opportunity
}

export const keywordData: KeywordData[] = [
  {
    id: '1',
    keyword: 'dog calorie calculator',
    volume: 5500,
    difficulty: 10,
    cpc: 0.85,
    trend: 'rising',
    growth: 15,
    opportunityScore: 98, // Increased score due to UX gap
    category: 'calculator',
    recommendation: 'Start Here',
    uxGap: 'Existing tools are too medical/complex. Opportunity for "Human-Language" UI.'
  },
  {
    id: '2',
    keyword: 'puppy weight calculator',
    volume: 7500,
    difficulty: 15,
    cpc: 0.55,
    trend: 'rising',
    growth: 20,
    opportunityScore: 92,
    category: 'calculator',
    recommendation: 'Start Here',
    uxGap: 'Competitors lack breed-specific growth curves.'
  },
  {
    id: '3',
    keyword: 'cat age calculator months',
    volume: 8000,
    difficulty: 25,
    cpc: 0.45,
    trend: 'rising',
    growth: 22,
    opportunityScore: 90,
    category: 'calculator',
    recommendation: 'Start Here'
  },
  {
    id: '4',
    keyword: 'small dog age calculator',
    volume: 2500,
    difficulty: 12,
    cpc: 0.60,
    trend: 'explosive',
    growth: 40,
    opportunityScore: 88,
    category: 'calculator',
    recommendation: 'Start Here'
  },
  {
    id: '5',
    keyword: 'real dog age calculator',
    volume: 3200,
    difficulty: 14,
    cpc: 0.50,
    trend: 'explosive',
    growth: 60,
    opportunityScore: 87,
    category: 'calculator',
    recommendation: 'Start Here'
  },
  {
    id: '6',
    keyword: 'cat age calculator',
    volume: 32500,
    difficulty: 35,
    cpc: 0.65,
    trend: 'stable',
    growth: 5,
    opportunityScore: 82,
    category: 'calculator',
    recommendation: 'Good Choice'
  },
  {
    id: '7',
    keyword: 'dog food calculator',
    volume: 20000,
    difficulty: 28,
    cpc: 1.40,
    trend: 'stable',
    growth: 8,
    opportunityScore: 80,
    category: 'calculator',
    recommendation: 'Good Choice'
  },
  {
    id: '8',
    keyword: 'pet food calculator',
    volume: 15000,
    difficulty: 22,
    cpc: 1.05,
    trend: 'stable',
    growth: 6,
    opportunityScore: 78,
    category: 'calculator',
    recommendation: 'Good Choice'
  },
  {
    id: '9',
    keyword: 'dog weight calculator',
    volume: 11500,
    difficulty: 20,
    cpc: 0.70,
    trend: 'stable',
    growth: 4,
    opportunityScore: 76,
    category: 'calculator',
    recommendation: 'Good Choice'
  },
  {
    id: '10',
    keyword: 'pet name generator fantasy',
    volume: 1800,
    difficulty: 25,
    cpc: 0.40,
    trend: 'explosive',
    growth: 40,
    opportunityScore: 75,
    category: 'generator',
    recommendation: 'Good Choice'
  },
  {
    id: '11',
    keyword: 'dog age calculator',
    volume: 50000,
    difficulty: 45,
    cpc: 1.00,
    trend: 'stable',
    growth: 10,
    opportunityScore: 70,
    category: 'calculator',
    recommendation: 'Competitive'
  },
  {
    id: '12',
    keyword: 'pet name generator',
    volume: 40000,
    difficulty: 48,
    cpc: 0.80,
    trend: 'stable',
    growth: 5,
    opportunityScore: 68,
    category: 'generator',
    recommendation: 'Competitive'
  },
  {
    id: '13',
    keyword: 'cat years to human years',
    volume: 27500,
    difficulty: 38,
    cpc: 0.50,
    trend: 'stable',
    growth: 3,
    opportunityScore: 65,
    category: 'calculator',
    recommendation: 'Competitive'
  },
  {
    id: '14',
    keyword: 'pet insurance calculator',
    volume: 8500,
    difficulty: 70,
    cpc: 20.00,
    trend: 'stable',
    growth: 12,
    opportunityScore: 35,
    category: 'calculator',
    recommendation: 'Avoid Initially'
  },
  {
    id: '15',
    keyword: 'vet cost calculator',
    volume: 1200,
    difficulty: 65,
    cpc: 15.00,
    trend: 'stable',
    growth: 2,
    opportunityScore: 40,
    category: 'calculator',
    recommendation: 'Avoid Initially'
  }
];

export const industryBenchmarks = {
  cpc: {
    pet: 3.13,
    average: 4.50,
    diff: -30.4
  },
  ctr: {
    pet: 8.12,
    average: 4.00,
    diff: 103
  },
  trafficSources: [
    { name: 'Direct', value: 50.34, fill: 'var(--color-primary)' },
    { name: 'Organic Search', value: 26.64, fill: 'var(--color-secondary)' },
    { name: 'Paid Search', value: 14.02, fill: 'var(--color-accent)' },
    { name: 'Referrals', value: 3.16, fill: 'var(--color-muted-foreground)' },
    { name: 'Social', value: 2.18, fill: 'var(--color-destructive)' },
    { name: 'Email', value: 2.03, fill: 'var(--color-chart-5)' }
  ]
};

export const trendData = [
  { month: 'Jan', dogAge: 65, petName: 55, catAge: 30 },
  { month: 'Feb', dogAge: 58, petName: 52, catAge: 32 },
  { month: 'Mar', dogAge: 62, petName: 58, catAge: 28 },
  { month: 'Apr', dogAge: 70, petName: 60, catAge: 35 },
  { month: 'May', dogAge: 68, petName: 55, catAge: 33 },
  { month: 'Jun', dogAge: 75, petName: 62, catAge: 38 },
  { month: 'Jul', dogAge: 82, petName: 65, catAge: 40 },
  { month: 'Aug', dogAge: 78, petName: 68, catAge: 36 },
  { month: 'Sep', dogAge: 85, petName: 70, catAge: 42 },
  { month: 'Oct', dogAge: 90, petName: 72, catAge: 45 },
  { month: 'Nov', dogAge: 95, petName: 75, catAge: 48 },
  { month: 'Dec', dogAge: 100, petName: 78, catAge: 50 },
];

export const competitorAnalysis = [
  {
    name: 'Pet Nutrition Alliance',
    type: 'Authority',
    pros: ['Highly authoritative', 'Comprehensive inputs'],
    cons: ['Complex "Medical" UI', 'Requires BCS knowledge', 'Not mobile-friendly'],
    vulnerability: 'High'
  },
  {
    name: 'Vet Calculators',
    type: 'Tool Aggregator',
    pros: ['Functional', 'Quick calculation'],
    cons: ['Ad-heavy', 'Outdated design', 'Confusing flow'],
    vulnerability: 'Medium'
  },
  {
    name: 'Purina Institute',
    type: 'Brand',
    pros: ['Clean design', 'Simple inputs'],
    cons: ['Hard to find', 'Generic results', 'Brand bias'],
    vulnerability: 'Medium'
  }
];
