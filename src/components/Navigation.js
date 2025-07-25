import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer, Typography } from 'antd';
import { 
  HomeOutlined, 
  StarOutlined, 
  BookOutlined, 
  ReadOutlined,
  MenuOutlined,
  GithubOutlined,
  WechatOutlined,
  RobotOutlined,
  HistoryOutlined,
  SearchOutlined,
  SettingOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const { Header } = Layout;
const { Text } = Typography;

const StyledHeader = styled(Header)`
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  
  .ant-menu {
    background: transparent;
    border-bottom: none;
    line-height: 64px;
    
    .ant-menu-item {
      color: rgba(255,255,255,0.8);
      border-bottom: 2px solid transparent;
      
      &:hover {
        color: white;
        border-bottom-color: rgba(255,255,255,0.5);
      }
      
      &.ant-menu-item-selected {
        color: white;
        background: rgba(255,255,255,0.1);
        border-bottom-color: white;
      }
    }
  }
`;

const Logo = styled.div`
  float: left;
  color: white;
  font-size: 20px;
  font-weight: bold;
  line-height: 64px;
  margin-right: 30px;
  cursor: pointer;
  
  .logo-symbol {
    font-size: 24px;
    margin-right: 8px;
  }
`;

const MobileMenuButton = styled(Button)`
  float: right;
  margin-top: 16px;
  color: white;
  border-color: rgba(255,255,255,0.3);
  
  &:hover {
    color: white;
    border-color: white;
    background: rgba(255,255,255,0.1);
  }
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const DesktopMenu = styled(Menu)`
  @media (max-width: 767px) {
    display: none;
  }
`;

const SocialLinks = styled.div`
  float: right;
  line-height: 64px;
  margin-left: 20px;
  
  .social-link {
    color: rgba(255,255,255,0.8);
    font-size: 18px;
    margin-left: 15px;
    transition: all 0.3s ease;
    
    &:hover {
      color: white;
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 767px) {
    display: none;
  }
`;

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页'
    },
    {
      key: '/divination',
      icon: <StarOutlined />,
      label: '占卜'
    },
    {
      key: '/ai-consultation',
      icon: <RobotOutlined />,
      label: 'AI问卦'
    },
    {
      key: '/history',
      icon: <HistoryOutlined />,
      label: '问卦历史'
    },
    {
      key: '/library',
      icon: <BookOutlined />,
      label: '卦象典籍'
    },
    {
      key: '/learning',
      icon: <ReadOutlined />,
      label: '学习中心'
    },
    {
      key: '/quiz',
      icon: <TrophyOutlined />,
      label: '测验游戏'
    },
    {
       key: '/advanced-search',
       icon: <SearchOutlined />,
       label: '高级搜索'
     },
     {
       key: '/settings',
       icon: <SettingOutlined />,
       label: '用户设置'
     }
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
    setMobileMenuVisible(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const currentPath = location.pathname;

  return (
    <>
      <StyledHeader>
        <Logo onClick={handleLogoClick}>
          <span className="logo-symbol">☯</span>
          周易学习平台
        </Logo>
        
        <MobileMenuButton
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuVisible(true)}
        />
        
        <SocialLinks>
          <GithubOutlined 
            className="social-link" 
            onClick={() => window.open('https://github.com', '_blank')}
            title="GitHub"
          />
          <WechatOutlined 
            className="social-link" 
            title="微信分享"
          />
        </SocialLinks>
        
        <DesktopMenu
          mode="horizontal"
          selectedKeys={[currentPath]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ float: 'right', marginRight: '80px' }}
        />
      </StyledHeader>

      {/* 移动端抽屉菜单 */}
      <Drawer
        title={
          <div style={{ color: '#722ed1', fontSize: '18px', fontWeight: 'bold' }}>
            <span style={{ fontSize: '20px', marginRight: '8px' }}>☯</span>
            周易学习平台
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={280}
      >
        <Menu
          mode="vertical"
          selectedKeys={[currentPath]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ border: 'none' }}
        />
        
        <div style={{ 
          position: 'absolute', 
          bottom: '30px', 
          left: '24px', 
          right: '24px',
          textAlign: 'center',
          borderTop: '1px solid #f0f0f0',
          paddingTop: '20px'
        }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            传承千年智慧 · 指导现代生活
          </Text>
          <div style={{ marginTop: '15px' }}>
            <GithubOutlined 
              style={{ fontSize: '20px', color: '#722ed1', marginRight: '20px' }}
              onClick={() => window.open('https://github.com', '_blank')}
            />
            <WechatOutlined 
              style={{ fontSize: '20px', color: '#722ed1' }}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navigation;