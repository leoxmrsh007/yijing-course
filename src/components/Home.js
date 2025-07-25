import React from 'react';
import { Card, Row, Col, Typography, Button, Space } from 'antd';
import { 
  StarOutlined, 
  BookOutlined, 
  ReadOutlined, 
  ThunderboltOutlined,
  HistoryOutlined,
  BulbOutlined,
  RobotOutlined,
  SearchOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const FeatureCard = styled(Card)`
  height: 100%;
  text-align: center;
  transition: all 0.3s ease;
  border-radius: 15px;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 35px rgba(0,0,0,0.15);
  }
  
  .feature-icon {
    font-size: 3rem;
    color: #722ed1;
    margin-bottom: 20px;
  }
  
  .feature-title {
    font-size: 1.3rem;
    font-weight: bold;
    color: #1890ff;
    margin-bottom: 15px;
  }
`;

const QuickStartCard = styled(Card)`
  background: linear-gradient(45deg, #f6ffed, #f0f9ff);
  border: none;
  border-radius: 15px;
  margin-top: 30px;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  
  .stat-number {
    font-size: 2.5rem;
    font-weight: bold;
    color: #722ed1;
    margin-bottom: 5px;
  }
  
  .stat-label {
    color: #666;
    font-size: 14px;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <StarOutlined />,
      title: '智能占卜',
      description: '传统铜钱占卜法与现代随机算法结合，为您提供准确的卦象指导',
      action: () => navigate('/divination')
    },
    {
      icon: <RobotOutlined />,
      title: 'AI智能问卦',
      description: '结合AI技术，提供个性化卦象解读和智能问答服务',
      action: () => navigate('/ai-consultation')
    },
    {
       icon: <SearchOutlined />,
       title: '高级搜索',
       description: '深度搜索卦象、学习资料和八卦知识，支持多条件筛选',
       action: () => navigate('/advanced-search')
     },
     {
      icon: <BookOutlined />,
      title: '卦象典籍',
      description: '完整收录六十四卦详解，深入学习每一卦的含义和智慧',
      action: () => navigate('/library')
    },
    {
      icon: <ReadOutlined />,
      title: '学习中心',
      description: '系统学习周易基础知识，从入门到精通的完整学习路径',
      action: () => navigate('/learning')
    },
    {
      icon: <HistoryOutlined />,
      title: '问卦历史',
      description: '查看您的占卜历史记录，回顾过往的卦象指导和人生感悟',
      action: () => navigate('/history')
    },
    {
      icon: <SettingOutlined />,
      title: '用户设置',
      description: '个性化设置您的学习偏好、通知方式和账户信息',
      action: () => navigate('/settings')
    }
  ];

  const quickActions = [
    {
      title: '快速占卜',
      description: '遇到困惑？立即开始占卜获得指导',
      icon: <ThunderboltOutlined />,
      action: () => navigate('/divination'),
      type: 'primary'
    },
    {
      title: '随机学习',
      description: '随机浏览一个卦象，学习古人智慧',
      icon: <BulbOutlined />,
      action: () => {
        const randomId = Math.floor(Math.random() * 64) + 1;
        navigate(`/library?hexagram=${randomId}`);
      },
      type: 'default'
    }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>☯</div>
        <Title level={1} style={{ color: 'white', fontSize: '3rem', margin: 0 }}>
          周易学习平台
        </Title>
        <Title level={3} style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 'normal', margin: '20px 0' }}>
          传承千年智慧 · 指导现代生活
        </Title>
        <Paragraph style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto' }}>
          探索《周易》的深邃智慧，通过现代化的交互方式学习古代哲学，
          让千年文化在数字时代焕发新的生命力
        </Paragraph>
        <div style={{ marginTop: '40px' }}>
          <Space size="large">
            <Button 
              type="primary" 
              size="large" 
              icon={<StarOutlined />}
              onClick={() => navigate('/divination')}
              style={{ height: '50px', fontSize: '16px', borderRadius: '25px', padding: '0 30px' }}
            >
              开始占卜
            </Button>
            <Button 
              size="large" 
              icon={<BookOutlined />}
              onClick={() => navigate('/library')}
              style={{ 
                height: '50px', 
                fontSize: '16px', 
                borderRadius: '25px', 
                padding: '0 30px',
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white'
              }}
            >
              浏览卦象
            </Button>
          </Space>
        </div>
      </HeroSection>

      {/* 统计数据 */}
      <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
        <Col xs={24} sm={8}>
          <StatCard>
            <div className="stat-number">64</div>
            <div className="stat-label">完整卦象</div>
          </StatCard>
        </Col>
        <Col xs={24} sm={8}>
          <StatCard>
            <div className="stat-number">5000+</div>
            <div className="stat-label">年历史传承</div>
          </StatCard>
        </Col>
        <Col xs={24} sm={8}>
          <StatCard>
            <div className="stat-number">∞</div>
            <div className="stat-label">人生智慧</div>
          </StatCard>
        </Col>
      </Row>

      {/* 主要功能 */}
      <Card style={{ marginBottom: '30px' }}>
        <Title level={2} style={{ textAlign: 'center', color: '#722ed1', marginBottom: '40px' }}>
          平台功能
        </Title>
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} md={12} lg={6} key={index}>
              <FeatureCard onClick={feature.action} style={{ cursor: 'pointer' }}>
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-title">{feature.title}</div>
                <Paragraph style={{ color: '#666', lineHeight: '1.6' }}>
                  {feature.description}
                </Paragraph>
                <Button type="link" onClick={feature.action}>
                  立即体验 →
                </Button>
              </FeatureCard>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 快速开始 */}
      <QuickStartCard>
        <Title level={3} style={{ color: '#1890ff', textAlign: 'center', marginBottom: '30px' }}>
          快速开始
        </Title>
        <Row gutter={[24, 24]}>
          {quickActions.map((action, index) => (
            <Col xs={24} sm={12} key={index}>
              <Card 
                size="small" 
                style={{ textAlign: 'center', height: '100%' }}
                styles={{ body: { padding: '30px 20px' } }}
              >
                <div style={{ fontSize: '2rem', color: '#722ed1', marginBottom: '15px' }}>
                  {action.icon}
                </div>
                <Title level={4} style={{ marginBottom: '10px' }}>{action.title}</Title>
                <Paragraph style={{ color: '#666', marginBottom: '20px' }}>
                  {action.description}
                </Paragraph>
                <Button 
                  type={action.type} 
                  size="large"
                  onClick={action.action}
                  style={{ borderRadius: '20px' }}
                >
                  开始
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </QuickStartCard>

      {/* 学习指南 */}
      <Card style={{ marginTop: '30px', background: '#fafafa' }}>
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={12}>
            <Space direction="vertical" size="middle">
              <Title level={3} style={{ color: '#722ed1', margin: 0 }}>
                <HistoryOutlined /> 为什么学习周易？
              </Title>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                《周易》是中华文化的瑰宝，蕴含着深刻的哲学思想和人生智慧。
                通过学习周易，我们可以：
              </Paragraph>
              <ul style={{ fontSize: '16px', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>培养辩证思维，提高分析问题的能力</li>
                <li>理解变化规律，把握人生机遇</li>
                <li>修身养性，提升个人品德修养</li>
                <li>传承文化，弘扬中华优秀传统</li>
              </ul>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '8rem', color: '#722ed1', opacity: 0.3 }}>☯</div>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                阴阳相济，刚柔并用
              </Text>
            </div>
          </Col>
        </Row>
      </Card>
    </HomeContainer>
  );
};

export default Home;