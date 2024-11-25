import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import logo from '../logo.png';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <header>
                <img src={logo} alt="Logo" className="logo" />
                <nav>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/register')}>Sign Up</button>
                </nav>
            </header>
            <main>
                <section className="features">
                    <div className="feature">
                        <h3>Mental Support</h3>
                        <p>Access mental health resources and counseling services.</p>
                    </div>
                    <div className="feature">
                        <h3>Physical Support</h3>
                        <p>Find medical assistance and safety tips.</p>
                    </div>
                    <div className="feature">
                        <h3>Legal Support</h3>
                        <p>Get guidance on legal actions and protection orders.</p>
                    </div>
                </section>
                <section className="info">
                    <h2>About Us</h2>
                    <p>
                        Our website provides comprehensive support for victims seeking mental, physical, and legal assistance. We are committed to helping you navigate through challenging times with the support you need.
                    </p>
                    <div className="details">
                        <div>
                            <h4>Regions</h4>
                            <p>Available in multiple regions.</p>
                        </div>
                        <div>
                            <h4>Age Groups</h4>
                            <p>Support for all age groups.</p>
                        </div>
                        <div>
                            <h4>Languages</h4>
                            <p>Multiple languages supported.</p>
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Victim Support System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
