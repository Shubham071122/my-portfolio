import { Icons } from "@/components/icons";
import {
  HomeIcon,
  NotebookIcon,
  UserIcon,
  BriefcaseIcon,
  MailIcon
} from "lucide-react";

export const DATA = {
  name: "Shubham",
  initials: "SK",
  url: "https://techshubham.cloud",
  location: "New Delhi, India",
  locationLink: "https://www.google.com/maps/place/new+delhi",
  description:
    "Full Stack Developer | Building Scalable Web Applications | DevOps & Cloud",
  summary:
    "I’m a developer who loves building clean, fast web apps that just work. Most of my time is spent writing Next.js, Node.js, and Go, or configuring deployments on AWS. I focus on keeping things simple, writing tidy code, and learning new tools as I build.",
  avatarUrl: "/me.jpeg",
  skills: [
    "C++",
    "GoLang",
    "Javascript",
    "Python",
    "Typescript",
    "Express.js",
    "Firebase",
    "GraphQL",
    "Node.js",
    "Supabase",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "Next.js",
    "React",
    "Redux",
    "TailwindCSS",
    "HuggingFace",
    "Ollama",
    "AWS",
    "Docker",
    "Git",
    "Jira",
    "Linux"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/about", icon: UserIcon, label: "About" },
    { href: "/projects", icon: BriefcaseIcon, label: "Projects" },
    { href: "/blogs", icon: NotebookIcon, label: "Blogs" },
    { href: "/contact", icon: MailIcon, label: "Contact" },
  ],
  contact: {
    email: "shubhamkumar.work3@gmail.com",
    // tel: "+9",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Shubham071122",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/shubhamkumar0711/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/ShubhamRawat_7",
        icon: Icons.x,

        navbar: true,
      },
      // Youtube: {
      //   name: "Youtube",
      //   url: "https://dub.sh/dillion-youtube",
      //   icon: Icons.youtube,
      //   navbar: true,
      // },
      // email: {
      //   name: "Send Email",
      //   url: "#",
      //   icon: Icons.email,

      //   navbar: false,
      // },
    },
  },

  work: [
    {
      company: "Acowale",
      href: "https://acowale.com",
      badges: [],
      location: "Bengaluru, India (Remote)",
      title: "Software Development Engineer I (SDE-1)",
      logoUrl: "/acowale.png",
      start: "Jun 2026",
      end: "Present",
      linkedinHref: "https://www.linkedin.com/company/acowale/",
      technologies: ["Fastify", "Node.js", "Bun", "TypeScript", "PostgreSQL", "Prisma", "Zod", "Express", "React", "Docker", "AWS"],
      description: "",
    },
    {
      company: "Plynk",
      href: "https://plynk.in",
      badges: ["Active Development", "Beta"],
      location: "Self-Project",
      title: "Co-Founder & Lead Developer",
      logoUrl: "/plynk.png",
      start: "Feb 2026",
      end: "May 2026",
      status: "paused",
      description:
        "Building a platform for developers and digital creators. Currently developing a custom username system and focusing on a high-end UI with glassmorphism design. Handling the full-stack architecture using Next.js, Node.js, and PostgreSQL.",
      technologies: ["Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "TailwindCSS"],
    },
    {
      company: "Earnest Data Analytics",
      href: "https://earnestdata-analytics.in/",
      badges: [],
      location: "Noida, India",
      title: "Full Stack Developer",
      logoUrl: "/earnest.jpeg",
      start: "May 2025",
      end: "Mar 2026",
      linkedinHref: "https://www.linkedin.com/company/earnest-data-analytics/",
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "AWS", "TailwindCSS", "GitHub Actions"],
      description:
        "Developed and shipped production features for a CRM and ONDC-integrated rewards platform in a Next.js 14 + TypeScript + Node.js/Express stack, contributing to a 20% increase in feature adoption and improved user workflows.\nReduced frontend load time by 25% through code splitting, lazy loading, and API response caching on high-traffic pages.\nDesigned and versioned RESTful APIs for reward workflows, promo-code transactions, and user management with structured validation, error normalization, and pagination — improving frontend/backend integration and API consistency.\nBuilt reusable backend service modules (auth middleware, logging, error handling) adopted across multiple features, reducing per-feature setup time by 30%.\nAchieved 85%+ test coverage on critical API flows using Jest + Supertest, reducing production regressions across multiple release cycles.\nAutomated CI/CD pipeline (GitHub Actions → Docker → AWS ECS), cutting deploy time from manual 2-hour releases to sub-20-minute automated runs.",
    },
    {
      company: "Rupeestop",
      href: "https://rupeestop.com",
      linkedinHref: "https://www.linkedin.com/company/rupeestop/",
      technologies: ["Next.js", "Node.js", "DynamoDB", "AWS", "TailwindCSS", "Nginx"],
      badges: [],
      location: "Remote",
      title: "Full Stack Developer Intern",
      logoUrl: "/rupeestop.jpeg",
      start: "Nov 2024",
      end: "Apr 2025",
      description:
        "Engineered a production Next.js application deployed on AWS EC2 with Nginx for load balancing, sustaining 100+ concurrent users under load.\nBuilt and optimized Node.js + DynamoDB APIs, designing efficient queries to minimize latency on high-frequency endpoints.\nIntegrated Gemini AI for automated document data extraction, accelerating batch processing speed by 50% across 500+ records.\nAutomated deployment via CI/CD pipelines (GitHub Actions), reducing deployment cycle time by 40% and eliminating manual deploy steps.",
    },
    {
      company: "CalAI",
      href: "https://www.linkedin.com/company/calai-california-artificial-intelligence-institute/",
      linkedinHref: "https://www.linkedin.com/company/calai/",
      technologies: ["Firebase", "PayPal", "Razorpay", "Brevo", "Zoho"],
      badges: [],
      location: "Remote",
      title: "Full Stack Developer Intern",
      logoUrl: "/calai.jpeg",
      start: "Sep 2024",
      end: "Oct 2024",
      description:
        "Integrated PayPal and Razorpay for secure global payments.\nImplemented Brevo and Zoho for user tracking and automated email campaigns that boosted engagement by 25%.\nDesigned a scalable Firebase database structure for efficient user data management.",
    },
    {
      company: "Beyondriffs",
      href: "https://mitremedia.com/",
      linkedinHref: "https://www.linkedin.com/company/beyondriffs/",
      technologies: ["React", "Redux", "TailwindCSS", "JavaScript"],
      badges: [],
      location: "Remote",
      title: "Frontend Developer Intern",
      logoUrl: "/beyond.webp",
      start: "Jun 2024",
      end: "Aug 2024",
      description:
        "Built responsive UI components with React.js and Tailwind CSS.\nImproved application performance by 30% through optimized Redux state management.\nCollaborated with UI/UX teams to enhance design quality and user satisfaction.",
    },
  ],
  education: [
    {
      school: "GL Baja Institute of Technology and Management",
      href: "https://www.glbitm.org/",
      degree: "Bachelor of Computer Applications",
      logoUrl: "/glbajaj.jpeg",
      start: "2022",
      end: "2025",
    },
  ],
  projects: [

    {
      title: "Collab",
      href: "https://collab.plynk.in",
      dates: "May 2026 - Jun 2026",
      active: true,
      description:
        "Built a real-time collaborative whiteboard platform with a secure, multi-tenant billing & subscription system. Features include WebSocket-based live sync, role-based access (owner/editor/viewer), project sharing, and a robust Razorpay integration with transaction-first verification to prevent payment bypasses.",
      details: `Collab is an enterprise-ready collaborative whiteboard application where teams can brainstorm and work together on a shared canvas simultaneously — similar to Figma or Miro.

### The Engineering Story
Collab began as a real-time canvas powered by WebSockets and tldraw, but as user demands grew, it evolved into a fully monetized, secure SaaS platform. A major phase of development focused on designing a secure, production-grade **Razorpay Subscription & Recurring Billing System** to handle multi-tier plans (Silver and Gold).

During implementation, we tackled and resolved a critical **payment bypass loophole**. Previously, starting a checkout flow would pre-upgrade the user's tier while keeping the payment status 'incomplete'. If a user closed the payment modal without paying, they still obtained access to premium features. To solve this, we re-architected the state machine to be **transaction-first**:
1. Checkouts now log a pending order in a dedicated transactional ledger without altering the user's active tier.
2. The subscription tier is upgraded and activated ONLY after cryptographic signature verification (via Razorpay webhook callbacks or client-side validation APIs).
3. The active subscription status is verified server-side on every project operation and user invite to enforce strict plan limits.

To complete the SaaS experience, we developed a premium **Billing Dashboard** displaying current plan status, billing cycles, upcoming renewal dates, and a dynamic historical invoice ledger.

## Key Features

- **Real-Time Collaboration**: Dynamic multi-user canvas sync via optimized Go WebSockets with presence indicators.
- **Subscription Billing**: Recurring Razorpay subscription payments, webhooks for auto-renewals, plan pauses, and cancellations.
- **Transaction-First Security**: Solved gateway-cancellation loopholes using transactional record validation before upgrading subscription state.
- **Billing Ledger**: Detailed client dashboard for invoices, payment statuses (Created, Captured, Failed), and subscription cycles.
- **Role-Based Access Control**: Strict project sharing via email invites with owner, editor, and viewer roles.
- **Persistence & OTP**: Automated canvas state recovery with PostgreSQL and OTP verification for secure login.

## Tech Stack

Next.js, TypeScript, Go, Gin, PostgreSQL, Razorpay, Webhooks, WebSocket, tldraw, Zustand, Supabase, Docker, Vercel`,
      technologies: [
        "Next.js",
        "TypeScript",
        "Go",
        "Gin",
        "PostgreSQL",
        "WebSocket",
        "tldraw",
        "Zustand",
        "Docker",
        "Supabase",
        "Razorpay",
        "Webhooks",
      ],
      links: [
        {
          type: "Website",
          href: "https://collab.plynk.in",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "FE",
          href: "https://github.com/Shubham071122/collab-fe",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "BE",
          href: "https://github.com/Shubham071122/collab",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/collab.png",
      video: "",
    },
    {
      title: "Apnavakil",
      href: "#",
      dates: "Apr 2026 - Present",
      active: true,
      description:
        "Built an AI-powered legal assistant that helps users understand their rights and legal options through natural language conversations. Implemented a RAG pipeline using PostgreSQL (pgvector) to retrieve relevant constitutional and legal references, enabling context-aware and evidence-based responses. Designed a scalable backend with AI orchestration, document ingestion, semantic search, Redis/BullMQ background processing, and cloud-native deployment architecture.",
      details: `ApnaVakil is an AI-powered legal assistance platform designed to help citizens understand their rights, legal options, and next steps through natural language conversations.

The platform enables users to describe real-world situations in simple language, such as traffic disputes, police interactions, cyber fraud, consumer complaints, workplace issues, and other legal concerns. The AI assistant analyzes user queries, retrieves relevant legal and constitutional information through a Retrieval-Augmented Generation (RAG) pipeline, and provides context-aware guidance in an easy-to-understand format.

The backend is built using Node.js, TypeScript, PostgreSQL (Supabase), pgvector, Redis, and BullMQ. Legal documents such as constitutional provisions and legal references are processed through a document ingestion pipeline where PDFs are parsed, chunked, embedded, and indexed for semantic search. The system leverages vector similarity search to retrieve relevant legal context and combines it with Google's Gemini models to generate grounded, structured, and user-friendly responses.

For voice interactions, the platform integrates OpenAI Whisper Large V3 Turbo through the Hugging Face Inference API for Speech-to-Text (STT) and ElevenLabs for natural Text-to-Speech (TTS), enabling future voice-based legal assistance workflows.

## Key Features

- AI-powered legal guidance and citizen rights assistance
- Constitutional and legal document retrieval using RAG
- Semantic search with pgvector embeddings
- Conversational AI orchestration layer
- Background document processing and embedding generation using BullMQ and Redis
- Voice-enabled architecture using Whisper Large V3 Turbo and ElevenLabs
- Conversation history and context management
- Scalable backend architecture with PostgreSQL and Supabase
- Cloud-native deployment using Docker and Google Cloud Run

## Tech Stack

Node.js, TypeScript, Fastify, PostgreSQL, Supabase, Prisma, pgvector, Redis, BullMQ, Docker, Google Cloud Run, Gemini, Whisper Large V3 Turbo, ElevenLabs, AI/LLM Integration, Retrieval-Augmented Generation (RAG)`,
      technologies: [
        "Next.js",
        "TypeScript",
        "Node.js",
        "Supabase",
        "Redis",
        "pgvector",
        "Google Gemini",
        "Docker",
        "RAG"
      ],
      links: [
        // {
        //   type: "Website",
        //   href: "https://ai-agent-fe-peach.vercel.app",
        //   icon: <Icons.globe className="size-3" />,
        // },
        {
          type: "FE",
          href: "https://github.com/Shubham071122/apnavakil-fe",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "BE",
          href: "https://github.com/Shubham071122/apnavakil-be",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/apnavakil.png",
      video: "",
    },
    {
      title: "AI Agent",
      href: "https://ai-agent-fe-peach.vercel.app",
      dates: "Jan 2026 - Feb 2026",
      active: true,
      description:
        "Built an intelligent document assistant that allows users to chat with a curated library of PDF books to get instant, evidence-based answers. Implemented a Retrieval-Augmented Generation (RAG) system to ensure AI responses are grounded in real data. Features include a secure Admin dashboard for managing documents, role-based authentication (RBAC), and a modern UI with fluid animations.",
      details: `AI Agent is an intelligent document assistant built for querying a curated library of PDF books through natural language chat. Instead of giving generic answers, the system retrieves relevant document chunks and uses them as context so responses stay grounded in the uploaded material.

The project includes a secure admin workflow for managing documents, role-based access control, and a modern user interface for smooth document conversations. The backend coordinates ingestion, embeddings, vector retrieval, and Gemini-powered response generation.

## Key Features

- Chat with PDF documents using Retrieval-Augmented Generation
- Admin dashboard for document management
- Role-based authentication and access control
- Vector search over embedded document chunks
- Gemini integration for grounded AI responses
- Clean conversational UI with fluid interactions

## Tech Stack

Next.js, TypeScript, Node.js, Python FastAPI, Google Gemini, Mongo Vector DB, RAG`,
      technologies: [
        "Next.js",
        "TypeScript",
        "Node.js",
        "Python FastAPI",
        "Google Gemini",
        "Mongo Vector DB",
        "RAG"
      ],
      links: [
        {
          type: "Website",
          href: "https://ai-agent-fe-peach.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "FE",
          href: "https://github.com/Shubham071122/ai-agent-fe",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "BE",
          href: "https://github.com/Shubham071122/ai-agent-be",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/ai-agent.png",
      video: "",
    },
    {
      title: "Can'e Chat",
      href: "#",
      dates: "Nov 2024 - Nov 2025",
      active: true,
      description:
        "Developed Can'e Chat, a real-time chat app where users can add friends and message instantly using WebSockets. Added features like typing indicators and read receipts for better engagement, built with React, Node.js, MongoDB, and Redis.",
      details: `Can'e Chat is a real-time messaging application focused on fast, familiar chat interactions. Users can connect with friends, exchange messages instantly, and see live interaction states such as typing indicators and read receipts.

The app uses WebSockets for low-latency communication, Redis for real-time coordination, and MongoDB for persistent user and message data. The frontend keeps the experience responsive and simple, with a chat layout built for daily use.

## Key Features

- Real-time one-to-one messaging
- Friend management workflow
- Typing indicators and read receipts
- WebSocket-based message delivery
- Redis-backed real-time coordination
- Persistent chat and user data with MongoDB

## Tech Stack

React, JavaScript, Node.js, MongoDB, Redis, TailwindCSS`,
      technologies: [
        "React.js",
        "JavaScript",
        "MongoDB",
        "TailwindCSS",
        "Node.js",
        "Redis"
      ],
      links: [
        // {
        //   type: "Website",
        //   href: "#",
        //   icon: <Icons.globe className="size-3" />,
        // },
        {
          type: "FE",
          href: "https://github.com/Shubham071122/canechatclient",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "BE",
          href: "https://github.com/Shubham071122/canechat-server",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/canechat2.png",
      video:
        "",
    },
    {
      title: "Streamiify",
      href: "https://streamiify.vercel.app/",
      dates: "Jun 2024 - Aug 2024",
      active: true,
      description:
        "Built Streamify, a video streaming platform where users can publish, watch, like, and manage playlists. Improved performance and security with optimized queries and verification, using React, Tailwind, Node.js, Express, and MongoDB.",
      details: `Streamiify is a video streaming platform where users can publish videos, browse content, like videos, and organize playlists. The project focuses on the core experience of a creator-driven media platform: upload, discovery, playback, and library management.

The backend handles video metadata, user actions, playlist relationships, and API flows with Express and MongoDB. The frontend presents a clean streaming interface with responsive layouts and simple content navigation.

## Key Features

- Video publishing and playback
- Like and playlist management
- Creator-style content organization
- Optimized backend queries for media data
- REST APIs with Node.js and Express
- Responsive frontend built with React and TailwindCSS

## Tech Stack

React, JavaScript, Node.js, Express.js, MongoDB, TailwindCSS`,
      technologies: [
        "React.js",
        "JavaScript",
        "MongoDB",
        "TailwindCSS",
        "Node.js",
        "Express.js",
      ],
      links: [
        {
          type: "Website",
          href: "https://streamiify.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "FE",
          href: "https://github.com/Shubham071122/streamify",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "BE",
          href: "https://github.com/Shubham071122/streamify-server",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/streamify2.png",
      video: "",
    },
    {
      title: "View Vista",
      href: "https://viewvista.vercel.app/",
      dates: "Feb 2024",
      active: true,
      description:
        "Developed View Vista, a movie and series recommendation platform that shows top-rated content, allows users to search, view details, and watch trailers. Built with React and powered by the TMDB API for real-time movie data.",
      details: `View Vista is a movie and series discovery app built around fast browsing, search, and trailer previews. It helps users explore trending and top-rated content, inspect details, and find what to watch next.

The app is powered by the TMDB API for real-time movie and series data. Redux is used to manage application state, while the React frontend keeps the experience lightweight and easy to scan.

## Key Features

- Browse top-rated movies and series
- Search for movies and shows
- View detailed content information
- Watch trailers from the detail view
- Real-time data from the TMDB API
- Responsive UI with React and TailwindCSS

## Tech Stack

React, JavaScript, Redux, TailwindCSS, TMDB API`,
      technologies: [
        "React.js",
        "Node.js",
        "JavaScript",
        "Redux",
        "TailwindCSS"
      ],
      links: [
        {
          type: "Website",
          href: "https://viewvista.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Shubham071122/viewvista",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/viewvista.png",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Hack Western 5",
      dates: "November 23rd - 25th, 2018",
      location: "London, Ontario",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Hack The North",
      dates: "September 14th - 16th, 2018",
      location: "Waterloo, Ontario",
      description:
        "Developed a mobile application which delivers university campus wide events in real time to all students.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "FirstNet Public Safety Hackathon",
      dates: "March 23rd - 24th, 2018",
      location: "San Francisco, California",
      description:
        "Developed a mobile application which communcicates a victims medical data from inside an ambulance to doctors at hospital.",
      icon: "public",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/firstnet.png",
      links: [],
    },
  ],
} as const;
