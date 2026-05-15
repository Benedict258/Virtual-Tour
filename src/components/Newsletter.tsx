import { useState, FormEvent } from 'react';
import { Mail, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    setIsSubscribed(true);
  };

  return (
    <section className="px-4 md:px-8 my-12">
      <div className="bg-[#FFF7F0] border border-[#FFE0CC] rounded-3xl px-6 md:px-12 py-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">Never miss a journey.</h2>
          <p className="text-sm md:text-base text-gray-500 max-w-lg">
            Join 50,000+ explorers getting weekly free tour recommendations, exclusive meetups, and deep dives into African culture.
          </p>
        </div>

        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="Enter your email"
                  className={`w-full bg-white pl-10 pr-4 py-3 rounded-full border ${error ? 'border-coral' : 'border-gray-200'} focus:outline-none focus:border-teal transition-colors text-sm`}
                />
              </div>
              <AnimatePresence mode="wait">
                {isSubscribed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-teal text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Subscribed
                  </motion.div>
                ) : (
                  <motion.button
                    key="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-coral hover:bg-coral/90 text-white px-8 py-3 rounded-full text-sm font-bold shadow-md shadow-coral/20 transition-all"
                  >
                    Subscribe
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            {error && <p className="text-coral text-xs ml-4">{error}</p>}
          </form>

          <div className="flex items-center justify-center lg:justify-start gap-4 mt-4 text-gray-400 text-xs">
            <span>Follow us:</span>
            {['IG', 'TW', 'FB', 'YT'].map((platform) => (
              <a key={platform} href="#" className="hover:text-gray-700 transition-colors">{platform}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
