# Deployment & GitHub Setup Guide

## GitHub Repository Setup

### 1. Create Repository

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Automated Resume Screening Tool"

# Add remote repository
git remote add origin https://github.com/your-username/automated-resume-screening-tool.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2. Repository Configuration

**Repository Name**: `automated-resume-screening-tool`

**Description**: 
```
AI-powered resume screening and candidate ranking platform with LLM-powered extraction, 
TF-IDF and semantic similarity scoring, and recruiter dashboard.
```

**Topics**: 
```
resume-screening, recruitment, machine-learning, nlp, ai, typescript, react, fastapi, 
candidate-ranking, hr-tech, automation
```

**README**: Already included in root directory

### 3. GitHub Settings

- **Visibility**: Public (for portfolio)
- **Default Branch**: main
- **Branch Protection**: Enable for main branch
  - Require pull request reviews before merging
  - Require status checks to pass
  - Require branches to be up to date

### 4. Add .gitignore

```bash
# Node
node_modules/
.pnpm-store/
dist/
build/
*.log

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build artifacts
.next/
out/

# Database
*.db
*.sqlite

# Misc
.cache/
.turbo/
```

### 5. Add LICENSE

Create `LICENSE` file with MIT License:

```
MIT License

Copyright (c) 2026 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## Deployment Options

### Option 1: Manus Platform (Recommended)

The project is built on Manus platform with built-in hosting.

**Steps**:
1. Project is already initialized on Manus
2. Click "Publish" in the Management UI
3. Custom domain available via Domains panel
4. Automatic SSL and CDN included

### Option 2: Docker + Cloud Provider

#### Prerequisites
- Docker installed
- Cloud provider account (AWS, Google Cloud, Azure, etc.)

#### Build Docker Image

```bash
# Build image
docker build -t resume-screening:latest .

# Test locally
docker run -p 3000:3000 \
  -e DATABASE_URL="mysql://user:pass@db:3306/resume_screening" \
  -e JWT_SECRET="your-secret" \
  resume-screening:latest
```

#### Deploy to AWS ECS

```bash
# Create ECR repository
aws ecr create-repository --repository-name resume-screening

# Build and push image
docker build -t resume-screening:latest .
docker tag resume-screening:latest <account-id>.dkr.ecr.<region>.amazonaws.com/resume-screening:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/resume-screening:latest

# Create ECS task definition, service, and load balancer
# (Use AWS Console or CloudFormation template)
```

#### Deploy to Google Cloud Run

```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/<project-id>/resume-screening

# Deploy
gcloud run deploy resume-screening \
  --image gcr.io/<project-id>/resume-screening \
  --platform managed \
  --region us-central1 \
  --set-env-vars DATABASE_URL="mysql://...",JWT_SECRET="..."
```

#### Deploy to Heroku

```bash
# Create Heroku app
heroku create resume-screening

# Set environment variables
heroku config:set DATABASE_URL="mysql://..."
heroku config:set JWT_SECRET="your-secret"

# Deploy
git push heroku main
```

### Option 3: VPS Deployment

#### Prerequisites
- VPS with Ubuntu 22.04+
- Node.js 22+
- MySQL database
- Nginx reverse proxy
- SSL certificate (Let's Encrypt)

#### Setup Steps

```bash
# SSH into VPS
ssh user@your-vps-ip

# Install dependencies
sudo apt update
sudo apt install -y nodejs npm postgresql nginx certbot python3-certbot-nginx

# Install pnpm
npm install -g pnpm

# Clone repository
git clone https://github.com/your-username/automated-resume-screening-tool.git
cd automated-resume-screening-tool

# Install dependencies
pnpm install

# Build project
pnpm build

# Create systemd service
sudo tee /etc/systemd/system/resume-screening.service > /dev/null <<EOF
[Unit]
Description=Resume Screening Tool
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/home/user/automated-resume-screening-tool
Environment="NODE_ENV=production"
Environment="DATABASE_URL=mysql://user:pass@localhost:3306/resume_screening"
ExecStart=/usr/local/bin/node dist/index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

# Enable and start service
sudo systemctl enable resume-screening
sudo systemctl start resume-screening

# Configure Nginx
sudo tee /etc/nginx/sites-available/resume-screening > /dev/null <<EOF
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/resume-screening /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL
sudo certbot --nginx -d your-domain.com
```

## Environment Variables

### Development
```bash
NODE_ENV=development
DATABASE_URL=mysql://root:password@localhost:3306/resume_screening_dev
JWT_SECRET=dev-secret-key
VITE_APP_ID=dev-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
```

### Production
```bash
NODE_ENV=production
DATABASE_URL=mysql://prod-user:secure-password@prod-db:3306/resume_screening
JWT_SECRET=<generate-with: openssl rand -base64 32>
VITE_APP_ID=<production-app-id>
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://auth.manus.im
LOG_LEVEL=info
SENTRY_DSN=<your-sentry-dsn>
```

## Database Setup

### MySQL Setup

```bash
# Create database
mysql -u root -p
CREATE DATABASE resume_screening;
CREATE USER 'screening_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON resume_screening.* TO 'screening_user'@'localhost';
FLUSH PRIVILEGES;

# Run migrations
pnpm drizzle-kit migrate
```

### PostgreSQL Setup

```bash
# Create database
psql -U postgres
CREATE DATABASE resume_screening;
CREATE USER screening_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE resume_screening TO screening_user;

# Run migrations
pnpm drizzle-kit migrate
```

## Monitoring & Logging

### Application Monitoring

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start dist/index.js --name "resume-screening"

# Monitor
pm2 monit

# Setup auto-restart
pm2 startup
pm2 save
```

### Log Aggregation

**Using Sentry** (recommended):

```bash
# Install Sentry
npm install @sentry/node

# Configure in server code
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

**Using ELK Stack**:
- Elasticsearch for log storage
- Logstash for log processing
- Kibana for visualization

## Performance Optimization

### Database Optimization

```sql
-- Add indexes for frequently queried fields
CREATE INDEX idx_rankings_job_id ON rankings(jobId);
CREATE INDEX idx_rankings_candidate_id ON rankings(candidateId);
CREATE INDEX idx_features_job_candidate ON features(jobId, candidateId);
CREATE INDEX idx_resumes_candidate_id ON resumes(candidateId);
```

### Caching Strategy

```typescript
// Implement Redis caching for ranking results
import Redis from 'redis';

const redis = Redis.createClient();

// Cache ranking results for 1 hour
await redis.setex(`rankings:${jobId}`, 3600, JSON.stringify(rankings));
```

### API Rate Limiting

```typescript
// Implement rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Continuous Integration/Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '22'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run tests
        run: pnpm test
      
      - name: Build
        run: pnpm build
      
      - name: Deploy to Manus
        run: |
          # Deploy command here
```

## Backup & Recovery

### Database Backups

```bash
# Automated daily backup
0 2 * * * mysqldump -u user -p password resume_screening > /backups/resume_screening_$(date +\%Y\%m\%d).sql

# Restore from backup
mysql -u user -p password resume_screening < /backups/resume_screening_20260504.sql
```

### File Storage Backups

```bash
# Backup S3 files
aws s3 sync s3://resume-screening-bucket /backups/s3-backup --region us-east-1
```

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set secure headers (CSP, X-Frame-Options, etc.)
- [ ] Implement rate limiting
- [ ] Enable database encryption
- [ ] Use strong JWT secret
- [ ] Validate all file uploads
- [ ] Implement CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable database backups
- [ ] Setup monitoring and alerts
- [ ] Regular security updates
- [ ] Implement audit logging

## Troubleshooting Deployment

### Issue: Database Connection Failed
```bash
# Check MySQL is running
sudo systemctl status mysql

# Test connection
mysql -u user -p -h localhost resume_screening -e "SELECT 1"
```

### Issue: Port 3000 Already in Use
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Issue: Out of Memory
```bash
# Increase Node.js memory limit
NODE_OPTIONS=--max-old-space-size=4096 pnpm start
```

### Issue: LLM API Rate Limit
```bash
# Implement exponential backoff
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}
```

## Support & Maintenance

- Monitor error rates and performance metrics
- Regular security updates
- Database optimization and maintenance
- Backup verification
- User feedback and feature requests
- Documentation updates
