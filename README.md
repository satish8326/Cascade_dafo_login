# Cascade Dafo Login

A modern, production-ready login application built with React 18, TypeScript, and Material UI. This application provides a beautiful, responsive login interface for the Cascade Dafo platform.

## 🚀 Features

- **Modern UI/UX**: Beautiful login screen with custom background and centered card design
- **Form Validation**: Client-side validation for username/email and password fields
- **Authentication Context**: React Context API for state management with localStorage persistence
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **TypeScript**: Full TypeScript support with strict type checking
- **Material UI**: Built with Material UI v5 for consistent, accessible components
- **React Router**: Client-side routing with React Router v6
- **Custom Theme**: Branded theme with Cascade Dafo color scheme

## 📋 Tech Stack

- **React 18.2.0** - UI library
- **TypeScript 5.6.3** - Type safety
- **Vite 5.2.0** - Build tool and dev server
- **Material UI (MUI) 5.15.15** - Component library
- **React Router DOM 6.22.3** - Routing
- **Emotion** - CSS-in-JS styling
- **Axios 1.13.2** - HTTP client (for future API integration)

## 📁 Project Structure

```
src/
├── assets/              # Images and static assets
│   ├── cascade-dafo-logo.png
│   ├── cascade-logo.png
│   └── login-bg.png
├── components/          # Reusable UI components
│   ├── FormInput.tsx    # Custom text input component
│   └── PrimaryButton.tsx # Primary action button
├── context/             # React Context providers
│   └── AuthContext.tsx   # Authentication state management
├── layouts/             # Layout components
│   └── AuthLayout.tsx   # Authentication page layout
├── pages/               # Page components
│   └── Login.tsx        # Login page
├── routes/              # Routing configuration
│   └── AppRoutes.tsx    # Application routes
├── sections/            # Feature sections
│   └── LoginForm.tsx    # Login form component
├── styles/              # Global styles
│   └── global.css       # Global CSS styles
├── theme/               # MUI theme configuration
│   └── theme.ts         # Custom theme
├── App.tsx              # Root component
├── main.tsx             # Application entry point
└── vite-env.d.ts        # Vite type declarations
```

## 🛠️ Installation

### Prerequisites

- Node.js 16+ and npm (or yarn/pnpm)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cascade_dafo_login
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000/login`

## 📝 Available Scripts

- `npm run dev` - Start development server (runs on port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎨 Key Components

### LoginForm
The main login form component with:
- Username/email input field
- Password input field with validation
- Form validation with error messages
- "Forgot Password" link
- Login button with loading state
- "Sign Up" link

### AuthLayout
Layout wrapper for authentication pages featuring:
- Full-screen background image
- Centered white card with shadow
- Responsive design for mobile devices

### AuthContext
Authentication state management:
- User state management
- Login/logout functionality
- localStorage persistence
- Authentication status tracking

## 🔐 Authentication Flow

Currently, the application uses a mock authentication system:

1. User enters username and password
2. Form validates input fields
3. On successful validation, user is "logged in"
4. User data is stored in localStorage
5. Authentication state is managed via React Context

**Note**: Replace the mock authentication in `AuthContext.tsx` with your actual API integration.

## 🎨 Theming

The application uses a custom Material UI theme located in `src/theme/theme.ts`:

- **Primary Color**: `#2d5499` (Cascade Dafo blue)
- **Font Family**: Poppins (with fallbacks)
- **Border Radius**: 12px (default), 999px (pill-shaped inputs/buttons)
- **Typography**: Custom font weights and sizes

## 📱 Responsive Design

The application is fully responsive:
- **Desktop**: Full background image with centered card
- **Tablet**: Optimized card width and spacing
- **Mobile**: Adjusted background sizing with fallback background color

## 🔧 Configuration

### Vite Configuration
Located in `vite.config.ts`:
- Development server runs on port 3000
- React plugin enabled for JSX/TSX support

### TypeScript Configuration
- Strict mode enabled
- Module resolution: bundler
- Target: ES2020
- JSX: react-jsx

## 🚀 Building for Production

```bash
npm run build
```

This will:
1. Type-check the codebase
2. Build optimized production bundle
3. Output to `dist/` directory

## 📦 Deployment

The `dist/` folder contains the production-ready build that can be deployed to any static hosting service:

- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3**: Upload `dist` folder contents
- **GitHub Pages**: Deploy from `dist` folder

## 🔄 Future Enhancements

- [ ] Real API integration for authentication
- [ ] Password reset functionality
- [ ] User registration page
- [ ] Dashboard page (after login)
- [ ] Protected routes
- [ ] Session management
- [ ] Multi-factor authentication support

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. For questions or issues, please contact the development team.

## 📞 Support

For support or questions, please contact the Cascade Dafo development team.

---

**Built with ❤️ for Cascade Dafo**
