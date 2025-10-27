# 專案結構說明

## 📁 目錄結構

```
DCautoBot/
├── bot/                       # Bot 相關（網頁控制面板）
│   ├── bot.js                # Bot 主程式
│   ├── server.js             # Express 網頁伺服器
│   └── public/               # 網頁前端文件
│       ├── index.html        # 控制面板主頁
│       ├── style.css         # 樣式表
│       └── app.js            # 前端邏輯
│
├── selfbot/                   # Selfbot 相關（自動命令）
│   ├── selfbot.js            # 個人帳號自動命令程式
│   ├── SELFBOT_GUIDE.md      # Selfbot 使用教學
│   └── TOKEN_GUIDE.md        # Token 取得教學
│
├── .env                       # 環境變數配置（請勿上傳）
├── .env.example               # 環境變數範例
├── .gitignore                 # Git 忽略文件
├── package.json               # Node.js 專案配置
├── README.md                  # 主要說明文件
├── QUICKSTART.md              # 快速開始指南
├── DEPLOY.md                  # 部署教學
└── STRUCTURE.md               # 本文件（專案結構說明）
```

## 🎯 兩種功能分離

### bot/ - 網頁控制面板 + Bot 自動發話

**用途**：使用 Bot 帳號，透過網頁控制面板發送訊息

**特點**：
- ✅ 完全合法
- ✅ 零封號風險
- ✅ 網頁圖形化界面
- ✅ 即時控制和監控

**啟動方式**：
```bash
npm start
```

**訪問**：http://localhost:3000

---

### selfbot/ - 自動命令執行

**用途**：使用個人帳號自動執行斜線命令（如 `/hourly`）

**特點**：
- ⚠️ 違反服務條款
- ⚠️ 高封號風險
- ✅ 可以自動簽到
- ✅ 可以執行斜線命令

**啟動方式**：
```bash
npm run selfbot
```

---

## 🚀 快速使用

### 使用 Bot（推薦）

1. 設定 `.env`：
   ```env
   DISCORD_TOKEN=你的BotToken
   BOT_CHANNEL_ID=頻道ID
   ```

2. 啟動：
   ```bash
   npm start
   ```

3. 打開瀏覽器：http://localhost:3000

### 使用 Selfbot（風險自負）

1. 設定 `.env`：
   ```env
   USER_TOKEN=你的個人Token
   BOT_ID=目標機器人ID
   SELFBOT_CHANNEL_ID=頻道ID
   ```

2. 啟動：
   ```bash
   npm run selfbot
   ```

---

## 📖 相關文檔

### Bot 相關
- [README.md](README.md) - Bot 完整教學
- [DEPLOY.md](DEPLOY.md) - 雲端部署指南

### Selfbot 相關
- [selfbot/SELFBOT_GUIDE.md](selfbot/SELFBOT_GUIDE.md) - Selfbot 完整教學
- [selfbot/TOKEN_GUIDE.md](selfbot/TOKEN_GUIDE.md) - Token 取得方法

### 通用
- [QUICKSTART.md](QUICKSTART.md) - 快速開始指南
- [.env.example](.env.example) - 環境變數範例

---

## 🔧 開發指令

```bash
# 啟動 Bot 網頁控制面板
npm start

# 啟動 Selfbot 自動命令
npm run selfbot

# 直接運行 Bot（不啟動網頁）
npm run bot

# 開發模式（同 npm start）
npm run dev
```

---

## 💡 選擇建議

| 需求 | 使用 | 位置 |
|------|------|------|
| 定時發送訊息 | Bot | `bot/` |
| 網頁控制界面 | Bot | `bot/` |
| 自動簽到 | Selfbot | `selfbot/` |
| 執行斜線命令 | Selfbot | `selfbot/` |
| 安全合法 | Bot | `bot/` |
| 願意承擔風險 | Selfbot | `selfbot/` |

---

## ⚠️ 重要提醒

### Bot (bot/) - 完全安全
- ✅ Discord 官方支持
- ✅ 不會封號
- ✅ 推薦使用

### Selfbot (selfbot/) - 高風險
- ❌ 違反服務條款
- ❌ 可能永久封號
- ❌ 使用小號
- ❌ 風險自負

---

## 🤝 貢獻

如果你有任何建議或改進，歡迎提出！

祝使用愉快！🎉
