const express = require('express');
const cors = require('cors');
const path = require('path');
const bot = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API 路由

// 獲取機器人狀態
app.get('/api/status', (req, res) => {
    try {
        const status = bot.getStatus();
        res.json(status);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 啟動機器人
app.post('/api/start', async (req, res) => {
    try {
        const result = await bot.start();
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 停止機器人
app.post('/api/stop', async (req, res) => {
    try {
        const result = await bot.stop();
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 更新配置
app.post('/api/config', (req, res) => {
    try {
        console.log('📝 收到配置更新請求:', req.body);
        const result = bot.updateConfig(req.body);
        console.log('✅ 配置更新成功');
        res.json(result);
    } catch (error) {
        console.error('❌ 配置更新失敗:', error);
        res.status(400).json({ error: error.message });
    }
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`\n🌐 控制面板已啟動！`);
    console.log(`📱 請在瀏覽器中打開: http://localhost:${PORT}`);
    console.log(`\n使用控制面板來啟動/停止機器人\n`);
});

// 處理程序退出
process.on('SIGINT', async () => {
    console.log('\n正在關閉伺服器...');
    if (bot.isRunning) {
        await bot.stop();
    }
    process.exit(0);
});
