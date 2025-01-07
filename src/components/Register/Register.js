import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        console.log('Registration successful:', formData);
        setError('');
    };

    return (
        <motion.div
            className="register-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.h1
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6 }}
            >
                Create an Account
            </motion.h1>

            <form onSubmit={handleSubmit}>
                <motion.div className="form-group">
                    <label>Name:</label>
                    <motion.input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        whileFocus={{ borderColor: '#007bff' }}
                        required
                    />
                </motion.div>

                <motion.div className="form-group">
                    <label>Email:</label>
                    <motion.input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        whileFocus={{ borderColor: '#007bff' }}
                        required
                    />
                </motion.div>

                <motion.div className="form-group">
                    <label>Password:</label>
                    <motion.input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        whileFocus={{ borderColor: '#007bff' }}
                        required
                    />
                </motion.div>

                <motion.div className="form-group">
                    <label>Confirm Password:</label>
                    <motion.input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
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
                    Register
                </motion.button>

                <motion.p className="login-text">
                    Already have an account? <a href="/login">Login</a>
                </motion.p>
            </form>
        </motion.div>
    );
};

export default Register;
