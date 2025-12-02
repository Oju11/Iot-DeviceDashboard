Iot DeviceDashboard — Full Stack IoT Dashboard

A modern full-stack IoT monitoring dashboard built using React + TypeScript on the frontend and Node.js + TypeScript on the backend.
This project includes real-time device state updates, user interface components, server routes, shared schema definitions, and build scripts — all organized in a clean monorepo-style folder structure.

Tech Stack
Frontend (client)

React + TypeScript

Tailwind CSS

Vite

React Query

Radix UI

Recharts

Backend (server)

Node.js

TypeScript

Express

Custom API routes

Vite (backend bundling)

Shared

TypeScript types & schema

Can be used by both client and server

📂 Folder Structure
DeviceDashboard/
│
├── client/                # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
│
├── server/                # Backend (Node + TypeScript)
│   ├── index.ts
│   ├── routes.ts
│   ├── static.ts
│   ├── storage.ts
│   ├── vite.ts
│   └── tsconfig.json
│
├── shared/                # Shared types & schema
│   └── schema.ts
│
├── script/                # Build scripts
│   └── build.ts
│
├── .gitignore
├── package.json
├── components.json
└── README.md

🛠️ Installation
1️⃣ Install root dependencies
npm install

2️⃣ Install client dependencies
cd client
npm install

3️⃣ Install server dependencies
cd ../server
npm install

▶️ Running the Full Project
Start Client (React)
cd client
npm run dev


Runs at: http://localhost:5173

Start Server (Node)
cd server
npm run dev


Usually runs at: http://localhost:3000

🌟 Features

📡 Real-time IoT device status

📊 Modern UI with charts

🔄 API routes for data handling

♻️ Shared TypeScript models

⚡ Fast development with Vite

🎨 Clean & modular component structure
