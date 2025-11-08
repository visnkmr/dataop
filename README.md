# DataOp - Browser Session Manager

A modern Next.js application for managing browser sessions and links with Auth0 authentication. Built with TypeScript, Tailwind CSS, and uses Bun as the package manager.

## Features

- 🔐 Secure Auth0 authentication
- 📱 Responsive modern UI design
- 🔍 Search functionality across browser sessions
- 📊 Session management with browser categorization
- ⚡ Fast development with Bun package manager
- 🎨 Clean, modern interface with Tailwind CSS

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) package manager
- [Auth0](https://auth0.com/) account for authentication

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd dataop

# Install dependencies with Bun
bun install
```

### 2. Auth0 Configuration

1. **Create an Auth0 Account**
   - Sign up at [https://auth0.com](https://auth0.com)
   - Create a new tenant or use an existing one

2. **Create a New Application**
   - Go to Dashboard → Applications → Applications
   - Click "Create Application"
   - Choose "Single Page Web Applications"
   - Give it a name (e.g., "DataOp")

3. **Configure Application Settings**
   - In your application settings, go to "Settings"
   - Set the following URLs:
     ```
     Allowed Callback URLs: http://localhost:3000/api/auth/callback/auth0
     Allowed Logout URLs: http://localhost:3000
     Allowed Web Origins: http://localhost:3000
     ```

4. **Get Your Auth0 Credentials**
   - Go to "Settings" → "Domain"
   - Copy your Auth0 domain
   - Go to "Settings" → "Application" → "Client ID"
   - Copy your Client ID

5. **Create Environment Variables**
   - Create a `.env.local` file in the root directory:
     ```env
     AUTH0_SECRET='your-secret-key-here'
     AUTH0_BASE_URL='http://localhost:3000'
     AUTH0_ISSUER_BASE_URL='https://your-auth0-domain.auth0.com'
     AUTH0_CLIENT_ID='your-client-id-here'
     AUTH0_CLIENT_SECRET='your-client-secret-here'
     ```

   **Note:** To generate a secure secret for `AUTH0_SECRET`, run:
   ```bash
   openssl rand -base64 32
   ```

### 3. Environment Variables Setup

Create a `.env.local` file in the project root with the following variables:

```env
# Auth0 Configuration
AUTH0_SECRET='your-generated-secret-key'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://your-tenant.auth0.com'
AUTH0_CLIENT_ID='your-client-id'
AUTH0_CLIENT_SECRET='your-client-secret'

# Optional: API endpoints (if using external services)
NEXT_PUBLIC_API_URL='https://your-api-endpoint.com'
```

### 4. Run the Development Server

```bash
# Using Bun (recommended)
bun dev

# Or using npm
npm run dev

# Or using yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── api/auth/[auth0]/    # Auth0 API routes
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── loginbutton.tsx      # Login component
│   ├── listlinks.tsx        # Links listing wrapper
│   ├── listsessions.tsx     # Session data fetching
│   └── Topbar.tsx           # Main UI component
└── globals.css              # Global styles
```

## Available Scripts

```bash
# Development
bun dev          # Start development server
bun run build    # Build for production
bun run start    # Start production server
bun run lint     # Run ESLint

# Package management
bun install      # Install dependencies
bun add <pkg>    # Add new dependency
bun remove <pkg> # Remove dependency
```

## Authentication Flow

1. **Login**: Users click "Sign in with Auth0" and are redirected to Auth0
2. **Authentication**: Auth0 handles user authentication
3. **Callback**: User is redirected back to the application
4. **Session**: Application maintains user session with Auth0 tokens
5. **Logout**: Users can sign out and clear their session

## API Integration

The application integrates with external APIs for:
- Session data fetching
- URL management
- Database operations

Ensure your API endpoints are properly configured in the environment variables.

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

1. Build the application:
   ```bash
   bun run build
   ```
2. Deploy the `.next` folder to your hosting platform
3. Ensure environment variables are set in production

## Troubleshooting

### Common Issues

1. **Auth0 Callback Errors**
   - Verify `Allowed Callback URLs` in Auth0 settings
   - Check environment variables are correctly set
   - Ensure `AUTH0_BASE_URL` matches your local URL

2. **Build Errors**
   - Run `bun install` to ensure all dependencies are installed
   - Check TypeScript types in components
   - Verify environment variables are properly formatted

3. **Authentication Issues**
   - Clear browser cookies and localStorage
   - Verify Auth0 application is in "Single Page Application" mode
   - Check that all required Auth0 environment variables are set

### Development Tips

- Use `bun run lint` to check for code issues
- The app auto-reloads on file changes during development
- Check browser console for detailed error messages
- Use React DevTools for component debugging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
