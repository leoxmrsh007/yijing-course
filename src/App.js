import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Divination from './components/Divination';
import HexagramLibrary from './components/HexagramLibrary';
import LearningCenter from './components/LearningCenter';
import WechatDeploy from './components/WechatDeploy';
import AIConsultation from './components/AIConsultation';
import DivinationHistory from './components/DivinationHistory';
import AdvancedSearch from './components/AdvancedSearch';
import UserSettings from './components/UserSettings';
import TrigramQuiz from './components/TrigramQuiz';
import './App.css';

const { Content, Footer } = Layout;

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Navigation />
          <Content style={{ background: '#f0f2f5' }}>
            <Routes>
              <Route path="/" element={<Home />} />
            <Route path="/divination" element={<Divination />} />
            <Route path="/library" element={<HexagramLibrary />} />
            <Route path="/learning" element={<LearningCenter />} />
            <Route path="/quiz" element={<TrigramQuiz />} />
            <Route path="/ai-consultation" element={<AIConsultation />} />
            <Route path="/history" element={<DivinationHistory />} />
            <Route path="/advanced-search" element={<AdvancedSearch />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/wechat-deploy" element={<WechatDeploy />} />
            </Routes>
          </Content>
          <Footer style={{ 
            textAlign: 'center', 
            background: '#001529', 
            color: 'rgba(255,255,255,0.65)',
            padding: '24px 0'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '20px', marginRight: '8px' }}>☯</span>
              周易学习平台 ©2024
            </div>
            <div style={{ fontSize: '14px' }}>
              传承千年智慧 · 指导现代生活 | 弘扬中华优秀传统文化
            </div>
          </Footer>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
