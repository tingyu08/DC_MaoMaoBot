require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');

class AutoCommandBot {
    constructor() {
        this.client = null;
        this.intervalId = null;
        this.isRunning = false;
        this.commandCount = 0;
        this.lastCommandTime = null;

        // 配置
        this.config = {
            CHANNEL_ID: process.env.SELFBOT_CHANNEL_ID, // 使用 SELFBOT 專用的頻道 ID
            COMMAND: '/hourly', // 要執行的命令
            INTERVAL: 3600000, // 1小時 = 3600000 毫秒
            RANDOM_DELAY: false, // 是否添加隨機延遲
            MIN_DELAY: 0, // 最小延遲（毫秒）
            MAX_DELAY: 300000, // 最大延遲（5分鐘）
        };
    }

    // 啟動
    async start() {
        if (this.isRunning) {
            throw new Error('機器人已在運行中');
        }

        return new Promise((resolve, reject) => {
            this.client = new Client({
                checkUpdate: false
            });

            this.client.on('ready', async () => {
                console.log(`\n✅ 已登入個人帳號: ${this.client.user.tag}`);
                console.log(`⚠️  警告：這違反 Discord 服務條款，可能導致封號！`);
                console.log(`\n📍 目標頻道: ${this.config.CHANNEL_ID}`);
                console.log(`🎯 執行命令: ${this.config.COMMAND}`);
                console.log(`⏱️  執行間隔: ${this.config.INTERVAL / 1000} 秒 (${this.config.INTERVAL / 3600000} 小時)`);
                console.log(`🎲 隨機延遲: ${this.config.RANDOM_DELAY ? '是' : '否'}`);
                if (this.config.RANDOM_DELAY) {
                    console.log(`   延遲範圍: ${this.config.MIN_DELAY / 1000} - ${this.config.MAX_DELAY / 1000} 秒`);
                }
                console.log(`\n💡 提示：按 Ctrl+C 停止\n`);

                this.isRunning = true;

                // 立即執行一次（可選）
                const executeNow = process.env.EXECUTE_IMMEDIATELY === 'true';
                if (executeNow) {
                    console.log('🚀 立即執行第一次命令...\n');
                    await this.executeCommand();
                } else {
                    console.log('⏰ 將在下一個整點執行命令\n');
                }

                // 開始定時執行
                this.startAutoCommand();

                resolve({
                    success: true,
                    username: this.client.user.tag
                });
            });

            this.client.on('error', error => {
                console.error('❌ 客戶端錯誤:', error);
            });

            // 登入
            this.client.login(process.env.USER_TOKEN)
                .catch(error => {
                    console.error('❌ 登入失敗:', error);
                    console.log('\n請確認：');
                    console.log('1. USER_TOKEN 是否正確');
                    console.log('2. Token 是否過期');
                    console.log('3. 請參考 SELFBOT_GUIDE.md 了解如何取得 Token');
                    reject(error);
                });
        });
    }

    // 開始自動執行命令
    startAutoCommand() {
        this.intervalId = setInterval(async () => {
            await this.executeCommand();
        }, this.config.INTERVAL);
    }

    // 執行命令
    async executeCommand() {
        try {
            // 隨機延遲（防止被檢測）
            if (this.config.RANDOM_DELAY) {
                const delay = Math.floor(
                    Math.random() * (this.config.MAX_DELAY - this.config.MIN_DELAY) + this.config.MIN_DELAY
                );
                console.log(`⏳ 隨機延遲 ${delay / 1000} 秒...`);
                await this.sleep(delay);
            }

            const channel = await this.client.channels.fetch(this.config.CHANNEL_ID);

            if (!channel) {
                console.error('❌ 找不到指定的頻道');
                return;
            }

            // 發送斜線命令
            const command = this.config.COMMAND;

            // 使用 channel.sendSlash() 發送斜線命令
            // 先找到對應的 bot 和命令
            const botId = process.env.BOT_ID; // 目標機器人的 ID

            if (botId) {
                // 如果知道 Bot ID，直接發送給該 Bot
                // 移除開頭的斜線再發送
                const commandWithoutSlash = command.startsWith('/') ? command.slice(1) : command;
                await channel.sendSlash(botId, commandWithoutSlash);
            } else {
                // 如果不知道 Bot ID，發送通用命令
                await channel.send(command);
            }

            const now = new Date().toLocaleString('zh-TW');
            this.lastCommandTime = now;
            this.commandCount++;

            console.log(`✅ [${now}] 已執行命令: ${command}`);
            console.log(`📊 總執行次數: ${this.commandCount}`);
            console.log(`⏰ 下次執行時間: ${new Date(Date.now() + this.config.INTERVAL).toLocaleString('zh-TW')}\n`);

        } catch (error) {
            console.error('❌ 執行命令時發生錯誤:', error.message);

            if (error.message.includes('Unknown interaction')) {
                console.log('\n💡 提示：請確認：');
                console.log('1. 目標機器人是否在該頻道中');
                console.log('2. 命令名稱是否正確（例如：/hourly）');
                console.log('3. 你是否有權限在該頻道發送命令');
                console.log('4. 請設定 BOT_ID 在 .env 文件中\n');
            }
        }
    }

    // 停止
    async stop() {
        if (!this.isRunning) {
            throw new Error('機器人未在運行中');
        }

        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        if (this.client) {
            this.client.destroy();
            this.client = null;
        }

        this.isRunning = false;
        console.log('\n🛑 機器人已停止');
        console.log(`📊 總共執行了 ${this.commandCount} 次命令\n`);

        return { success: true };
    }

    // 獲取狀態
    getStatus() {
        return {
            isRunning: this.isRunning,
            username: this.client ? this.client.user?.tag : null,
            commandCount: this.commandCount,
            lastCommandTime: this.lastCommandTime,
            config: this.config
        };
    }

    // 輔助函數：延遲
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 導出
const autoBot = new AutoCommandBot();
module.exports = autoBot;

// 如果直接運行此文件
if (require.main === module) {
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║   Discord 自動命令機器人 (個人帳號)        ║');
    console.log('╚══════════════════════════════════════════════╝');
    console.log('');
    console.log('⚠️  重要警告：');
    console.log('   使用個人帳號自動化違反 Discord 服務條款');
    console.log('   可能導致帳號永久封禁！');
    console.log('   建議使用小號進行測試');
    console.log('');

    autoBot.start().catch(error => {
        console.error('❌ 啟動失敗:', error.message);
        process.exit(1);
    });

    // 處理程序退出
    process.on('SIGINT', async () => {
        console.log('\n\n正在停止機器人...');
        await autoBot.stop();
        process.exit(0);
    });

    // 未處理的錯誤
    process.on('unhandledRejection', error => {
        console.error('❌ 未處理的錯誤:', error);
    });
}
