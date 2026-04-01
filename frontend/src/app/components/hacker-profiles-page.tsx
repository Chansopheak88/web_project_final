import { useState } from "react";
import { Shield, ArrowLeft, User, Users, Target, Zap, Globe, Terminal, Lock, Skull, Bug, Server, ChevronDown, ChevronUp } from "lucide-react";
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
      background: "Kevin Mitnick is arguably the most famous hacker in history. Born in 1963 in Los Angeles, he became fascinated with computers and phone systems at an early age. His hacking career spanned several decades, during which he became the FBI's most-wanted computer criminal. What made him unique was his masterful use of social engineering - he could manipulate people into revealing passwords and access codes with ease. After serving 5 years in prison, he transformed into a respected security consultant, author, and public speaker, proving that hackers can use their skills for good. He passed away in July 2023, leaving behind an incredible legacy.",
      famousFor: [
        "Evading the FBI for over 2.5 years while on the run across the United States",
        "Hacking into 40+ major corporations including Nokia, Motorola, Sun Microsystems, and Fujitsu",
        "Social engineering mastery - could manipulate anyone into revealing sensitive information",
        "First hacker to be featured on an FBI 'Most Wanted' poster",
        "Breaking into NORAD at age 16 (inspired the movie WarGames)",
        "Writing bestselling books: 'The Art of Deception', 'The Art of Intrusion', 'Ghost in the Wires'",
        "Founding Mitnick Security Consulting and helping Fortune 500 companies",
        "Becoming Chief Hacking Officer at KnowBe4 security training company"
      ],
      achievements: [
        "Successfully hacked the North American Aerospace Defense Command (NORAD) computer systems at age 16",
        "Cloned cellphones to make free calls and evade FBI tracking",
        "Accessed proprietary source code from major tech companies without being detected for years",
        "Used sophisticated counter-surveillance techniques to evade FBI capture while traveling across America",
        "Turned his life around to become one of the world's most trusted cybersecurity consultants",
        "Trained thousands of security professionals in penetration testing and social engineering",
        "Published multiple New York Times bestselling books on security",
        "Demonstrated that reformed hackers can make incredible contributions to cybersecurity",
        "Built a multi-million dollar security consulting business",
        "Received standing ovations at security conferences worldwide"
      ],
      techniques: [
        "Social Engineering - Masterful psychological manipulation to extract information from people",
        "Phreaking - Exploiting telephone network vulnerabilities to make free calls and gather intel",
        "Dumpster Diving - Searching through trash to find passwords, phone lists, and company documents",
        "Pretexting - Creating elaborate false scenarios and identities to gain trust",
        "Shoulder Surfing - Observing people entering passwords, PINs, and security codes",
        "Network Sniffing - Intercepting unencrypted network traffic to capture sensitive data",
        "Password Cracking - Using various methods including dictionary attacks and social engineering",
        "Physical Security Exploitation - Tailgating, lock picking, and gaining unauthorized physical access",
        "Voice Impersonation - Mimicking voices of authority figures to gain access"
      ],
      timeline: [
        { year: "1979", event: "At age 16, hacked into Pentagon's computer system using a friend's university connection" },
        { year: "1981", event: "Broke into North American Defense Command (NORAD) - inspired the movie WarGames" },
        { year: "1988", event: "First arrest - convicted of computer fraud, served 1 year in prison and 3 years supervision" },
        { year: "1992", event: "Hacked Pacific Bell voicemail systems and went on the run from authorities" },
        { year: "1995", event: "Arrested in Raleigh, NC after 2.5 years on the run - became FBI's most wanted cyber criminal" },
        { year: "1999", event: "Convicted of wire fraud and computer fraud - sentenced to 46 months (time served)" },
        { year: "2000", event: "Released from prison with ban on using computers and phones for 3 years" },
        { year: "2003", event: "Founded Mitnick Security Consulting, LLC - helps companies test their security" },
        { year: "2011", event: "Published autobiography 'Ghost in the Wires' - became instant bestseller" },
        { year: "2019", event: "Named Chief Hacking Officer at KnowBe4, world's largest security awareness training company" },
        { year: "2023", event: "Passed away from pancreatic cancer - remembered as a legend who changed cybersecurity forever" }
      ],
      currentStatus: "Deceased (July 2023) - Remembered as a legendary figure who transformed from notorious hacker to respected security expert, author, and teacher. His legacy lives on through his books, training programs, and the countless security professionals he inspired."
    },
    {
      id: "anonymous",
      name: "Anonymous",
      alias: "The Collective / Legion",
      type: "Group",
      icon: <Users className="w-12 h-12" />,
      tagline: "We Are Legion. We Do Not Forgive. We Do Not Forget. Expect Us.",
      legendStatus: "Active",
      background: "Anonymous is a decentralized international activist and hacktivist collective that originated on the 4chan imageboard in 2003. Unlike traditional hacker groups, Anonymous has no leadership structure, no membership requirements, and no official hierarchy. Anyone can claim to be part of Anonymous by supporting their causes and wearing the iconic Guy Fawkes mask. The group became known for launching massive cyberattacks against governments, corporations, and organizations they deemed corrupt or oppressive. Their operations have ranged from supporting Arab Spring protesters to attacking terrorist organizations like ISIS. The leaderless structure makes them nearly impossible to stop - take down one member, and hundreds more appear.",
      famousFor: [
        "Project Chanology (2008) - Massive campaign against the Church of Scientology with protests worldwide",
        "Operation Payback (2010) - DDoS attacks against anti-piracy organizations, Visa, MasterCard, and PayPal",
        "Supporting Arab Spring (2011) - Operation Tunisia and Operation Egypt helped protesters",
        "Operation Sony (2011) - Response to Sony's handling of PlayStation Network breach",
        "Operation Last Resort (2013) - After Aaron Swartz's death, hacked DOJ and MIT websites",
        "OpISIS (2015-present) - Ongoing cyberwar against ISIS, taking down propaganda sites",
        "Guy Fawkes mask becoming global symbol of protest and resistance",
        "Inspiring hacktivist movements worldwide with 'We Are Legion' documentary"
      ],
      achievements: [
        "Successfully took down websites of Visa, MasterCard, PayPal, and major corporations with DDoS attacks",
        "Exposed thousands of sensitive government documents revealing corruption and abuse",
        "Supported social justice movements in over 50 countries worldwide",
        "Leaked complete KKK membership lists, exposing politicians and public figures",
        "Disrupted ISIS recruitment operations and took down hundreds of terrorist propaganda sites",
        "Released viral 'Message to Citizens' videos viewed by millions inspiring global activism",
        "Demonstrated the power of decentralized grassroots digital activism",
        "Inspired major Hollywood documentary 'We Are Legion' and influenced global hacker culture",
        "Forced governments and corporations to take cybersecurity seriously",
        "Created one of the most recognizable symbols in protest culture (Guy Fawkes mask)"
      ],
      techniques: [
        "DDoS Attacks - Distributed Denial of Service using LOIC (Low Orbit Ion Cannon) and botnets",
        "Data Breaches - Infiltrating databases and servers to expose sensitive information",
        "Doxing - Publishing private information of targets to public forums",
        "Website Defacement - Replacing legitimate website content with political messages",
        "SQL Injection - Exploiting web application database vulnerabilities",
        "Social Media Hijacking - Taking control of official social media accounts",
        "Coordinated Global Operations - Simultaneous attacks from thousands of participants worldwide",
        "IRC Coordination - Using Internet Relay Chat to organize anonymous participants",
        "OpSec (Operational Security) - Using Tor, VPNs, and encryption to hide identities"
      ],
      timeline: [
        { year: "2003", event: "Origins on 4chan imageboard as loosely organized trolling collective" },
        { year: "2008", event: "Project Chanology launched - First major organized operation against Church of Scientology" },
        { year: "2010", event: "Operation Payback - Massive DDoS attacks against anti-piracy organizations" },
        { year: "2011", event: "Arab Spring support - OpTunisia and OpEgypt helped protesters evade censorship" },
        { year: "2011", event: "Operation Sony - Attacked Sony after PlayStation Network breach handling" },
        { year: "2012", event: "Operation Megaupload - Attacks after Megaupload shutdown affected thousands" },
        { year: "2013", event: "Operation Last Resort - Hacked DOJ and MIT websites after Aaron Swartz's death" },
        { year: "2015", event: "OpISIS declared - Ongoing cyberwar against terrorist propaganda online" },
        { year: "2020", event: "Operation Minneapolis - Protests against police brutality" },
        { year: "2022", event: "OpRussia - Massive cyberattacks following Ukraine invasion, leaked government data" },
        { year: "2024-Present", event: "Ongoing worldwide operations for social justice, privacy rights, and freedom of information" }
      ],
      currentStatus: "Highly Active - Operations continue worldwide with various sub-groups and splinter cells. While law enforcement has arrested hundreds of suspected members, the decentralized nature means the collective continues to operate. Recent operations focus on exposing government corruption, supporting human rights, and combating online censorship."
    },
    {
      id: "lulzsec",
      name: "LulzSec",
      alias: "Lulz Security / The Lulz Boat",
      type: "Group",
      icon: <Skull className="w-12 h-12" />,
      tagline: "Laughing At Your Security Since 2011",
      legendStatus: "Infamous",
      background: "LulzSec (Lulz Security) was a high-profile black hat hacking group that operated for exactly 50 days in 2011, yet managed to cause more chaos than groups that existed for years. The name 'lulz' comes from 'LOL' (laughing out loud), reflecting their mission to hack 'for the lulz' - meaning for fun and entertainment rather than profit. Founded by six core members including the infamous 'Sabu', LulzSec split from Anonymous to conduct more aggressive and attention-seeking operations. They hacked Sony, PBS, Fox, the CIA, FBI, and Senate websites, often releasing data publicly and taunting their victims on Twitter. Their reign ended when leader Sabu was arrested and turned FBI informant, leading to the group's downfall.",
      famousFor: [
        "50 Days of Lulz campaign - Planned 50-day hacking spree that terrorized major organizations",
        "Hacking Sony Pictures, PlayStation Network, and Sony BMG multiple times",
        "Defacing PBS website after critical documentary about WikiLeaks",
        "Taking down CIA.gov website for several hours",
        "Breaching Fox.com and leaking X-Factor contestant database",
        "Taunting victims and law enforcement via Twitter with witty messages",
        "Operation Anti-Security (AntiSec) - Joint operation with Anonymous",
        "Being disbanded when leader 'Sabu' turned FBI informant"
      ],
      achievements: [
        "Successfully breached Sony Corporation's networks six times in one month",
        "Took down CIA public website for hours - one of the most secure sites in the world",
        "Hacked 77 law enforcement agencies and leaked officer information",
        "Breached FBI-affiliated organization InfraGard and leaked member data",
        "Defaced major media websites including PBS, Fox, and British newspapers",
        "Leaked over 70,000 email addresses and passwords from various breaches",
        "Built massive social media following - over 280,000 Twitter followers in 50 days",
        "Demonstrated that even the most secure organizations were vulnerable",
        "Inspired copy-cat groups and influenced hacker culture worldwide",
        "Showed the world the entertainment value of hacking (though unethical and illegal)"
      ],
      techniques: [
        "SQL Injection - Primary method for breaching web application databases",
        "DDoS Attacks - Overwhelming servers with traffic to take them offline",
        "Social Engineering - Manipulating employees to gain access credentials",
        "Exploiting Known Vulnerabilities - Using unpatched security flaws in popular software",
        "Password Hash Cracking - Breaking weak password encryption to access accounts",
        "Web Application Exploitation - Finding and exploiting vulnerabilities in web apps",
        "Twitter Taunting - Using social media to mock victims and law enforcement",
        "IRC Coordination - Organizing attacks through encrypted chat channels",
        "OpSec Failures - Ultimately their downfall due to poor operational security"
      ],
      timeline: [
        { year: "2011-05-06", event: "LulzSec officially formed and announced their existence on Twitter" },
        { year: "2011-05-07", event: "First attack - Breached Fox.com and leaked X-Factor database" },
        { year: "2011-05-14", event: "Hacked Infragard website (FBI-affiliated organization)" },
        { year: "2011-05-27", event: "Defaced PBS website in retaliation for WikiLeaks documentary" },
        { year: "2011-05-29", event: "Major Sony Pictures breach - leaked internal documents and databases" },
        { year: "2011-06-03", event: "Breached Sony BMG and leaked sensitive information" },
        { year: "2011-06-15", event: "Took down CIA.gov for hours - major embarrassment for US government" },
        { year: "2011-06-20", event: "Joined with Anonymous for 'Operation Anti-Security' (AntiSec)" },
        { year: "2011-06-25", event: "Announced end of 50 Days of Lulz - group claimed to disband" },
        { year: "2012-03-06", event: "Leader 'Sabu' (Hector Monsegur) revealed as FBI informant - had been arrested in June 2011" },
        { year: "2012-03-06", event: "Mass arrests - Core members arrested in UK and US using Sabu's intelligence" },
        { year: "2013-2014", event: "Trials and sentencing - Members received prison sentences ranging from 20 months to 10 years" }
      ],
      currentStatus: "Defunct - The group completely disbanded after arrests in 2012. Leader Sabu cooperated with FBI and avoided prison, while other members served sentences. The legacy remains as a cautionary tale about operational security and the consequences of high-profile hacking. Several members have since reformed and work in cybersecurity."
    },
    {
      id: "gary-mckinnon",
      name: "Gary McKinnon",
      alias: "Solo",
      type: "Individual",
      icon: <Globe className="w-12 h-12" />,
      tagline: "The Hacker Who Searched For UFOs In NASA's Computers",
      legendStatus: "Legendary",
      background: "Gary McKinnon, a Scottish systems administrator with Asperger's syndrome, is accused of committing 'the biggest military computer hack of all time.' Between 1999-2002, he allegedly hacked into 97 United States military and NASA computers from his girlfriend's aunt's house in London. His motivation? He was searching for evidence of UFOs and free energy suppression by the US government. McKinnon claims he was looking for evidence of anti-gravity technology and found spreadsheets listing 'non-terrestrial officers' and ship-to-ship transfers. The US government sought his extradition for 10 years, claiming he caused $700,000 in damages and deleted critical files at a military base post-9/11. His case became a cause célèbre in the UK, with his Asperger's diagnosis being cited as a reason against extradition.",
      famousFor: [
        "Hacking into 97 US military and NASA computers - called 'biggest military hack ever'",
        "Searching for evidence of UFOs and suppressed alien technology",
        "Allegedly finding files about 'non-terrestrial officers' and alien spacecraft",
        "Leaving taunting messages for US military about their poor security",
        "10-year extradition battle between UK and US governments",
        "Becoming symbol for Asperger's syndrome awareness in legal system",
        "Claiming to find evidence of government UFO cover-up",
        "Never being extradited despite US pressure - case blocked by UK government"
      ],
      achievements: [
        "Successfully accessed 97 highly secure military and NASA computer systems",
        "Hacked Pentagon, Army, Navy, Air Force, and Department of Defense computers",
        "Accessed systems at Fort Meade, Fort Benning, and military bases worldwide",
        "Allegedly downloaded classified information about anti-gravity propulsion",
        "Found spreadsheets listing 'non-terrestrial officers' and fleet-to-fleet transfers",
        "Operated undetected for nearly 3 years before discovery",
        "Survived 10-year legal battle against US extradition attempts",
        "Became international symbol for cyber crime sentencing reform",
        "Won support from human rights organizations and British parliament members",
        "Case led to changes in UK extradition laws"
      ],
      techniques: [
        "Searching for Default Passwords - Scanning for systems with blank or default passwords",
        "Remote Desktop Protocol (RDP) - Using Windows remote access to control computers",
        "Port Scanning - Using tools to find open ports on military networks",
        "Perl Scripts - Writing custom scripts to automate scanning thousands of IPs",
        "NetBIOS Exploitation - Exploiting Windows networking protocol vulnerabilities",
        "Low-Tech Social Engineering - Simply asking for access when challenged",
        "Operating During Off-Hours - Hacking at night when system admins were asleep",
        "Using Dial-Up Connection - Accessing from civilian ISP to avoid detection",
        "No Advanced Tools - Proving basic persistence beats high security"
      ],
      timeline: [
        { year: "1999", event: "Started searching for UFO evidence by hacking US military computers" },
        { year: "2000-2001", event: "Accessed NASA systems and allegedly found airbrushed UFO photos" },
        { year: "2001", event: "Hacked Army computer at Fort Myer - allegedly caused 3-day shutdown of 2,000 computers" },
        { year: "2002-03", event: "Discovered and arrested by UK National Hi-Tech Crime Unit" },
        { year: "2002", event: "Admitted to unauthorized access but denied causing damage or malicious intent" },
        { year: "2005", event: "UK court approved extradition to US - faced 70 years in prison" },
        { year: "2008", event: "Diagnosed with Asperger's syndrome - medical experts claimed extradition could cause suicide" },
        { year: "2009", event: "UK Home Secretary delayed extradition citing medical evidence" },
        { year: "2010", event: "New UK government reviewed case - debate in Parliament" },
        { year: "2012", event: "UK Home Secretary Theresa May blocked extradition on human rights grounds" },
        { year: "2013", event: "Case officially closed - McKinnon would not face UK prosecution either" },
        { year: "2015-Present", event: "Lives quietly in UK, case remembered as landmark in extradition law and autism awareness" }
      ],
      currentStatus: "Free - Living in the UK. Never prosecuted by US or UK. His case set precedents for extradition law, particularly regarding defendants with autism and Asperger's syndrome. Occasionally gives interviews about UFOs and his hacking experiences. The case remains controversial - was he a harmless UFO enthusiast or a dangerous hacker who compromised military security post-9/11?"
    },
    {
      id: "albert-gonzalez",
      name: "Albert Gonzalez",
      alias: "SoupNazi / CumbaJohnny",
      type: "Individual",
      icon: <Target className="w-12 h-12" />,
      tagline: "The $200 Million Credit Card Thief",
      legendStatus: "Infamous",
      background: "Albert Gonzalez orchestrated the largest credit card theft in history, stealing over 170 million card numbers and costing companies over $200 million in damages. Operating from 2005-2008, Gonzalez led a sophisticated cybercrime organization while simultaneously working as an FBI informant - playing both sides. He lived an extravagant lifestyle, throwing parties at expensive hotels, buying a BMW, and burying $1.1 million in cash in his parents' backyard. His crew used SQL injection and packet sniffing to breach major retailers including TJX, BJ's Wholesale Club, Barnes & Noble, and Heartland Payment Systems. The case was a wake-up call for the retail industry about point-of-sale security.",
      famousFor: [
        "Stealing 170+ million credit and debit card numbers - largest breach in history at the time",
        "Hacking TJX Companies and stealing 45.6 million card numbers",
        "Breaching Heartland Payment Systems - compromising 130 million cards",
        "Living double life as both hacker and FBI informant",
        "Burying $1.1 million cash in his parents' backyard",
        "Throwing lavish parties at expensive hotels while conducting cyber crime",
        "Causing over $200 million in documented damages to companies",
        "Receiving 20-year prison sentence - one of the longest for cyber crime"
      ],
      achievements: [
        "Led sophisticated international cybercrime organization with members across multiple countries",
        "Successfully breached security at TJX, BJ's Wholesale Club, Barnes & Noble, Sports Authority",
        "Compromised Heartland Payment Systems - at the time the 5th largest payment processor",
        "Stole and sold millions of credit cards on underground forums",
        "Accumulated over $2.8 million in cash from criminal activities",
        "Operated undetected for nearly 3 years despite FBI scrutiny",
        "Pioneered techniques for breaching point-of-sale systems",
        "Demonstrated vulnerabilities in retail payment processing infrastructure",
        "His case led to PCI DSS compliance standards being strengthened worldwide",
        "Received one of the harshest cyber crime sentences in US history (20 years)"
      ],
      techniques: [
        "SQL Injection - Primary method for breaching retail databases and payment systems",
        "Packet Sniffing - Using sniffers to capture unencrypted credit card data in transit",
        "Wardriving - Driving around to find and exploit vulnerable wireless networks",
        "Backdoor Installation - Installing malware to maintain persistent access to networks",
        "Social Engineering - Manipulating employees to gain physical or network access",
        "Stolen Credentials - Using purchased or stolen admin credentials to access systems",
        "Encrypted Communication - Using sophisticated encryption to coordinate with crew",
        "Money Laundering - Complex schemes to convert stolen data into cash",
        "Underground Forums - Selling stolen data on carding forums and dark web markets"
      ],
      timeline: [
        { year: "2003", event: "Arrested in New York for ATM fraud - became FBI informant to avoid jail" },
        { year: "2004-2005", event: "While working as FBI informant, secretly continued hacking operations" },
        { year: "2005-2007", event: "Led crew in massive TJX hack - stealing 45.6 million credit/debit cards" },
        { year: "2006-2008", event: "Breached BJ's Wholesale Club, OfficeMax, Barnes & Noble, Sports Authority" },
        { year: "2008-01", event: "Compromised Heartland Payment Systems - 130 million cards affected" },
        { year: "2008-05", event: "Arrested in New York - FBI discovered dual life" },
        { year: "2008-07", event: "Secret Service agents found $1.1 million cash buried in parents' yard" },
        { year: "2009", event: "Indicted on 19 counts of conspiracy, computer fraud, wire fraud, access device fraud" },
        { year: "2010-03", event: "Sentenced to 20 years in federal prison - one of longest cyber crime sentences" },
        { year: "2010", event: "Ordered to pay $202 million in restitution to victims" },
        { year: "2025", event: "Expected release from prison (with good behavior)" }
      ],
      currentStatus: "Imprisoned - Currently serving 20-year sentence in federal prison (expected release 2025). His case is studied in cybersecurity courses worldwide as an example of organized cyber crime and the importance of payment security. The retail industry spent billions upgrading security following his breaches."
    },
    {
      id: "adrian-lamo",
      name: "Adrian Lamo",
      alias: "The Homeless Hacker",
      type: "Individual",
      icon: <Terminal className="w-12 h-12" />,
      tagline: "The Nomadic Hacker Who Reported Chelsea Manning",
      legendStatus: "Infamous",
      background: "Adrian Lamo earned his nickname 'The Homeless Hacker' because he conducted his cyberattacks from internet cafes, libraries, coffee shops, and Kinko's stores while traveling nomadically across the United States. Born in 1981, Lamo was known for breaking into high-profile computer networks - including The New York Times, Microsoft, Yahoo, and MCI WorldCom - and then notifying both the press and the victims about their security flaws. His life took a controversial turn when he reported US Army intelligence analyst Chelsea Manning to the FBI for leaking classified documents to WikiLeaks. This decision made him a pariah in the hacker community, receiving death threats and being ostracized. He was found dead in 2018 at age 37 under mysterious circumstances.",
      famousFor: [
        "Hacking The New York Times internal network and adding himself to expert sources database",
        "Breaking into Microsoft, Yahoo, Bank of America, and Citigroup networks",
        "Conducting all attacks from public WiFi at coffee shops, libraries, and copy stores",
        "Living nomadically while carrying out sophisticated cyber operations",
        "Reporting Chelsea Manning to FBI - highly controversial decision that divided hacker community",
        "Being featured in mainstream media as cybersecurity expert despite criminal record",
        "Death at 37 under unexplained circumstances in 2018"
      ],
      achievements: [
        "Successfully penetrated New York Times internal network and accessed personal info of op-ed contributors including Rush Limbaugh",
        "Discovered and publicly reported critical vulnerabilities in Fortune 500 companies",
        "Hacked into Yahoo's internal systems and gained access to corporate networks",
        "Breached Microsoft's corporate network without detection",
        "Accessed MCI WorldCom's network operations systems",
        "Compromised networks at Excite@Home internet provider",
        "Worked as independent security journalist exposing vulnerabilities",
        "Demonstrated that sophisticated attacks can be launched from public internet connections",
        "Helped improve security practices at major corporations by exposing weaknesses",
        "Became case study in ethical dilemmas of white hat vs black hat hacking"
      ],
      techniques: [
        "War Driving - Finding and exploiting unsecured WiFi networks at public locations",
        "SQL Injection - Exploiting web application database vulnerabilities",
        "Network Reconnaissance - Systematically mapping corporate network structures",
        "Vulnerability Scanning - Using automated tools to detect security flaws",
        "Privilege Escalation - Gaining administrative access after initial breach",
        "Proxy Chaining - Routing traffic through multiple proxies to hide origin",
        "OSINT (Open Source Intelligence) - Gathering intelligence from public sources",
        "Social Engineering - Manipulating help desk staff and employees",
        "Living Off The Land - Using legitimate system tools to avoid detection"
      ],
      timeline: [
        { year: "2001", event: "Hacked into Yahoo network - discovered and reported vulnerabilities" },
        { year: "2002-02", event: "Breached New York Times internal database - added himself as expert source" },
        { year: "2002-09", event: "Hacked MCI WorldCom - accessed network control systems" },
        { year: "2003-09", event: "Arrested by FBI for hacking The New York Times, Microsoft, and MCI" },
        { year: "2004-01", event: "Pleaded guilty to computer crimes in federal court" },
        { year: "2004-09", event: "Sentenced to 6 months home detention, 2 years probation, $65,000 restitution" },
        { year: "2009-2010", event: "Began communication with Chelsea Manning over online chat" },
        { year: "2010-05", event: "Reported Chelsea Manning to FBI and Army counterintelligence" },
        { year: "2010-05-26", event: "Manning arrested based on Lamo's information" },
        { year: "2011-2013", event: "Testified at Manning's court-martial - received death threats from hacker community" },
        { year: "2013", event: "Manning sentenced to 35 years - Lamo became widely vilified" },
        { year: "2016-2017", event: "Worked as security researcher and occasional journalist" },
        { year: "2018-03-14", event: "Found dead at age 37 in apartment in Wichita, Kansas - cause undetermined" }
      ],
      currentStatus: "Deceased (March 2018) - Found dead at 37 years old. Cause of death was never definitively determined. His legacy remains controversial - some view him as a principled whistleblower who reported national security threats, while others see him as a traitor who betrayed Chelsea Manning and the hacker ethos. His life exemplifies the complex moral questions surrounding hacktivism, whistleblowing, and where personal loyalty ends and civic duty begins."
    },
    {
      id: "coming-1",
      name: "Lazarus Group",
      alias: "Hidden Cobra / APT38",
      type: "Group",
      icon: <Server className="w-12 h-12" />,
      tagline: "North Korea's Elite Cyber Army",
      legendStatus: "Unknown",
      background: "State-sponsored advanced persistent threat group conducting cyber warfare for North Korean regime.",
      famousFor: [],
      achievements: [],
      techniques: [],
      timeline: [],
      currentStatus: "",
      isComingSoon: true
    },
    {
      id: "coming-2",
      name: "Matrix / Max Butler",
      alias: "Iceman / Max Ray Vision",
      type: "Individual",
      icon: <Bug className="w-12 h-12" />,
      tagline: "The FBI Informant Turned Criminal Mastermind",
      legendStatus: "Unknown",
      background: "Former FBI informant who became one of the most prolific credit card fraudsters.",
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
                transition={{ delay: index * 0.1 + 0.2 }}
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