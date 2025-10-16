Deployment Guide — Vercel (frontend) + Render (backend)

Overview
- Frontend: `HMS-Frontend/my-react-app` (Vite React)
- Backend: `HMS-Backend` (Node + Express + Mongoose)

Backend (Render) — steps
1. Push your repository to GitHub.
2. In Render, create a new Web Service and connect your GitHub repository. Set the Root Directory to `HMS-Backend`.
3. Environment variables (Render dashboard > Environment):
   - MONGODB_URI: mongodb+srv://<user>:<pass>@.../hms?retryWrites=true&w=majority
   - JWT_SECRET: <long-random-secret>
   - FRONTEND_URL: https://<your-vercel-domain>
4. Start Command: `npm start` (Render will run `npm install` as part of the build)
5. After deploy, note the service URL, e.g. `https://your-backend.onrender.com`.

Frontend (Vercel) — steps
1. In Vercel, create a new project and connect your repo. Set the Root Directory to `HMS-Frontend/my-react-app`.
2. In Vercel project settings add Environment Variable:
   - VITE_API_URL = https://your-backend.onrender.com
3. Build & Output settings (Vercel will usually detect Vite):
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy. After build you will have a URL like `https://your-frontend.vercel.app`.

Local environment for testing
- Backend `.env` (HMS-Backend/.env):
  MONGODB_URI=mongodb+srv://<user>:<pass>@.../hms?retryWrites=true&w=majority
  JWT_SECRET=dev_secret
  FRONTEND_URL=http://localhost:5173

- Frontend `.env` (HMS-Frontend/my-react-app/.env):
  VITE_API_URL=http://localhost:5000

Notes & checklist
- Confirm `MONGODB_URI` allows connections from Render's outbound IPs (SRV usually OK).
- Use secure secrets for `JWT_SECRET` in production.
- Consider tightening CORS using `FRONTEND_URL` in production (we added support in `index.js`).
- After deployment, set `VITE_API_URL` in Vercel to point to the Render backend URL.

Troubleshooting
- If backend fails to start on Render, check build logs for missing env vars or Mongo connection errors.
- Use Render's service logs to inspect runtime errors.
- If frontend fails to fetch API, ensure `VITE_API_URL` is set and CORS allows the frontend domain.

If you'd like, I can also:
- Add CI workflow (GitHub Actions) to deploy on push
- Create a small health-check endpoint and a status page
