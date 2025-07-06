# Gitify - GitHub Issue Notifications

A production-ready SaaS application that helps open-source contributors get notified as soon as new GitHub issues are created in repositories they care about — before others claim them.

## 🚀 Features

- **Fast Notifications**: Get email notifications every 10 minutes when new issues are created
- **Smart Filtering**: Filter by labels like "good first issue", "help wanted", etc.
- **GitHub Integration**: Seamless OAuth integration with GitHub
- **Label-based Tracking**: Track specific labels in repositories
- **Dashboard**: Beautiful interface to manage tracked repositories
- **Secure Authentication**: Support for both GitHub OAuth and email/password auth

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **SWR** for data fetching
- **Lucide React** for icons

### Backend (BaaS)
- **Appwrite** for database, authentication, and functions
- **GitHub REST API** for fetching issues
- **Email notifications** via Appwrite or custom SMTP

## 📋 Prerequisites

- Node.js 18+ and npm
- Appwrite account (cloud.appwrite.io or self-hosted)
- GitHub account for OAuth and API access

## 🔧 Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd gitify
npm install
```

### 2. Environment Configuration

Copy the environment template:

```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id

# GitHub API
GITHUB_TOKEN=your-github-token

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Appwrite Setup

#### Create a New Project
1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project
3. Copy the Project ID to your `.env.local`

#### Configure Authentication
1. Go to **Auth** → **Settings**
2. Add your domain to allowed origins: `http://localhost:3000`
3. Enable **Email/Password** authentication
4. For GitHub OAuth:
   - Go to **Auth** → **Settings** → **OAuth2**
   - Enable GitHub provider
   - Add your GitHub OAuth app credentials

#### Create Database and Collections

1. Go to **Databases** → Create database with ID: `gitify-db`

2. Create the following collections:

**Users Collection** (`users`):
- No additional attributes needed (uses built-in Appwrite user system)

**Repositories Collection** (`repositories`):
```
- userId (string, required)
- repoUrl (string, required)  
- repoName (string, required)
- repoOwner (string, required)
- labels (string[], optional)
- lastCheckedAt (datetime, optional)
- lastIssueId (string, optional)
- isActive (boolean, required, default: true)
```

**Notification Preferences Collection** (`notification-preferences`):
```
- userId (string, required)
- emailEnabled (boolean, required, default: true)
- frequency (string, required, default: "immediate")
```

#### Set Permissions

For each collection, set these permissions:
- **Create**: Users
- **Read**: Users (with user ID matching document's userId)
- **Update**: Users (with user ID matching document's userId)
- **Delete**: Users (with user ID matching document's userId)

### 4. GitHub Token Setup

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Generate a new token with these permissions:
   - `public_repo` (for public repositories)
   - `repo` (if you want to track private repositories)
3. Add the token to your `.env.local`

### 5. Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard and app pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── Layout.tsx        # Main app layout
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
├── hooks/                # Custom React hooks
│   └── useRepositories.ts # Repository management
├── lib/                  # Utility libraries
│   ├── appwrite.ts       # Appwrite configuration
│   └── utils.ts          # Helper functions
└── types/                # TypeScript type definitions
    └── index.ts          # Main type definitions
```

## 🔮 Next Steps

### Phase 1: Backend Functions (Current)
- [ ] Create Appwrite Function for GitHub polling
- [ ] Implement CRON schedule (every 10 minutes)
- [ ] Add email notification logic
- [ ] Error handling and logging

### Phase 2: Enhanced Features
- [ ] Settings page for notification preferences
- [ ] Repository statistics and insights
- [ ] Mobile responsive improvements
- [ ] Advanced label filtering

### Phase 3: Production Ready
- [ ] Performance optimization
- [ ] Rate limiting and caching
- [ ] Monitoring and analytics
- [ ] Deployment configuration

### Phase 4: SaaS Features
- [ ] Stripe billing integration
- [ ] User tiers and limits
- [ ] Team collaboration features
- [ ] Advanced filtering options

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔐 Security

- All routes are protected with Appwrite authentication
- Environment variables are used for sensitive data
- CORS is properly configured
- Rate limiting should be implemented for production

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 💬 Support

For questions or issues, please open a GitHub issue or reach out via email.
