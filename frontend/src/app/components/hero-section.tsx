import { Shield, Lock, Terminal, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection({ onLoginClick, onBasicToolsClick }: { onLoginClick: () => void; onBasicToolsClick: () => void }) {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Matrix Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-rain"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-8 py-6 border-b border-green-500/20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Shield className="w-8 h-8 text-green-500" />
          <span className="text-2xl font-bold text-green-500 font-mono">ExploitX</span>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onLoginClick}
          className="px-6 py-2 border-2 border-green-500 text-green-500 font-mono hover:bg-green-500 hover:text-black transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">LOGIN</span>
          <div className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
        </motion.button>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-88px)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-4xl"
        >
          <div className="inline-block mb-4">
            <Terminal className="w-20 h-20 text-green-500 animate-pulse" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 font-mono">
            <span className="text-green-500">CYBER</span>
            <span className="text-white">SECURITY</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-green-400 mb-8 font-mono">
            {'>'} Explore the World of Ethical Hacking & Security Tools_
          </p>
          
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Dive into the fascinating world of cybersecurity. Learn about cutting-edge security tools, 
            legendary hackers, and techniques that protect our digital world.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLoginClick}
            className="px-8 py-4 bg-green-500 text-black font-mono text-lg relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              UNLOCK FULL ACCESS
            </span>
            <div className="absolute inset-0 bg-green-400 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </motion.button>

          <p className="text-green-500/60 text-sm mt-4 font-mono">
            * Register to access exclusive content and advanced security tutorials
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 w-full max-w-6xl"
        >
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Basic Tools"
            description="Explore fundamental cybersecurity tools available for everyone"
            locked={false}
            onClick={onBasicToolsClick}
          />
          <FeatureCard
            icon={<Terminal className="w-8 h-8" />}
            title="Advanced Tools"
            description="Access powerful advanced security tools used by professionals"
            locked={true}
            onClick={onLoginClick}
          />
          <FeatureCard
            icon={<Lock className="w-8 h-8" />}
            title="Hacker Profiles"
            description="Learn about famous hackers and their techniques"
            locked={true}
            onClick={onLoginClick}
          />
          <FeatureCard
            icon={<Terminal className="w-8 h-8" />}
            title="Advanced Tutorials"
            description="Step-by-step guides to master security concepts"
            locked={true}
            onClick={onLoginClick}
          />
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.a
          href="#rating"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-green-500 hover:text-green-400 transition-colors cursor-pointer"
        >
          <span className="font-mono text-sm">SCROLL DOWN</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.a>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  locked,
  onClick
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  locked: boolean;
  onClick?: () => void;
}) {
  return (
    <div 
      onClick={onClick}
      className="relative p-6 border border-green-500/30 bg-black/50 backdrop-blur hover:border-green-500 transition-all duration-300 group cursor-pointer"
    >
      <div className="text-green-500 mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-green-500 text-xl mb-2 font-mono">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
      
      {locked && (
        <div className="absolute top-4 right-4">
          <Lock className="w-5 h-5 text-green-500/50" />
        </div>
      )}
      
      {locked && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-center">
            <Lock className="w-10 h-10 text-green-500 mx-auto mb-2" />
            <p className="text-green-500 font-mono text-sm">Login to Unlock</p>
          </div>
        </div>
      )}
      
      {!locked && onClick && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-center">
            <Shield className="w-10 h-10 text-green-500 mx-auto mb-2" />
            <p className="text-green-500 font-mono text-sm">Click to Explore</p>
          </div>
        </div>
      )}
    </div>
  );
}