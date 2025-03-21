

# Guardian Pulse Vision: A Cybersecurity Toolkit

## Project Overview

**Guardian Pulse Vision** is a web-based cybersecurity toolkit designed to empower users to identify and mitigate digital vulnerabilities. Built with a modern tech stack, the application provides an intuitive interface for users to scan websites for common security issues, receive actionable recovery steps, and access educational resources to enhance their online safety. The project was developed as part of a hackathon to address the growing need for accessible cybersecurity tools in an increasingly digital world.

### Problem Statement
With the rise of cyber threats such as phishing, ransomware, and account compromises, many individuals and small businesses lack the tools and knowledge to protect themselves. Existing solutions are often complex, expensive, or inaccessible to non-technical users. Guardian Pulse Vision aims to bridge this gap by providing a user-friendly platform to detect vulnerabilities and guide users through recovery steps.

### Solution
Guardian Pulse Vision offers:
- A **vulnerability scanner** to check websites for common security issues (e.g., missing HTTP headers, exposed directories, SSL/TLS misconfigurations).
- **Step-by-step recovery guides** for various cyber incidents (e.g., account hacks, ransomware, phishing).
- An educational interface to help users understand and prevent future threats.

## Features

1. **Vulnerability Scanner**:
   - Scans a user-provided URL for security issues such as missing security headers, exposed directories, outdated server software, and SSL/TLS misconfigurations.
   - Provides detailed results and actionable mitigation steps with links to OWASP resources.

2. **Incident Recovery Guides**:
   - Offers tailored recovery steps for incidents like account compromise, ransomware, device hacks, financial fraud, and phishing attacks.
   - Includes progress tracking and interactive navigation through recovery steps.

3. **Educational Resources**:
   - Links to OWASP guides for learning about specific vulnerabilities (e.g., XSS, clickjacking, SQL injection).
   - A "Guardian Help" section for users to seek expert assistance (placeholder for future integration).

4. **Responsive Design**:
   - Built with Tailwind CSS for a modern, responsive UI that works on both desktop and mobile devices.
   - Uses glassmorphism design for an engaging user experience.

5. **Deployment on Vercel**:
   - Deployed as a serverless application on Vercel, ensuring scalability and ease of access.

## Tech Stack

- **Frontend**:
  - **React**: For building a dynamic, component-based UI.
  - **Vite**: As the build tool for fast development and optimized production builds.
  - **React Router**: For client-side routing.
  - **Tailwind CSS**: For styling with utility-first CSS.
  - **Lucide React**: For icons.
  - **@tanstack/react-query**: For data fetching and state management.
  - **Sonner**: For toast notifications.
  - **Next Themes**: For dark/light mode support.
  - **@radix-ui**: For accessible UI components (dialogs, toasts, tooltips, labels).
  - **Three.js**: For 3D globe visualization (used in the `Globe` component).

- **Backend**:
  - **Vercel Serverless Functions**: For handling the vulnerability scanner API (`/api/scanner`).
  - **ssl-checker**: For SSL/TLS vulnerability checks.
  - **Node.js Fetch API**: For making HTTP requests to scan target URLs.

- **Database** (Optional):
  - **Supabase**: Integrated for user authentication and data storage (e.g., user profiles, leaderboard data).

- **Deployment**:
  - **Vercel**: For hosting the frontend and serverless API.
  - **GitHub**: For version control and CI/CD integration with Vercel.

## Project Architecture

### Directory Structure



guardian-pulse-vision/
├── api/
│   └── scanner.ts          # Vercel serverless function for vulnerability scanning
├── src/
│   ├── components/
│   │   ├── Auth/          # Authentication components (e.g., Register)
│   │   ├── Globe/         # 3D globe visualization using Three.js
│   │   ├── Leaderboard/   # Leaderboard component
│   │   ├── Profile/       # User profile component
│   │   ├── SanctuaryToolkit/ # Main toolkit component for vulnerability scanning and recovery
│   │   └── ui/            # Reusable UI components (dialog, toast, tooltip, etc.)
│   ├── utils/             # Utility functions (e.g., animations)
│   ├── App.tsx            # Main app component with routing
│   └── main.tsx           # Entry point for React
├── public/                # Static assets
├── vercel.json            # Vercel configuration for deployment
├── vite.config.ts         # Vite configuration
├── package.json           # Project dependencies and scripts
└── .env                   # Environment variables (e.g., Supabase keys, API base URL)




### Data Flow
1. **User Input**:
   - Users access the `SanctuaryToolkit` component via the `/sanctuary` route.
   - They select an incident type (e.g., "Check Vulnerability") and provide a URL to scan.

2. **Frontend to Backend**:
   - The `SanctuaryToolkit` component sends a POST request to `/api/scanner` with the target URL.
   - The request is handled by the Vercel serverless function in `api/scanner.ts`.

3. **Vulnerability Scanning**:
   - The `scanner.ts` function performs checks for:
     - Missing HTTP security headers (e.g., X-Frame-Options, CSP, HSTS).
     - Exposed sensitive directories (e.g., `/admin`, `/.git`).
     - Outdated server software (via Server header).
     - HTTP TRACE method vulnerabilities.
     - SSL/TLS issues (using `ssl-checker`).
     - Open ports (basic check).
     - CORS misconfigurations.
   - Results are returned as a JSON array of vulnerabilities.

4. **Frontend Response**:
   - The `SanctuaryToolkit` component displays the scan results and provides recovery steps with links to OWASP resources.
   - Users can navigate through steps using "Previous" and "Next" buttons.

## Setup Instructions

### Prerequisites
- **Node.js** (LTS version, e.g., 20.x or 22.x)
- **npm** (comes with Node.js)
- **Git** (for version control)
- **GitHub Account** (for deployment via Vercel)
- **Supabase Account** (optional, for authentication and database)

### Local Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/guardian-pulse-vision.git
   cd guardian-pulse-vision



Install Dependencies:
bash

Collapse

Wrap

Copy
npm install
Set Up Environment Variables: Create a .env file in the project root:
env

Collapse

Wrap

Copy
VITE_API_BASE_URL=http://localhost:5173
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
Run the Development Server:
bash

Collapse

Wrap

Copy
npm run dev
The app will be available at http://localhost:5173.
Navigate to http://localhost:5173/sanctuary to access the toolkit.
Deployment on Vercel
Push to GitHub:
bash

Collapse

Wrap

Copy
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/guardian-pulse-vision.git
git branch -M main
git push -u origin main
Deploy via Vercel Dashboard:
Go to vercel.com and sign in.
Click "New Project" > "Import Git Repository".
Select your guardian-pulse-vision repository.
Configure:
Framework Preset: Select "Other".
Environment Variables:
VITE_API_BASE_URL=https://your-app-name.vercel.app
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
Click "Deploy".
Access the Deployed App:
Vercel will provide a URL (e.g., https://guardian-pulse-vision.vercel.app).
Update VITE_API_BASE_URL in the Vercel dashboard with this URL and redeploy if needed.
