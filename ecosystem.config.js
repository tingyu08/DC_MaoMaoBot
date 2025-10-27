module.exports = {
  apps: [
    {
      name: 'dcautobot',
      cwd: __dirname,
      // Execute the node binary with bot/bot.js as argument to avoid invoking npm wrapper on Windows
      script: 'node',
      args: 'bot/bot.js',
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_restarts: 10,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
