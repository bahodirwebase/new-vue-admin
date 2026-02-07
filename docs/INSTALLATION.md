# Installation Guide

This guide will help you set up Byxora Admin Dashboard on your local machine and prepare it for deployment.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** version 16.0 or higher
- **npm** version 7.0 or higher (or **yarn** 1.22+)
- **Git** for version control

### Recommended Tools
- **VS Code** with Vue extensions
- **Vue DevTools** browser extension
- **Chrome** or **Firefox** for development

---

## 🚀 Quick Installation

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/byxora-admin.git
cd byxora-admin

# Using SSH (if you have SSH keys set up)
git clone git@github.com:yourusername/byxora-admin.git
cd byxora-admin
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 3. Start Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

The application will be available at `http://localhost:3000`

---

## 📁 Project Setup

### Environment Configuration

Create environment files for different environments:

```bash
# Development environment
cp .env.example .env.development

# Production environment  
cp .env.example .env.production
```

### Environment Variables

```env
# .env.development
VITE_APP_TITLE=Byxora Admin Dashboard
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_ENV=development

# .env.production
VITE_APP_TITLE=Byxora Admin Dashboard
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_APP_ENV=production
```

---

## 🔧 Development Setup

### VS Code Extensions (Recommended)

Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "vue.volar",
    "vue.vscode-typescript-vue-plugin",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "vue.codeActions.enabled": true,
  "vue.complete.casing.tags": "kebab",
  "vue.complete.casing.props": "camel"
}
```

---

## 📦 Build Process

### Development Build

```bash
# Start development server with hot reload
npm run dev

# Build for development (with source maps)
npm run build:dev
```

### Production Build

```bash
# Build optimized production version
npm run build

# Preview production build locally
npm run preview
```

### Build Analysis

```bash
# Analyze bundle size
npm run build:analyze
```

---

## 🌐 Deployment

### Static Hosting (Vercel, Netlify, etc.)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify Deployment

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Docker Deployment

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:16-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

Build and run:

```bash
# Build Docker image
docker build -t byxora-admin .

# Run container
docker run -p 80:80 byxora-admin
```

---

## 🔍 Troubleshooting

### Common Issues

#### Node.js Version Error
```bash
# Check your Node.js version
node --version

# If version < 16, update Node.js or use nvm
nvm install 16
nvm use 16
```

#### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- --port 3001
```

#### Permission Issues
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

#### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Clean Installation

If you encounter issues, try a clean installation:

```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

---

## 📚 Next Steps

After successful installation:

1. **Explore the Components**: Browse through the available components
2. **Customize the Theme**: Modify colors and layout options
3. **Add Your Pages**: Create new pages and routes
4. **Integrate Your API**: Connect to your backend services
5. **Deploy to Production**: Deploy to your preferred hosting platform

---

## 🤝 Need Help?

If you encounter any issues during installation:

- 📖 Check the [Documentation](./README.md)
- 🐛 [Report an Issue](https://github.com/yourusername/byxora-admin/issues)
- 💬 [Join our Community](https://discord.gg/your-server)
- 📧 Email: support@example.com

---

**Happy coding with Byxora Admin Dashboard! 🎉**
