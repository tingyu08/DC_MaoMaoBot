讓你的機器人 24/7 不停運行！

## 🌟 方案 1：Replit（最簡單，完全免費）

### 優點：
- ✅ 完全免費
- ✅ 不需要信用卡
- ✅ 設定超簡單
- ✅ 內建線上編輯器

### 缺點：
- ⚠️ 免費版可能會在一段時間不活動後休眠（可用外部服務保持喚醒）

### 部署步驟：

#### 1. 註冊 Replit
前往 https://replit.com 並註冊帳號

#### 2. 創建新的 Repl
- 點擊 "+ Create Repl"
- 選擇 "Import from GitHub" 或 "Node.js"

#### 3. 上傳你的代碼
- 如果選擇 Import from GitHub，需要先把代碼推送到 GitHub
- 如果選擇 Node.js，直接複製貼上所有文件

#### 4. 設定環境變數（Secrets）
- 點擊左側的 🔒 "Secrets" (或 Tools > Secrets)
- 添加以下變數：
  - Key: `DISCORD_TOKEN`, Value: 你的 Bot Token
  - Key: `CHANNEL_ID`, Value: 你的頻道 ID
- **注意：不要使用 .env 文件！**

#### 5. 安裝依賴
在 Shell 中執行：
```bash
npm install
```

#### 6. 運行機器人
點擊上方的 "Run" 按鈕

#### 7. 保持機器人運行（重要！）
Replit 免費版會在一段時間後休眠，使用以下方法保持喚醒：
- 使用 UptimeRobot (https://uptimerobot.com)
  - 註冊帳號
  - 添加新的 Monitor
  - Monitor Type: HTTP(s)
  - URL: 你的 Replit URL（在右上角）
  - Monitoring Interval: 5 分鐘

**或者**在 bot.js 中添加簡單的 HTTP 服務器（可選）：
```javascript
// 在文件開頭添加
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Bot is running!');
});
server.listen(3000);
```

---

## 🚀 方案 2：Railway（推薦，穩定）

### 優點：
- ✅ 每月 5 美元免費額度
- ✅ 非常穩定
- ✅ 自動部署
- ✅ 不會休眠

### 缺點：
- ⚠️ 需要信用卡（但不會扣款直到超過免費額度）
- ⚠️ 超過免費額度後按使用量計費

### 部署步驟：

#### 1. 推送代碼到 GitHub
```bash
# 初始化 Git（如果還沒有）
git init
git add .
git commit -m "Initial commit"

# 在 GitHub 創建新的 repository，然後
git remote add origin https://github.com/你的用戶名/DCautoBot.git
git push -u origin main
```

#### 2. 註冊 Railway
前往 https://railway.app 並使用 GitHub 帳號登入

#### 3. 創建新專案
- 點擊 "New Project"
- 選擇 "Deploy from GitHub repo"
- 選擇你的 DCautoBot repository

#### 4. 設定環境變數
- 在專案頁面，點擊你的服務
- 進入 "Variables" 標籤
- 添加：
  - `DISCORD_TOKEN`: 你的 Bot Token
  - `CHANNEL_ID`: 你的頻道 ID

#### 5. 部署
Railway 會自動偵測到 `Procfile` 並開始部署

#### 6. 查看日誌
點擊 "Deployments" 查看部署狀態和日誌

---

## 🎨 方案 3：Render（穩定，有免費方案）

### 優點：
- ✅ 有免費方案
- ✅ 不需要信用卡
- ✅ 穩定可靠
- ✅ 自動部署

### 缺點：
- ⚠️ 免費方案會在 15 分鐘不活動後休眠
- ⚠️ 每月有運行時間限制（750 小時）

### 部署步驟：

#### 1. 推送代碼到 GitHub（同方案 2）

#### 2. 註冊 Render
前往 https://render.com 並註冊

#### 3. 創建新的 Web Service
- 點擊 "New +"
- 選擇 "Background Worker"
- 連接你的 GitHub repository

#### 4. 設定
- Name: DCautoBot
- Environment: Node
- Build Command: `npm install`
- Start Command: `node bot.js`

#### 5. 添加環境變數
在 "Environment" 部分添加：
- `DISCORD_TOKEN`
- `CHANNEL_ID`

#### 6. 部署
點擊 "Create Background Worker"

---

## 💡 方案 4：自己的電腦/樹莓派 24/7 運行

如果你有不關機的電腦或樹莓派：

### Windows:
使用 PM2 保持運行：
```bash
npm install -g pm2
pm2 start bot.js --name discord-bot
pm2 startup  # 開機自動啟動
pm2 save     # 保存當前設定
```

### Linux/Mac:
```bash
npm install -g pm2
pm2 start bot.js --name discord-bot
pm2 startup
pm2 save
```

查看狀態：
```bash
pm2 status
pm2 logs discord-bot
```

---

## 📋 比較表

| 方案 | 免費 | 穩定性 | 難度 | 需要信用卡 | 推薦度 |
|------|------|--------|------|------------|--------|
| Replit | ✅ | ⭐⭐⭐ | ⭐ | ❌ | ⭐⭐⭐⭐ |
| Railway | 部分 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ✅ | ⭐⭐⭐⭐⭐ |
| Render | ✅ | ⭐⭐⭐⭐ | ⭐⭐ | ❌ | ⭐⭐⭐⭐ |
| 自己主機 | ✅ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ❌ | ⭐⭐⭐ |

---

## ⚠️ 部署前注意事項

1. **確保 .env 文件不會被上傳**
   - 檢查 `.gitignore` 中有包含 `.env`
   - 改用平台的環境變數功能

2. **重新生成你的 Bot Token**
   - 因為 Token 已在之前的對話中暴露
   - 前往 Discord Developer Portal 重新生成

3. **測試機器人**
   - 在本地先確認運作正常
   - 再進行部署

4. **監控運行狀態**
   - 定期檢查機器人是否正常運行
   - 查看日誌確認沒有錯誤

---

## 🆘 故障排除

### 機器人離線
- 檢查環境變數是否設定正確
- 查看部署日誌是否有錯誤
- 確認 Token 沒有過期

### 無法發送訊息
- 確認 Bot 有發送訊息權限
- 確認 CHANNEL_ID 正確
- 檢查 Bot 是否在該伺服器中

### Railway/Render 休眠
- 使用 UptimeRobot 定期 ping
- 升級到付費方案

---

## 📞 需要幫助？

如果遇到問題，檢查：
1. 環境變數是否正確設定
2. Bot Token 是否有效
3. 部署日誌中的錯誤訊息
4. Bot 是否有正確的權限
