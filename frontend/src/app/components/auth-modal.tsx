import { useState } from "react";
import { X, User, Mail, Lock, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
}

export function AuthModal({ isOpen, onClose, onLogin, onSignup }: AuthModalProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoginMode) {
      onLogin(email, password);
    } else {
      onSignup(name, email, password);
    }
    
    // Reset form
    setName("");
    setEmail("");
    setPassword("");
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-black border-2 border-green-500 p-8 w-full max-w-md relative shadow-2xl shadow-green-500/20"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-green-500 hover:text-green-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <Terminal className="w-12 h-12 text-green-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-3xl font-bold text-green-500 font-mono mb-2">
                  {isLoginMode ? "LOGIN" : "REGISTER"}
                </h2>
                <p className="text-gray-400 text-sm font-mono">
                  {'>'} {isLoginMode ? "Access your account" : "Create new account"}_
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLoginMode && (
                  <div>
                    <label className="block text-green-500 mb-2 font-mono text-sm">
                      USERNAME
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500/50" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-black border border-green-500/30 text-green-500 pl-12 pr-4 py-3 focus:outline-none focus:border-green-500 transition-colors font-mono"
                        placeholder="Enter username"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-green-500 mb-2 font-mono text-sm">
                    EMAIL
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500/50" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-black border border-green-500/30 text-green-500 pl-12 pr-4 py-3 focus:outline-none focus:border-green-500 transition-colors font-mono"
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-green-500 mb-2 font-mono text-sm">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500/50" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-black border border-green-500/30 text-green-500 pl-12 pr-4 py-3 focus:outline-none focus:border-green-500 transition-colors font-mono"
                      placeholder="Enter password"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-500 text-black py-3 font-mono hover:bg-green-400 transition-all duration-300 relative overflow-hidden group mt-6"
                >
                  <span className="relative z-10">
                    {isLoginMode ? "ACCESS SYSTEM" : "CREATE ACCOUNT"}
                  </span>
                  <div className="absolute inset-0 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </button>
              </form>

              {/* Toggle Mode */}
              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm font-mono">
                  {isLoginMode ? "New user?" : "Already have an account?"}{" "}
                  <button
                    onClick={toggleMode}
                    className="text-green-500 hover:text-green-400 underline transition-colors"
                  >
                    {isLoginMode ? "Register here" : "Login here"}
                  </button>
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
