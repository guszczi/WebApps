@ECHO OFF
CD backend
START npm start serve
CD ../frontend
START npm run serve
CD ../manager
START npm run serve
EXIT