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
  id?: number;
  name: string;
  email: string;
  authProvider?: "local" | "google";
  avatarUrl?: string | null;
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
    fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Invalid email or password");
        }

        const userData: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          authProvider: data.user.authProvider,
          avatarUrl: data.user.avatarUrl ?? null,
        };

        setUser(userData);
        localStorage.setItem("exploitXUser", JSON.stringify(userData));
        setCurrentPage("dashboard");

        toast.success(`Welcome back, ${data.user.name}! 🔓`, {
          description: "All features have been unlocked.",
          duration: 3000,
        });
      })
      .catch((error) => {
        toast.error("Access Denied", {
          description: error.message || "Invalid email or password. Please try again.",
          duration: 3000,
        });
      });
  };

  const handleGoogleLogin = async (credential: string) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ credential }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Google authentication failed");
      }

      const userData: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        authProvider: data.user.authProvider,
        avatarUrl: data.user.avatarUrl ?? null,
      };

      setUser(userData);
      localStorage.setItem("exploitXUser", JSON.stringify(userData));
      setCurrentPage("dashboard");

      toast.success(`Welcome, ${data.user.name}! ✅`, {
        description: "Signed in with Google successfully.",
        duration: 3000,
      });
    } catch (error: any) {
      toast.error("Google Sign-In Failed", {
        description: error.message || "Please try again.",
        duration: 3000,
      });
    }
  };

  const handleRegister = async (name: string, email: string, password: string, confirmPassword: string) => {
    console.log("Attempting registration with:", { name, email, password, confirmPassword });
    if (password !== confirmPassword) {
      toast.error("Registration Failed", {
        description: "Passwords do not match.",
        duration: 3000,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/v1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          user_name: name,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Assuming backend returns { message: string } on error
        toast.error("Registration Failed", {
          description: data.message || "Something went wrong",
          duration: 3000,
        });
        return;
      }

      // Auto-login on successful registration
      const userData = { name, email };
      setUser(userData);
      localStorage.setItem("exploitXUser", JSON.stringify(userData));
      setCurrentPage("dashboard");

      toast.success(`Account Created, ${name}! 🎉`, {
        description: "You now have full access to all features.",
        duration: 3000,
      });
    } catch (error: any) {
      toast.error("Registration Failed", {
        description: error.message || "Network error",
        duration: 3000,
      });
    }
  };

  const handleLogout = () => {
    fetch("http://localhost:4000/api/v1/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => {});

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
          onGoogleLogin={handleGoogleLogin}
          onNavigateToRegister={() => setCurrentPage("register")}
          onBackToHome={() => setCurrentPage("home")}
        />
      )}

      {currentPage === "register" && (
        <RegisterPage
          onRegister={handleRegister}
          onGoogleLogin={handleGoogleLogin}
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
