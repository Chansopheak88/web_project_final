import { useState } from "react";
import { Shield, Mail, Lock, Terminal, ArrowLeft, Eye, EyeOff, User } from "lucide-react";
import { motion } from "motion/react";

interface RegisterPageProps {
  onRegister: (firstName: string, lastName: string, email: string, password: string, confirmPassword: string) => void;
  onNavigateToLogin: () => void;
  onBackToHome: () => void;
}

export function RegisterPage({ onRegister, onNavigateToLogin, onBackToHome }: RegisterPageProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.trim() !== confirmPassword.trim()) {
      alert("Passwords do not match!");
      return;
    }

    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions!");
      return;
    }

    onRegister(firstName.trim(), lastName.trim(), email.trim(), password.trim(), confirmPassword.trim());
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Matrix Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-rain"></div>
      </div>

      {/* Scanline Effect */}
      <div className="scanline"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-500 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.2,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBackToHome}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors font-mono"
      >
        <ArrowLeft className="w-5 h-5" />
        BACK TO HOME
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Register Container */}
          <div className="border-2 border-green-500 bg-black p-8 md:p-12 relative">
            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-500"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-500"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-500"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-500"></div>

            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <Shield className="w-20 h-20 text-green-500" />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <Terminal className="w-20 h-20 text-green-500 opacity-30" />
                  </motion.div>
                </div>
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold text-green-500 font-mono mb-3">
                CREATE ACCOUNT
              </h1>
              <p className="text-green-400 font-mono text-sm">
                {'>'} Join the cybersecurity community_
              </p>
              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-green-500 mb-2 font-mono text-sm tracking-wider">
                  FIRST NAME
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500/50" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full bg-black border-2 border-green-500/30 text-green-500 pl-12 pr-4 py-3 focus:outline-none focus:border-green-500 transition-all font-mono placeholder-green-500/30"
                    placeholder="John"
                  />
                </div>
              </motion.div>

              {/* Last Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
              >
                <label className="block text-green-500 mb-2 font-mono text-sm tracking-wider">
                  LAST NAME
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500/50" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full bg-black border-2 border-green-500/30 text-green-500 pl-12 pr-4 py-3 focus:outline-none focus:border-green-500 transition-all font-mono placeholder-green-500/30"
                    placeholder="Doe"
                  />
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-green-500 mb-2 font-mono text-sm tracking-wider">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-black border-2 border-green-500/30 text-green-500 pl-12 pr-4 py-3 focus:outline-none focus:border-green-500 transition-all font-mono placeholder-green-500/30"
                    placeholder="user@exploitx.com"
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-green-500 mb-2 font-mono text-sm tracking-wider">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500/50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-black border-2 border-green-500/30 text-green-500 pl-12 pr-12 py-3 focus:outline-none focus:border-green-500 transition-all font-mono placeholder-green-500/30"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500/50 hover:text-green-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-green-500 mb-2 font-mono text-sm tracking-wider">
                  CONFIRM PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500/50" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-black border-2 border-green-500/30 text-green-500 pl-12 pr-12 py-3 focus:outline-none focus:border-green-500 transition-all font-mono placeholder-green-500/30"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500/50 hover:text-green-500 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Terms and Conditions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-start gap-3"
              >
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 mt-1 bg-black border-2 border-green-500/30 checked:bg-green-500 focus:ring-0"
                />
                <label htmlFor="terms" className="text-green-500/70 text-sm font-mono cursor-pointer">
                  I agree to the{" "}
                  <span className="text-green-500 underline hover:text-green-400">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-green-500 underline hover:text-green-400">
                    Privacy Policy
                  </span>
                </label>
              </motion.div>

              {/* Register Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                type="submit"
                className="w-full bg-green-500 text-black py-4 font-mono text-lg tracking-wider relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Terminal className="w-5 h-5" />
                  CREATE ACCOUNT
                </span>
                <motion.div
                  className="absolute inset-0 bg-green-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              {/* Divider */}}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-green-500/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-black text-green-500/50 font-mono">OR</span>
                </div>
              </div>

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <p className="text-gray-400 font-mono text-sm mb-4">
                  ALREADY HAVE AN ACCOUNT?
                </p>
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="w-full border-2 border-green-500 text-green-500 py-3 font-mono hover:bg-green-500 hover:text-black transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10">LOGIN TO EXISTING ACCOUNT</span>
                  <div className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </button>
              </motion.div>
            </form>

            {/* Footer Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-8 pt-6 border-t border-green-500/20"
            >
              <p className="text-green-500/40 text-xs text-center font-mono">
                {'>'} SECURE CONNECTION ESTABLISHED_
              </p>
              <p className="text-green-500/40 text-xs text-center font-mono mt-1">
                {'>'} ALL DATA ENCRYPTED WITH 256-BIT SSL_
              </p>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 text-center"
          >
            <p className="text-green-500/30 text-xs font-mono">
              © 2026 EXPLOITX - EDUCATIONAL CYBERSECURITY PLATFORM
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
