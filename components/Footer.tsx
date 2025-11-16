import Link from 'next/link'
import React from 'react'
import { FaDiscord, FaGithub, FaTwitch, FaTwitter } from 'react-icons/fa'

const links = [
    {href: 'https://discord.com', icon: <FaDiscord size={22}/>},
    {href: 'https://x.com', icon: <FaTwitter size={22}/>},
    {href: 'https://github.com', icon: <FaGithub size={22}/>},
    {href: 'https://twitch.com', icon: <FaTwitch size={22}/>},
]

const Footer = () => {
  return (
    <footer className="w-full bg-violet-900 py-10 text-blue-50">
      <div className="container mx-auto flex flex-col items-center gap-6 px-6 md:flex-row md:justify-between">

        {/* Left Text */}
        <p className="font-bebas tracking-wide text-lg opacity-80">
          © Nova 2025 — All Rights Reserved
        </p>

        {/* Social Icons */}
        <div className="flex gap-6">
          {links.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-100 transition-all duration-300 hover:text-blue-200 hover:scale-110"
            >
              {link.icon}
            </Link>
          ))}
        </div>

        {/* Right Link */}
        <Link 
          href="#privacy-policy"
          className="font-bebas tracking-wide text-lg hover:text-blue-300 transition-all duration-300"
        >
          Privacy Policy
        </Link>

      </div>
    </footer>
  )
}

export default Footer
