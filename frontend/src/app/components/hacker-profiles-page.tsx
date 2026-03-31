import { useState } from "react";
import { Shield, ArrowLeft, User, Users, Target, Zap, Globe, Terminal, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HackerProfilesPageProps {
  onBackToDashboard: () => void;
}

interface Profile {
  id: string;
  name: string;
  alias: string;
  type: "Individual" | "Group";
  icon: React.ReactNode;
  tagline: string;
  background: string;
  famousFor: string[];
  achievements: string[];
  techniques: string[];
  timeline: {
    year: string;
    event: string;
  }[];
  currentStatus: string;
  legendStatus: "Legendary" | "Infamous" | "Active" | "Unknown";
  isComingSoon?: boolean;
}

export function HackerProfilesPage({ onBackToDashboard }: HackerProfilesPageProps) {
  const [expandedProfile, setExpandedProfile] = useState<string | null>(null);

  const profiles: Profile[] = [
    {
      id: "kevin-mitnick",
      name: "Kevin Mitnick",
      alias: "The Condor",
      type: "Individual",
      icon: <User className="w-12 h-12" />,
      tagline: "The World's Most Famous Hacker",
      legendStatus: "Legendary",
      background: "Kevin Mitnick is arguably the most famous hacker in history. Born in 1963, he became fascinated with computers and phone systems at an early age. His hacking career spanned several decades, during which he became the FBI's most-wanted computer criminal. After serving time in prison, he transformed into a respected security consultant, author, and public speaker. He passed away in July 2023, leaving behind an incredible legacy in the cybersecurity world.",
      famousFor: [
        "Evading the FBI for over 2 years while on the run",
        "Hacking into 40+ major corporations including Nokia, Motorola, and Sun Microsystems",
        "Social engineering mastery - could manipulate people into revealing sensitive information",
        "First hacker to be featured on an FBI 'Most Wanted' poster",
        "Writing bestselling books on security and social engineering",
        "Founding Mitnick Security Consulting"
      ],
      achievements: [
        "Successfully hacked the North American Aerospace Defense Command (NORAD) at age 16",
        "Cloned cellphones and gained free calling capabilities",
        "Accessed proprietary software from major tech companies",
        "Evaded FBI capture using sophisticated counter-surveillance techniques",
        "Became a trusted security consultant for Fortune 500 companies after release",
        "Chief Hacking Officer at KnowBe4 security awareness training company",
        "Published 'The Art of Deception' and 'Ghost in the Wires' - security bestsellers"
      ],
      techniques: [
        "Social Engineering - manipulating people through psychological tricks",
        "Phreaking - exploiting telephone network vulnerabilities",
        "Dumpster Diving - finding sensitive information in trash",
        "Pretexting - creating false scenarios to extract information",
        "Shoulder Surfing - observing people entering passwords/PINs",
        "Network Sniffing - intercepting unencrypted network traffic",
        "Password Cracking - using various methods to break authentication"
      ],
      timeline: [
        { year: "1981", event: "Broke into the computer systems of the Pentagon (age 17)" },
        { year: "1988", event: "Convicted of computer fraud, served 1 year in prison" },
        { year: "1992", event: "Hacked Pacific Bell voicemail systems" },
        { year: "1995", event: "Arrested after 2.5 years on the run, became FBI's most wanted" },
        { year: "2000", event: "Released from prison after serving 5 years" },
        { year: "2003", event: "Founded Mitnick Security Consulting" },
        { year: "2011", event: "Published 'Ghost in the Wires' autobiography" },
        { year: "2023", event: "Passed away, leaving legendary security legacy" }
      ],
      currentStatus: "Deceased (2023) - Remembered as a legendary figure who transformed from notorious hacker to respected security expert and author."
    },
    {
      id: "anonymous",
      name: "Anonymous",
      alias: "The Collective",
      type: "Group",
      icon: <Users className="w-12 h-12" />,
      tagline: "We Are Legion. We Do Not Forgive. We Do Not Forget.",
      legendStatus: "Active",
      background: "Anonymous is a decentralized international activist and hacktivist collective that originated on 4chan in 2003. The group became known for its various cyberattacks against governments, corporations, and organizations. Members are identifiable by their Guy Fawkes masks. Unlike traditional hacker groups, Anonymous has no leadership, no hierarchy, and anyone can claim to be part of Anonymous by supporting their causes.",
      famousFor: [
        "Operation Payback - DDoS attacks against anti-piracy organizations (2010)",
        "Operation Tunisia & Egypt - Supporting Arab Spring protesters (2011)",
        "Operation Sony - Response to PlayStation Network breach handling (2011)",
        "Operation Last Resort - After Aaron Swartz's death (2013)",
        "OpISIS - Cyberwar against terrorist organizations (2015-present)",
        "Guy Fawkes mask as their iconic symbol"
      ],
      achievements: [
        "Took down websites of major corporations including Visa, MasterCard, PayPal",
        "Exposed sensitive government documents and corruption",
        "Supported social justice movements worldwide",
        "Leaked thousands of KKK member identities",
        "Disrupted ISIS recruitment and propaganda operations",
        "Released 'Message to Citizens' videos viewed millions of times",
        "Inspired hacktivist movements globally"
      ],
      techniques: [
        "DDoS Attacks - Distributed Denial of Service using LOIC (Low Orbit Ion Cannon)",
        "Data Breaches - Infiltrating databases to expose information",
        "Doxing - Publishing private information of targets",
        "Website Defacement - Replacing website content with messages",
        "SQL Injection - Exploiting database vulnerabilities",
        "Social Media Hijacking - Taking control of official accounts",
        "Coordinated Operations - Global simultaneous attacks"
      ],
      timeline: [
        { year: "2003", event: "Origins on 4chan imageboard" },
        { year: "2008", event: "Project Chanology - First major operation against Church of Scientology" },
        { year: "2010", event: "Operation Payback - Attacks on anti-piracy organizations" },
        { year: "2011", event: "Arab Spring support - OpTunisia, OpEgypt" },
        { year: "2013", event: "Operation Last Resort - DOJ website hacked" },
        { year: "2015", event: "OpISIS launched - War on terrorism online" },
        { year: "2022", event: "OpRussia - Cyberattacks following Ukraine invasion" },
        { year: "2024-Present", event: "Ongoing operations for social justice and freedom" }
      ],
      currentStatus: "Active and decentralized - Operations continue worldwide with various sub-groups focusing on different causes and targets."
    },
    {
      id: "adrian-lamo",
      name: "Adrian Lamo",
      alias: "The Homeless Hacker",
      type: "Individual",
      icon: <Target className="w-12 h-12" />,
      tagline: "Breaking Into The New York Times From A Coffee Shop",
      legendStatus: "Infamous",
      background: "Adrian Lamo earned the nickname 'The Homeless Hacker' because he conducted his cyberattacks from internet cafes, libraries, and coffee shops while traveling around the US. Born in 1981, Lamo was known for breaking into high-profile computer networks and then notifying both the press and the victims. His most controversial act was reporting Chelsea Manning to the FBI for leaking classified documents to WikiLeaks, which divided the hacker community.",
      famousFor: [
        "Hacking The New York Times intranet and adding himself to expert sources",
        "Breaking into Microsoft, Yahoo, and MCI WorldCom networks",
        "Exposing security flaws in major corporations publicly",
        "Reporting Chelsea Manning to authorities (controversial)",
        "Conducting attacks from public WiFi networks",
        "Living a nomadic lifestyle while hacking"
      ],
      achievements: [
        "Penetrated New York Times internal network and accessed personal info of contributors",
        "Discovered and reported security vulnerabilities in Fortune 500 companies",
        "Hacked into Yahoo's internal systems",
        "Accessed MCI WorldCom's network operations",
        "Breached Microsoft's corporate network",
        "Featured in mainstream media as cybersecurity expert",
        "Helped improve security practices by exposing vulnerabilities"
      ],
      techniques: [
        "War Driving - Finding unsecured WiFi networks to exploit",
        "SQL Injection - Exploiting web application databases",
        "Network Reconnaissance - Mapping corporate network structures",
        "Vulnerability Scanning - Automated detection of security flaws",
        "Privilege Escalation - Gaining higher access levels in systems",
        "Proxy Chaining - Hiding identity through multiple proxy servers",
        "OSINT (Open Source Intelligence) - Gathering public information"
      ],
      timeline: [
        { year: "2001", event: "Hacked into Yahoo's network, exposing vulnerabilities" },
        { year: "2002", event: "Breached New York Times internal database" },
        { year: "2003", event: "Arrested for hacking The New York Times, Microsoft, MCI" },
        { year: "2004", event: "Pleaded guilty to computer crimes, sentenced to probation" },
        { year: "2010", event: "Reported Chelsea Manning to FBI - controversial decision" },
        { year: "2011", event: "Manning arrested - Lamo received death threats from community" },
        { year: "2016", event: "Became security researcher and journalist" },
        { year: "2018", event: "Found dead at age 37 - cause of death undetermined" }
      ],
      currentStatus: "Deceased (2018) - Remembered as a skilled hacker whose legacy is complicated by his role in the Chelsea Manning case."
    },
    {
      id: "lizard-squad",
      name: "Lizard Squad",
      alias: "The Console Killers",
      type: "Group",
      icon: <Zap className="w-12 h-12" />,
      tagline: "Taking Down PlayStation & Xbox on Christmas",
      legendStatus: "Infamous",
      background: "Lizard Squad is a black hat hacking group that gained international notoriety in 2014 for launching massive DDoS attacks against gaming networks, particularly PlayStation Network and Xbox Live during Christmas. The group is known for their attention-seeking behavior, selling DDoS-for-hire services, and targeting high-profile individuals and companies. Several members have been arrested, but the group name continues to be used for various cyberattacks.",
      famousFor: [
        "Christmas 2014 attack - Took down PSN and Xbox Live for days",
        "Grounded American Airlines flight by tweeting bomb threat",
        "Attacking League of Legends and other gaming servers",
        "Creating LizardStresser - DDoS-for-hire service",
        "Targeting prominent YouTubers and streamers",
        "Juvenile yet highly disruptive attacks"
      ],
      achievements: [
        "Disrupted PlayStation Network affecting 150+ million users",
        "Crashed Xbox Live during peak Christmas gaming season",
        "Generated worldwide media attention for cyberattacks",
        "Built profitable DDoS-for-hire business",
        "Demonstrated vulnerability of major gaming infrastructure",
        "Forced companies to invest heavily in DDoS protection",
        "Influenced creation of stronger gaming network security"
      ],
      techniques: [
        "DDoS Amplification - Using botnets to overwhelm servers",
        "DNS Reflection - Exploiting DNS servers for amplified attacks",
        "NTP Amplification - Using time servers to multiply attack traffic",
        "Botnet Deployment - Controlling thousands of compromised devices",
        "SYN Flood - Overwhelming servers with connection requests",
        "UDP Flood - Flooding targets with User Datagram Protocol packets",
        "Social Engineering - Manipulating individuals for access"
      ],
      timeline: [
        { year: "2014-08", event: "First attacks on League of Legends and gaming servers" },
        { year: "2014-08", event: "Tweeted bomb threat to American Airlines flight" },
        { year: "2014-12", event: "Massive Christmas attack on PSN and Xbox Live" },
        { year: "2015-01", event: "Launched LizardStresser DDoS-for-hire service" },
        { year: "2015-09", event: "Two members arrested in UK" },
        { year: "2016-10", event: "Core member 'Vinnie Omari' sentenced" },
        { year: "2017", event: "Group fragmented after multiple arrests" },
        { year: "2018-Present", event: "Name occasionally used by various attackers" }
      ],
      currentStatus: "Largely disbanded - Key members arrested and sentenced. The name is occasionally used by other attackers for credibility."
    },
    {
      id: "coming-1",
      name: "Lazarus Group",
      alias: "The North Korean Cyber Army",
      type: "Group",
      icon: <Shield className="w-12 h-12" />,
      tagline: "State-Sponsored Cyber Warfare",
      legendStatus: "Unknown",
      background: "Advanced Persistent Threat group linked to North Korean government.",
      famousFor: [],
      achievements: [],
      techniques: [],
      timeline: [],
      currentStatus: "",
      isComingSoon: true
    },
    {
      id: "coming-2",
      name: "Gary McKinnon",
      alias: "Solo",
      type: "Individual",
      icon: <Globe className="w-12 h-12" />,
      tagline: "The NASA UFO Hacker",
      legendStatus: "Unknown",
      background: "Accused of the biggest military computer hack of all time.",
      famousFor: [],
      achievements: [],
      techniques: [],
      timeline: [],
      currentStatus: "",
      isComingSoon: true
    }
  ];

  const toggleProfile = (profileId: string) => {
    if (profiles.find(p => p.id === profileId)?.isComingSoon) return;
    setExpandedProfile(expandedProfile === profileId ? null : profileId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Legendary": return "text-yellow-500 border-yellow-500 bg-yellow-500/10";
      case "Infamous": return "text-red-500 border-red-500 bg-red-500/10";
      case "Active": return "text-green-500 border-green-500 bg-green-500/10";
      default: return "text-gray-500 border-gray-500 bg-gray-500/10";
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
                <Users className="w-24 h-24 text-green-500" />
                <div className="absolute inset-0 bg-green-500 blur-xl opacity-30"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-green-500 font-mono mb-4">
              LEGENDARY HACKERS
            </h1>
            <p className="text-green-400 font-mono text-lg mb-2">
              {"> PROFILES OF THE MOST NOTORIOUS CYBER CRIMINALS & ACTIVISTS_"}
            </p>
            <p className="text-yellow-500 font-mono text-sm">
              ⚡ LEARN FROM HISTORY - UNDERSTAND THE LEGENDS
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
          </motion.div>

          {/* Profiles List */}
          <div className="space-y-6">
            {profiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 + 0.2 }}
                className={`border-2 ${profile.isComingSoon ? 'border-gray-500/30' : 'border-green-500/30'} bg-black/90 backdrop-blur hover:border-green-500 transition-all ${!profile.isComingSoon && 'hover:shadow-[0_0_30px_rgba(0,255,0,0.2)]'}`}
              >
                {profile.isComingSoon ? (
                  // Coming Soon Card
                  <div className="p-8 flex items-center gap-6 opacity-60">
                    <div className="text-gray-500 flex-shrink-0">
                      {profile.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-500 font-mono mb-1">
                        {profile.name}
                      </h2>
                      <p className="text-gray-600 font-mono text-sm mb-2">{profile.alias}</p>
                      <p className="text-gray-600 text-sm italic">{profile.background}</p>
                    </div>
                    <div className="flex-shrink-0 text-center">
                      <Lock className="w-12 h-12 text-gray-600 mx-auto mb-2 animate-pulse" />
                      <p className="text-gray-500 font-mono text-sm">COMING SOON</p>
                    </div>
                  </div>
                ) : (
                  // Active Profile Card
                  <>
                    {/* Profile Header */}
                    <div
                      onClick={() => toggleProfile(profile.id)}
                      className="p-6 cursor-pointer group"
                    >
                      <div className="flex items-start gap-6">
                        <div className="text-green-500 group-hover:scale-110 transition-transform flex-shrink-0">
                          {profile.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h2 className="text-3xl md:text-4xl font-bold text-green-500 font-mono group-hover:text-green-400 transition-colors mb-1">
                                {profile.name}
                              </h2>
                              <p className="text-green-400 font-mono text-lg mb-2">
                                aka "{profile.alias}"
                              </p>
                              <p className="text-cyan-400 italic text-sm mb-3">"{profile.tagline}"</p>
                            </div>
                            <div className="flex-shrink-0">
                              {expandedProfile === profile.id ? (
                                <ChevronUp className="w-8 h-8 text-green-500" />
                              ) : (
                                <ChevronDown className="w-8 h-8 text-green-500 animate-bounce" />
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3 mb-3">
                            <span className={`px-3 py-1 border font-mono text-xs ${getStatusColor(profile.legendStatus)}`}>
                              {profile.legendStatus.toUpperCase()}
                            </span>
                            <span className="px-3 py-1 border border-blue-500 bg-blue-500/10 text-blue-400 font-mono text-xs">
                              {profile.type.toUpperCase()}
                            </span>
                          </div>
                          
                          <p className="text-gray-300 leading-relaxed">
                            {profile.background}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Profile Details - Expandable */}
                    <AnimatePresence>
                      {expandedProfile === profile.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="border-t-2 border-green-500/30"
                        >
                          <div className="p-6 space-y-8">
                            {/* Famous For */}
                            <div>
                              <h3 className="text-2xl font-bold text-yellow-500 font-mono mb-4 flex items-center gap-2">
                                <Target className="w-6 h-6" />
                                FAMOUS FOR
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {profile.famousFor.map((item, idx) => (
                                  <div key={idx} className="flex items-start gap-3 border border-yellow-500/30 bg-yellow-500/5 p-3">
                                    <span className="text-yellow-500 font-mono text-lg">★</span>
                                    <span className="text-gray-300 text-sm">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Achievements */}
                            <div>
                              <h3 className="text-2xl font-bold text-green-500 font-mono mb-4 flex items-center gap-2">
                                <Zap className="w-6 h-6" />
                                MAJOR ACHIEVEMENTS
                              </h3>
                              <div className="space-y-2">
                                {profile.achievements.map((achievement, idx) => (
                                  <div key={idx} className="flex items-start gap-3 border-l-4 border-green-500 pl-4 py-2 bg-green-500/5">
                                    <span className="text-green-500 font-mono">▸</span>
                                    <span className="text-gray-300">{achievement}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Techniques */}
                            <div>
                              <h3 className="text-2xl font-bold text-cyan-500 font-mono mb-4 flex items-center gap-2">
                                <Terminal className="w-6 h-6" />
                                SIGNATURE TECHNIQUES
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {profile.techniques.map((technique, idx) => (
                                  <div key={idx} className="border border-cyan-500/30 bg-cyan-500/5 p-3">
                                    <span className="text-cyan-400 font-mono text-sm font-bold block mb-1">
                                      {technique.split(" - ")[0]}
                                    </span>
                                    {technique.includes(" - ") && (
                                      <span className="text-gray-400 text-xs">
                                        {technique.split(" - ")[1]}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Timeline */}
                            <div>
                              <h3 className="text-2xl font-bold text-purple-500 font-mono mb-4 flex items-center gap-2">
                                <Terminal className="w-6 h-6" />
                                TIMELINE OF EVENTS
                              </h3>
                              <div className="space-y-4 border-l-2 border-purple-500/30 pl-6">
                                {profile.timeline.map((event, idx) => (
                                  <div key={idx} className="relative">
                                    <div className="absolute -left-8 top-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-black"></div>
                                    <div className="bg-purple-500/10 border border-purple-500/30 p-3">
                                      <span className="text-purple-400 font-mono font-bold text-sm block mb-1">
                                        {event.year}
                                      </span>
                                      <span className="text-gray-300 text-sm">
                                        {event.event}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Current Status */}
                            <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
                              <h3 className="text-xl font-bold text-green-500 font-mono mb-3">
                                CURRENT STATUS
                              </h3>
                              <p className="text-gray-300 leading-relaxed">
                                {profile.currentStatus}
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
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <div className="border-t border-green-500/20 pt-8">
              <p className="text-green-500/60 font-mono text-sm mb-2">
                {"> THESE PROFILES ARE FOR EDUCATIONAL PURPOSES ONLY_"}
              </p>
              <p className="text-yellow-500/60 font-mono text-xs">
                WE DO NOT ENDORSE ILLEGAL ACTIVITIES - LEARN FROM HISTORY, DON'T REPEAT IT
              </p>
              <p className="text-green-500/40 font-mono text-xs mt-4">
                © 2026 EXPLOITX - HACKER HISTORY ARCHIVE
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
