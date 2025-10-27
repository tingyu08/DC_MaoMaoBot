# 🔧 機器人維護指南

## 📊 狀態檢查

### Discord Bot 狀態確認
1. 前往 [Discord Developer Portal](https://discord.com/developers/applications)
2. 選擇你的應用程式 → Bot
3. 確認機器人狀態為「線上」
4. 在 Discord 伺服器中確認機器人顯示為線上狀態

### 基本功能測試
```javascript
// 在指定頻道發送測試訊息
!ping  // 應該會收到 pong 回應
```

## 🔍 監控設定

### UptimeRobot 監控
- 監控面板：https://uptimerobot.com/dashboard
- 檢查頻率：每 5 分鐘
- 監控項目：
  - 服務存活狀態
  - 回應時間

### Render 錯誤通知
- 儀表板：https://dashboard.render.com
- 日誌位置：Services → dcautobot-worker → Logs
- 通知設定：
  - Deploy 失敗通知
  - 錯誤日誌通知
  - 資源使用警告

## 🚨 常見問題處理

### 1. 機器人離線
檢查項目：
- Render 服務狀態
- 環境變數是否正確
- Discord Token 是否有效
- 檢查錯誤日誌

修復步驟：
1. 重啟服務：Render Dashboard → Restart
2. 檢視日誌：尋找錯誤訊息
3. 必要時重新部署：Manual Deploy

### 2. 無法發送訊息
檢查項目：
- BOT_CHANNEL_ID 設定
- 機器人權限設定
- 頻道存取權限

### 3. 服務不穩定
解決方案：
- 檢查 UptimeRobot 報告
- 查看 Render 資源使用狀況
- 考慮升級計劃

## 📝 重要資訊

### 環境變數
- DISCORD_TOKEN：Discord Bot 的驗證令牌
- BOT_CHANNEL_ID：機器人運作的頻道 ID

### 關鍵指令
```bash
# 本地測試
npm run bot

# 檢視 Render 日誌
render logs

# 檢查 GitHub Actions 狀態
gh run list
```

### 重要連結
- Render 儀表板：https://dashboard.render.com
- GitHub Repository：https://github.com/tingyu08/DC_MaoMaoBot
- Discord Developer Portal：https://discord.com/developers/applications

## 📅 定期維護檢查清單

### 每日檢查
- [ ] 機器人在線狀態
- [ ] 基本功能回應
- [ ] 錯誤日誌檢視

### 每週檢查
- [ ] UptimeRobot 監控報告
- [ ] Render 資源使用狀況
- [ ] 更新需求評估

### 每月檢查
- [ ] 備份設定檢查
- [ ] Token 安全性評估
- [ ] 效能優化評估

## 🆘 緊急聯絡資訊

1. Discord 支援：https://support.discord.com
2. Render 支援：https://render.com/docs
3. 專案維護者：[your-email@example.com]

## 📈 監控指標

關鍵監控項目：
1. 機器人回應時間
2. 服務運行時間
3. 記憶體使用率
4. 錯誤發生率

## 🔄 版本更新流程

1. 本地測試新功能
2. 提交到 GitHub
3. 確認 GitHub Actions 檢查通過
4. Render 自動部署
5. 驗證新功能