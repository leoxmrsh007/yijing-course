import React, { useState } from 'react';
import { Card, Button, Modal, Typography, Space, Divider, Tag } from 'antd';
import { ThunderboltOutlined, StarOutlined } from '@ant-design/icons';
import { hexagrams } from '../data/yijingData';
import { addDivinationRecord } from './DivinationHistory';
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;

const DivinationContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const HexagramDisplay = styled.div`
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
  margin: 20px 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
`;

const HexagramSymbol = styled.div`
  font-size: 4rem;
  margin: 20px 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const CoinAnimation = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
  
  .coin {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ffd700, #ffed4e);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    animation: ${props => props.isAnimating ? 'flip 0.6s ease-in-out' : 'none'};
  }
  
  @keyframes flip {
    0% { transform: rotateY(0deg); }
    50% { transform: rotateY(180deg); }
    100% { transform: rotateY(360deg); }
  }
`;

const Divination = () => {
  const [currentHexagram, setCurrentHexagram] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMethod, setShowMethod] = useState(false);
  // const [question, setQuestion] = useState(''); // 预留功能
  const [coins, setCoins] = useState(['?', '?', '?']);
  const [throwCount, setThrowCount] = useState(0);
  const [lines, setLines] = useState([]);

  // 生成随机卦象
  const generateHexagram = () => {
    const randomIndex = Math.floor(Math.random() * hexagrams.length);
    return hexagrams[randomIndex];
  };

  // 铜钱占卜动画
  const throwCoins = () => {
    if (throwCount >= 6) {
      // 重新开始
      setThrowCount(0);
      setLines([]);
      setCurrentHexagram(null);
      return;
    }

    setIsAnimating(true);
    
    // 模拟投掷动画
    setTimeout(() => {
      const newCoins = [
        Math.random() > 0.5 ? '正' : '反',
        Math.random() > 0.5 ? '正' : '反',
        Math.random() > 0.5 ? '正' : '反'
      ];
      setCoins(newCoins);
      
      // 计算爻（三个正面=老阳，三个反面=老阴，其他=少阳/少阴）
      const heads = newCoins.filter(coin => coin === '正').length;
      let lineType;
      if (heads === 3) lineType = '老阳'; // 变爻
      else if (heads === 0) lineType = '老阴'; // 变爻
      else if (heads === 2) lineType = '少阳';
      else lineType = '少阴';
      
      const newLines = [...lines, lineType];
      setLines(newLines);
      setThrowCount(throwCount + 1);
      
      // 如果投掷完6次，生成卦象
      if (newLines.length === 6) {
        setTimeout(() => {
          const hexagram = generateHexagram();
          setCurrentHexagram(hexagram);
          
          // 保存占卜记录
          addDivinationRecord({
            type: 'coin',
            hexagramId: hexagram.id,
            method: '铜钱占卜',
            details: newLines.join(', ')
          });
        }, 500);
      }
      
      setIsAnimating(false);
    }, 600);
  };

  // 快速占卜
  const quickDivination = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const hexagram = generateHexagram();
      setCurrentHexagram(hexagram);
      
      // 保存占卜记录
      addDivinationRecord({
        type: 'quick',
        hexagramId: hexagram.id,
        method: '快速占卜'
      });
      
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <DivinationContainer>
      <Card>
        <Title level={2} style={{ textAlign: 'center', color: '#722ed1' }}>
          <StarOutlined /> 周易占卜
        </Title>
        
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card size="small" style={{ background: '#f6ffed' }}>
            <Paragraph>
              <Text strong>占卜指南：</Text>
              请在心中默念您想要询问的问题，然后选择占卜方式。周易占卜重在指导人生方向，而非预测具体事件。
            </Paragraph>
          </Card>

          <div style={{ textAlign: 'center' }}>
            <Space size="large">
              <Button 
                type="primary" 
                size="large"
                icon={<ThunderboltOutlined />}
                onClick={quickDivination}
                loading={isAnimating}
              >
                快速占卜
              </Button>
              
              <Button 
                size="large"
                onClick={() => setShowMethod(true)}
              >
                铜钱占卜
              </Button>
            </Space>
          </div>

          {currentHexagram && (
            <HexagramDisplay>
              <HexagramSymbol>{currentHexagram.symbol}</HexagramSymbol>
              <Title level={2} style={{ color: 'white', margin: 0 }}>
                {currentHexagram.name}卦 - {currentHexagram.description}
              </Title>
              <Tag color="gold" style={{ margin: '10px 0', fontSize: '16px' }}>
                {currentHexagram.fortune}
              </Tag>
            </HexagramDisplay>
          )}

          {currentHexagram && (
            <Card>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text strong style={{ fontSize: '16px' }}>卦辞：</Text>
                  <Paragraph style={{ fontSize: '16px', margin: '8px 0' }}>
                    {currentHexagram.judgment}
                  </Paragraph>
                </div>
                
                <div>
                  <Text strong style={{ fontSize: '16px' }}>象辞：</Text>
                  <Paragraph style={{ fontSize: '16px', margin: '8px 0' }}>
                    {currentHexagram.image}
                  </Paragraph>
                </div>
                
                <Divider />
                
                <div>
                  <Text strong style={{ fontSize: '16px', color: '#722ed1' }}>卦象解读：</Text>
                  <Paragraph style={{ fontSize: '16px', margin: '8px 0' }}>
                    {currentHexagram.meaning}
                  </Paragraph>
                </div>
                
                <div>
                  <Text strong style={{ fontSize: '16px', color: '#52c41a' }}>人生建议：</Text>
                  <Paragraph style={{ fontSize: '16px', margin: '8px 0' }}>
                    {currentHexagram.advice}
                  </Paragraph>
                </div>
              </Space>
            </Card>
          )}
        </Space>
      </Card>

      {/* 铜钱占卜模态框 */}
      <Modal
        title="铜钱占卜法"
        open={showMethod}
        onCancel={() => {
          setShowMethod(false);
          setThrowCount(0);
          setLines([]);
          setCoins(['?', '?', '?']);
        }}
        footer={null}
        width={600}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Paragraph>
            传统的铜钱占卜法需要投掷三枚铜钱六次，每次投掷的结果组成一爻，六爻组成一卦。
          </Paragraph>
          
          <div style={{ textAlign: 'center' }}>
            <Text strong>第 {throwCount + 1} 次投掷 (共6次)</Text>
            <CoinAnimation isAnimating={isAnimating}>
              {coins.map((coin, index) => (
                <div key={index} className="coin">
                  {coin}
                </div>
              ))}
            </CoinAnimation>
            
            {lines.length > 0 && (
              <div style={{ margin: '20px 0' }}>
                <Text strong>已投掷的爻：</Text>
                <div style={{ margin: '10px 0' }}>
                  {lines.map((line, index) => (
                    <Tag key={index} color={line.includes('老') ? 'red' : 'blue'} style={{ margin: '2px' }}>
                      第{index + 1}爻: {line}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
            
            <Button 
              type="primary" 
              size="large"
              onClick={throwCoins}
              loading={isAnimating}
              disabled={throwCount >= 6 && currentHexagram}
            >
              {throwCount >= 6 ? '重新开始' : '投掷铜钱'}
            </Button>
          </div>
        </Space>
      </Modal>
    </DivinationContainer>
  );
};

export default Divination;