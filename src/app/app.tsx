import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './app.css';
import Navbar from '../navbar/navbar';
import NoPage from '../no-page/no-page';
import Home from '../home/home';
import MeetTheTeam from '../meet-the-team/meet-the-team';
import DownloadApp from '../download-app/download-app';
import ContactUs from '../contact-us/contact-us';
import SponsorUs from '../sponsor-us/sponsor-us';
import Competitions from '../competitions/competitions';
import Awards from '../awards/awards';
import ScrollToTop from "./ScrollToTop.js";

function App() {
    return (
        <BrowserRouter>
            {/* Navbar should be rendered outside of the Routes */}
            <Navbar />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="awards" element={<Awards />} />
                <Route path="meet-the-team" element={<MeetTheTeam />} />
                <Route path="sponsor-us" element={<SponsorUs />} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="download-app" element={<DownloadApp />} />
                <Route path="competitions" element={<Competitions />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
