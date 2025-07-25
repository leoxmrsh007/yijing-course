import React, { useState, useEffect } from 'react';
import { Card, Switch, Select, Typography, Space, Button, message, Divider, Row, Col, Slider, ColorPicker } from 'antd';
import { 
  SettingOutlined, 
  SoundOutlined, 
  EyeOutlined, 
  SaveOutlined,
  ReloadOutlined,
  BellOutlined,
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  flex: 1;
`;

const SettingControl = styled.div`
  min-width: 200px;
  text-align: right;
`;

function UserSettings() {
  const [settings, setSettings] = useState({
    // 显示设置
    theme: 'light',
    fontSize: 14,
    language: 'zh-CN',
    showAnimations: true,
    compactMode: false,
    
    // 音频设置
    enableSound: true,
    soundVolume: 70,
    voiceSpeed: 1.0,
    voiceGender: 'female',
    
    // 通知设置
    enableNotifications: true,
    studyReminder: true,
    reminderTime: '20:00',
    weeklyReport: true,
    
    // 学习设置
    autoSave: true,
    showProgress: true,
    difficultyLevel: 'auto',
    studyGoal: 30, // 分钟/天
    
    // 占卜设置
    defaultDivinationMethod: 'quick',
    saveHistory: true,
    showFortune: true,
    detailedExplanation: true,
    
    // 隐私设置
    dataCollection: false,
    shareUsage: false,
    cloudSync: false
  });

  const [hasChanges, setHasChanges] = useState(false);

  // 从localStorage加载设置
  useEffect(() => {
    const savedSettings = localStorage.getItem('user_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...settings, ...parsed });
      } catch (error) {
        console.error('Failed to parse settings:', error);
      }
    }
  }, []);

  // 更新设置
  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  // 保存设置
  const saveSettings = () => {
    localStorage.setItem('user_settings', JSON.stringify(settings));
    setHasChanges(false);
    message.success('设置已保存');
    
    // 应用主题设置
    if (settings.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    // 应用字体大小
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
  };

  // 重置设置
  const resetSettings = () => {
    const defaultSettings = {
      theme: 'light',
      fontSize: 14,
      language: 'zh-CN',
      showAnimations: true,
      compactMode: false,
      enableSound: true,
      soundVolume: 70,
      voiceSpeed: 1.0,
      voiceGender: 'female',
      enableNotifications: true,
      studyReminder: true,
      reminderTime: '20:00',
      weeklyReport: true,
      autoSave: true,
      showProgress: true,
      difficultyLevel: 'auto',
      studyGoal: 30,
      defaultDivinationMethod: 'quick',
      saveHistory: true,
      showFortune: true,
      detailedExplanation: true,
      dataCollection: false,
      shareUsage: false,
      cloudSync: false
    };
    
    setSettings(defaultSettings);
    setHasChanges(true);
    message.info('设置已重置为默认值');
  };

  // 测试语音
  const testVoice = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('这是语音测试，您好！');
      utterance.rate = settings.voiceSpeed;
      utterance.volume = settings.soundVolume / 100;
      
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.lang.includes('zh') && voice.name.includes('Female')
      );
      const maleVoice = voices.find(voice => 
        voice.lang.includes('zh') && voice.name.includes('Male')
      );
      
      if (settings.voiceGender === 'female' && femaleVoice) {
        utterance.voice = femaleVoice;
      } else if (settings.voiceGender === 'male' && maleVoice) {
        utterance.voice = maleVoice;
      }
      
      speechSynthesis.speak(utterance);
    } else {
      message.error('您的浏览器不支持语音功能');
    }
  };

  return (
    <SettingsContainer>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 标题 */}
        <div style={{ textAlign: 'center' }}>
          <SettingOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
          <Title level={2}>用户设置</Title>
          <Paragraph>
            个性化您的易学体验，调整界面、音频、通知等各项设置。
          </Paragraph>
        </div>

        {/* 显示设置 */}
        <Card title={<><EyeOutlined /> 显示设置</>}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SettingItem>
              <SettingLabel>
                <Text strong>主题模式</Text>
                <br />
                <Text type="secondary">选择浅色或深色主题</Text>
              </SettingLabel>
              <SettingControl>
                <Select
                  value={settings.theme}
                  onChange={(value) => updateSetting('theme', value)}
                  style={{ width: 120 }}
                >
                  <Option value="light">
                    <SunOutlined /> 浅色
                  </Option>
                  <Option value="dark">
                    <MoonOutlined /> 深色
                  </Option>
                </Select>
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>字体大小</Text>
                <br />
                <Text type="secondary">调整界面字体大小</Text>
              </SettingLabel>
              <SettingControl>
                <div style={{ width: 150 }}>
                  <Slider
                    min={12}
                    max={20}
                    value={settings.fontSize}
                    onChange={(value) => updateSetting('fontSize', value)}
                    marks={{
                      12: '小',
                      16: '中',
                      20: '大'
                    }}
                  />
                </div>
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>语言</Text>
                <br />
                <Text type="secondary">选择界面语言</Text>
              </SettingLabel>
              <SettingControl>
                <Select
                  value={settings.language}
                  onChange={(value) => updateSetting('language', value)}
                  style={{ width: 120 }}
                >
                  <Option value="zh-CN">简体中文</Option>
                  <Option value="zh-TW">繁體中文</Option>
                  <Option value="en-US">English</Option>
                </Select>
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>动画效果</Text>
                <br />
                <Text type="secondary">启用界面动画和过渡效果</Text>
              </SettingLabel>
              <SettingControl>
                <Switch
                  checked={settings.showAnimations}
                  onChange={(checked) => updateSetting('showAnimations', checked)}
                />
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>紧凑模式</Text>
                <br />
                <Text type="secondary">减少界面间距，显示更多内容</Text>
              </SettingLabel>
              <SettingControl>
                <Switch
                  checked={settings.compactMode}
                  onChange={(checked) => updateSetting('compactMode', checked)}
                />
              </SettingControl>
            </SettingItem>
          </Space>
        </Card>

        {/* 音频设置 */}
        <Card title={<><SoundOutlined /> 音频设置</>}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SettingItem>
              <SettingLabel>
                <Text strong>启用音效</Text>
                <br />
                <Text type="secondary">开启按钮点击和提示音效</Text>
              </SettingLabel>
              <SettingControl>
                <Switch
                  checked={settings.enableSound}
                  onChange={(checked) => updateSetting('enableSound', checked)}
                />
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>音量大小</Text>
                <br />
                <Text type="secondary">调整语音播放音量</Text>
              </SettingLabel>
              <SettingControl>
                <div style={{ width: 150 }}>
                  <Slider
                    min={0}
                    max={100}
                    value={settings.soundVolume}
                    onChange={(value) => updateSetting('soundVolume', value)}
                    disabled={!settings.enableSound}
                  />
                </div>
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>语音速度</Text>
                <br />
                <Text type="secondary">调整语音播放速度</Text>
              </SettingLabel>
              <SettingControl>
                <Select
                  value={settings.voiceSpeed}
                  onChange={(value) => updateSetting('voiceSpeed', value)}
                  style={{ width: 120 }}
                  disabled={!settings.enableSound}
                >
                  <Option value={0.5}>很慢</Option>
                  <Option value={0.8}>慢</Option>
                  <Option value={1.0}>正常</Option>
                  <Option value={1.2}>快</Option>
                  <Option value={1.5}>很快</Option>
                </Select>
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>语音性别</Text>
                <br />
                <Text type="secondary">选择语音播放的性别</Text>
              </SettingLabel>
              <SettingControl>
                <Space>
                  <Select
                    value={settings.voiceGender}
                    onChange={(value) => updateSetting('voiceGender', value)}
                    style={{ width: 100 }}
                    disabled={!settings.enableSound}
                  >
                    <Option value="female">女声</Option>
                    <Option value="male">男声</Option>
                  </Select>
                  <Button 
                    size="small" 
                    onClick={testVoice}
                    disabled={!settings.enableSound}
                  >
                    测试
                  </Button>
                </Space>
              </SettingControl>
            </SettingItem>
          </Space>
        </Card>

        {/* 通知设置 */}
        <Card title={<><BellOutlined /> 通知设置</>}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SettingItem>
              <SettingLabel>
                <Text strong>启用通知</Text>
                <br />
                <Text type="secondary">接收学习提醒和系统通知</Text>
              </SettingLabel>
              <SettingControl>
                <Switch
                  checked={settings.enableNotifications}
                  onChange={(checked) => updateSetting('enableNotifications', checked)}
                />
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>学习提醒</Text>
                <br />
                <Text type="secondary">每日定时提醒学习</Text>
              </SettingLabel>
              <SettingControl>
                <Switch
                  checked={settings.studyReminder}
                  onChange={(checked) => updateSetting('studyReminder', checked)}
                  disabled={!settings.enableNotifications}
                />
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>提醒时间</Text>
                <br />
                <Text type="secondary">设置每日学习提醒时间</Text>
              </SettingLabel>
              <SettingControl>
                <Select
                  value={settings.reminderTime}
                  onChange={(value) => updateSetting('reminderTime', value)}
                  style={{ width: 120 }}
                  disabled={!settings.enableNotifications || !settings.studyReminder}
                >
                  <Option value="08:00">08:00</Option>
                  <Option value="12:00">12:00</Option>
                  <Option value="18:00">18:00</Option>
                  <Option value="20:00">20:00</Option>
                  <Option value="22:00">22:00</Option>
                </Select>
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>周报告</Text>
                <br />
                <Text type="secondary">每周发送学习进度报告</Text>
              </SettingLabel>
              <SettingControl>
                <Switch
                  checked={settings.weeklyReport}
                  onChange={(checked) => updateSetting('weeklyReport', checked)}
                  disabled={!settings.enableNotifications}
                />
              </SettingControl>
            </SettingItem>
          </Space>
        </Card>

        {/* 学习设置 */}
        <Card title="📚 学习设置">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SettingItem>
              <SettingLabel>
                <Text strong>自动保存</Text>
                <br />
                <Text type="secondary">自动保存学习进度和笔记</Text>
              </SettingLabel>
              <SettingControl>
                <Switch
                  checked={settings.autoSave}
                  onChange={(checked) => updateSetting('autoSave', checked)}
                />
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>显示进度</Text>
                <br />
                <Text type="secondary">在界面中显示学习进度</Text>
              </SettingLabel>
              <SettingControl>
                <Switch
                  checked={settings.showProgress}
                  onChange={(checked) => updateSetting('showProgress', checked)}
                />
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>难度级别</Text>
                <br />
                <Text type="secondary">设置学习内容的难度</Text>
              </SettingLabel>
              <SettingControl>
                <Select
                  value={settings.difficultyLevel}
                  onChange={(value) => updateSetting('difficultyLevel', value)}
                  style={{ width: 120 }}
                >
                  <Option value="beginner">入门</Option>
                  <Option value="intermediate">进阶</Option>
                  <Option value="advanced">高级</Option>
                  <Option value="auto">自动</Option>
                </Select>
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>每日学习目标</Text>
                <br />
                <Text type="secondary">设置每日学习时长目标（分钟）</Text>
              </SettingLabel>
              <SettingControl>
                <div style={{ width: 150 }}>
                  <Slider
                    min={10}
                    max={120}
                    step={10}
                    value={settings.studyGoal}
                    onChange={(value) => updateSetting('studyGoal', value)}
                    marks={{
                      10: '10分',
                      60: '1小时',
                      120: '2小时'
                    }}
                  />
                </div>
              </SettingControl>
            </SettingItem>
          </Space>
        </Card>

        {/* 占卜设置 */}
        <Card title="🔮 占卜设置">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SettingItem>
              <SettingLabel>
                <Text strong>默认占卜方式</Text>
                <br />
                <Text type="secondary">选择默认的占卜方法</Text>
              </SettingLabel>
              <SettingControl>
                <Select
                  value={settings.defaultDivinationMethod}
                  onChange={(value) => updateSetting('defaultDivinationMethod', value)}
                  style={{ width: 120 }}
                >
                  <Option value="quick">快速占卜</Option>
                  <Option value="coin">铜钱占卜</Option>
                  <Option value="ai">AI问卦</Option>
                </Select>
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>保存历史</Text>
                <br />
                <Text type="secondary">自动保存占卜历史记录</Text>
              </SettingLabel>
              <SettingControl>
                <Switch
                  checked={settings.saveHistory}
                  onChange={(checked) => updateSetting('saveHistory', checked)}
                />
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>显示运势</Text>
                <br />
                <Text type="secondary">在结果中显示运势信息</Text>
              </SettingLabel>
              <SettingControl>
                <Switch
                  checked={settings.showFortune}
                  onChange={(checked) => updateSetting('showFortune', checked)}
                />
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>详细解释</Text>
                <br />
                <Text type="secondary">显示卦象的详细解释</Text>
              </SettingLabel>
              <SettingControl>
                <Switch
                  checked={settings.detailedExplanation}
                  onChange={(checked) => updateSetting('detailedExplanation', checked)}
                />
              </SettingControl>
            </SettingItem>
          </Space>
        </Card>

        {/* 隐私设置 */}
        <Card title="🔒 隐私设置">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SettingItem>
              <SettingLabel>
                <Text strong>数据收集</Text>
                <br />
                <Text type="secondary">允许收集匿名使用数据以改进服务</Text>
              </SettingLabel>
              <SettingControl>
                <Switch
                  checked={settings.dataCollection}
                  onChange={(checked) => updateSetting('dataCollection', checked)}
                />
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>使用统计</Text>
                <br />
                <Text type="secondary">分享使用统计信息</Text>
              </SettingLabel>
              <SettingControl>
                <Switch
                  checked={settings.shareUsage}
                  onChange={(checked) => updateSetting('shareUsage', checked)}
                />
              </SettingControl>
            </SettingItem>

            <SettingItem>
              <SettingLabel>
                <Text strong>云端同步</Text>
                <br />
                <Text type="secondary">将设置和数据同步到云端</Text>
              </SettingLabel>
              <SettingControl>
                <Switch
                  checked={settings.cloudSync}
                  onChange={(checked) => updateSetting('cloudSync', checked)}
                />
              </SettingControl>
            </SettingItem>
          </Space>
        </Card>

        {/* 操作按钮 */}
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              <Button 
                type="primary" 
                icon={<SaveOutlined />} 
                onClick={saveSettings}
                disabled={!hasChanges}
                block
              >
                保存设置
              </Button>
            </Col>
            <Col span={12}>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={resetSettings}
                block
              >
                重置为默认
              </Button>
            </Col>
          </Row>
          
          {hasChanges && (
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Text type="warning">您有未保存的更改</Text>
            </div>
          )}
        </Card>
      </Space>
    </SettingsContainer>
  );
}

export default UserSettings;