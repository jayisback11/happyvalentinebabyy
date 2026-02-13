import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music, Calendar, Play, Pause, Volume2, VolumeX, SkipForward } from "lucide-react";
import "@/App.css";

// --- Volume Control Component ---
const VolumeMixer = ({ audioRef1, audioRef2 }) => {
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    [audioRef1, audioRef2].forEach(ref => {
      if (ref.current) {
        ref.current.volume = newVolume;
        ref.current.muted = newVolume === 0;
      }
    });
    setIsMuted(newVolume === 0);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-center bg-rose-100/90 backdrop-blur-md p-3 rounded-2xl border border-rose-200 shadow-soft">
      <div className="h-24 w-8 flex items-center justify-center">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="accent-rose-500 h-20"
          style={{ WebkitAppearance: 'slider-vertical' }}
        />
      </div>
      <div className="mt-2 text-rose-600">
        {volume > 0 && !isMuted ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </div>
    </div>
  );
};

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 20 + Math.random() * 20
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ left: `${heart.left}%`, bottom: '-50px' }}
          animate={{ y: [0, -1200], x: [0, Math.sin(heart.id) * 50], opacity: [0, 0.6, 0] }}
          transition={{ duration: heart.duration, delay: heart.delay, repeat: Infinity, ease: "linear" }}
        >
          <Heart className="text-rose-300" size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

const FallingPetals = () => {
  const petals = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 8 + Math.random() * 4
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute w-3 h-3 rounded-full bg-rose-200"
          style={{ left: `${petal.left}%`, top: '-20px' }}
          animate={{ y: [0, 1200], x: [0, Math.sin(petal.id * 2) * 100], rotate: [0, 360], opacity: [1, 0.5] }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-rose-100 to-rose-50" />
    <motion.div className="relative z-10 text-center px-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}>
      <h1 className="font-serif text-6xl md:text-8xl text-rose-500 mb-6 tracking-tight">
        Happy Valentine's Day,<br /><span className="text-rose-600">Babyy 💕</span>
      </h1>
      <p className="font-sans text-xl md:text-2xl text-text-muted max-w-2xl mx-auto">One year with you, and I'd choose you every time.</p>
    </motion.div>
  </section>
);

const LoveLetter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // 1. Capture the current ref value in a variable
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    // 2. Use the variable for observing
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      // 3. Use the variable for cleanup
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []); // Empty dependency array is fine now

  const letterText = `My Dearest Babyy,\n\nHappy Valentine’s Day!\n\nI know you’ve trusted me with parts of yourself that aren’t easy to talk about. Parts that are sensitive. Parts shaped by things that hurt you before I ever came into your life. I want you to know something very clearly — I see you, and I respect you for that trust.\n\nYou are not “too much.”\nYou are not fragile in a bad way.\nYou are not difficult to love.\n\nYou are human. You are soft. And that softness is one of the most beautiful things about you.\n\nLoving you has taught me patience, care, and gentleness. It’s taught me to listen instead of rushing. To understand instead of assuming. To hold space for you when you need it, and to hold you closer when the world feels loud.\n\nI know some days are harder than others. I know your heart feels deeply, and sometimes that can feel overwhelming. But I want you to remember this — you never have to hide those parts of yourself with me.\n\nI’m not here just for the happy moments.\nI’m here for the quiet ones.\nThe anxious ones.\nThe sensitive ones.\n\nDistance hasn’t made me love you less — it’s made me more intentional. More sure. More grateful that you chose to open your heart to me.\n\nThank you for trusting me with the real you.\nThank you for staying.\nThank you for loving me even when it isn’t easy.\n\nThis is our second Valentine’s Day. And it doesn’t feel like a moment — it feels like a promise.\n\nAnd on February 17, one year ago, we started something real. Something honest. Something worth protecting.\n\nOne year down — and I’m still here.\nStill choosing you.\nStill loving you gently.\n\nHappy Valentine’s Day, Babyy.\nYou are safe with me. Always.`;

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-serif text-4xl md:text-5xl text-rose-600 text-center mb-12"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
        >
          A Letter for You
        </motion.h2>
        <motion.div
          className="bg-white paper-texture rounded-3xl p-8 md:p-12 shadow-soft border border-rose-100"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <p className="font-handwriting text-2xl md:text-3xl text-text-dark leading-relaxed whitespace-pre-line">
            {letterText}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ReasonsGrid = () => {
  const reasons = [
    "I love how sensitive you are, because it means you feel deeply and genuinely.",
    "I love how soft your heart is, even when you pretend it’s not.",
    "I love how you trust me enough to open up about things that hurt you.",
    "I love how chaotic you get when you’re excited about something.",
    "I love how hyper you can be and how your energy lights up my mood instantly.",
    "I love how shy you act when I compliment you.",
    "I love how emotional you are — it means you love deeply and genuinely.",
    "I love how you care about small things that most people ignore.",
    "I love how your laugh sounds different when you’re really happy.",
    "I love how you stay, even when distance makes things hard.",
    "I love how you make ordinary conversations feel special.",
    "I love how you can be funny without even trying.",
    "I love how you make me feel safe emotionally, just by being you.",
    "I love you not despite who you are — but because you’re you."
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-rose-50 to-rose-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-rose-600 mb-16">14 Reasons I Love You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div key={index} className="bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl p-6 shadow-soft" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.05 }}>
              <p className="font-sans text-lg text-text-dark">{reason}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PhotoGallery = () => {
  const photos = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    url: `/v1/${i + 1}.png`,
    rotation: [2, -3, 1, -2, 3, -1, 2, -2, 1, -3, 2, -1, 3, -2][i]
  }));

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-rose-600 mb-16">Our Memories Together</h2>
        <div className="columns-1 md:columns-3 gap-8 space-y-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="break-inside-avoid bg-white p-4 rounded-lg shadow-md"
              style={{ transform: `rotate(${photo.rotation}deg)` }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
            >
              <img
                src={photo.url}
                alt={`Memory ${index + 1}`}
                className="w-full h-auto rounded"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  console.error(`Missing image: ${photo.url}`);
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SpotifyReveal = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-rose-100 to-rose-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-rose-600 mb-8">I Made This for You</h2>
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.button onClick={() => setIsRevealed(true)} className="bg-gradient-to-r from-rose-400 to-rose-500 text-white px-8 py-4 rounded-full shadow-floating">Click to Reveal 💗</motion.button>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="font-handwriting text-2xl text-rose-600 mb-6">Read the first letter of every song — it spells VALENTINE 💕</p>
              <iframe src="https://open.spotify.com/embed/playlist/498MzDJUgSQKcf1115nQhG?utm_source=generator" width="100%" height="380" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="rounded-2xl shadow-floating" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date('2026-02-17T00:00:00+08:00') - new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 text-center">
      <h2 className="font-serif text-4xl md:text-5xl text-rose-600 mb-12">Our Anniversary 💞</h2>
      <div className="flex justify-center gap-4 flex-wrap">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-rose-200 to-rose-300 rounded-2xl p-6 min-w-[100px] shadow-soft">
              <span className="font-serif text-5xl text-rose-600">{String(value).padStart(2, '0')}</span>
            </div>
            <span className="font-sans text-sm uppercase mt-3">{unit}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(1);
  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);

  const handleAudioError = (e) => {
    console.error("Audio Error:", e.target.src, "Please check if the file exists in the /public folder.");
  };

  // Switch to the other track automatically when one ends
  const handleTrackEnded = () => {
    const nextTrack = activeTrack === 1 ? 2 : 1;
    setActiveTrack(nextTrack);

    // Use a timeout to ensure state update before playing
    setTimeout(() => {
      const nextRef = nextTrack === 1 ? audioRef1 : audioRef2;
      if (nextRef.current) {
        nextRef.current.play().catch(err => console.error("Auto-play next track failed:", err));
      }
    }, 100);
  };

  const startExperience = () => {
    setHasStarted(true);
    setIsPlaying(true);
    const currentAudio = audioRef1.current;
    if (currentAudio) {
      currentAudio.play().catch(err => {
        console.error("Autoplay blocked or file missing:", err);
        setIsPlaying(false);
      });
    }
  };

  const togglePlay = () => {
    const current = activeTrack === 1 ? audioRef1.current : audioRef2.current;
    if (isPlaying) {
      current.pause();
    } else {
      current.play().catch(err => console.error("Playback failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const switchTrack = () => {
    const current = activeTrack === 1 ? audioRef1.current : audioRef2.current;
    const next = activeTrack === 1 ? audioRef2.current : audioRef1.current;
    current.pause();
    current.currentTime = 0;
    setActiveTrack(activeTrack === 1 ? 2 : 1);
    if (isPlaying) {
      next.play().catch(err => console.error("Switching track failed:", err));
    }
  };

  return (
    <div className="App relative bg-rose-50 min-h-screen">
      {/* Audio tags with auto-advance logic */}
      <audio
        ref={audioRef1}
        src="/music1.mp3"
        onError={handleAudioError}
        onEnded={handleTrackEnded}
      />
      <audio
        ref={audioRef2}
        src="/music2.mp3"
        onError={handleAudioError}
        onEnded={handleTrackEnded}
      />

      <AnimatePresence>
        {!hasStarted ? (
          <motion.div key="cover" exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-rose-100">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} onClick={startExperience}>
              <Heart size={80} className="text-rose-500 cursor-pointer" fill="currentColor" />
            </motion.div>
            <button onClick={startExperience} className="mt-8 bg-rose-500 text-white px-10 py-4 rounded-full text-xl shadow-glow flex items-center gap-3">
              <Play fill="currentColor" /> Open My Heart
            </button>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <FloatingHearts />
            <FallingPetals />
            <VolumeMixer audioRef1={audioRef1} audioRef2={audioRef2} />

            <div className="fixed bottom-6 right-6 z-50 flex gap-3">
              <button onClick={switchTrack} className="w-14 h-14 rounded-full bg-rose-100/80 backdrop-blur-md flex items-center justify-center shadow-floating">
                <SkipForward className="text-rose-600" size={20} />
              </button>
              <button onClick={togglePlay} className="w-14 h-14 rounded-full bg-rose-100/80 backdrop-blur-md flex items-center justify-center shadow-floating">
                {isPlaying ? <Pause className="text-rose-600" size={20} /> : <Play className="text-rose-600" size={20} />}
              </button>
            </div>

            <Hero />
            <LoveLetter />
            <ReasonsGrid />
            <PhotoGallery />
            <SpotifyReveal />
            <CountdownTimer />
            <footer className="py-16 text-center">
              <Heart className="text-rose-500 mx-auto" fill="currentColor" />
              <p className="font-handwriting text-3xl text-rose-600">Happy Valentine's Day, Babyy.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}