require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

class DiscordBot {
    constructor() {
        this.client = null;
        this.intervalId = null;
        this.messageIndex = 0;
        this.isRunning = false;
        this.lastMessage = null;
        this.messageCount = 0;
        this.autoMessageRunning = false;
        this.configPath = path.join(__dirname, 'config.json');

        // 從檔案載入配置，如果不存在則使用預設值
        this.config = this.loadConfig();
    }

    // 載入配置檔案
    loadConfig() {
        try {
            if (fs.existsSync(this.configPath)) {
                const data = fs.readFileSync(this.configPath, 'utf8');
                const savedConfig = JSON.parse(data);
                console.log('📂 已載入儲存的配置');
                return savedConfig;
            }
        } catch (error) {
            console.error('⚠️  載入配置失敗，使用預設值:', error.message);
        }

        // 預設配置
        return {
            CHANNEL_ID: process.env.BOT_CHANNEL_ID || '', // 使用 BOT 專用的頻道 ID
            MESSAGES: [
                "你好！",
                "今天天氣真好",
                "大家好",
                "嗨~",
            ],
            INTERVAL: 300000, // 5分鐘
            MODE: 'random'
        };
    }

    // 保存配置到檔案
    saveConfig() {
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf8');
            console.log('💾 配置已保存到檔案');
            return true;
        } catch (error) {
            console.error('❌ 保存配置失敗:', error.message);
            return false;
        }
    }

    // 啟動機器人
    async start() {
        if (this.isRunning) {
            throw new Error('機器人已在運行中');
        }

        return new Promise((resolve, reject) => {
            // 創建 Discord 客戶端
            this.client = new Client({
                intents: [
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.GuildMessages,
                    GatewayIntentBits.MessageContent,
                ]
            });

            // 當機器人準備好時
            this.client.once('clientReady', () => {
                console.log(`✅ 機器人已登入: ${this.client.user.tag}`);
                console.log(`📢 將在頻道 ${this.config.CHANNEL_ID} 自動發話`);
                console.log(`⏱️  間隔時間: ${this.config.INTERVAL / 1000} 秒`);
                console.log(`🔄 發送模式: ${this.config.MODE === 'random' ? '隨機' : '順序'}`);

                this.isRunning = true;

                // 自動開始發送訊息
                this.startAutoMessage();
                console.log(`🚀 自動發送訊息已啟動！`);

                resolve({
                    success: true,
                    username: this.client.user.tag,
                    userId: this.client.user.id
                });
            });

            // 錯誤處理
            this.client.on('error', error => {
                console.error('❌ Discord 客戶端錯誤:', error);
            });

            // 登入 Discord
            this.client.login(process.env.DISCORD_TOKEN)
                .catch(error => {
                    console.error('❌ 登入失敗:', error);
                    reject(error);
                });
        });
    }

    // 停止機器人
    async stop() {
        if (!this.isRunning) {
            throw new Error('機器人未在運行中');
        }

        // 停止自動發送訊息
        this.stopAutoMessage();

        // 登出 Discord
        if (this.client) {
            await this.client.destroy();
            this.client = null;
        }

        this.isRunning = false;
        this.messageIndex = 0;
        console.log('🛑 機器人已停止');

        return { success: true, message: '機器人已停止' };
    }

    // 啟動自動發送訊息
    startAutoMessage() {
        if (this.autoMessageRunning) return;

        this.autoMessageRunning = true;
        this.intervalId = setInterval(async () => {
            try {
                const channel = await this.client.channels.fetch(this.config.CHANNEL_ID);

                if (!channel) {
                    console.error('❌ 找不到指定的頻道');
                    return;
                }

                // 選擇要發送的訊息
                let message;
                if (this.config.MODE === 'random') {
                    // 隨機選擇
                    message = this.config.MESSAGES[Math.floor(Math.random() * this.config.MESSAGES.length)];
                } else {
                    // 順序選擇
                    message = this.config.MESSAGES[this.messageIndex];
                    this.messageIndex = (this.messageIndex + 1) % this.config.MESSAGES.length;
                }

                // 發送訊息
                await channel.send(message);
                const now = new Date().toLocaleString('zh-TW');
                console.log(`📤 [${now}] 已發送訊息: ${message}`);

                this.lastMessage = message;
                this.messageCount++;

            } catch (error) {
                console.error('❌ 發送訊息時發生錯誤:', error);
            }
        }, this.config.INTERVAL);
    }

    // 停止自動發送訊息
    stopAutoMessage() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.autoMessageRunning = false;
    }

    // 獲取機器人狀態
    getStatus() {
        return {
            isRunning: this.isRunning,
            autoMessageRunning: this.autoMessageRunning,
            username: this.client ? this.client.user?.tag : null,
            userId: this.client ? this.client.user?.id : null,
            config: this.config,
            lastMessage: this.lastMessage,
            messageCount: this.messageCount
        };
    }

    // 更新配置
    updateConfig(newConfig) {
        const wasRunning = this.autoMessageRunning;

        // 更新配置
        if (newConfig.CHANNEL_ID) this.config.CHANNEL_ID = newConfig.CHANNEL_ID;
        if (newConfig.MESSAGES) this.config.MESSAGES = newConfig.MESSAGES;
        if (newConfig.INTERVAL) this.config.INTERVAL = newConfig.INTERVAL;
        if (newConfig.MODE) this.config.MODE = newConfig.MODE;

        // 保存配置到檔案
        this.saveConfig();

        // 如果機器人正在運行且間隔時間改變了，需要重新啟動定時器
        if (wasRunning && newConfig.INTERVAL) {
            this.stopAutoMessage();
            this.startAutoMessage();
        }

        console.log('⚙️  配置已更新');
        return { success: true, config: this.config };
    }
}

// 導出單例
const bot = new DiscordBot();
module.exports = bot;

// 如果直接運行此文件（而非被 require），則啟動機器人
if (require.main === module) {
    bot.start().catch(error => {
        console.error('❌ 啟動失敗:', error);
        process.exit(1);
    });

    // 處理程序退出
    process.on('SIGINT', async () => {
        console.log('\n正在停止機器人...');
        await bot.stop();
        process.exit(0);
    });
}
