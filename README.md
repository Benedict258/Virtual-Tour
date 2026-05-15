# Lagos Rhythm 🌍

An immersive virtual tour platform designed to showcase the beauty, culture, and rhythm of Lagos, Nigeria. This application allows users to explore iconic destinations through high-quality virtual experiences and participate in live guided tours.

## ✨ Features

- **Live Guided Tours**: Real-time virtual experiences with interactive chat and live host overlays.
- **Vibrant Hero Experience**: Immersive introduction to featured tours with smooth animations using `motion`.
- **Dynamic Catalog**: Filterable and searchable collection of tours across various categories (Culture, Nature, History, etc.).
- **Interactive Chat**: Real-time feel chat interface with pinned host messages.
- **Newsletter Integration**: Clean subscription flow for users to stay updated on new journeys.
- **Become a Host**: Multi-step onboarding flow for local guides to join the platform.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices using Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── BecomeHostModal  # Onboarding flow modal
│   ├── Catalog          # Searchable tour library
│   ├── Hero             # Engaging landing section
│   ├── LiveTour         # The core virtual tour experience
│   └── ...
├── lib/                 # Utility functions (cn helper, etc.)
├── constants.ts         # Application data and configuration
├── types.ts             # TypeScript interfaces and types
├── App.tsx              # Main layout and routing logic
└── index.css            # Global styles and Tailwind configuration
```

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📄 License

This project is licensed under the Apache-2.0 License.
