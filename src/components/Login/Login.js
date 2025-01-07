import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Hook to handle routing

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            console.log('Login successful');
            setError('');
        } else {
            setError('Please fill in both fields.');
        }
    };

    return (
        <motion.div
            className="login-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6 }}
            >
                Welcome Back
            </motion.h1>
            
            <form onSubmit={handleSubmit}>
                <motion.div className="form-group" whileFocus={{ scale: 1.05 }}>
                    <label>Email:</label>
                    <motion.input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        whileFocus={{ borderColor: '#007bff' }}
                        required
                    />
                </motion.div>
                
                <motion.div className="form-group" whileFocus={{ scale: 1.05 }}>
                    <label>Password:</label>
                    <motion.input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        whileFocus={{ borderColor: '#007bff' }}
                        required
                    />
                </motion.div>

                {error && (
                    <motion.p
                        className="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {error}
                    </motion.p>
                )}

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Login
                </motion.button>

                <motion.p
                    className="register-text"
                    whileHover={{ color: '#28a745' }}
                    onClick={() => navigate('/register')}  // Navigate to Register Page
                >
                    Don't have an account? <span>Sign Up</span>
                </motion.p>
            </form>
        </motion.div>
    );
};

export default Login;
