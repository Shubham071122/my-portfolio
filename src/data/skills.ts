export interface SkillData {
  name: string;
  icon: string;
  url: string;
  category:
    | "frontend"
    | "backend"
    | "language"
    | "tool"
    | "database"
    | "cloud"
    | "mobile"
    | "ai";
}

export const SKILLS_DATA: Record<string, SkillData> = {
  react: {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    url: "https://react.dev",
    category: "frontend",
  },
  nextjs: {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    url: "https://nextjs.org",
    category: "frontend",
  },
  typescript: {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    url: "https://www.typescriptlang.org",
    category: "language",
  },
  javascript: {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    category: "language",
  },
  nodejs: {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    url: "https://nodejs.org",
    category: "backend",
  },
  python: {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    url: "https://www.python.org",
    category: "language",
  },
  postgresql: {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    url: "https://www.postgresql.org",
    category: "database",
  },
  mongodb: {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    url: "https://www.mongodb.com",
    category: "database",
  },
  docker: {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    url: "https://www.docker.com",
    category: "tool",
  },
  kubernetes: {
    name: "Kubernetes",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    url: "https://kubernetes.io",
    category: "tool",
  },
  aws: {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    url: "https://aws.amazon.com",
    category: "cloud",
  },
  googlecloud: {
    name: "Google Cloud",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    url: "https://cloud.google.com",
    category: "cloud",
  },
  tailwindcss: {
    name: "TailwindCSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    url: "https://tailwindcss.com",
    category: "frontend",
  },
  redux: {
    name: "Redux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    url: "https://redux.js.org",
    category: "frontend",
  },
  git: {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    url: "https://git-scm.com",
    category: "tool",
  },
  linux: {
    name: "Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    url: "https://www.linux.org",
    category: "tool",
  },
  firebase: {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    url: "https://firebase.google.com",
    category: "cloud",
  },
  express: {
    name: "Express.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    url: "https://expressjs.com",
    category: "backend",
  },
  graphql: {
    name: "GraphQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    url: "https://graphql.org",
    category: "tool",
  },
  cpp: {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    url: "https://isocpp.org",
    category: "language",
  },
  go: {
    name: "Go",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
    url: "https://go.dev",
    category: "language",
  },
  rust: {
    name: "Rust",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
    url: "https://www.rust-lang.org",
    category: "language",
  },
  java: {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    url: "https://www.java.com",
    category: "language",
  },
  mysql: {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    url: "https://www.mysql.com",
    category: "database",
  },
  redis: {
    name: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    url: "https://redis.io",
    category: "database",
  },
  prisma: {
    name: "Prisma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
    url: "https://www.prisma.io",
    category: "tool",
  },
  html5: {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    category: "frontend",
  },
  css3: {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    category: "frontend",
  },
  sass: {
    name: "Sass",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    url: "https://sass-lang.com",
    category: "frontend",
  },
  vuejs: {
    name: "Vue.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    url: "https://vuejs.org",
    category: "frontend",
  },
  angular: {
    name: "Angular",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    url: "https://angular.io",
    category: "frontend",
  },
  flutter: {
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    url: "https://flutter.dev",
    category: "mobile",
  },
  reactnative: {
    name: "React Native",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    url: "https://reactnative.dev",
    category: "mobile",
  },
  vite: {
    name: "Vite",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg",
    url: "https://vitejs.dev",
    category: "tool",
  },
  jest: {
    name: "Jest",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
    url: "https://jestjs.io",
    category: "tool",
  },
  php: {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    url: "https://www.php.net",
    category: "language",
  },
  laravel: {
    name: "Laravel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    url: "https://laravel.com",
    category: "backend",
  },
  django: {
    name: "Django",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    url: "https://www.djangoproject.com",
    category: "backend",
  },
  spring: {
    name: "Spring",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    url: "https://spring.io",
    category: "backend",
  },
  dotnet: {
    name: ".NET",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
    url: "https://dotnet.microsoft.com",
    category: "backend",
  },
  swift: {
    name: "Swift",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    url: "https://developer.apple.com/swift/",
    category: "language",
  },
  kotlin: {
    name: "Kotlin",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    url: "https://kotlinlang.org",
    category: "language",
  },
  azure: {
    name: "Azure",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    url: "https://azure.microsoft.com",
    category: "cloud",
  },
  nginx: {
    name: "Nginx",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
    url: "https://www.nginx.com",
    category: "tool",
  },
  jira: {
    name: "Jira",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    url: "https://www.atlassian.com/software/jira",
    category: "tool",
  },
  cloudinary: {
    name: "Cloudinary",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudinary/cloudinary-original.svg",
    url: "https://cloudinary.com",
    category: "tool",
  },
  googlegemini: {
    name: "Google Gemini",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    url: "https://gemini.google.com",
    category: "tool",
  },
  fastapi: {
    name: "FastAPI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    url: "https://fastapi.tiangolo.com",
    category: "backend",
  },
  mongodbvector: {
    name: "MongoDB Vector Search",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    url: "https://www.mongodb.com/products/platform/atlas-vector-search",
    category: "database",
  },
  rag: {
    name: "RAG (GenAI)",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg",
    url: "https://ethereum.org/en/developers/docs/ai/",
    category: "ai",
  },
  paypal: {
    name: "PayPal",
    icon: "https://www.vectorlogo.zone/logos/paypal/paypal-icon.svg",
    url: "https://www.paypal.com",
    category: "tool",
  },
  razorpay: {
    name: "Razorpay",
    icon: "https://cdn.simpleicons.org/razorpay",
    url: "https://razorpay.com",
    category: "tool",
  },
  brevo: {
    name: "Brevo",
    icon: "https://cdn.simpleicons.org/brevo",
    url: "https://www.brevo.com",
    category: "tool",
  },
  zoho: {
    name: "Zoho",
    icon: "https://www.vectorlogo.zone/logos/zoho/zoho-icon.svg",
    url: "https://www.zoho.com",
    category: "tool",
  },
};
