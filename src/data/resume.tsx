import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Shubham",
  initials: "SK",
  url: "https://shubham.io",
  location: "New Delhi, India",
  locationLink: "https://www.google.com/maps/place/new+delhi",
  description:
    "Full Stack Developer, Love Building Scalable Web Applications & DevOps Enthusiast.",
  summary:
    "I’m a Full Stack Developer who loves building fast, user-friendly web applications and scalable backend systems. I enjoy turning ideas into real products using React, Next.js, Node.js, and AWS. I’m passionate about clean code, problem-solving, and constantly learning new technologies to improve how things work.",
  avatarUrl: "/me.jpeg",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Postgres",
    "Docker",
    "C++",
    "MongoDB",
    "AWS",
    "TailwindCSS",
    "Redux",
    "Git",
    "Linux",
    "Firebase",
    "Express.js",
    "GraphQL"

  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
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
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Earnest Data Analytics",
      href: "https://earnestdata-analytics.in/",
      badges: [],
      location: "Noida, India",
      title: "Full Stack Developer",
      logoUrl: "/earnest.jpeg",
      start: "May 2025",
      end: "Present",
      description:
        "Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.",
    },
    {
      company: "Rupeestop",
      href: "https://rupeestop.com",
      badges: [],
      location: "Remote",
      title: "Full Stack Developer Intern",
      logoUrl: "/rupeestop.jpeg",
      start: "Nov 2024",
      end: "Apr 2025",
      description:
        "Developed a high-performance Next.js application with Tailwind CSS, deployed on AWS EC2 with Nginx to support 100+ concurrent users, built optimized Node.js and DynamoDB APIs, integrated Gemini AI for 50% faster data extraction across 500 records, and streamlined DevOps with GitHub Actions CI/CD pipelines, reducing deployment time by 40%.",
    },
    {
      company: "CalAI",
      href: "https://www.linkedin.com/company/calai-california-artificial-intelligence-institute/",
      badges: [],
      location: "Remote",
      title: "Full Stack Developer Intern",
      logoUrl: "/calai.jpeg",
      start: "Sep 2024",
      end: "Oct 2024",
      description:
        "Integrated PayPal and Razorpay for secure global payments, implemented Brevo and Zoho for user tracking and automated email campaigns that boosted engagement by 25%, and designed a scalable Firebase database structure for efficient user data management.",
    },
    {
      company: "Beyondriffs",
      href: "https://mitremedia.com/",
      badges: [],
      location: "Remote",
      title: "Frontend Developer Intern",
      logoUrl: "/beyond.webp",
      start: "Jun 2024",
      end: "Aug 2024",
      description:
        "Built responsive UI components with React.js and Tailwind CSS, improved application performance by 30% through optimized Redux state management, and collaborated with UI/UX teams to enhance design quality and user satisfaction.",
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
      title: "Can'e Chat",
      href: "https://chatcollect.com",
      dates: "Nov 2024 - Nov 2025",
      active: true,
      description:
        "Developed Can'e Chat, a real-time chat app where users can add friends and message instantly using WebSockets. Added features like typing indicators and read receipts for better engagement, built with React, Node.js, MongoDB, and Redis.",
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
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "Streamiify",
      href: "https://streamiify.vercel.app/",
      dates: "Jun 2024 - Aug 2024",
      active: true,
      description:
        "Built Streamify, a video streaming platform where users can publish, watch, like, and manage playlists. Improved performance and security with optimized queries and verification, using React, Tailwind, Node.js, Express, and MongoDB.",
      technologies: [
        "React.js",
        "JavaScript",
        "MongoDB",
        "TailwindCSS",
        "Node.js",
        "Express.js",
        "Cloudinary",
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
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "View Vista",
      href: "https://viewvista.vercel.app/",
      dates: "Feb 2024",
      active: true,
      description:
        "Developed View Vista, a movie and series recommendation platform that shows top-rated content, allows users to search, view details, and watch trailers. Built with React and powered by the TMDB API for real-time movie data.",
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
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
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
