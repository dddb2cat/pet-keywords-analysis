import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { 
  Search, TrendingUp, DollarSign, BarChart2,
  Download, Share2, Info, PawPrint, Activity, Zap, ArrowLeft
} from 'lucide-react';
import { keywordData, industryBenchmarks, trendData, competitorAnalysis, KeywordData } from '@/lib/data';
import { cn } from '@/lib/utils';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [sortConfig, setSortConfig] = useState<{ key: keyof KeywordData; direction: 'asc' | 'desc' }>({
    key: 'opportunityScore',
    direction: 'desc',
  });

  const sortedData = [...keywordData].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue === undefined || bValue === undefined) return 0;
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key: keyof KeywordData) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-sans selection:bg-primary/20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
              <PawPrint className="w-8 h-8 text-primary fill-primary/20" />
              Pet Tool Keywords Research
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Strategic analysis for high-growth pet tool opportunities
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="neu-btn hover:text-primary gap-2">
              <Share2 className="w-4 h-4" /> Share Report
            </Button>
            <Button className="neu-btn bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              <Download className="w-4 h-4" /> Export Data
            </Button>
          </div>
        </header>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="neu-card p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="w-24 h-24 text-primary" />
            </div>
            <h3 className="text-muted-foreground font-medium mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Top Opportunity
            </h3>
            <p className="text-3xl font-bold text-foreground">Dog Calorie Calc</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-green-600 font-medium">
              <span className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">98/100 Score</span>
              <span>Very Low Competition (UX)</span>
            </div>
          </div>

          <div className="neu-card p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <DollarSign className="w-24 h-24 text-secondary" />
            </div>
            <h3 className="text-muted-foreground font-medium mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Industry CPC Advantage
            </h3>
            <p className="text-3xl font-bold text-foreground">-30.4%</p>
            <div className="mt-4 text-sm text-muted-foreground">
              Lower cost compared to average industry CPC ($3.13 vs $4.50)
            </div>
          </div>

          <div className="neu-card p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BarChart2 className="w-24 h-24 text-accent" />
            </div>
            <h3 className="text-muted-foreground font-medium mb-2 flex items-center gap-2">
              <Search className="w-4 h-4" /> High Volume Niche
            </h3>
            <p className="text-3xl font-bold text-foreground">Age Calculators</p>
            <div className="mt-4 text-sm text-muted-foreground">
              Combined 100k+ monthly searches for Dog & Cat age tools
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <Tabs.List className="flex gap-4 p-1 neu-inset rounded-2xl w-fit mx-auto md:mx-0">
            <Tabs.Trigger 
              value="opportunities"
              className={cn(
                "px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                "data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              Opportunity Explorer
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="trends"
              className={cn(
                "px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                "data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              Trend Analysis
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="benchmarks"
              className={cn(
                "px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                "data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              Industry Benchmarks
            </Tabs.Trigger>
          </Tabs.List>

          {/* Opportunities Tab */}
          <Tabs.Content value="opportunities" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="neu-card p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Keyword Opportunities Ranked</h2>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  <span>Score based on Volume, Difficulty & CPC</span>
                </div>
              </div>
              
              <ScrollArea.Root className="w-full overflow-x-auto">
                <ScrollArea.Viewport>
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-4 px-4 font-semibold text-muted-foreground cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('keyword')}>
                          Keyword {sortConfig.key === 'keyword' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-muted-foreground cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('opportunityScore')}>
                          Opp. Score {sortConfig.key === 'opportunityScore' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-muted-foreground cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('volume')}>
                          Volume {sortConfig.key === 'volume' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-muted-foreground cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('difficulty')}>
                          Difficulty {sortConfig.key === 'difficulty' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-muted-foreground cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('cpc')}>
                          CPC {sortConfig.key === 'cpc' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Recommendation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-primary/5 transition-colors border-b border-border/30 last:border-0">
                          <td className="py-4 px-4 font-medium text-foreground flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground font-bold">
                                {index + 1}
                              </span>
                              {item.keyword}
                              {item.trend === 'explosive' && <TrendingUp className="w-4 h-4 text-secondary" />}
                            </div>
                            {item.uxGap && (
                              <div className="ml-8 text-xs text-primary bg-primary/10 px-2 py-1 rounded-md w-fit">
                                💡 UX Opportunity: {item.uxGap}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${item.opportunityScore}%` }}
                                />
                              </div>
                              <span className="font-bold text-primary">{item.opportunityScore}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">{item.volume.toLocaleString()}</td>
                          <td className="py-4 px-4">
                            <span className={cn(
                              "px-2 py-1 rounded-lg text-xs font-medium",
                              item.difficulty < 30 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                              item.difficulty < 60 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                              "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            )}>
                              {item.difficulty}/100
                            </span>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">${item.cpc.toFixed(2)}</td>
                          <td className="py-4 px-4">
                            <span className={cn(
                              "font-medium text-sm",
                              item.recommendation === 'Start Here' ? "text-primary" :
                              item.recommendation === 'Avoid Initially' ? "text-destructive" :
                              "text-muted-foreground"
                            )}>
                              {item.recommendation}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="horizontal" className="p-0.5 bg-muted rounded-full">
                  <ScrollArea.Thumb className="bg-muted-foreground/50 rounded-full" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </div>

            {/* Competitor Analysis Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {competitorAnalysis.map((comp, i) => (
                <div key={i} className="neu-card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{comp.name}</h3>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{comp.type}</span>
                    </div>
                    <span className={cn(
                      "text-xs font-bold px-2 py-1 rounded-full",
                      comp.vulnerability === 'High' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    )}>
                      {comp.vulnerability} Vulnerability
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-green-600 mb-1">PROS</p>
                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                        {comp.pros.map((p, j) => <li key={j}>{p}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-red-600 mb-1">CONS (Your Opportunity)</p>
                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                        {comp.cons.map((c, j) => <li key={j}>{c}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Content>

          {/* Trends Tab */}
          <Tabs.Content value="trends" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="neu-card p-6 md:p-8">
                <h3 className="text-xl font-bold mb-6">Search Interest Over Time</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--background)', 
                          borderRadius: '16px', 
                          border: 'none', 
                          boxShadow: 'var(--shadow-soft-sm)' 
                        }} 
                      />
                      <Legend />
                      <Line type="monotone" dataKey="dogAge" name="Dog Age Calc" stroke="var(--chart-1)" strokeWidth={3} dot={{ r: 4, fill: 'var(--chart-1)' }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="petName" name="Pet Name Gen" stroke="var(--chart-2)" strokeWidth={3} dot={{ r: 4, fill: 'var(--chart-2)' }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="catAge" name="Cat Age Calc" stroke="var(--chart-3)" strokeWidth={3} dot={{ r: 4, fill: 'var(--chart-3)' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="neu-card p-6 md:p-8">
                <h3 className="text-xl font-bold mb-6">Growth vs Volume Matrix</h3>
                <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={keywordData.slice(0, 8)} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={true} vertical={false} />
                      <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis dataKey="keyword" type="category" width={120} stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip 
                        cursor={{ fill: 'var(--muted)' }}
                        contentStyle={{ 
                          backgroundColor: 'var(--background)', 
                          borderRadius: '16px', 
                          border: 'none', 
                          boxShadow: 'var(--shadow-soft-sm)' 
                        }} 
                      />
                      <Bar dataKey="growth" name="YoY Growth %" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </Tabs.Content>

          {/* Benchmarks Tab */}
          <Tabs.Content value="benchmarks" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="neu-card p-6 md:p-8">
                <h3 className="text-xl font-bold mb-6">Traffic Sources Distribution</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={industryBenchmarks.trafficSources}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {industryBenchmarks.trafficSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--background)', 
                          borderRadius: '16px', 
                          border: 'none', 
                          boxShadow: 'var(--shadow-soft-sm)' 
                        }} 
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="neu-card p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-6">Why Pet Tools?</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 neu-inset rounded-xl">
                    <div>
                      <p className="text-sm text-muted-foreground">Average CTR</p>
                      <p className="text-2xl font-bold text-primary">8.12%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Industry Avg</p>
                      <p className="text-lg font-medium text-muted-foreground">4.00%</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-lg text-sm font-bold">
                      +103%
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 neu-inset rounded-xl">
                    <div>
                      <p className="text-sm text-muted-foreground">Average CPC</p>
                      <p className="text-2xl font-bold text-secondary">$3.13</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Industry Avg</p>
                      <p className="text-lg font-medium text-muted-foreground">$4.50%</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-lg text-sm font-bold">
                      -30% Cost
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>

        {/* Footer */}
        <footer className="text-center text-muted-foreground py-8 border-t border-border/50">
          <p>© 2025 Pet Tool Keywords Analysis. Data sources: Google Trends, Glimpse, Industry Reports.</p>
        </footer>
      </div>
    </div>
  );
}
