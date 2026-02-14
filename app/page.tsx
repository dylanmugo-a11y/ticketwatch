'use client';

import Image from 'next/image';
import Link from 'next/link';
import QRCode from 'qrcode.react';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900">
      {/* Navigation */}
      <nav className="border-b border-purple-800 bg-black/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold text-purple-400">
            🎫 TicketWatch
          </div>
          <div className="text-sm text-purple-300">Irish Music Fans</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Never Miss a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Sold-Out Gig</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Get instant WhatsApp alerts when concert tickets become available in Ireland. Watch for your favorite artists, set your price limit, and we'll notify you the moment tickets drop.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎵</span>
                <div>
                  <h3 className="font-bold text-white">Search Events</h3>
                  <p className="text-gray-400">Find concerts, festivals, and events across Ireland</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <h3 className="font-bold text-white">Set Price Alerts</h3>
                  <p className="text-gray-400">Watch for tickets under your budget</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚨</span>
                <div>
                  <h3 className="font-bold text-white">Instant Notifications</h3>
                  <p className="text-gray-400">Get WhatsApp alerts seconds after tickets drop</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <h3 className="font-bold text-white">Completely Free to Start</h3>
                  <p className="text-gray-400">1 active watch on free tier, unlimited on Premium</p>
                </div>
              </div>
            </div>

            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition mb-4 w-full md:w-auto">
              Start Watching Now →
            </button>
            <p className="text-sm text-gray-400">Takes 30 seconds. No credit card needed.</p>
          </div>

          {/* Right: WhatsApp QR + Features */}
          <div className="flex flex-col items-center space-y-8">
            {/* QR Code */}
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <p className="text-center text-sm font-bold text-gray-800 mb-4">Scan to Chat on WhatsApp</p>
              <QRCode 
                value="https://wa.me/353858536569?text=Hi%20TicketWatch" 
                size={256}
                level="H"
                includeMargin={true}
              />
              <p className="text-center text-xs text-gray-600 mt-4">or message +353 85 853 6569</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="bg-purple-800/50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-300">500+</div>
                <div className="text-xs text-gray-400">Active Watches</div>
              </div>
              <div className="bg-purple-800/50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-300">5K+</div>
                <div className="text-xs text-gray-400">Events Tracked</div>
              </div>
              <div className="bg-purple-800/50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-300">100%</div>
                <div className="text-xs text-gray-400">Free Tier</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-black/50 border-y border-purple-800 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-white text-center mb-12">Simple Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <p className="text-gray-400 mb-6">Perfect for getting started</p>
              <div className="text-3xl font-black text-white mb-6">€0<span className="text-lg text-gray-400">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-300">
                  <span>✓</span> 1 active watch
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span>✓</span> Unlimited searches
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span>✓</span> Instant alerts
                </li>
                <li className="flex items-center gap-2 text-gray-500">
                  <span>✗</span> Multiple watches
                </li>
              </ul>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition">
                Start Free
              </button>
            </div>

            {/* Premium Tier */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-lg border border-purple-400 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black font-bold px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <p className="text-white/80 mb-6">For serious music fans</p>
              <div className="text-3xl font-black text-white mb-6">€4.99<span className="text-lg text-white/70">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white">
                  <span>✓</span> Unlimited watches
                </li>
                <li className="flex items-center gap-2 text-white">
                  <span>✓</span> Unlimited searches
                </li>
                <li className="flex items-center gap-2 text-white">
                  <span>✓</span> Instant alerts
                </li>
                <li className="flex items-center gap-2 text-white">
                  <span>✓</span> Priority support
                </li>
              </ul>
              <button className="w-full bg-white hover:bg-gray-100 text-purple-600 font-bold py-2 px-4 rounded transition">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-black text-white text-center mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">1</div>
            <h3 className="font-bold text-white mb-2">Message on WhatsApp</h3>
            <p className="text-gray-400 text-sm">"Watch for Fred Again under €80"</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">2</div>
            <h3 className="font-bold text-white mb-2">We Confirm the Event</h3>
            <p className="text-gray-400 text-sm">Show you venue, date, current price</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">3</div>
            <h3 className="font-bold text-white mb-2">Say "Yes" to Create</h3>
            <p className="text-gray-400 text-sm">Your watch is now active</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">4</div>
            <h3 className="font-bold text-white mb-2">Get Instant Alerts</h3>
            <p className="text-gray-400 text-sm">When tickets drop, we notify you</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-black/50 border-y border-purple-800 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-white text-center mb-12">Loved by Irish Music Fans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700">
              <div className="flex gap-1 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-300 mb-4">"Finally got tickets to Electric Picnic! TicketWatch saved me."</p>
              <p className="font-bold text-white">Sarah, Dublin</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700">
              <div className="flex gap-1 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-300 mb-4">"Best €4.99 I've spent. Been to 5 gigs I thought were sold out."</p>
              <p className="font-bold text-white">Liam, Cork</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700">
              <div className="flex gap-1 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-300 mb-4">"Works exactly as promised. No spam, just the alerts I need."</p>
              <p className="font-bold text-white">Emma, Galway</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-black text-white mb-6">Ready to Never Miss a Gig?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Join hundreds of Irish music fans who've already found their next favorite concert.</p>
        
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition mb-6">
          Start Watching Now (Free)
        </button>
        
        <p className="text-gray-400">30 seconds to set up. No credit card needed.</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-800 bg-black py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>TicketWatch © 2026 • Made for Irish Music Fans • <a href="#" className="text-purple-400 hover:text-purple-300">Privacy</a> • <a href="#" className="text-purple-400 hover:text-purple-300">Terms</a></p>
        </div>
      </footer>
    </div>
  );
}
