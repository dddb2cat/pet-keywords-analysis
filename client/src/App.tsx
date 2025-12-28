import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import ResearchPage from "./pages/ResearchPage";
import DogCalorieCalculator from "./pages/DogCalorieCalculator";
import BreedCalorieCalculator from "./pages/BreedCalorieCalculator";
import DogAgeCalculator from "./pages/DogAgeCalculator";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={LandingPage} />
      <Route path="/research" component={ResearchPage} />
      <Route path="/calculator/dog-calorie" component={DogCalorieCalculator} />
      <Route path="/calculator/dog-age" component={DogAgeCalculator} />
      {/* Breed-specific calorie calculators for programmatic SEO */}
      <Route path="/calculator/:breed" component={BreedCalorieCalculator} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
