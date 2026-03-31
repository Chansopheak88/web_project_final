import { useState, useEffect } from "react";
import { HeroSection } from "./components/hero-section";
import { LoginPage } from "./components/login-page";
import { RegisterPage } from "./components/register-page";
import { Dashboard } from "./components/dashboard";
import { BasicToolsPage } from "./components/basic-tools-page";
import { AdvancedToolsPage } from "./components/advanced-tools-page";
import { HackerProfilesPage } from "./components/hacker-profiles-page";
import { AdvancedTutorialsPage } from "./components/advanced-tutorials-page";
import { RatingSection, ForumSection, AboutSection, ContactSection } from "./components/landing-sections";
import { toast , Toaster} from "sonner";

interface User {
  name: string;
  email: string;
}

type PageView = "home" | "login" | "register" | "dashboard" | "basic-tools" | "advanced-tools" | "hacker-profiles" | "advanced-tutorials";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>("home");
  const [user, setUser] = useState<User | null>(null);

  // Check for saved user in localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("exploitXUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage("dashboard");
    }
  }, []);

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLogin = (email: string, password: string) => {
    // Mock login - In production, this would validate against a backend
    const savedUsers = JSON.parse(localStorage.getItem("exploitXUsers") || "[]");
    const foundUser = savedUsers.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { name: foundUser.name, email: foundUser.email };
      setUser(userData);
      localStorage.setItem("exploitXUser", JSON.stringify(userData));
      setCurrentPage("dashboard");
      toast.success(`Welcome back, ${foundUser.name}! 🔓`, {
        description: "All features have been unlocked.",
        duration: 3000,
      });
    } else {
      toast.error("Access Denied", {
        description: "Invalid email or password. Please try again.",
        duration: 3000,
      });
    }
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Mock signup - In production, this would save to a backend
    const savedUsers = JSON.parse(localStorage.getItem("exploitXUsers") || "[]");
    
    // Check if user already exists
    if (savedUsers.some((u: any) => u.email === email)) {
      toast.error("Registration Failed", {
        description: "An account with this email already exists.",
        duration: 3000,
      });
      return;
    }
    
    // Save new user
    const newUser = { name, email, password };
    savedUsers.push(newUser);
    localStorage.setItem("exploitXUsers", JSON.stringify(savedUsers));
    
    // Auto-login
    const userData = { name, email };
    setUser(userData);
    localStorage.setItem("exploitXUser", JSON.stringify(userData));
    setCurrentPage("dashboard");
    
    toast.success(`Account Created, ${name}! 🎉`, {
      description: "You now have full access to all features.",
      duration: 3000,
    });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("exploitXUser");
    setCurrentPage("home");
    toast.success("Logged Out Successfully", {
      description: "See you next time!",
      duration: 3000,
    });
  };

  return (
    <>
      <Toaster 
        position="top-right" 
        theme="dark"
        toastOptions={{
          style: {
            background: '#000',
            border: '1px solid #00ff00',
            color: '#00ff00',
            fontFamily: 'monospace',
          },
        }}
      />
      
      {currentPage === "home" && (
        <div className="bg-black">
          <HeroSection onLoginClick={() => setCurrentPage("login")} onBasicToolsClick={() => setCurrentPage("basic-tools")} />
          <RatingSection />
          <ForumSection />
          <AboutSection />
          <ContactSection />
          
          {/* Footer */}
          <footer className="border-t border-green-500/20 px-8 py-8 bg-black">
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-green-500/60 font-mono text-sm mb-2">
                {'>'} ExploitX - Educational Cybersecurity Platform_
              </p>
              <p className="text-gray-600 text-xs">
                © 2026 ExploitX. For educational purposes only. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      )}

      {currentPage === "login" && (
        <LoginPage
          onLogin={handleLogin}
          onNavigateToRegister={() => setCurrentPage("register")}
          onBackToHome={() => setCurrentPage("home")}
        />
      )}

      {currentPage === "register" && (
        <RegisterPage
          onRegister={handleRegister}
          onNavigateToLogin={() => setCurrentPage("login")}
          onBackToHome={() => setCurrentPage("home")}
        />
      )}

      {currentPage === "basic-tools" && (
        <BasicToolsPage onBackToHome={() => setCurrentPage("home")} />
      )}

      {currentPage === "advanced-tools" && (
        <AdvancedToolsPage onBackToDashboard={() => setCurrentPage("dashboard")} />
      )}

      {currentPage === "hacker-profiles" && (
        <HackerProfilesPage onBackToDashboard={() => setCurrentPage("dashboard")} />
      )}

      {currentPage === "advanced-tutorials" && (
        <AdvancedTutorialsPage onBackToDashboard={() => setCurrentPage("dashboard")} />
      )}

      {currentPage === "dashboard" && user && (
        <Dashboard 
          user={user} 
          onLogout={handleLogout}
          onNavigateToAdvancedTools={() => setCurrentPage("advanced-tools")}
          onNavigateToHackerProfiles={() => setCurrentPage("hacker-profiles")}
          onNavigateToAdvancedTutorials={() => setCurrentPage("advanced-tutorials")}
        />
      )}
    </>
  );
}