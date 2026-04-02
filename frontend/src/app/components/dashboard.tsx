import { useState } from "react";
import { 
  Shield, 
  Terminal, 
  Lock, 
  Unlock, 
  User, 
  LogOut,
  Code,
  Bug,
  Network,
  Database,
  Key,
  AlertTriangle,
  Skull,
  Users,
  BookOpen
} from "lucide-react";
import { motion } from "motion/react";

interface DashboardProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
  onNavigateToAdvancedTools?: () => void;
  onNavigateToHackerProfiles?: () => void;
  onNavigateToAdvancedTutorials?: () => void;
}

export function Dashboard({ user, onLogout, onNavigateToAdvancedTools, onNavigateToHackerProfiles, onNavigateToAdvancedTutorials }: DashboardProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const featureCards = [
    {
      id: "advanced-tools",
      title: "Advanced Tools",
      icon: <Skull className="w-12 h-12" />,
      description: "Professional penetration testing arsenal with tutorials",
      onClick: onNavigateToAdvancedTools,
      gradient: "from-red-500/20 to-orange-500/20"
    },
    {
      id: "hacker-profiles",
      title: "Hacker Profiles",
      icon: <Users className="w-12 h-12" />,
      description: "Learn from legendary hackers and their techniques",
      onClick: onNavigateToHackerProfiles,
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      id: "advanced-tutorials",
      title: "Advanced Tutorials",
      icon: <BookOpen className="w-12 h-12" />,
      description: "In-depth command-line tutorials for professionals",
      onClick: onNavigateToAdvancedTutorials,
      gradient: "from-cyan-500/20 to-blue-500/20"
    }
  ];

  const tools = [
    { 
      id: "nmap", 
      name: "Nmap", 
      icon: <Network className="w-8 h-8" />,
      description: "Network discovery and security auditing tool",
      category: "Network Scanner"
    },
    { 
      id: "metasploit", 
      name: "Metasploit", 
      icon: <Bug className="w-8 h-8" />,
      description: "Penetration testing framework",
      category: "Exploitation"
    },
    { 
      id: "wireshark", 
      name: "Wireshark", 
      icon: <Database className="w-8 h-8" />,
      description: "Network protocol analyzer",
      category: "Packet Analyzer"
    },
    { 
      id: "burpsuite", 
      name: "Burp Suite", 
      icon: <Code className="w-8 h-8" />,
      description: "Web application security testing",
      category: "Web Security"
    },
    { 
      id: "hashcat", 
      name: "Hashcat", 
      icon: <Key className="w-8 h-8" />,
      description: "Advanced password recovery",
      category: "Password Cracking"
    },
    { 
      id: "sqlmap", 
      name: "SQLMap", 
      icon: <AlertTriangle className="w-8 h-8" />,
      description: "Automated SQL injection and database takeover",
      category: "SQL Injection"
    }
  ];

  const hackers = [
    {
      name: "Kevin Mitnick",
      alias: "The Condor",
      description: "Once the FBI's most wanted, now a security consultant",
      expertise: "Social Engineering"
    },
    {
      name: "Anonymous",
      alias: "Collective",
      description: "Decentralized hacktivist group",
      expertise: "DDoS Attacks"
    },
    {
      name: "Adrian Lamo",
      alias: "The Homeless Hacker",
      description: "Known for hacking major corporations",
      expertise: "Network Penetration"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-green-500">
      {/* Header */}
      <header className="border-b border-green-500/20 px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold font-mono">ExploitX Dashboard</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 border border-green-500/30 bg-black/50">
              <User className="w-5 h-5" />
              <span className="font-mono">{user?.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all font-mono"
            >
              <LogOut className="w-5 h-5" />
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="px-8 py-12 border-b border-green-500/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-4">
            <Unlock className="w-12 h-12 text-green-500 animate-pulse" />
            <div>
              <h1 className="text-4xl font-bold font-mono mb-2">
                WELCOME BACK, <span className="text-white">{user?.name.toUpperCase()}</span>
              </h1>
              <p className="text-green-400 font-mono">
                {'>'} Full access granted. All features unlocked_
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Security Tools Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Terminal className="w-8 h-8 text-green-500" />
              <h2 className="text-3xl font-bold font-mono">SECURITY TOOLS</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedTool(tool.id)}
                  className="border border-green-500/30 bg-black/50 p-6 hover:border-green-500 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-green-500/5 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
                  
                  <div className="relative z-10">
                    <div className="text-green-500 mb-4 group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 font-mono">{tool.name}</h3>
                    <p className="text-green-500/60 text-sm mb-3 font-mono">{tool.category}</p>
                    <p className="text-gray-400 text-sm">{tool.description}</p>
                    
                    {selectedTool === tool.id && (
                      <div className="mt-4 pt-4 border-t border-green-500/30">
                        <button className="text-green-500 hover:text-green-400 text-sm font-mono">
                          {'>'} Learn more_
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <Lock className="w-4 h-4 text-green-500 opacity-0" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Famous Hackers Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <User className="w-8 h-8 text-green-500" />
              <h2 className="text-3xl font-bold font-mono">LEGENDARY HACKERS</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hackers.map((hacker, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                  className="border border-green-500/30 bg-black/50 p-6 hover:border-green-500 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1 font-mono text-white">{hacker.name}</h3>
                      <p className="text-green-500 text-sm font-mono">[{hacker.alias}]</p>
                    </div>
                    <Shield className="w-6 h-6 text-green-500 group-hover:rotate-12 transition-transform" />
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3">{hacker.description}</p>
                  
                  <div className="pt-3 border-t border-green-500/20">
                    <p className="text-green-500/60 text-xs font-mono">EXPERTISE:</p>
                    <p className="text-green-500 font-mono text-sm">{hacker.expertise}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Feature Cards Section */}
          <section className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-green-500" />
              <h2 className="text-3xl font-bold font-mono">PREMIUM FEATURES</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featureCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.9 }}
                  onClick={card.onClick}
                  className="relative border-2 border-green-500/50 bg-gradient-to-br bg-black/80 p-8 hover:border-green-400 transition-all cursor-pointer group overflow-hidden hover:shadow-[0_0_30px_rgba(0,255,0,0.3)]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  
                  <div className="relative z-10">
                    <div className="text-green-500 mb-6 group-hover:scale-110 transition-transform flex justify-center">
                      {card.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 font-mono text-center text-green-500 group-hover:text-green-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 text-sm text-center leading-relaxed">
                      {card.description}
                    </p>
                    
                    <div className="mt-6 pt-4 border-t border-green-500/30 text-center">
                      <span className="text-green-500 hover:text-green-400 text-sm font-mono group-hover:underline">
                        {'>'} EXPLORE NOW_
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-green-500/20 px-8 py-6 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-green-500/60 font-mono text-sm">
            {'>'} ExploitX Educational Platform - For learning purposes only_
          </p>
        </div>
      </footer>
    </div>
  );
}