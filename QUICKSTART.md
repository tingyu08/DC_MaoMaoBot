# 快速開始指南

## 🎯 功能說明

這個專案包含兩種功能：

### 1. 自動每小時執行 `/hourly` 命令 ⭐

使用**個人帳號**自動發送斜線命令（例如：`/hourly`、`/daily` 等）

**⚠️ 警告**：違反 Discord 服務條款，有封號風險！

**適合**：自動簽到、自動領取獎勵

### 2. 網頁控制面板 + Bot 自動發話

使用**Bot 帳號**在網頁上控制自動發送訊息

**✅ 完全合法**，零風險

**適合**：定時發送通知、活躍社群

---

## 🚀 方法一：自動執行命令（/hourly）

### 步驟 1：取得 Token

參考 [selfbot/TOKEN_GUIDE.md](selfbot/TOKEN_GUIDE.md) 取得你的個人帳號 Token

### 步驟 2：設定 .env

```env
USER_TOKEN=你的個人帳號Token
BOT_ID=目標機器人ID
SELFBOT_CHANNEL_ID=頻道ID
```

### 步驟 3：執行

```bash
npm run selfbot
```

### 詳細教學

查看 [selfbot/SELFBOT_GUIDE.md](selfbot/SELFBOT_GUIDE.md) 了解完整設定

---

## 🎨 方法二：網頁控制面板 + Bot

### 步驟 1：創建 Discord Bot

1. 前往 https://discord.com/developers/applications
2. 創建新應用並取得 Bot Token
3. 啟用 MESSAGE CONTENT INTENT
4. 邀請 Bot 到你的伺服器

### 步驟 2：設定 .env

```env
DISCORD_TOKEN=你的BotToken
BOT_CHANNEL_ID=頻道ID
```

### 步驟 3：啟動

```bash
npm start
```

然後打開 http://localhost:3000

### 詳細教學

查看 [README.md](README.md) 了解完整設定

---

## 📋 快速比較

| 功能 | 自動命令 | 網頁控制面板 |
|------|----------|--------------|
| 使用帳號 | 個人帳號 | Bot 帳號 |
| 合法性 | ❌ 違規 | ✅ 合法 |
| 封號風險 | ⚠️ 高 | ✅ 無 |
| 可發送命令 | ✅ 是 | ❌ 否 |
| 自動簽到 | ✅ 可以 | ❌ 不行 |
| 自動發話 | ❌ 不適合 | ✅ 適合 |

---

## 💡 建議

- **想自動簽到/領獎勵**：使用方法一（風險自負）
- **想定時發送訊息**：使用方法二（完全安全）
- **不確定**：先試方法二，完全合法且安全

---

## 📚 完整文檔

- [selfbot/SELFBOT_GUIDE.md](selfbot/SELFBOT_GUIDE.md) - 自動命令完整教學
- [selfbot/TOKEN_GUIDE.md](selfbot/TOKEN_GUIDE.md) - 如何取得 Token
- [README.md](README.md) - Bot 控制面板教學
- [DEPLOY.md](DEPLOY.md) - 雲端部署教學

---

## ⚠️ 重要提醒

使用個人帳號自動化：
- 違反 Discord 服務條款
- 可能導致帳號永久封禁
- 建議使用小號測試
- 風險自負

使用 Bot 帳號：
- 完全合法安全
- Discord 官方支持
- 零封號風險
- 推薦使用

選擇適合你的方式，祝使用愉快！🎉
