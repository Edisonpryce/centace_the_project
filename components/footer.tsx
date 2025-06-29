"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function Footer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const footerSections = [
    {
      id: "about",
      title: "About Us",
      links: [
        { href: "/about", label: "About" },
        { href: "/careers", label: "Careers" },
        { href: "/announcements", label: "Announcements" },
        { href: "/blog", label: "Blog" },
        { href: "/terms", label: "Terms" },
        { href: "/privacy", label: "Privacy" },
      ],
    },
    {
      id: "service",
      title: "Service",
      links: [
        { href: "/cloudfunding", label: "Cloudfunding" },
        { href: "/sole-funding", label: "Sole funding" },
        { href: "/business-planning", label: "Business planning" },
        { href: "/referrals", label: "Referrals" },
      ],
    },
    {
      id: "learn",
      title: "Learn",
      links: [
        { href: "/learn/navigation", label: "Navigation" },
        { href: "/learn/project-funding", label: "Project Funding" },
        { href: "/learn/visit-investment-site", label: "Visit investment site" },
        { href: "/learn/maturity-periods", label: "Maturity periods" },
      ],
    },
    {
      id: "products",
      title: "Products",
      links: [
        { href: "/research", label: "Research" },
        { href: "/payment", label: "appCent Payment" },
        { href: "/gift-card", label: "Gift card" },
        { href: "/academy", label: "Academy" },
      ],
    },
    {
      id: "support",
      title: "Support",
      links: [
        { href: "/support/chat", label: "24/7 Chat Support" },
        { href: "/support/feedback", label: "Products Feedback and Suggestions" },
      ],
    },
  ]

  return (
    <footer className="bg-[#f8fafc] dark:bg-[#0a0a0f] text-gray-900 dark:text-white pt-12 pb-6">
      <div className="max-w-5xl mx-auto px-4">
        {/* Mobile Accordion Layout */}
        <div className="block lg:hidden">
          {/* Connect Section - Always Visible */}
          <div className="mb-8">
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="grid grid-cols-4 gap-4">
              <a
                href="https://www.youtube.com/@CentaceApp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://x.com/CentaceAPP"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/centaceapp?igsh=MTludjJ4MzlpeWx0bA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://whatsapp.com/channel/0029VbAtylM9RZARVss3Xl3h"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/1ACzPeku81/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/CentaceApp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@centaceapp?_t=ZM-8wcG8GUVnYT&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="https://discord.gg/d78sHY6m"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v19.056C22 22.896 20.896 24 19.54 24H4.46C3.104 24 2 22.896 2 21.528V2.472C2 1.104 3.104 0 4.46 0h15.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
                </svg>
              </a>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2 text-sm">Theme</h4>
              <ThemeToggle />
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-2">
            {footerSections.map((section) => (
              <div key={section.id} className="border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between py-4 text-left font-bold hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-expanded={expandedSection === section.id}
                  aria-controls={`section-${section.id}`}
                >
                  <span>{section.title}</span>
                  {expandedSection === section.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                <div
                  id={`section-${section.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedSection === section.id ? "max-h-96 pb-4" : "max-h-0"
                  }`}
                >
                  <ul className="space-y-3 text-sm">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors block py-1"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid Layout - Hidden on Mobile */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Connect */}
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="grid grid-cols-4 gap-4">
              <a
                href="https://www.youtube.com/@CentaceApp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://x.com/CentaceAPP"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/centaceapp?igsh=MTludjJ4MzlpeWx0bA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://whatsapp.com/channel/0029VbAtylM9RZARVss3Xl3h"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/1ACzPeku81/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/CentaceApp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@centaceapp?_t=ZM-8wcG8GUVnYT&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="https://discord.gg/d78sHY6m"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v19.056C22 22.896 20.896 24 19.54 24H4.46C3.104 24 2 22.896 2 21.528V2.472C2 1.104 3.104 0 4.46 0h15.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
                </svg>
              </a>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2 text-sm">Theme</h4>
              <ThemeToggle />
            </div>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/announcements"
                  className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                >
                  Announcements
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700">
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h3 className="font-bold mb-4">Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/cloudfunding"
                  className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                >
                  Cloudfunding
                </Link>
              </li>
              <li>
                <Link
                  href="/sole-funding"
                  className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                >
                  Sole funding
                </Link>
              </li>
              <li>
                <Link
                  href="/business-planning"
                  className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                >
                  Business planning
                </Link>
              </li>
              <li>
                <Link
                  href="/referrals"
                  className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                >
                  Referrals
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-bold mb-4">Learn</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/learn/navigation"
                  className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                >
                  Navigation
                </Link>
              </li>
              <li>
                <Link
                  href="/learn/project-funding"
                  className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                >
                  Project Funding
                </Link>
              </li>
              <li>
                <Link
                  href="/learn/visit-investment-site"
                  className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                >
                  Visit investment site
                </Link>
              </li>
              <li>
                <Link
                  href="/learn/maturity-periods"
                  className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                >
                  Maturity periods
                </Link>
              </li>
            </ul>
          </div>

          {/* Products & Support */}
          <div>
            <div className="mb-6">
              <h3 className="font-bold mb-4">Products</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/research"
                    className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                  >
                    Research
                  </Link>
                </li>
                <li>
                  <Link
                    href="/payment"
                    className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                  >
                    appCent Payment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gift-card"
                    className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                  >
                    Gift card
                  </Link>
                </li>
                <li>
                  <Link
                    href="/academy"
                    className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                  >
                    Academy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/support/chat"
                    className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                  >
                    24/7 Chat Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support/feedback"
                    className="hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
                  >
                    Products Feedback and Suggestions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-800 light:border-gray-300 pt-6">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <div>
              <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">Centace@ 2025</p>
            </div>
            <div className="hidden md:block mx-4 h-4 border-l border-gray-700 dark:border-gray-700 light:border-gray-300"></div>
            <div>
              <Link
                href="/terms"
                className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-black"
              >
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
