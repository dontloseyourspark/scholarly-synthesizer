
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Topics from '@/pages/Topics';
import TopicDetail from '@/pages/TopicDetail';
import About from '@/pages/About';
import Contribute from '@/pages/Contribute';
import AdminPanel from '@/pages/AdminPanel';
import NotFound from '@/pages/NotFound';
import ProfilePage from '@/pages/ProfilePage';
import ClimateChange from '@/pages/ClimateChange';
import TopicPublications from '@/pages/TopicPublications';
import EvolutionOfHumans from '@/pages/EvolutionOfHumans';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:slug" element={<TopicDetail />} />
        <Route path="/topics/:slug/publications" element={<TopicPublications />} />
        <Route path="/climate-change" element={<ClimateChange />} />
        <Route path="/evolution-of-humans" element={<EvolutionOfHumans />} />
        <Route path="/about" element={<About />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" closeButton />
    </BrowserRouter>
  )
}

export default App;
