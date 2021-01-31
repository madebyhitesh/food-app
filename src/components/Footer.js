import React from 'react'

const Footer=  () =>{
    return (
        <footer>
            <section className="top-section">
                <div className="section-left">

                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Contact Us</li>
                        <li>Become a member</li>
                        <li>My Account</li>
                        <li>Privacy Policy</li>
                    </ul>
                </nav>

                <div className="social-icons green-text">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-youtube"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-snapchat"></i>
                </div>
                </div>

                <div className="section-right">
                    <h2 className="normal-text">Hear from us</h2>
                    <form >
                        <input type="text" placeholder="Enter your email"/>
                        <button className="red-button">Send</button>
                    </form>
                </div>
            </section>

            <section className="bottom-section">
                <address>
                    Hno. 1332 Sector 443/A Chandigarh, Chandigarh, IN
                </address>

                <div className="contact">
                    <h4 className="normal-text">555-4822</h4>
                    <p className="light-text">hiteshkumar@gmail.com</p>
                </div>
            </section>
        </footer>
    )
}


export default React.memo(Footer)