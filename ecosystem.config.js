module.exports = {
  apps: [
    {
      name: 'dcautobot',
      cwd: __dirname,
      script: 'npm',
      args: 'run bot',
      autorestart: true,
      watch: false,
      max_restarts: 10,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
