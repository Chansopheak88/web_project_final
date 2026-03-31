import { useState } from "react";
import { Shield, ChevronDown, ChevronUp, Terminal, ArrowLeft, Network, Lock, Key, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BasicToolsPageProps {
  onBackToHome: () => void;
}

interface Tool {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  history: string;
  whenToUse: string[];
  advantages: string[];
  disadvantages: string[];
  steps: string[];
}

export function BasicToolsPage({ onBackToHome }: BasicToolsPageProps) {
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const tools: Tool[] = [
    {
      id: "angry-ip",
      name: "Angry IP Scanner",
      category: "Network Discovery & Scanning",
      icon: <Network className="w-12 h-12" />,
      history: "Angry IP Scanner was created in 2002 by Anton Keks as a fast and simple IP address and port scanner. It's open-source and cross-platform, designed to scan IP addresses and ports quickly. The tool has gained popularity due to its simplicity and effectiveness in network discovery tasks.",
      whenToUse: [
        "When you need to scan a local network to discover active devices",
        "To identify all devices connected to your network",
        "For network inventory and asset management",
        "To check which IP addresses are alive in a given range",
        "For basic security auditing of your network",
        "When setting up or troubleshooting network configurations"
      ],
      advantages: [
        "Extremely fast scanning speed",
        "Cross-platform (Windows, Mac, Linux)",
        "Simple and intuitive user interface",
        "Free and open-source",
        "Can export results to various formats (CSV, TXT, XML)",
        "Lightweight and doesn't require installation",
        "Can ping IP addresses and scan ports",
        "Multi-threaded for faster performance"
      ],
      disadvantages: [
        "Limited advanced features compared to professional tools",
        "Basic port scanning capabilities only",
        "No built-in vulnerability assessment",
        "Can be blocked by firewalls easily",
        "May trigger security alerts on monitored networks",
        "Not suitable for stealth scanning",
        "Limited customization options for advanced users"
      ],
      steps: [
        "Download and install Angry IP Scanner from the official website",
        "Launch the application on your computer",
        "Enter the IP range you want to scan (e.g., 192.168.1.1 to 192.168.1.254)",
        "Configure scan settings: Choose which ports to scan (optional)",
        "Click the 'Start' button to begin scanning",
        "Wait for the scan to complete - active IPs will be highlighted",
        "Review the results showing alive hosts, hostnames, and open ports",
        "Export results if needed using File > Export menu",
        "Analyze the discovered devices and their information",
        "Use the gathered information for network documentation or troubleshooting"
      ]
    },
    {
      id: "wireshark",
      name: "Wireshark",
      category: "Network Discovery & Scanning",
      icon: <Eye className="w-12 h-12" />,
      history: "Wireshark began in 1998 as Ethereal, created by Gerald Combs. It was renamed to Wireshark in 2006. It's the world's most popular network protocol analyzer, used by network professionals, security experts, and educators worldwide. The tool has become the de facto standard for deep inspection of network traffic.",
      whenToUse: [
        "When troubleshooting network connectivity issues",
        "To analyze network traffic and protocols",
        "For detecting network security problems and intrusions",
        "When learning about network protocols and communications",
        "To capture and analyze packets for forensic analysis",
        "For monitoring network performance and bandwidth usage",
        "When debugging network applications",
        "To verify proper implementation of network protocols"
      ],
      advantages: [
        "Deep inspection of hundreds of protocols",
        "Real-time capture and offline analysis",
        "Cross-platform support (Windows, Mac, Linux)",
        "Rich filtering and search capabilities",
        "Powerful display filters for data analysis",
        "Can decrypt SSL/TLS traffic (with proper keys)",
        "Free and open-source with active community",
        "Extensive documentation and tutorials available",
        "Export captured data in various formats"
      ],
      disadvantages: [
        "Steep learning curve for beginners",
        "Can be overwhelming with too much information",
        "Requires elevated privileges to capture packets",
        "Large capture files can slow down analysis",
        "Cannot decrypt traffic without proper keys",
        "May miss packets on high-speed networks",
        "Illegal to use on networks without permission",
        "Complex interface can intimidate new users"
      ],
      steps: [
        "Download and install Wireshark from wireshark.org",
        "Launch Wireshark with administrator/root privileges",
        "Select the network interface you want to monitor from the list",
        "Click the blue shark fin icon to start capturing packets",
        "Let it run while you perform the network activity you want to analyze",
        "Click the red stop button to stop the capture",
        "Use display filters to narrow down the packets (e.g., 'http', 'tcp.port==80')",
        "Select a packet to view detailed information in the bottom panes",
        "Right-click packets for additional options like 'Follow TCP Stream'",
        "Save your capture using File > Save As for later analysis",
        "Use Statistics menu for various traffic analysis reports"
      ]
    },
    {
      id: "openssl",
      name: "OpenSSL",
      category: "Encryption",
      icon: <Lock className="w-12 h-12" />,
      history: "OpenSSL originated from SSLeay library created by Eric Young and Tim Hudson in 1995. The OpenSSL project was officially started in 1998 to continue the development. It has become the most widely used library for implementing SSL/TLS protocols and is a critical component of internet security infrastructure.",
      whenToUse: [
        "When you need to generate SSL/TLS certificates",
        "To encrypt and decrypt files and data",
        "For testing SSL/TLS connections and configurations",
        "When creating cryptographic keys and certificates",
        "To verify certificate chains and validity",
        "For implementing secure communications in applications",
        "When converting between different certificate formats",
        "To generate secure random passwords and keys"
      ],
      advantages: [
        "Industry standard for SSL/TLS implementation",
        "Supports a wide range of cryptographic algorithms",
        "Free and open-source",
        "Cross-platform compatibility",
        "Command-line tools for various cryptographic operations",
        "Well-documented and widely supported",
        "Can be integrated into applications via libraries",
        "Regular security updates and maintenance",
        "Trusted by major organizations worldwide"
      ],
      disadvantages: [
        "Command-line interface can be complex for beginners",
        "Confusing syntax for many commands",
        "Past security vulnerabilities (e.g., Heartbleed)",
        "Poor error messages that are hard to understand",
        "Documentation can be difficult to navigate",
        "Requires understanding of cryptographic concepts",
        "No graphical user interface by default",
        "Misconfiguration can lead to security issues"
      ],
      steps: [
        "Install OpenSSL on your system (comes pre-installed on Linux/Mac)",
        "Open terminal or command prompt",
        "To generate a private key: 'openssl genrsa -out private.key 2048'",
        "To create a certificate signing request: 'openssl req -new -key private.key -out request.csr'",
        "Fill in the required information (country, organization, etc.)",
        "To generate a self-signed certificate: 'openssl x509 -req -days 365 -in request.csr -signkey private.key -out certificate.crt'",
        "To encrypt a file: 'openssl enc -aes-256-cbc -in file.txt -out file.enc'",
        "To decrypt a file: 'openssl enc -d -aes-256-cbc -in file.enc -out file.txt'",
        "To check certificate information: 'openssl x509 -in certificate.crt -text -noout'",
        "To test SSL connection: 'openssl s_client -connect example.com:443'"
      ]
    },
    {
      id: "hashcat",
      name: "Hashcat",
      category: "Password Security",
      icon: <Key className="w-12 h-12" />,
      history: "Hashcat was first released in 2009 by Jens Steube (atom). It quickly became the world's fastest password recovery tool. Hashcat supports over 300 hash types and uses GPU acceleration to achieve incredible cracking speeds. It's widely used by security professionals for password auditing and penetration testing.",
      whenToUse: [
        "When performing password security audits",
        "To test the strength of hashed passwords",
        "For recovering lost or forgotten passwords (ethical use only)",
        "When conducting penetration testing with proper authorization",
        "To demonstrate weak password policies to organizations",
        "For forensic analysis of password hashes",
        "When educating about password security best practices",
        "To benchmark GPU performance for cryptographic operations"
      ],
      advantages: [
        "World's fastest password cracking tool",
        "Supports over 300 different hash algorithms",
        "GPU acceleration for incredible speed",
        "Open-source and actively maintained",
        "Cross-platform support (Windows, Linux, macOS)",
        "Multiple attack modes (dictionary, brute-force, hybrid)",
        "Can use multiple GPUs simultaneously",
        "Rule-based password generation",
        "Supports distributed cracking across multiple systems"
      ],
      disadvantages: [
        "Requires powerful GPU hardware for best performance",
        "Steep learning curve with complex syntax",
        "Can be misused for illegal activities",
        "High power consumption during operation",
        "May overheat hardware if not properly cooled",
        "Legal and ethical concerns if misused",
        "Expensive hardware required for optimal performance",
        "Command-line only, no GUI"
      ],
      steps: [
        "Download and install Hashcat from hashcat.net",
        "Install appropriate GPU drivers (NVIDIA CUDA or AMD ROCm)",
        "Prepare a file with password hashes you want to crack (hash.txt)",
        "Prepare or download a wordlist (e.g., rockyou.txt)",
        "Open terminal and navigate to Hashcat directory",
        "Identify hash type using 'hashcat --example-hashes' or online tools",
        "Run basic dictionary attack: 'hashcat -m [hash-type] -a 0 hash.txt wordlist.txt'",
        "For brute-force: 'hashcat -m [hash-type] -a 3 hash.txt ?a?a?a?a?a?a'",
        "Monitor progress - Hashcat shows speed and estimated time",
        "Check cracked passwords in hashcat.potfile or use --show flag",
        "Use rules for advanced attacks: 'hashcat -m [hash-type] -a 0 hash.txt wordlist.txt -r rules/best64.rule'"
      ]
    }
  ];

  const toggleTool = (toolId: string) => {
    setExpandedTool(expandedTool === toolId ? null : toolId);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Matrix Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-rain"></div>
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
      <div className="relative z-10 px-4 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <Shield className="w-20 h-20 text-green-500" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-green-500 font-mono mb-4">
              BASIC CYBERSECURITY TOOLS
            </h1>
            <p className="text-green-400 font-mono text-lg">
              {"> Essential tools for network security and analysis_"}
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
          </motion.div>

          {/* Tools List */}
          <div className="space-y-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="border-2 border-green-500/30 bg-black/80 backdrop-blur hover:border-green-500 transition-all"
              >
                {/* Tool Header - Always Visible */}
                <div
                  onClick={() => toggleTool(tool.id)}
                  className="p-6 cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-green-500 group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-green-500 font-mono group-hover:text-green-400 transition-colors">
                        {tool.name}
                      </h2>
                      <p className="text-green-500/60 font-mono text-sm mt-1">
                        {tool.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-green-500 group-hover:text-green-400 transition-all">
                    {expandedTool === tool.id ? (
                      <ChevronUp className="w-8 h-8" />
                    ) : (
                      <ChevronDown className="w-8 h-8 animate-bounce" />
                    )}
                  </div>
                </div>

                {/* Tool Details - Expandable */}
                <AnimatePresence>
                  {expandedTool === tool.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t-2 border-green-500/30"
                    >
                      <div className="p-6 space-y-8">
                        {/* History */}
                        <div>
                          <h3 className="text-xl font-bold text-green-500 font-mono mb-3 flex items-center gap-2">
                            <Terminal className="w-5 h-5" />
                            HISTORY
                          </h3>
                          <p className="text-gray-300 leading-relaxed">{tool.history}</p>
                        </div>

                        {/* When to Use */}
                        <div>
                          <h3 className="text-xl font-bold text-green-500 font-mono mb-3 flex items-center gap-2">
                            <Terminal className="w-5 h-5" />
                            WHEN SHOULD WE USE IT
                          </h3>
                          <ul className="space-y-2">
                            {tool.whenToUse.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="text-green-500 font-mono mt-1">{">"}</span>
                                <span className="text-gray-300">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Advantages */}
                        <div>
                          <h3 className="text-xl font-bold text-green-500 font-mono mb-3 flex items-center gap-2">
                            <Terminal className="w-5 h-5" />
                            ADVANTAGES
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {tool.advantages.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3 border border-green-500/20 bg-green-500/5 p-3">
                                <span className="text-green-500 font-mono">+</span>
                                <span className="text-gray-300 text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Disadvantages */}
                        <div>
                          <h3 className="text-xl font-bold text-green-500 font-mono mb-3 flex items-center gap-2">
                            <Terminal className="w-5 h-5" />
                            DISADVANTAGES
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {tool.disadvantages.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3 border border-red-500/20 bg-red-500/5 p-3">
                                <span className="text-red-500 font-mono">-</span>
                                <span className="text-gray-300 text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Step by Step */}
                        <div>
                          <h3 className="text-xl font-bold text-green-500 font-mono mb-3 flex items-center gap-2">
                            <Terminal className="w-5 h-5" />
                            STEP-BY-STEP USAGE GUIDE
                          </h3>
                          <div className="space-y-3">
                            {tool.steps.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-4 border-l-2 border-green-500 pl-4 py-2">
                                <span className="text-green-500 font-mono font-bold min-w-[2rem]">
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                                <span className="text-gray-300">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Warning Note */}
                        <div className="border-2 border-yellow-500/30 bg-yellow-500/5 p-4">
                          <p className="text-yellow-500 font-mono text-sm">
                            <span className="font-bold">⚠ WARNING:</span> Always use these tools ethically and legally. 
                            Only scan or test systems you own or have explicit permission to test. 
                            Unauthorized access is illegal and punishable by law.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="border-t border-green-500/20 pt-8">
              <p className="text-green-500/60 font-mono text-sm">
                {"> These tools are provided for educational purposes only_"}
              </p>
              <p className="text-green-500/40 font-mono text-xs mt-2">
                © 2026 EXPLOITX - EDUCATIONAL CYBERSECURITY PLATFORM
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
