import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useEffect, useLayoutEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Shows from "./pages/Shows";
import ShowArticle from "./pages/ShowArticle";
import HowToStartShowArticle from "./pages/HowToStartShowArticle";
import ReadTheRoom from "./pages/ReadTheRoom";

function jumpToTop() {
  const rootBehavior = document.documentElement.style.scrollBehavior;
  const bodyBehavior = document.body.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  document.body.style.scrollBehavior = "auto";
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  document.documentElement.style.scrollBehavior = rootBehavior;
  document.body.style.scrollBehavior = bodyBehavior;
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const resetSameRoute = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const destination = new URL(anchor.href, window.location.href);
      const isSameRoute = destination.origin === window.location.origin && destination.pathname === window.location.pathname && !destination.hash;
      if (isSameRoute) {
        event.preventDefault();
        event.stopPropagation();
        jumpToTop();
        window.requestAnimationFrame(jumpToTop);
        window.setTimeout(() => { anchor.blur(); jumpToTop(); }, 80);
      }
    };
    document.addEventListener("click", resetSameRoute, true);
    return () => document.removeEventListener("click", resetSameRoute, true);
  }, []);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    jumpToTop();
    const frame = window.requestAnimationFrame(jumpToTop);
    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  return null;
}


function Router() {
  return (
    <>
      <ScrollToTop />
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
    </>
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
