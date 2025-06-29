# Centace Investment Platform

A modern, full-stack investment platform built with Next.js, TypeScript, and Supabase. This platform enables users to discover, invest in, and manage various investment projects with real-time updates and comprehensive portfolio management.

## 🚀 Features

### Core Investment Features
- **Project Discovery**: Browse and filter investment opportunities
- **Portfolio Management**: Track investments and returns
- **Real-time Updates**: Live project updates and notifications
- **Investment Analytics**: Detailed financial reports and statements
- **Site Visits**: Book visits to investment locations

### User Experience
- **Multi-language Support**: Arabic and English with RTL support
- **Multi-currency**: Support for multiple currencies with real-time conversion
- **Dark/Light Mode**: Comprehensive theming system
- **Responsive Design**: Mobile-first approach with professional UI
- **Real-time Notifications**: Live updates on investments and platform news

### Admin Features
- **User Management**: Comprehensive user administration
- **Announcement System**: Platform-wide announcements and news
- **Booking Management**: Handle site visit requests
- **Analytics Dashboard**: Platform statistics and insights

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icons

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Real-time Subscriptions** - Live data updates
- **Row Level Security** - Secure data access

### Authentication & Security
- **Supabase Auth** - Complete authentication system
- **Role-based Access Control** - Admin and user roles
- **Session Management** - Secure session handling

### Additional Features
- **Email Service** - Automated notifications
- **Error Handling** - Comprehensive error management
- **Loading States** - Smooth user experience
- **Internationalization** - Multi-language support

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Environment Variables
Create a \`.env.local\` file in the root directory:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email Configuration (Optional)
EMAIL_HOST=your_smtp_host
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email
EMAIL_PASSWORD=your_password
EMAIL_FROM=noreply@yourplatform.com

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_VERSION=1.0.0
\`\`\`

### Setup Steps

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd investment-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration files in the \`migrations/\` folder
   - Configure Row Level Security policies

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to \`http://localhost:3000\`

## 🗄️ Database Schema

The platform uses the following main tables:

- **profiles** - User profile information
- **projects** - Investment projects
- **investments** - User investments
- **transactions** - Financial transactions
- **announcements** - Platform announcements
- **bookings** - Site visit bookings
- **notifications** - User notifications

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application: \`npm run build\`
2. Start the production server: \`npm start\`

## 📱 Mobile Support

The platform is fully responsive and includes:
- Mobile-optimized navigation
- Touch-friendly interfaces
- Progressive Web App features
- Offline capability for cached data

## 🌐 Internationalization

Currently supports:
- **English** (default)
- **Arabic** with RTL layout support

To add a new language:
1. Add translations to the language context
2. Update the language dropdown component
3. Add appropriate fonts if needed

## 🔧 Development

### Project Structure
\`\`\`
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
├── lib/                   # Utility functions and services
├── hooks/                 # Custom React hooks
├── migrations/            # Database migration files
├── public/               # Static assets
└── types/                # TypeScript type definitions
\`\`\`

### Key Components
- **Landing Page** - Main marketing page with announcements
- **Dashboard** - User investment dashboard
- **Admin Panel** - Administrative interface
- **Authentication** - Login/signup flows
- **Footer** - Responsive footer with mobile accordion

### Custom Hooks
- \`useTranslation\` - Internationalization
- \`useCurrency\` - Currency conversion
- \`useRealTimeNotifications\` - Live notifications

## 🧪 Testing

Run tests with:
\`\`\`bash
npm test
\`\`\`

## 📄 API Routes

The platform includes several API routes:
- \`/api/health\` - Health check endpoint
- \`/api/notifications/create\` - Create notifications
- \`/api/bookings\` - Booking management
- \`/api/test-connection\` - Database connection testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/new-feature\`
3. Commit changes: \`git commit -am 'Add new feature'\`
4. Push to branch: \`git push origin feature/new-feature\`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in the \`/docs\` folder

## 🔄 Version History

- **v1.0.0** - Initial release with core investment features
- **v1.1.0** - Added multi-language support
- **v1.2.0** - Enhanced mobile experience
- **v1.3.0** - Real-time notifications and announcements

---

Built with ❤️ using Next.js and Supabase
