# Discord 自動機器人專案

這個專案包含兩個主要部分：
1. Discord Bot（正規機器人）
2. Selfbot（個人帳號自動化）

## ⚠️ 重要警告

Selfbot（個人帳號自動化）嚴重違反 Discord 服務條款，可能導致帳號永久封禁！
建議使用備用帳號進行測試。

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定環境變數

複製 `.env.example` 到 `.env`：

```bash
copy .env.example .env
```

編輯 `.env` 文件並填入：

```env
# Discord Bot 設定
DISCORD_TOKEN=你的機器人Token
BOT_CHANNEL_ID=Bot監聽的頻道ID

# Selfbot 設定
USER_TOKEN=你的個人Token
SELFBOT_CHANNEL_ID=Selfbot發送命令的頻道ID
BOT_ID=目標機器人ID
EXECUTE_IMMEDIATELY=false
```

## 🤖 Discord Bot 功能

正規 Discord Bot，可以：
- 自動發送訊息
- 處理斜線命令
- 回應用戶互動

### 啟動 Bot

```bash
npm run bot
# 或
node bot/bot.js
```

## 🤫 Selfbot 功能

自動執行指定的斜線命令（例如：`/hourly`）

### 啟動 Selfbot

```bash
npm run selfbot
# 或
node selfbot/selfbot.js
```

## 📚 詳細文件

- [DEPLOY.md](DEPLOY.md) - 部署指南
- [QUICKSTART.md](QUICKSTART.md) - 快速入門
- [STRUCTURE.md](STRUCTURE.md) - 專案結構
- [SELFBOT_GUIDE.md](selfbot/SELFBOT_GUIDE.md) - Selfbot 使用指南
- [TOKEN_GUIDE.md](selfbot/TOKEN_GUIDE.md) - Token 獲取教學

## 📁 專案結構

```
DCautoBot/
├── bot/                # Discord Bot 相關
│   ├── bot.js         # Bot 主程式
│   ├── config.json    # Bot 設定
│   ├── server.js      # Web 伺服器
│   └── public/        # 網頁介面
├── selfbot/           # Selfbot 相關
│   ├── selfbot.js     # Selfbot 主程式
│   └── *.md          # Selfbot 文件
└── *.md              # 專案文件
```

## ⚙️ 設定說明

### Discord Bot 設定

在 `bot/config.json` 中：
- 自動發話內容
- 發話時間間隔
- 其他 Bot 設定

### Selfbot 設定

在 `selfbot/selfbot.js` 中：
```javascript
{
    COMMAND: '/hourly',    // 要執行的命令
    INTERVAL: 3600000,     // 間隔（1小時）
    RANDOM_DELAY: true,    // 隨機延遲
    MIN_DELAY: 0,         // 最小延遲
    MAX_DELAY: 300000     // 最大延遲（5分鐘）
}
```

## 🛑 停止程式

按 `Ctrl + C` 停止運行中的程式

如果無效，Windows 可用：
```bash
taskkill /F /IM node.exe
```

## 📝 注意事項

1. **Discord Bot**
   - ✅ 可以 24/7 運行
   - ✅ 可以部署到 Heroku
   - ✅ 遵循 Discord API 規範

2. **Selfbot**
   - ❌ 不建議 24/7 運行
   - ❌ 不要部署到雲端
   - ✅ 建議在本地運行
   - ✅ 使用較長的執行間隔
   - ✅ 開啟隨機延遲

## 🤝 貢獻

歡迎提交 Issue 或 Pull Request！

## 📜 授權

MIT License

一個簡單的 Discord 機器人，可以在指定頻道自動發送訊息。**現在包含網頁控制面板！**

## 功能特色

- 🎨 **網頁控制面板** - 用瀏覽器輕鬆控制機器人開關
- 🤖 自動在指定頻道發送訊息
- 🔀 支援隨機或順序發送模式
- ⏱️ 可自訂發送間隔時間
- 📝 可自訂訊息列表
- 📊 即時狀態監控
- ⚙️ 線上修改設定，無需重啟

## 安裝步驟

### 1. 安裝 Node.js
確保你的電腦已安裝 Node.js (建議 v16 或更高版本)
- 下載: https://nodejs.org/

### 2. 安裝依賴套件
```bash
npm install
```

### 3. 創建 Discord Bot

1. 前往 [Discord Developer Portal](https://discord.com/developers/applications)
2. 點擊 "New Application" 創建新應用
3. 在左側選單選擇 "Bot"
4. 點擊 "Add Bot"
5. 在 "TOKEN" 部分，點擊 "Copy" 複製你的 Bot Token
6. 向下滾動，啟用以下 Privileged Gateway Intents:
   - MESSAGE CONTENT INTENT

### 4. 邀請 Bot 到你的伺服器

1. 在左側選單選擇 "OAuth2" > "URL Generator"
2. 在 SCOPES 中勾選:
   - `bot`
3. 在 BOT PERMISSIONS 中勾選:
   - Send Messages
   - Read Messages/View Channels
4. 複製生成的 URL 並在瀏覽器中開啟
5. 選擇要加入的伺服器並授權

### 5. 設定環境變數

1. 複製 `.env.example` 並重新命名為 `.env`
```bash
copy .env.example .env
```

2. 編輯 `.env` 文件，填入你的資訊:
```
DISCORD_TOKEN=你的_Bot_Token
BOT_CHANNEL_ID=你的_頻道_ID
```

**如何取得頻道 ID:**
1. 在 Discord 中，開啟使用者設定
2. 前往 "進階" (Advanced)
3. 啟用 "開發者模式" (Developer Mode)
4. 回到你的伺服器，右鍵點擊要發送訊息的頻道
5. 點擊 "複製 ID" (Copy ID)

## 🚀 快速開始（使用網頁控制面板）

### 1. 啟動控制面板
```bash
npm start
```

### 2. 打開瀏覽器
訪問 http://localhost:3000

### 3. 設定機器人
在網頁控制面板中：
- 輸入頻道 ID
- 設定發送間隔（建議最少 60 秒）
- 選擇發送模式（隨機/順序）
- 新增或編輯訊息列表
- 點擊「儲存設定」

### 4. 啟動機器人
點擊「啟動機器人」按鈕

### 5. 監控狀態
控制面板會即時顯示：
- 機器人運行狀態
- 已發送訊息數量
- 最後發送的訊息
- 當前設定

## 使用方式

### 方式一：網頁控制面板（推薦）

```bash
npm start
```
然後在瀏覽器打開 http://localhost:3000，使用圖形化界面控制機器人。

**功能包括：**
- 一鍵啟動/停止機器人
- 即時查看運行狀態
- 線上修改設定
- 新增/刪除訊息
- 無需重啟即可更新配置

### 方式二：命令行模式

如果你想直接運行機器人（不使用 UI）：

```bash
npm run bot
```

## 自訂設定

### 使用網頁 UI 設定（推薦）
在控制面板的設定區域，你可以：
- 修改頻道 ID
- 調整發送間隔時間
- 切換發送模式
- 編輯訊息列表

**常用間隔時間參考:**
- 1 分鐘: `60` 秒
- 5 分鐘: `300` 秒
- 10 分鐘: `600` 秒
- 30 分鐘: `1800` 秒
- 1 小時: `3600` 秒

## 注意事項

1. **請勿濫用**: 設定合理的發送間隔，避免洗版
2. **遵守規則**: 確保你有權限在該頻道發送訊息
3. **Token 保密**: 絕對不要將 `.env` 文件上傳到公開的地方
4. **使用 Bot 帳號**: 這個程式使用的是 Discord Bot，不是個人帳號（使用個人帳號自動化會違反服務條款）

## 故障排除

### Bot 無法登入
- 檢查 `.env` 中的 `DISCORD_TOKEN` 是否正確
- 確認 Token 沒有多餘的空格

### 找不到頻道
- 檢查 `BOT_CHANNEL_ID` 是否正確
- 確認 Bot 已加入該伺服器
- 確認 Bot 有權限查看該頻道

### 無法發送訊息
- 確認 Bot 有 "Send Messages" 權限
- 確認該頻道沒有限制 Bot 發言

## 授權

MIT License
