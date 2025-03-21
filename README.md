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
