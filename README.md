Just completed the full deployment of Designcraft — a website I built about web design using AI and vibecoding.
What started as a personal project turned into a hands-on Cloud & DevOps lab.
What I did:
→ Vibecoded the project using Google AI Studio
→ Implemented XSS protection on the frontend
→ Dockerized the app with multi-stage build (React + Vite + Express + TypeScript)
→ Pushed to GitHub and deployed on Vercel for a public HTTPS URL
→ Created an AWS account with a dedicated IAM user (no root usage — security best practice)
→ Set up a budget alert to monitor costs
→ Launched an EC2 t2.micro instance with Ubuntu on Free Tier
→ Configured Security Groups with proper firewall rules (SSH restricted to my IP, HTTP/HTTPS public)
→ Deployed the Dockerized app on the instance
→ Configured Nginx as a reverse proxy
