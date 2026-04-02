import { Star, MessageSquare, Info, Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function RatingSection() {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const reviews = [
    {
      name: "Alex Chen",
      rating: 5,
      comment: "Incredible resource for learning cybersecurity! The tools section is comprehensive.",
      role: "Security Analyst"
    },
    {
      name: "Sarah Williams",
      rating: 5,
      comment: "ExploitX has been invaluable for my studies. Highly recommended!",
      role: "Computer Science Student"
    },
    {
      name: "Mike Johnson",
      rating: 4,
      comment: "Great platform with tons of information. Looking forward to more tutorials.",
      role: "Penetration Tester"
    }
  ];

  return (
    <section id="rating" className="min-h-screen bg-black border-t border-green-500/20 px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Star className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-5xl font-bold text-green-500 font-mono mb-4">RATINGS & REVIEWS</h2>
          <p className="text-gray-400 font-mono">{'>'} See what our community says_</p>
        </motion.div>

        {/* Average Rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="border border-green-500/30 bg-black/50 p-8 mb-12 text-center"
        >
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-10 h-10 fill-green-500 text-green-500"
              />
            ))}
          </div>
          <p className="text-4xl font-bold text-green-500 font-mono mb-2">4.8 / 5.0</p>
          <p className="text-gray-400">Based on 1,247 reviews</p>
        </motion.div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="border border-green-500/30 bg-black/50 p-6 hover:border-green-500 transition-all"
            >
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= review.rating
                        ? "fill-green-500 text-green-500"
                        : "text-green-500/30"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-400 mb-4 italic">"{review.comment}"</p>
              <div className="border-t border-green-500/20 pt-4">
                <p className="text-green-500 font-mono">{review.name}</p>
                <p className="text-green-500/60 text-sm font-mono">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rate Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="border border-green-500/30 bg-black/50 p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-green-500 font-mono mb-4">RATE YOUR EXPERIENCE</h3>
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setSelectedRating(star)}
              >
                <Star
                  className={`w-12 h-12 cursor-pointer transition-all ${
                    star <= (hoveredRating || selectedRating)
                      ? "fill-green-500 text-green-500 scale-110"
                      : "text-green-500/30"
                  }`}
                />
              </button>
            ))}
          </div>
          {selectedRating > 0 && (
            <p className="text-green-500 font-mono">Thank you for rating us {selectedRating} stars!</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export function ForumSection() {
  const discussions = [
    {
      title: "Best tools for network penetration testing?",
      author: "CyberNinja",
      replies: 23,
      time: "2 hours ago"
    },
    {
      title: "How to get started with ethical hacking",
      author: "WhiteHat101",
      replies: 45,
      time: "5 hours ago"
    },
    {
      title: "SQLMap vs Manual SQL Injection",
      author: "DatabaseHunter",
      replies: 12,
      time: "1 day ago"
    },
    {
      title: "Metasploit framework tutorial discussion",
      author: "ExploitMaster",
      replies: 67,
      time: "2 days ago"
    }
  ];

  return (
    <section id="forum" className="min-h-screen bg-black border-t border-green-500/20 px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <MessageSquare className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-5xl font-bold text-green-500 font-mono mb-4">COMMUNITY FORUM</h2>
          <p className="text-gray-400 font-mono">{'>'} Join the discussion with fellow security enthusiasts_</p>
        </motion.div>

        {/* Forum Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border border-green-500/30 bg-black/50 p-6 text-center"
          >
            <p className="text-4xl font-bold text-green-500 font-mono mb-2">2,548</p>
            <p className="text-gray-400 font-mono">ACTIVE MEMBERS</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="border border-green-500/30 bg-black/50 p-6 text-center"
          >
            <p className="text-4xl font-bold text-green-500 font-mono mb-2">8,923</p>
            <p className="text-gray-400 font-mono">DISCUSSIONS</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="border border-green-500/30 bg-black/50 p-6 text-center"
          >
            <p className="text-4xl font-bold text-green-500 font-mono mb-2">45,672</p>
            <p className="text-gray-400 font-mono">TOTAL POSTS</p>
          </motion.div>
        </div>

        {/* Recent Discussions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-green-500 font-mono mb-6">RECENT DISCUSSIONS</h3>
          <div className="space-y-4">
            {discussions.map((discussion, index) => (
              <div
                key={index}
                className="border border-green-500/30 bg-black/50 p-6 hover:border-green-500 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl text-green-500 font-mono mb-2 group-hover:text-green-400 transition-colors">
                      {discussion.title}
                    </h4>
                    <p className="text-gray-400 text-sm font-mono">
                      by <span className="text-green-500">{discussion.author}</span> • {discussion.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 border border-green-500/30 bg-black/80">
                    <MessageSquare className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-mono">{discussion.replies}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <button className="px-8 py-3 border-2 border-green-500 text-green-500 font-mono hover:bg-green-500 hover:text-black transition-all">
            VIEW ALL DISCUSSIONS
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen bg-black border-t border-green-500/20 px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Info className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-5xl font-bold text-green-500 font-mono mb-4">ABOUT EXPLOITX</h2>
          <p className="text-gray-400 font-mono">{'>'} Our mission and vision_</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border border-green-500/30 bg-black/50 p-8"
          >
            <h3 className="text-2xl font-bold text-green-500 font-mono mb-4">OUR MISSION</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              ExploitX is dedicated to educating the next generation of cybersecurity professionals. 
              We provide comprehensive resources, tools, and knowledge to help individuals understand 
              and master the art of ethical hacking and digital security.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Through our platform, we aim to create a safer digital world by empowering students, 
              professionals, and enthusiasts with the skills they need to protect against cyber threats.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="border border-green-500/30 bg-black/50 p-8"
          >
            <h3 className="text-2xl font-bold text-green-500 font-mono mb-4">WHY EXPLOITX?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-mono">{'>'}</span>
                <span className="text-gray-400">Comprehensive tool database with real-world applications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-mono">{'>'}</span>
                <span className="text-gray-400">Learn from legendary hackers and their techniques</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-mono">{'>'}</span>
                <span className="text-gray-400">Active community forum for knowledge sharing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-mono">{'>'}</span>
                <span className="text-gray-400">Regular updates with latest security trends</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-mono">{'>'}</span>
                <span className="text-gray-400">100% educational and ethical approach</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border border-green-500/30 bg-black/50 p-8"
        >
          <h3 className="text-2xl font-bold text-green-500 font-mono mb-6 text-center">OUR VALUES</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 font-mono mb-2">01</div>
              <p className="text-green-500 font-mono mb-2">ETHICS</p>
              <p className="text-gray-400 text-sm">Always promote responsible and ethical practices</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 font-mono mb-2">02</div>
              <p className="text-green-500 font-mono mb-2">EDUCATION</p>
              <p className="text-gray-400 text-sm">Knowledge sharing is our top priority</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 font-mono mb-2">03</div>
              <p className="text-green-500 font-mono mb-2">COMMUNITY</p>
              <p className="text-gray-400 text-sm">Build strong connections among learners</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 font-mono mb-2">04</div>
              <p className="text-green-500 font-mono mb-2">INNOVATION</p>
              <p className="text-gray-400 text-sm">Stay ahead with cutting-edge information</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="min-h-screen bg-black border-t border-green-500/20 px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Mail className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-5xl font-bold text-green-500 font-mono mb-4">CONTACT US</h2>
          <p className="text-gray-400 font-mono">{'>'} Get in touch with our team_</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border border-green-500/30 bg-black/50 p-8"
          >
            <h3 className="text-2xl font-bold text-green-500 font-mono mb-6">SEND MESSAGE</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-green-500 font-mono text-sm mb-2">NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-black border border-green-500/30 text-green-500 px-4 py-3 focus:outline-none focus:border-green-500 transition-colors font-mono"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-green-500 font-mono text-sm mb-2">EMAIL</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-black border border-green-500/30 text-green-500 px-4 py-3 focus:outline-none focus:border-green-500 transition-colors font-mono"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-green-500 font-mono text-sm mb-2">SUBJECT</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full bg-black border border-green-500/30 text-green-500 px-4 py-3 focus:outline-none focus:border-green-500 transition-colors font-mono"
                  placeholder="Message subject"
                />
              </div>
              <div>
                <label className="block text-green-500 font-mono text-sm mb-2">MESSAGE</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full bg-black border border-green-500/30 text-green-500 px-4 py-3 focus:outline-none focus:border-green-500 transition-colors font-mono resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-black py-3 font-mono hover:bg-green-400 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                SEND MESSAGE
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="border border-green-500/30 bg-black/50 p-8">
              <h3 className="text-2xl font-bold text-green-500 font-mono mb-6">GET IN TOUCH</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <p className="text-green-500 font-mono mb-1">EMAIL</p>
                    <p className="text-gray-400">contact@exploitx.edu</p>
                    <p className="text-gray-400">support@exploitx.edu</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <p className="text-green-500 font-mono mb-1">PHONE</p>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-gray-400">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <p className="text-green-500 font-mono mb-1">ADDRESS</p>
                    <p className="text-gray-400">123 Cyber Security Lane</p>
                    <p className="text-gray-400">Tech District, CA 94000</p>
                    <p className="text-gray-400">United States</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-green-500/30 bg-black/50 p-8">
              <h3 className="text-xl font-bold text-green-500 font-mono mb-4">OFFICE HOURS</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between">
                  <span className="font-mono">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">Sunday:</span>
                  <span className="text-green-500">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
