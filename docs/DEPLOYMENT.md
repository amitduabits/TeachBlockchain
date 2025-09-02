# Deployment Guide

This guide covers deploying the TeachBlockchain platform to production.

## Prerequisites

- Docker and Docker Compose installed
- Domain name configured
- SSL certificates (Let's Encrypt recommended)
- MongoDB database (or use the included MongoDB container)
- Redis instance (or use the included Redis container)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Server Configuration
NODE_ENV=production
PORT=5000
CLIENT_URL=https://yourdomain.com

# Database
MONGODB_URI=mongodb://admin:password@mongodb:27017/teachblockchain?authSource=admin

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Blockchain Configuration
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/your-project-id
POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/your-project-id

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Docker Deployment

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/teachblockchain.git
cd teachblockchain
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your production values
```

### 3. Build and Start Services

```bash
docker-compose up -d
```

### 4. Initialize Database

```bash
# Seed initial data
docker-compose exec backend node server/scripts/seedData.js
```

### 5. Verify Deployment

```bash
# Check service status
docker-compose ps

# Check logs
docker-compose logs -f backend
```

## Manual Deployment

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Install Redis
sudo apt install redis-server
```

### 2. Application Setup

```bash
# Clone repository
git clone https://github.com/yourusername/teachblockchain.git
cd teachblockchain

# Install dependencies
npm install
cd server && npm install
cd ../client && npm install

# Build client
cd client && npm run build
```

### 3. Database Setup

```bash
# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Create database and user
mongosh
use teachblockchain
db.createUser({
  user: "admin",
  pwd: "password",
  roles: [{ role: "readWrite", db: "teachblockchain" }]
})

# Seed data
cd server && node scripts/seedData.js
```

### 4. Process Management

Create a systemd service file:

```bash
sudo nano /etc/systemd/system/teachblockchain.service
```

```ini
[Unit]
Description=TeachBlockchain API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/teachblockchain
ExecStart=/usr/bin/node server/index.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=5000

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable teachblockchain
sudo systemctl start teachblockchain
```

## Nginx Configuration

### 1. Install Nginx

```bash
sudo apt install nginx
```

### 2. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/teachblockchain
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # API routes
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files
    location /uploads/ {
        alias /opt/teachblockchain/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Frontend
    location / {
        root /opt/teachblockchain/client/build;
        try_files $uri $uri/ /index.html;
    }
}
```

### 3. Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/teachblockchain /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Logging

### 1. Log Management

```bash
# View application logs
sudo journalctl -u teachblockchain -f

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 2. Process Monitoring

```bash
# Install PM2 for process management
npm install -g pm2

# Start application with PM2
pm2 start server/index.js --name "teachblockchain-api"
pm2 startup
pm2 save
```

### 3. Health Checks

```bash
# API health check
curl https://yourdomain.com/api/health

# Database connection
mongosh --eval "db.adminCommand('ping')"
```

## Backup Strategy

### 1. Database Backup

```bash
# Create backup script
sudo nano /opt/backup-mongodb.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/backups"
mkdir -p $BACKUP_DIR

mongodump --db teachblockchain --out $BACKUP_DIR/teachblockchain_$DATE
tar -czf $BACKUP_DIR/teachblockchain_$DATE.tar.gz -C $BACKUP_DIR teachblockchain_$DATE
rm -rf $BACKUP_DIR/teachblockchain_$DATE

# Keep only last 7 days of backups
find $BACKUP_DIR -name "teachblockchain_*.tar.gz" -mtime +7 -delete
```

```bash
sudo chmod +x /opt/backup-mongodb.sh
sudo crontab -e
# Add: 0 2 * * * /opt/backup-mongodb.sh
```

### 2. File Backup

```bash
# Backup uploads directory
sudo rsync -av /opt/teachblockchain/uploads/ /opt/backups/uploads/
```

## Scaling

### 1. Load Balancing

For high traffic, consider using multiple backend instances with a load balancer:

```nginx
upstream backend {
    server 127.0.0.1:5000;
    server 127.0.0.1:5001;
    server 127.0.0.1:5002;
}
```

### 2. Database Scaling

- Use MongoDB replica sets for high availability
- Implement database sharding for large datasets
- Use Redis for caching frequently accessed data

### 3. CDN Integration

- Use CloudFlare or AWS CloudFront for static assets
- Implement image optimization and compression
- Use edge caching for API responses

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 80, 443, 5000, 27017, and 6379 are available
2. **Permission errors**: Check file permissions for uploads directory
3. **Database connection**: Verify MongoDB is running and accessible
4. **SSL issues**: Check certificate validity and Nginx configuration

### Debug Commands

```bash
# Check service status
sudo systemctl status teachblockchain
sudo systemctl status mongod
sudo systemctl status nginx

# Check logs
sudo journalctl -u teachblockchain --since "1 hour ago"
sudo tail -f /var/log/nginx/error.log

# Test database connection
mongosh --eval "db.adminCommand('ping')"

# Test API endpoint
curl -I https://yourdomain.com/api/health
```

## Security Considerations

1. **Firewall**: Configure UFW to only allow necessary ports
2. **Updates**: Keep system and dependencies updated
3. **Monitoring**: Set up intrusion detection and monitoring
4. **Backups**: Regular automated backups with off-site storage
5. **SSL**: Use strong SSL configuration and HSTS headers
6. **Rate Limiting**: Implement rate limiting to prevent abuse
