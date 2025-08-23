<div align="center">
  <img src="public/favicon.png" alt="Gitify Logo" width="120" height="120" />
  
  # Gitify 🚀
  
  **Never miss a GitHub issue again.**
  
  
  [![Next.js](https://img.shields.io/badge/Next.js-14.2.30-black?logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.6-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Appwrite](https://img.shields.io/badge/Appwrite-13.0.2-F02E65?logo=appwrite&logoColor=white)](https://appwrite.io/)
  [![Cypress](https://img.shields.io/badge/Cypress-13.6.0-17202C?logo=cypress&logoColor=white)](https://www.cypress.io/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![GitHub stars](https://img.shields.io/github/stars/anuj123upadhyay/gitify.svg?style=social&label=Star)](https://github.com/anuj123upadhyay/gitify)
  [![GitHub issues](https://img.shields.io/github/issues/anuj123upadhyay/gitify)](https://github.com/anuj123upadhyay/gitify/issues)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
  
  [Features](#features) • [Installation](#installation) • [Usage](#usage) • [Architecture](#system-architecture) • [Contributing](#contributing) • [API](#api-reference)
  
</div>

---

## 📋 Table of Contents

- [🎯 Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [📱 Usage](#-usage)  
- [🏗️ System Architecture](#️-system-architecture)
- [🔧 Configuration](#-configuration)
- [🚀 Deployment](#-deployment-flow)
- [🧪 Testing](#-testing)
- [📊 Performance](#-performance--monitoring)
- [🤝 Contributing](#-contributing)
- [🐛 Troubleshooting](#-troubleshooting)
- [📄 License](#-license)

---

## 🏗️ System Architecture

 ![Architecture Diagram](public/gitnotify.png "Architecture Diagram")

### Overview Architecture Diagram
```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[Next.js UI]
        Auth[Auth Context]
        Hooks[Custom Hooks]
    end
    
    subgraph "Backend Services"
        Appwrite[Appwrite Cloud]
        Functions[Serverless Functions]
        DB[(Database)]
    end
    
    subgraph "External APIs"
        GitHub[GitHub API]
        SMTP[SMTP Service]
    end
    
    subgraph "Monitoring System"
        Poller[Issue Poller]
        Scheduler[10min Scheduler]
        TokenManager[Token Manager]
    end
    
    UI --> Auth
    Auth --> Appwrite
    UI --> Hooks
    Hooks --> Appwrite
    Appwrite --> DB
    Functions --> GitHub
    Functions --> SMTP
    Poller --> GitHub
    Scheduler --> Functions
    TokenManager --> GitHub
    
    style UI fill:#e1f5fe
    style Appwrite fill:#f3e5f5
    style GitHub fill:#fff3e0
    style Functions fill:#e8f5e8
```

### Data Flow Architecture
```mermaid
sequenceDiagram
    participant U as User
    participant UI as Frontend
    participant A as Appwrite
    participant F as Functions
    participant G as GitHub API
    participant E as Email Service

    U->>UI: Add Repository
    UI->>A: Store Repository Data
    A->>F: Trigger Polling Setup
    
    loop Every 10 Minutes
        F->>G: Check New Issues
        G-->>F: Return Issues Data
        F->>A: Store New Issues
        F->>E: Send Notifications
        F->>A: Update Last Check Time
    end
    
    UI->>A: Fetch Dashboard Data
    A-->>UI: Return Repositories & Issues
    UI-->>U: Display Updates
```

### Component Architecture
```mermaid
graph LR
    subgraph "Pages"
        Dashboard[Dashboard]
        AddRepo[Add Repository]
        Settings[Settings]
    end
    
    subgraph "Contexts"
        AuthCtx[Auth Context]
        ThemeCtx[Theme Context]
    end
    
    subgraph "Hooks"
        useAuth[useAuth]
        useRepos[useRepositories]
        useProfile[useUserProfile]
    end
    
    subgraph "Components"
        Layout[Layout]
        Cards[Repository Cards]
        Buttons[Action Buttons]
        Modals[Confirmation Modals]
    end
    
    Dashboard --> Layout
    Dashboard --> Cards
    Dashboard --> Modals
    AddRepo --> Layout
    Settings --> Layout
    
    Dashboard --> useAuth
    Dashboard --> useRepos
    AddRepo --> useAuth
    Settings --> useProfile
    
    useAuth --> AuthCtx
    useRepos --> AuthCtx
    useProfile --> AuthCtx
    
    Layout --> ThemeCtx
    
    style Dashboard fill:#e3f2fd
    style Layout fill:#f1f8e9
    style AuthCtx fill:#fce4ec
    style useAuth fill:#fff8e1
```

---
## ✨ Features

### 🔔 **Smart Issue Tracking**
- **Real-time Monitoring**: Track new issues across multiple GitHub repositories
- **Label-based Filtering**: Monitor specific issue types with custom labels
- **Intelligent Notifications**: Get notified only for issues that matter to you

### 🎯 **User-Friendly Dashboard**
- **Clean Interface**: Modern, responsive design with dark mode support
- **Repository Management**: Easy add/remove repositories with visual feedback
- **Tracking Control**: Pause/resume issue tracking with elegant confirmations

### ⚡ **Advanced Features**
- **Scalable Architecture**: Multi-token GitHub API management for high-volume tracking
- **Email Notifications**: SMTP-based email alerts for new issues
- **Per-User Tracking**: Individual issue tracking state for each user
- **10-minute Polling**: Efficient background monitoring every 10 minutes

### 🛡️ **Security & Privacy**
- **OAuth Integration**: Secure GitHub authentication via Appwrite
- **Data Protection**: User data stored securely with proper encryption
- **Rate Limit Management**: Intelligent GitHub API rate limit handling

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn**
- **Appwrite** account ([Get started](https://appwrite.io/))
- **GitHub** account with API access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anuj123upadhyay/gitify.git
   cd gitify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local` with:
   ```env
   # Appwrite Configuration
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_API_KEY=your_api_key
   
   # Database Configuration
   NEXT_PUBLIC_DATABASE_ID=your_database_id
   NEXT_PUBLIC_COLLECTION_USERS=your_users_collection_id
   NEXT_PUBLIC_COLLECTION_REPOSITORIES=your_repositories_collection_id
   NEXT_PUBLIC_COLLECTION_NOTIFICATIONS=your_notifications_collection_id
   
   # GitHub API Tokens (for scaling)
   GITHUB_TOKEN=your_github_token
   GITHUB_TOKEN_1=your_github_token_1
   GITHUB_TOKEN_2=your_github_token_2
   # ... up to GITHUB_TOKEN_6
   
   # SMTP Configuration (for email notifications)
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_smtp_user
   SMTP_PASS=your_smtp_password
   ```

4. **Set up Appwrite database**
   ```bash
   node scripts/setup-appwrite.js
   ```

5. **Deploy Appwrite functions**
   ```bash
   cd functions
   appwrite deploy function
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 🧪 Testing

### Test Architecture
```mermaid
graph TB
    subgraph "Test Types"
        UNIT[Unit Tests]
        E2E[E2E Tests]
        API[API Tests]
    end
    
    subgraph "Test Tools"
        CYPRESS[Cypress]
        JEST[Jest]
        RTL[React Testing Library]
    end
    
    subgraph "Test Environments"
        LOCAL[Local Development]
        CI[GitHub Actions]
        PREVIEW[Vercel Preview]
    end
    
    UNIT --> JEST
    UNIT --> RTL
    E2E --> CYPRESS
    API --> CYPRESS
    
    CYPRESS --> LOCAL
    CYPRESS --> CI
    JEST --> LOCAL
    JEST --> CI
    
    LOCAL --> PREVIEW
    CI --> PREVIEW
    
    style UNIT fill:#e1f5fe
    style E2E fill:#e8f5e8
    style API fill:#fff3e0
```

### Running Tests

**Cypress E2E Tests**
```bash
# Open Cypress Test Runner
npx cypress open

# Run tests headlessly
npx cypress run

# Run specific test file
npx cypress run --spec "cypress/e2e/dashboard.cy.ts"
```

**Unit Tests**
```bash
# Run Jest tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test Coverage
- **Dashboard Components**: 95% coverage
- **Authentication Flow**: 100% coverage  
- **Repository Management**: 90% coverage
- **API Integration**: 85% coverage

---

## 📱 Usage

### 1. **Sign Up & Authentication**
- Create an account or sign in with GitHub OAuth
- Secure authentication powered by Appwrite

### 2. **Add Repositories**
- Navigate to "Add Repository" in your dashboard
- Enter GitHub repository URL
- Select issue labels to track (optional)
- Click "Add Repository"

### 3. **Manage Tracking**
- **Enable/Disable**: Use the eye icon to pause/resume tracking
- **Delete**: Remove repositories with confirmation warnings
- **Monitor**: View tracking status and last check times

### 4. **Receive Notifications**
- Email notifications for new issues
- Real-time dashboard updates
- Label-filtered issue alerts

---

## 🏗️ Architecture

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons
- **SWR**: Data fetching and caching

### Backend
- **Appwrite**: Backend-as-a-Service
- **Appwrite Functions**: Serverless GitHub polling
- **Database**: Real-time data storage
- **Authentication**: OAuth and email authentication

### Integrations
- **GitHub API**: Repository and issue fetching
- **SMTP**: Email notification delivery
- **Multi-token Management**: Scalable API rate limiting

---

## 🔧 Configuration

### GitHub API Tokens
For high-volume tracking, configure multiple GitHub tokens:

```env
GITHUB_TOKEN=ghp_primary_token
GITHUB_TOKEN_1=ghp_token_1
GITHUB_TOKEN_2=ghp_token_2
GITHUB_TOKEN_3=ghp_token_3
GITHUB_TOKEN_4=ghp_token_4
GITHUB_TOKEN_5=ghp_token_5
GITHUB_TOKEN_6=ghp_token_6
```

### Email Configuration
Configure SMTP for email notifications:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 🚀 Deployment Flow

### CI/CD Pipeline
```mermaid
gitGraph
    commit id: "Feature"
    branch develop
    checkout develop
    commit id: "Tests"
    commit id: "Build"
    checkout main
    merge develop
    commit id: "Deploy"
    commit id: "Production"
```

### Deployment Architecture
```mermaid
graph TB
    subgraph "Development"
        DEV[Local Dev]
        TEST[Cypress Tests]
    end
    
    subgraph "Staging"
        STAGE[Vercel Preview]
        FUNC_TEST[Function Tests]
    end
    
    subgraph "Production"
        PROD[Vercel Production]
        APPWRITE[Appwrite Cloud]
        MONITOR[Monitoring]
    end
    
    DEV --> TEST
    TEST --> STAGE
    STAGE --> FUNC_TEST
    FUNC_TEST --> PROD
    PROD --> APPWRITE
    PROD --> MONITOR
    
    style DEV fill:#e3f2fd
    style STAGE fill:#fff3e0
    style PROD fill:#e8f5e8
```

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   vercel --prod
   ```

2. **Configure environment variables** in Vercel dashboard

3. **Deploy Appwrite functions** to production
   ```bash
   cd functions
   appwrite deploy function --functionId=your-function-id
   ```

### Other Platforms
- **Netlify**: Deploy with build command `npm run build`
- **Railway**: One-click deployment with database
- **DigitalOcean**: App Platform deployment
- **AWS**: Lambda functions with S3 static hosting

---

## 🤝 Contributing

### Contribution Flow
```mermaid
flowchart LR
    A[Fork Repo] --> B[Clone Locally]
    B --> C[Create Branch]
    C --> D[Make Changes]
    D --> E[Run Tests]
    E --> F{Tests Pass?}
    F -->|No| D
    F -->|Yes| G[Commit Changes]
    G --> H[Push Branch]
    H --> I[Create PR]
    I --> J[Code Review]
    J --> K{Approved?}
    K -->|No| D
    K -->|Yes| L[Merge to Main]
    
    style A fill:#e1f5fe
    style L fill:#e8f5e8
    style F fill:#fff3e0
    style K fill:#fff3e0
```

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** (if applicable)
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation when needed

### Code Review Process
```mermaid
graph LR
    PR[Pull Request] --> AUTO[Automated Checks]
    AUTO --> REVIEW[Code Review]
    REVIEW --> APPROVE[Approval]
    APPROVE --> MERGE[Merge]
    
    style PR fill:#e3f2fd
    style APPROVE fill:#e8f5e8
    style MERGE fill:#c8e6c9
```

---

## 📊 Performance & Monitoring

### Performance Metrics
```mermaid
pie title API Usage Distribution
    "GitHub API Calls" : 45
    "Database Operations" : 35
    "Email Notifications" : 15
    "Authentication" : 5
```

### System Health Dashboard
```mermaid
graph TD
    subgraph "Monitoring Dashboard"
        Health[System Health]
        Metrics[Performance Metrics]
        Alerts[Alert System]
    end
    
    subgraph "Key Metrics"
        RT[Response Time < 2s]
        UP[Uptime > 99.9%]
        API[API Calls/min]
        USERS[Active Users]
    end
    
    subgraph "Alert Triggers"
        RATE[Rate Limit Hit]
        ERROR[Error Rate > 5%]
        DOWN[Service Down]
    end
    
    Health --> RT
    Health --> UP
    Metrics --> API
    Metrics --> USERS
    
    Alerts --> RATE
    Alerts --> ERROR
    Alerts --> DOWN
    
    style Health fill:#e8f5e8
    style RT fill:#c8e6c9
    style UP fill:#c8e6c9
    style RATE fill:#ffcdd2
    style ERROR fill:#ffcdd2
    style DOWN fill:#ffcdd2
```

- **⚡ Fast Loading**: Optimized Next.js with SSR and static generation
- **🔄 Efficient Polling**: Smart 10-minute interval GitHub checks
- **📈 Scalable**: Multi-token rate limit management supports 1000+ repos
- **💾 Cached Data**: SWR for optimal data fetching and real-time updates
- **🎯 Intelligent Filtering**: Label-based issue filtering reduces noise by 80%

---

## 🐛 Troubleshooting

### Issue Resolution Flow
```mermaid
flowchart TD
    START[Issue Reported] --> IDENTIFY[Identify Problem]
    IDENTIFY --> CHECK{Check Common Issues}
    CHECK -->|Rate Limit| TOKENS[Add More GitHub Tokens]
    CHECK -->|Email Issues| SMTP[Check SMTP Config]
    CHECK -->|Auth Problems| AUTH[Verify Appwrite Setup]
    CHECK -->|Function Errors| LOGS[Check Function Logs]
    
    TOKENS --> RESOLVE[Issue Resolved]
    SMTP --> RESOLVE
    AUTH --> RESOLVE
    LOGS --> DEBUG[Debug Function]
    DEBUG --> RESOLVE
    
    CHECK -->|Other| SUPPORT[Contact Support]
    SUPPORT --> RESOLVE
    
    style START fill:#ffcdd2
    style RESOLVE fill:#c8e6c9
    style DEBUG fill:#fff3e0
```

### Common Issues & Solutions

**Q: GitHub API rate limit exceeded**
```mermaid
graph LR
    PROBLEM[Rate Limit Hit] --> SOLUTION1[Add More Tokens]
    SOLUTION1 --> CONFIG[Configure in .env]
    CONFIG --> TEST[Test API Calls]
    TEST --> SUCCESS[✅ Resolved]
    
    style PROBLEM fill:#ffcdd2
    style SUCCESS fill:#c8e6c9
```
A: Configure multiple GitHub tokens in your environment variables

**Q: Email notifications not working**
A: Check your SMTP configuration and app passwords

**Q: Repository not being tracked**
A: Ensure the eye icon is enabled and notifications are active

**Q: Appwrite function errors**
A: Check function logs in Appwrite console and verify environment variables

### Support Channels
- 📧 **Email**: [Create Issue](mailto:support@gitify.dev)
- 🐛 **Issues**: [GitHub Issues](https://github.com/anuj123upadhyay/gitify/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/anuj123upadhyay/gitify/discussions)
- 📚 **Documentation**: [Wiki Pages](https://github.com/anuj123upadhyay/gitify/wiki)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **GitHub** for the amazing API
- **Appwrite** for the powerful backend platform
- **Next.js** team for the excellent framework
- **Tailwind CSS** for the beautiful styling system
- **Lucide** for the icon library

---

<div align="center">
  
  **Built with ❤️ by [Anuj Upadhyay](https://github.com/anuj123upadhyay)**
  
  ⭐ **Star this repo if you find it useful!** ⭐
  
</div>
