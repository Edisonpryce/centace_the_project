"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = {
  code: string
  name: string
  flag: string
  dir: "ltr" | "rtl"
}

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "fr", name: "French", flag: "🇫🇷", dir: "ltr" },
  { code: "es", name: "Spanish", flag: "🇪🇸", dir: "ltr" },
  { code: "de", name: "German", flag: "🇩🇪", dir: "ltr" },
  { code: "zh", name: "Chinese", flag: "🇨🇳", dir: "ltr" },
  { code: "ar", name: "Arabic", flag: "🇸🇦", dir: "rtl" },
]

type LanguageContextType = {
  language: string
  setLanguage: (language: string) => void
  getTranslation: (key: string) => string
  isRTL: boolean
  dir: "ltr" | "rtl"
}

const defaultContext: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  getTranslation: (key: string) => key,
  isRTL: false,
  dir: "ltr",
}

const LanguageContext = createContext<LanguageContextType>(defaultContext)

export const useLanguage = () => useContext(LanguageContext)

interface LanguageProviderProps {
  children: ReactNode
}

// Simple translations for demonstration
const translations: Record<string, Record<string, string>> = {
  en: {
    welcome: "Welcome to Centace Investment Platform",
    signup: "Sign up",
    login: "Log in",
    dashboard: "Dashboard",
    overview: "Overview",
    discover: "Discover",
    portfolio: "Portfolio",
    orders: "Orders",
    settings: "Settings",
    logout: "Log out",
    terms: "Terms and Conditions",
    copyright: "Centace@ 2025",
    investments: "Investments",
    returns: "Returns",
    transactions: "Transactions",
    myAssets: "My Assets",
    recentTransactions: "Recent Transactions",
    viewAll: "View All",
    amount: "Amount",
    date: "Date",
    status: "Status",
    type: "Type",
    project: "Project",
    buy: "Buy",
    sell: "Sell",
    completed: "Completed",
    pending: "Pending",
    failed: "Failed",
    currency: "Currency",
    language: "Language",
    profile: "Profile",
    notifications: "Notifications",
    help: "Help",
    search: "Search",
    totalInvestments: "Total Investments",
    totalReturns: "Total Returns",
    activeProjects: "Active Projects",
    projectDetails: "Project Details",
    investNow: "Invest Now",
    personalInfo: "Personal Information",
    emailPreferences: "Email Preferences",
    securitySettings: "Security Settings",
    saveChanges: "Save Changes",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phoneNumber: "Phone Number",
    address: "Address",
    password: "Password",
    confirmPassword: "Confirm Password",
  },
  fr: {
    welcome: "Bienvenue sur la plateforme d'investissement Centace",
    signup: "S'inscrire",
    login: "Se connecter",
    dashboard: "Tableau de bord",
    overview: "Aperçu",
    discover: "Découvrir",
    portfolio: "Portefeuille",
    orders: "Commandes",
    settings: "Paramètres",
    logout: "Déconnexion",
    terms: "Termes et conditions",
    copyright: "Centace@ 2025",
    investments: "Investissements",
    returns: "Rendements",
    transactions: "Transactions",
    myAssets: "Mes actifs",
    recentTransactions: "Transactions récentes",
    viewAll: "Voir tout",
    amount: "Montant",
    date: "Date",
    status: "Statut",
    type: "Type",
    project: "Projet",
    buy: "Acheter",
    sell: "Vendre",
    completed: "Terminé",
    pending: "En attente",
    failed: "Échoué",
    currency: "Devise",
    language: "Langue",
  },
  es: {
    welcome: "Bienvenido a la plataforma de inversión Centace",
    signup: "Registrarse",
    login: "Iniciar sesión",
    dashboard: "Panel",
    overview: "Resumen",
    discover: "Descubrir",
    portfolio: "Portafolio",
    orders: "Órdenes",
    settings: "Configuración",
    logout: "Cerrar sesión",
    terms: "Términos y condiciones",
    copyright: "Centace@ 2025",
    investments: "Inversiones",
    returns: "Rendimientos",
    transactions: "Transacciones",
    myAssets: "Mis activos",
    recentTransactions: "Transacciones recientes",
    viewAll: "Ver todo",
    amount: "Cantidad",
    date: "Fecha",
    status: "Estado",
    type: "Tipo",
    project: "Proyecto",
    buy: "Comprar",
    sell: "Vender",
    completed: "Completado",
    pending: "Pendiente",
    failed: "Fallido",
    currency: "Moneda",
    language: "Idioma",
  },
  // Add basic translations for other languages
  de: {
    welcome: "Willkommen bei der Centace Investment Platform",
    signup: "Registrieren",
    login: "Anmelden",
    dashboard: "Dashboard",
    overview: "Übersicht",
    discover: "Entdecken",
    portfolio: "Portfolio",
    orders: "Bestellungen",
    settings: "Einstellungen",
    logout: "Abmelden",
    terms: "Allgemeine Geschäftsbedingungen",
    copyright: "Centace@ 2025",
    currency: "Währung",
    language: "Sprache",
  },
  zh: {
    welcome: "欢迎来到Centace投资平台",
    signup: "注册",
    login: "登录",
    dashboard: "仪表板",
    overview: "概览",
    discover: "发现",
    portfolio: "投资组合",
    orders: "订单",
    settings: "设置",
    logout: "登出",
    terms: "条款和条件",
    copyright: "Centace@ 2025",
    currency: "货币",
    language: "语言",
  },
  ar: {
    welcome: "مرحبًا بك في منصة Centace للاستثمار",
    signup: "التسجيل",
    login: "تسجيل الدخول",
    dashboard: "لوحة التحكم",
    overview: "نظرة عامة",
    discover: "اكتشاف",
    portfolio: "المحفظة",
    orders: "الطلبات",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
    terms: "الشروط والأحكام",
    copyright: "Centace@ 2025",
    investments: "الاستثمارات",
    returns: "العوائد",
    transactions: "المعاملات",
    myAssets: "أصولي",
    recentTransactions: "المعاملات الأخيرة",
    viewAll: "عرض الكل",
    amount: "المبلغ",
    date: "التاريخ",
    status: "الحالة",
    type: "النوع",
    project: "المشروع",
    buy: "شراء",
    sell: "بيع",
    completed: "مكتمل",
    pending: "قيد الانتظار",
    failed: "فشل",
    currency: "العملة",
    language: "اللغة",
    profile: "الملف الشخصي",
    notifications: "الإشعارات",
    help: "المساعدة",
    search: "بحث",
  },
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(defaultContext.language)
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")
  const [isRTL, setIsRTL] = useState(false)

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("preferredLanguage")
      if (savedLanguage) {
        setLanguageState(savedLanguage)
        const langObj = languages.find((l) => l.code === savedLanguage)
        if (langObj) {
          setDir(langObj.dir)
          setIsRTL(langObj.dir === "rtl")
        }
      }
    }
  }, [])

  // Update localStorage when language changes
  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage)
    const langObj = languages.find((l) => l.code === newLanguage)
    if (langObj) {
      setDir(langObj.dir)
      setIsRTL(langObj.dir === "rtl")
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLanguage", newLanguage)
      // Dispatch event for other components to listen to
      const event = new CustomEvent("languageChanged", {
        detail: {
          language: newLanguage,
          dir: langObj?.dir || "ltr",
          isRTL: langObj?.dir === "rtl",
        },
      })
      window.dispatchEvent(event)
    }
  }

  // Get translation for a key
  const getTranslation = (key: string): string => {
    if (!translations[language] || !translations[language][key]) {
      // Fallback to English or the key itself
      return translations.en?.[key] || key
    }
    return translations[language][key]
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getTranslation, isRTL, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}
