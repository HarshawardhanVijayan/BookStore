import React from 'react';
import { motion } from 'framer-motion';
import './Welcome.css';

const Welcome = () => {
  return (
    <motion.div
      className="welcome-container"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h1 className="welcome-heading">Welcome, User!</h1>
      <p className="welcome-text">
        Discover books you'll love, connect with readers, and explore curated recommendations.
      </p>
    </motion.div>
  );
};

export default Welcome;
