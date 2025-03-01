# AI Doodle #0 - React + TypeScript + Vite

This is a React implementation of the AI Doodle #0 project, an experimental cyberpunk interface with reactive physics and realistic pendulum motion that responds to your scrolling.

## Features

- 🎨 Multiple themes (Cyberpunk, Vaporwave, Matrix, Light, Midnight)
- 🌀 Physics-based animations with simulated pendulum motion
- 📱 Gyroscope integration for mobile devices
- 🎛️ Adjustable physics parameters
- 📊 Debug information panel

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS (with theme support)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/ai-doodle-react.git
   cd ai-doodle-react
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Build for production
   ```
   npm run build
   # or
   yarn build
   ```

## Project Structure

```
src/
├── components/       # UI components
├── contexts/         # React contexts for state management
├── hooks/            # Custom React hooks
├── styles/           # Global and theme styles
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
└── main.tsx          # Entry point
```

## License

MIT