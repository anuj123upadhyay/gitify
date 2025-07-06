You're my expert full-stack coding assistant. I'm building a production-ready SaaS application that helps open-source contributors get notified as soon as new GitHub issues are created in repositories they care about — before others claim them.

Here's the stack and responsibilities I want your help with:

## 🌐 Frontend
- Use **React + Next.js** with **Tailwind CSS**
- Build components/pages for:
  - GitHub OAuth or Email/Password login (Appwrite Auth)
  - Dashboard: list of tracked repositories
  - Add new repository form (validates GitHub URL)
  - Label filters (e.g., good-first-issue, bug)
  - Notification preferences (frequency)
  - Settings & logout

## 🧠 Backend (BaaS: Appwrite)
- Set up **Appwrite collections**:
  - `users`: basic user info (email, name, auth provider)
  - `repositories`: user_id, repo_url, labels, last_checked_at, last_issue_id
- Use **Appwrite Functions** to:
  - Run on CRON schedule (every 10 mins)
  - Loop through all repositories
  - Use GitHub REST API to fetch latest issues
  - Compare new issues with `last_issue_id` or `created_at`
  - If new issue found → send email notification to user
  - Update `last_checked_at` and `last_issue_id` in DB

## 🔐 Auth
- Implement GitHub OAuth via Appwrite OR fallback to Email/Password Auth
- Secure routes using Appwrite session tokens

## 📬 Email Notifications
- Use Appwrite’s built-in email SMTP config OR
- Integrate with Resend/Mailgun/SendGrid in the function to send:




Subject: New Issue in <repo>
Body: Title, URL, Label(s), Created At




## 🛠️ Dev Goals
- Build in clean component-first architecture
- Add types using TypeScript
- Use SWR/React Query for API calls
- Use environment variables for GitHub token and API keys
- Provide utility/helper functions where needed

## 🧪 Bonus
- Help set up GitHub Actions for CI/CD
- Help with Appwrite permission rules for private data access
- Optionally add Stripe billing later for SaaS tiers

Start by scaffolding the Next.js frontend with Appwrite SDK setup and Auth integration. Then move to form + repo collection creation logic, followed by CRON GitHub polling function.

Reply with code examples, clear explanations, and refactor suggestions as we build this project incrementally.


Build incrementally: first for frontend → auth → repo form → functions → deployment

