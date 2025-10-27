// API 基礎 URL
const API_BASE = '/api';

// DOM 元素
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const saveConfigBtn = document.getElementById('saveConfigBtn');
const addMessageBtn = document.getElementById('addMessageBtn');
const statusBadge = document.getElementById('statusBadge');
const botInfo = document.getElementById('botInfo');
const messagesList = document.getElementById('messagesList');
const notification = document.getElementById('notification');

// 輸入元素
const channelIdInput = document.getElementById('channelId');
const intervalInput = document.getElementById('interval');
const modeSelect = document.getElementById('mode');

// 顯示元素
const botUsername = document.getElementById('botUsername');
const messageCount = document.getElementById('messageCount');
const lastMessage = document.getElementById('lastMessage');
const runningStatus = document.getElementById('runningStatus');
const intervalDisplay = document.getElementById('intervalDisplay');
const modeDisplay = document.getElementById('modeDisplay');
const messagesCount = document.getElementById('messagesCount');

// 狀態
let currentMessages = [];
let isEditing = false; // 追蹤用戶是否正在編輯
let messagesLoaded = false; // 追蹤訊息是否已經載入過

// 初始化
async function init() {
    await loadStatus();
    setInterval(loadStatus, 3000); // 每3秒更新狀態
}

// 載入機器人狀態
async function loadStatus() {
    try {
        const response = await fetch(`${API_BASE}/status`);
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('載入狀態失敗:', error);
    }
}

// 更新 UI
function updateUI(status) {
    // 更新狀態徽章
    if (status.isRunning) {
        statusBadge.classList.add('online');
        statusBadge.querySelector('.status-text').textContent = '運行中';
        startBtn.disabled = true;
        stopBtn.disabled = false;
        botInfo.style.display = 'block';
        runningStatus.textContent = '運行中';
        runningStatus.style.color = '#3BA55D';
    } else {
        statusBadge.classList.remove('online');
        statusBadge.querySelector('.status-text').textContent = '離線';
        startBtn.disabled = false;
        stopBtn.disabled = true;
        botInfo.style.display = 'none';
        runningStatus.textContent = '離線';
        runningStatus.style.color = '#ED4245';
    }

    // 更新機器人資訊
    if (status.username) {
        botUsername.textContent = status.username;
    }
    messageCount.textContent = status.messageCount || 0;
    lastMessage.textContent = status.lastMessage || '-';

    // 更新配置
    if (status.config) {
        // 只在第一次載入或用戶沒有編輯時才更新輸入欄位
        if (!messagesLoaded) {
            channelIdInput.value = status.config.CHANNEL_ID || '';
            intervalInput.value = status.config.INTERVAL / 1000 || 300;
            modeSelect.value = status.config.MODE || 'random';
            currentMessages = status.config.MESSAGES || [];
            renderMessages();
            messagesLoaded = true;
        }

        // 更新統計顯示（只讀區域，永遠顯示伺服器的實際配置）
        intervalDisplay.textContent = `${status.config.INTERVAL / 1000} 秒`;
        modeDisplay.textContent = status.config.MODE === 'random' ? '隨機' : '順序';
        messagesCount.textContent = currentMessages.length;
    }
}

// 渲染訊息列表
function renderMessages() {
    messagesList.innerHTML = '';
    currentMessages.forEach((msg, index) => {
        const div = document.createElement('div');
        div.className = 'message-item';

        // 創建輸入框
        const input = document.createElement('input');
        input.type = 'text';
        input.value = msg;
        input.dataset.index = index;

        // 監聽輸入事件，標記為正在編輯
        input.addEventListener('focus', () => {
            isEditing = true;
        });
        input.addEventListener('blur', () => {
            isEditing = false;
        });
        input.addEventListener('input', () => {
            isEditing = true;
        });

        // 創建刪除按鈕
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '刪除';
        deleteBtn.className = 'btn-delete';
        deleteBtn.addEventListener('click', () => removeMessage(index));

        div.appendChild(input);
        div.appendChild(deleteBtn);
        messagesList.appendChild(div);
    });
}

// 新增訊息
function addMessage() {
    isEditing = true;
    currentMessages.push('新訊息');
    renderMessages();
    setTimeout(() => {
        isEditing = false;
    }, 100);
}

// 刪除訊息
function removeMessage(index) {
    isEditing = true;
    currentMessages.splice(index, 1);
    renderMessages();
    setTimeout(() => {
        isEditing = false;
    }, 100);
}

// 啟動機器人
async function startBot() {
    try {
        startBtn.disabled = true;
        startBtn.textContent = '啟動中...';

        const response = await fetch(`${API_BASE}/start`, {
            method: 'POST'
        });

        const data = await response.json();

        if (response.ok) {
            showNotification('機器人已成功啟動！', 'success');
            await loadStatus();
        } else {
            throw new Error(data.error || '啟動失敗');
        }
    } catch (error) {
        showNotification(`啟動失敗: ${error.message}`, 'error');
        startBtn.disabled = false;
    } finally {
        startBtn.innerHTML = '<span>▶</span> 啟動機器人';
    }
}

// 停止機器人
async function stopBot() {
    try {
        stopBtn.disabled = true;
        stopBtn.textContent = '停止中...';

        const response = await fetch(`${API_BASE}/stop`, {
            method: 'POST'
        });

        const data = await response.json();

        if (response.ok) {
            showNotification('機器人已停止', 'info');
            await loadStatus();
        } else {
            throw new Error(data.error || '停止失敗');
        }
    } catch (error) {
        showNotification(`停止失敗: ${error.message}`, 'error');
        stopBtn.disabled = false;
    } finally {
        stopBtn.innerHTML = '<span>⏹</span> 停止機器人';
    }
}

// 儲存配置
async function saveConfig() {
    try {
        isEditing = true; // 防止在儲存過程中被覆蓋

        // 收集訊息
        const messageInputs = messagesList.querySelectorAll('input');
        currentMessages = Array.from(messageInputs).map(input => input.value.trim()).filter(msg => msg);

        if (currentMessages.length === 0) {
            showNotification('請至少添加一條訊息', 'error');
            isEditing = false;
            return;
        }

        const config = {
            CHANNEL_ID: channelIdInput.value.trim(),
            MESSAGES: currentMessages,
            INTERVAL: parseInt(intervalInput.value) * 1000,
            MODE: modeSelect.value
        };

        // 驗證
        if (!config.CHANNEL_ID) {
            showNotification('請輸入頻道 ID', 'error');
            return;
        }

        if (config.INTERVAL < 60000) {
            showNotification('間隔時間至少需要 60 秒', 'error');
            return;
        }

        saveConfigBtn.disabled = true;
        saveConfigBtn.textContent = '儲存中...';

        const response = await fetch(`${API_BASE}/config`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(config)
        });

        const data = await response.json();

        if (response.ok) {
            showNotification('設定已儲存！', 'success');
            // 儲存成功後，允許從伺服器重新載入配置以同步統計顯示
            messagesLoaded = false;
            await loadStatus();
        } else {
            throw new Error(data.error || '儲存失敗');
        }
    } catch (error) {
        showNotification(`儲存失敗: ${error.message}`, 'error');
    } finally {
        saveConfigBtn.disabled = false;
        saveConfigBtn.textContent = '💾 儲存設定';
        isEditing = false; // 儲存完成後解除編輯狀態
    }
}

// 顯示通知
function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// 事件監聽
startBtn.addEventListener('click', startBot);
stopBtn.addEventListener('click', stopBot);
saveConfigBtn.addEventListener('click', saveConfig);
addMessageBtn.addEventListener('click', addMessage);

// 頁面載入時初始化
init();
