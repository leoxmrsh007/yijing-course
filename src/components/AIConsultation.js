import React, { useState } from 'react';
import { Card, Input, Button, Typography, Space, Divider, Alert, Spin, Modal } from 'antd';
import { RobotOutlined, SendOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { hexagrams } from '../data/yijingData';
import { addDivinationRecord } from './DivinationHistory';
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const AIContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ChatContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
`;

const MessageBubble = styled.div`
  margin: 10px 0;
  padding: 12px 16px;
  border-radius: 12px;
  max-width: 80%;
  
  ${props => props.isUser ? `
    background: #1890ff;
    color: white;
    margin-left: auto;
    text-align: right;
  ` : `
    background: white;
    border: 1px solid #d9d9d9;
    margin-right: auto;
  `}
`;

const HexagramDisplay = styled.div`
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin: 20px 0;
`;

function AIConsultation() {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentHexagram, setCurrentHexagram] = useState(null);
  const [showDemo, setShowDemo] = useState(false);

  // 模拟AI回复函数（实际项目中应该调用真实的AI API）
  const generateAIResponse = async (userQuestion, hexagram) => {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const responses = [
      `根据您的问题"${userQuestion}"，我为您抽取了${hexagram.name}卦（${hexagram.description}）。\n\n卦辞：${hexagram.judgment}\n\n这个卦象的含义是：${hexagram.meaning}\n\n针对您的问题，我的建议是：${hexagram.advice}\n\n此卦的运势为：${hexagram.fortune}。希望这个解读对您有所帮助。`,
      
      `您问到"${userQuestion}"，${hexagram.name}卦给出了很好的指引。\n\n象辞说：${hexagram.image}\n\n这提醒我们：${hexagram.meaning}\n\n结合您的具体情况，建议您：${hexagram.advice}\n\n保持${hexagram.fortune === '大吉' ? '积极乐观' : hexagram.fortune === '吉' ? '稳健前进' : '谨慎应对'}的心态。`,
      
      `关于"${userQuestion}"这个问题，${hexagram.name}卦为您提供了深刻的洞察。\n\n从卦象结构来看，上卦${hexagram.upperTrigram}，下卦${hexagram.lowerTrigram}，形成了${hexagram.description}的格局。\n\n这意味着：${hexagram.meaning}\n\n我的建议是：${hexagram.advice}\n\n请记住，易经的智慧在于指导我们顺应自然规律，做出明智的选择。`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSubmit = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // 添加用户问题到聊天记录
    const userMessage = { type: 'user', content: question };
    setChatHistory(prev => [...prev, userMessage]);
    
    // 随机选择一个卦象
    const randomHexagram = hexagrams[Math.floor(Math.random() * hexagrams.length)];
    setCurrentHexagram(randomHexagram);
    
    try {
      // 生成AI回复
      const aiResponse = await generateAIResponse(question, randomHexagram);
      
      // 保存AI问卦记录
      addDivinationRecord({
        type: 'ai',
        question: question,
        hexagramId: randomHexagram.id,
        aiResponse: aiResponse,
        method: 'AI智能问卦'
      });
      
      const aiMessage = { 
        type: 'ai', 
        content: aiResponse,
        hexagram: randomHexagram
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { 
        type: 'ai', 
        content: '抱歉，AI服务暂时不可用，请稍后再试。'
      };
      setChatHistory(prev => [...prev, errorMessage]);
    }
    
    setQuestion('');
    setIsLoading(false);
  };

  const clearChat = () => {
    setChatHistory([]);
    setCurrentHexagram(null);
  };

  const demoQuestions = [
    '我最近工作上遇到困难，该如何应对？',
    '感情方面有些迷茫，请指点迷津',
    '投资理财方面需要注意什么？',
    '健康状况如何，需要注意什么？',
    '学业进展不顺，如何改善？'
  ];

  return (
    <AIContainer>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <RobotOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={2}>AI智能问卦</Title>
            <Paragraph>
              结合传统周易智慧与现代AI技术，为您提供个性化的人生指导。
              请诚心提出您的问题，AI将为您抽取卦象并提供详细解读。
            </Paragraph>
          </div>

          <Alert
            message="使用说明"
            description="请用简洁明确的语言描述您的问题或困惑，AI会根据您的问题抽取相应的卦象并给出解读建议。建议问题具体化，避免过于宽泛。"
            type="info"
            showIcon
          />

          {/* 示例问题 */}
          <Card size="small" title="示例问题">
            <Space wrap>
              {demoQuestions.map((demo, index) => (
                <Button 
                  key={index}
                  size="small" 
                  onClick={() => setQuestion(demo)}
                  style={{ marginBottom: '8px' }}
                >
                  {demo}
                </Button>
              ))}
            </Space>
          </Card>

          {/* 聊天区域 */}
          {chatHistory.length > 0 && (
            <ChatContainer>
              {chatHistory.map((message, index) => (
                <MessageBubble key={index} isUser={message.type === 'user'}>
                  {message.type === 'user' ? (
                    <Text strong>{message.content}</Text>
                  ) : (
                    <div>
                      <Text style={{ whiteSpace: 'pre-line' }}>{message.content}</Text>
                      {message.hexagram && (
                        <HexagramDisplay>
                          <Title level={3} style={{ color: 'white', margin: '0 0 10px 0' }}>
                            {message.hexagram.symbol} {message.hexagram.name}卦
                          </Title>
                          <Text style={{ color: 'white' }}>{message.hexagram.description}</Text>
                        </HexagramDisplay>
                      )}
                    </div>
                  )}
                </MessageBubble>
              ))}
            </ChatContainer>
          )}

          {/* 输入区域 */}
          <Space.Compact style={{ width: '100%' }}>
            <TextArea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="请输入您的问题...（例如：我在工作中遇到了困难，该如何应对？）"
              autoSize={{ minRows: 2, maxRows: 4 }}
              onPressEnter={(e) => {
                if (e.shiftKey) return;
                e.preventDefault();
                handleSubmit();
              }}
            />
          </Space.Compact>
          
          <Space>
            <Button 
              type="primary" 
              icon={<SendOutlined />}
              onClick={handleSubmit}
              loading={isLoading}
              disabled={!question.trim()}
            >
              {isLoading ? '正在问卦...' : '开始问卦'}
            </Button>
            
            {chatHistory.length > 0 && (
              <Button onClick={clearChat}>
                清空对话
              </Button>
            )}
            
            <Button 
              icon={<QuestionCircleOutlined />}
              onClick={() => setShowDemo(true)}
            >
              使用帮助
            </Button>
          </Space>

          {isLoading && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Spin size="large" />
              <div style={{ marginTop: '16px' }}>
                <Text>AI正在为您分析问题并抽取卦象...</Text>
              </div>
            </div>
          )}
        </Space>
      </Card>

      {/* 帮助模态框 */}
      <Modal
        title="AI问卦使用指南"
        open={showDemo}
        onCancel={() => setShowDemo(false)}
        footer={[
          <Button key="close" onClick={() => setShowDemo(false)}>
            关闭
          </Button>
        ]}
        width={600}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Title level={4}>🤖 功能介绍</Title>
            <Paragraph>
              AI智能问卦结合了传统周易智慧与现代人工智能技术，能够根据您的具体问题提供个性化的卦象解读和人生建议。
            </Paragraph>
          </div>
          
          <div>
            <Title level={4}>📝 使用方法</Title>
            <Paragraph>
              1. 在输入框中描述您的问题或困惑<br/>
              2. 点击"开始问卦"按钮<br/>
              3. AI会为您抽取相应的卦象<br/>
              4. 获得详细的解读和建议
            </Paragraph>
          </div>
          
          <div>
            <Title level={4}>💡 提问技巧</Title>
            <Paragraph>
              • 问题要具体明确，避免过于宽泛<br/>
              • 可以涉及工作、感情、健康、学业等方面<br/>
              • 保持诚心和开放的心态<br/>
              • 可以追问或深入探讨
            </Paragraph>
          </div>
          
          <div>
            <Title level={4}>⚠️ 注意事项</Title>
            <Paragraph>
              • 本功能仅供参考，不能替代专业建议<br/>
              • 请理性对待卦象解读结果<br/>
              • 最终决策还需结合实际情况判断
            </Paragraph>
          </div>
        </Space>
      </Modal>
    </AIContainer>
  );
}

export default AIConsultation;