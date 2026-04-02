import { useState } from "react";
import { Shield, ChevronDown, ChevronUp, Terminal, ArrowLeft, Skull, Globe, Lock as LockIcon, Zap, Code } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdvancedToolsPageProps {
  onBackToDashboard: () => void;
}

interface Tool {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  tutorial: {
    title: string;
    steps: string[];
  };
  riskLevel: "High" | "Medium" | "Critical";
  isComingSoon?: boolean;
}

export function AdvancedToolsPage({ onBackToDashboard }: AdvancedToolsPageProps) {
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const tools: Tool[] = [
    {
      id: "metasploit",
      name: "Metasploit Framework",
      category: "Penetration Testing",
      icon: <Skull className="w-12 h-12" />,
      riskLevel: "Critical",
      description: "The world's most used penetration testing framework. Metasploit is a powerful platform for developing, testing, and executing exploit code against remote target machines. It's the ultimate tool for security professionals and penetration testers.",
      features: [
        "Exploit development and execution",
        "Payload generation and encoding",
        "Post-exploitation modules",
        "Vulnerability scanning integration",
        "Network enumeration tools",
        "Meterpreter advanced payload",
        "Database of 2000+ exploits",
        "Automated exploitation workflows",
        "Custom module development",
        "Social engineering toolkit integration"
      ],
      tutorial: {
        title: "Basic Penetration Testing Tutorial",
        steps: [
          "Launch Metasploit: Open terminal and type 'msfconsole'",
          "Search for exploits: Use 'search [vulnerability]' to find relevant exploits",
          "Select an exploit: Type 'use exploit/[path/to/exploit]'",
          "View required options: Enter 'show options' to see what needs configuration",
          "Set target host: 'set RHOSTS [target-ip]' to specify your target",
          "Set payload: 'set PAYLOAD [payload-type]' for what to execute on target",
          "Configure LHOST: 'set LHOST [your-ip]' for reverse connections",
          "Verify settings: Use 'show options' again to confirm all required fields are set",
          "Launch exploit: Type 'exploit' or 'run' to execute the attack",
          "Interact with session: If successful, you'll get a Meterpreter or shell session",
          "Post-exploitation: Use commands like 'sysinfo', 'getuid', 'screenshot' to gather intel",
          "Clean exit: Type 'exit' to close session and 'quit' to leave Metasploit"
        ]
      }
    },
    {
      id: "burpsuite",
      name: "Burp Suite Professional",
      category: "Web Application Security",
      icon: <Globe className="w-12 h-12" />,
      riskLevel: "High",
      description: "The gold standard for web application security testing. Burp Suite is an integrated platform for performing security testing of web applications. It intercepts traffic between your browser and target applications, allowing deep inspection and manipulation.",
      features: [
        "Intercepting proxy for HTTP/HTTPS traffic",
        "Automated web vulnerability scanner",
        "Spider/crawler for mapping applications",
        "Intruder tool for automated attacks",
        "Repeater for manual request manipulation",
        "Sequencer for session token analysis",
        "Decoder for encoding/decoding data",
        "Comparer for visual diff analysis",
        "Extensions marketplace (BApp Store)",
        "Collaborative testing features"
      ],
      tutorial: {
        title: "Web App Security Testing Tutorial",
        steps: [
          "Configure browser proxy: Set your browser to use proxy 127.0.0.1:8080",
          "Launch Burp Suite: Start the application and go to 'Proxy' tab",
          "Enable interception: Click 'Intercept is on' to start capturing traffic",
          "Browse target site: Navigate to the web application you want to test",
          "View intercepted requests: Each request will appear in Burp for inspection",
          "Modify requests: Change parameters, headers, or body content before forwarding",
          "Send to Repeater: Right-click interesting requests and 'Send to Repeater'",
          "Test SQL injection: In Repeater, add SQL payloads like ' OR '1'='1 to parameters",
          "Test XSS: Try <script>alert(1)</script> in input fields",
          "Use Intruder: Send request to Intruder and mark parameters with § symbols",
          "Load payloads: Add wordlists or custom payloads for brute force/fuzzing",
          "Start attack: Click 'Start attack' and analyze responses for vulnerabilities",
          "Run Scanner: Right-click target and 'Scan' for automated vulnerability detection",
          "Review findings: Check 'Target' > 'Issue activity' for discovered vulnerabilities"
        ]
      }
    },
    {
      id: "nmap",
      name: "Nmap (Advanced)",
      category: "Network Reconnaissance",
      icon: <Zap className="w-12 h-12" />,
      riskLevel: "Medium",
      description: "The network mapper - advanced edition. Nmap is much more than a port scanner. It's a comprehensive network discovery and security auditing tool used by penetration testers worldwide. Master advanced techniques for stealth scanning, OS detection, and vulnerability assessment.",
      features: [
        "Advanced port scanning techniques",
        "OS detection and fingerprinting",
        "Service version detection",
        "NSE (Nmap Scripting Engine) with 600+ scripts",
        "Firewall/IDS evasion techniques",
        "Timing and performance optimization",
        "IPv6 scanning capabilities",
        "Vulnerability detection scripts",
        "Network topology mapping",
        "Custom script development"
      ],
      tutorial: {
        title: "Advanced Network Scanning Tutorial",
        steps: [
          "Basic scan: 'nmap [target-ip]' scans top 1000 ports",
          "Scan all ports: 'nmap -p- [target-ip]' scans all 65535 ports",
          "Service detection: 'nmap -sV [target-ip]' identifies service versions",
          "OS detection: 'nmap -O [target-ip]' attempts to identify operating system",
          "Aggressive scan: 'nmap -A [target-ip]' enables OS detection, version detection, script scanning",
          "Stealth SYN scan: 'nmap -sS [target-ip]' performs half-open scan (requires root)",
          "UDP scan: 'nmap -sU [target-ip]' scans UDP ports (slower but important)",
          "Scan multiple hosts: 'nmap 192.168.1.1-254' or 'nmap 192.168.1.0/24'",
          "Use NSE scripts: 'nmap --script=vuln [target-ip]' runs vulnerability scripts",
          "Evade firewalls: 'nmap -f -D RND:10 [target-ip]' fragments packets and uses decoys",
          "Timing template: 'nmap -T4 [target-ip]' for faster scanning (T0-T5 range)",
          "Output to file: 'nmap -oN output.txt [target-ip]' saves results",
          "Specific scripts: 'nmap --script=http-enum [target-ip]' for web enumeration",
          "Script arguments: 'nmap --script=mysql-brute --script-args userdb=users.txt [target-ip]'"
        ]
      }
    },
    {
      id: "sqlmap",
      name: "SQLMap",
      category: "Database Exploitation",
      icon: <Code className="w-12 h-12" />,
      riskLevel: "Critical",
      description: "Automated SQL injection and database takeover tool. SQLMap automates the process of detecting and exploiting SQL injection flaws. It can fingerprint databases, extract data, access the underlying file system, and even execute commands on the operating system.",
      features: [
        "Automatic SQL injection detection",
        "Support for MySQL, PostgreSQL, Oracle, MSSQL, SQLite",
        "Database fingerprinting",
        "Data extraction and dumping",
        "File system access capabilities",
        "Operating system command execution",
        "Out-of-band connection support",
        "WAF/IPS evasion techniques",
        "Custom injection points",
        "Multi-threading for faster testing"
      ],
      tutorial: {
        title: "SQL Injection Exploitation Tutorial",
        steps: [
          "Basic test: 'sqlmap -u \"http://target.com/page?id=1\"' tests for SQL injection",
          "Identify databases: 'sqlmap -u [URL] --dbs' lists all databases",
          "Select database: 'sqlmap -u [URL] -D [database_name] --tables' shows tables",
          "Dump table data: 'sqlmap -u [URL] -D [db] -T [table] --dump' extracts data",
          "Dump specific columns: 'sqlmap -u [URL] -D [db] -T [table] -C [column] --dump'",
          "POST request: 'sqlmap -u [URL] --data=\"param=value\" ' tests POST parameters",
          "Cookie injection: 'sqlmap -u [URL] --cookie=\"PHPSESSID=abc123\" --level=2'",
          "Bypass WAF: 'sqlmap -u [URL] --tamper=space2comment' uses evasion scripts",
          "Get database users: 'sqlmap -u [URL] --users' lists DB users",
          "Get password hashes: 'sqlmap -u [URL] --passwords' dumps password hashes",
          "OS shell access: 'sqlmap -u [URL] --os-shell' attempts to get command shell",
          "Read files: 'sqlmap -u [URL] --file-read=\"/etc/passwd\"' reads server files",
          "Write files: 'sqlmap -u [URL] --file-write=\"shell.php\" --file-dest=\"/var/www/html/shell.php\"'",
          "Risk/level settings: 'sqlmap -u [URL] --level=5 --risk=3' for thorough testing"
        ]
      }
    },
    {
      id: "coming-1",
      name: "Cobalt Strike",
      category: "Red Team Operations",
      icon: <Shield className="w-12 h-12" />,
      riskLevel: "Critical",
      description: "Advanced threat emulation and adversary simulation platform.",
      features: [],
      tutorial: { title: "", steps: [] },
      isComingSoon: true
    },
    {
      id: "coming-2",
      name: "Empire Framework",
      category: "Post-Exploitation",
      icon: <Terminal className="w-12 h-12" />,
      riskLevel: "Critical",
      description: "PowerShell and Python post-exploitation framework.",
      features: [],
      tutorial: { title: "", steps: [] },
      isComingSoon: true
    }
  ];

  const toggleTool = (toolId: string) => {
    if (tools.find(t => t.id === toolId)?.isComingSoon) return;
    setExpandedTool(expandedTool === toolId ? null : toolId);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Critical": return "text-red-500 border-red-500";
      case "High": return "text-orange-500 border-orange-500";
      case "Medium": return "text-yellow-500 border-yellow-500";
      default: return "text-green-500 border-green-500";
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Matrix Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-rain"></div>
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="scanline"></div>
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBackToDashboard}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors font-mono"
      >
        <ArrowLeft className="w-5 h-5" />
        BACK TO DASHBOARD
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 px-4 md:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Shield className="w-24 h-24 text-green-500 animate-pulse" />
                <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-green-500 font-mono mb-4 glitch-text">
              ADVANCED TOOLS
            </h1>
            <p className="text-green-400 font-mono text-lg mb-2">
              {"> PROFESSIONAL PENETRATION TESTING ARSENAL_"}
            </p>
            <p className="text-red-500 font-mono text-sm animate-pulse">
              ⚠ RESTRICTED ACCESS - AUTHORIZED PERSONNEL ONLY
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`border-2 ${tool.isComingSoon ? 'border-gray-500/30 opacity-60' : 'border-green-500/30'} bg-black/80 backdrop-blur hover:border-green-500 transition-all ${!tool.isComingSoon && 'hover:shadow-[0_0_30px_rgba(0,255,0,0.3)]'}`}
              >
                {tool.isComingSoon ? (
                  // Coming Soon Card
                  <div className="p-8 text-center">
                    <div className="text-gray-500 mb-4 flex justify-center">
                      {tool.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-500 font-mono mb-2">
                      {tool.name}
                    </h2>
                    <p className="text-gray-600 font-mono text-sm mb-4">{tool.category}</p>
                    <div className="border-2 border-dashed border-gray-500/30 bg-gray-900/30 p-6 mb-4">
                      <Terminal className="w-16 h-16 text-gray-600 mx-auto mb-3 animate-pulse" />
                      <p className="text-2xl font-bold text-gray-500 font-mono mb-2">COMING SOON</p>
                      <p className="text-gray-600 text-sm">{tool.description}</p>
                    </div>
                    <p className="text-gray-600 font-mono text-xs">
                      {"> UNDER DEVELOPMENT - RELEASE PENDING_"}
                    </p>
                  </div>
                ) : (
                  // Active Tool Card
                  <>
                    {/* Tool Header */}
                    <div
                      onClick={() => toggleTool(tool.id)}
                      className="p-6 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="text-green-500 group-hover:scale-110 transition-transform">
                            {tool.icon}
                          </div>
                          <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-green-500 font-mono group-hover:text-green-400 transition-colors mb-2">
                              {tool.name}
                            </h2>
                            <p className="text-green-500/60 font-mono text-sm mb-3">
                              {tool.category}
                            </p>
                            <div className={`inline-block px-3 py-1 border ${getRiskColor(tool.riskLevel)} font-mono text-xs`}>
                              RISK: {tool.riskLevel.toUpperCase()}
                            </div>
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
                      
                      <p className="text-gray-300 leading-relaxed">
                        {tool.description}
                      </p>
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
                          <div className="p-6 space-y-6">
                            {/* Key Features */}
                            <div>
                              <h3 className="text-xl font-bold text-green-500 font-mono mb-4 flex items-center gap-2">
                                <Terminal className="w-5 h-5" />
                                KEY FEATURES
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {tool.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                    <span className="text-green-500 font-mono mt-1">▸</span>
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Tutorial Section */}
                            <div className="border-2 border-cyan-500/30 bg-cyan-500/5 p-6">
                              <h3 className="text-xl font-bold text-cyan-400 font-mono mb-4 flex items-center gap-2">
                                <Code className="w-5 h-5" />
                                {tool.tutorial.title}
                              </h3>
                              <div className="space-y-3">
                                {tool.tutorial.steps.map((step, idx) => (
                                  <div key={idx} className="flex items-start gap-4">
                                    <span className="text-cyan-400 font-mono font-bold min-w-[2.5rem] bg-cyan-500/10 px-2 py-1 border border-cyan-500/30">
                                      {String(idx + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-gray-300 flex-1 bg-black/50 p-2 border-l-2 border-cyan-500/30">
                                      {step}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Warning */}
                            <div className="border-2 border-red-500/30 bg-red-500/5 p-4">
                              <p className="text-red-500 font-mono text-sm">
                                <span className="font-bold">⚠ CRITICAL WARNING:</span> These tools are extremely powerful and can cause serious damage. 
                                Only use on systems you own or have explicit written permission to test. 
                                Unauthorized access is a federal crime punishable by imprisonment and fines.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
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
              <p className="text-green-500/60 font-mono text-sm mb-2">
                {"> PROFESSIONAL TOOLS FOR AUTHORIZED SECURITY TESTING ONLY_"}
              </p>
              <p className="text-red-500/60 font-mono text-xs">
                MISUSE OF THESE TOOLS MAY RESULT IN LEGAL CONSEQUENCES
              </p>
              <p className="text-green-500/40 font-mono text-xs mt-4">
                © 2026 EXPLOITX - ADVANCED SECURITY PLATFORM
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
