const fs = require('fs');
const path = require('path');

// 保存配置到文件
function saveConfig(config) {
    try {
        const configPath = path.join(__dirname, 'config.json');
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        return true;
    } catch (error) {
        console.error('保存配置失敗:', error);
        return false;
    }
}

// 從文件加載配置
function loadConfig() {
    try {
        const configPath = path.join(__dirname, 'config.json');
        if (fs.existsSync(configPath)) {
            const data = fs.readFileSync(configPath, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('載入配置失敗:', error);
    }
    return null;
}

module.exports = {
    saveConfig,
    loadConfig
};