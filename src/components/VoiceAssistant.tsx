import { useState } from 'react';
import { Mic } from 'lucide-react';
import { motion } from 'framer-motion';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4"
    >
      <button
        onClick={() => setIsListening(!isListening)}
        className={`rounded-full p-4 bg-primary ${isListening ? 'animate-pulse' : ''}`}
      >
        <Mic className="h-6 w-6 text-white" />
      </button>
    </motion.div>
  );
};