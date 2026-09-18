import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Shows from "./pages/Shows";
import ShowArticle from "./pages/ShowArticle";
import HowToStartShowArticle from "./pages/HowToStartShowArticle";
import ReadTheRoom from "./pages/ReadTheRoom";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/shows"} component={Shows} />
      <Route path={"/read-the-room"} component={ReadTheRoom} />
      <Route path={"/read-the-room/the-market-is-telling-you-what-it-wants"} component={ShowArticle} />
      <Route path={"/read-the-room/how-to-start-a-show-for-your-brand"} component={HowToStartShowArticle} />
      <Route path={"/read-the-room/which-platform-should-i-focus-on"} component={Article} />
      <Route path={"/shows/read-the-room"} component={ShowArticle} />
      <Route path={"/shows/what-is-marketing"} component={ShowArticle} />
      <Route path={"/shows/sgnl-ceo"} component={ShowArticle} />
      <Route path={"/articles/how-to-start-a-show-for-your-brand"} component={HowToStartShowArticle} />
      <Route path={"/article"} component={Article} />
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
