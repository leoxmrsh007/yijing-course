import React, { useState, useEffect } from 'react';
import { Card, List, Typography, Space, Button, Modal, Tag, Empty, Popconfirm, message } from 'antd';
import { 
  HistoryOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  CalendarOutlined,
  QuestionCircleOutlined,
  ClearOutlined
} from '@ant-design/icons';
import { hexagrams } from '../data/yijingData';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;

const HistoryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const HistoryItem = styled.div`
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 12px;
  background: white;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border-color: #1890ff;
  }
`;

const HexagramDisplay = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 6px;
  font-weight: bold;
`;

function DivinationHistory() {
  const [history, setHistory] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 从localStorage加载历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem('divination_history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      } catch (error) {
        console.error('Failed to parse history:', error);
      }
    }
  }, []);

  // 保存历史记录到localStorage
  const saveHistory = (newHistory) => {
    localStorage.setItem('divination_history', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  // 添加新的问卦记录
  const addRecord = (record) => {
    const newRecord = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...record
    };
    const newHistory = [newRecord, ...history];
    saveHistory(newHistory);
    message.success('问卦记录已保存');
  };

  // 删除单条记录
  const deleteRecord = (id) => {
    const newHistory = history.filter(record => record.id !== id);
    saveHistory(newHistory);
    message.success('记录已删除');
  };

  // 清空所有记录
  const clearAllRecords = () => {
    saveHistory([]);
    message.success('所有记录已清空');
  };

  // 查看详细记录
  const viewRecord = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  // 格式化时间
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 获取卦象信息
  const getHexagramInfo = (hexagramId) => {
    return hexagrams.find(h => h.id === hexagramId) || {
      name: '未知',
      symbol: '?',
      description: '未知卦象'
    };
  };

  return (
    <HistoryContainer>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <HistoryOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={2}>问卦历史</Title>
            <Paragraph>
              查看您的历史问卦记录，回顾过往的占卜结果和人生指导。
            </Paragraph>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text strong>共 {history.length} 条记录</Text>
            {history.length > 0 && (
              <Popconfirm
                title="确定要清空所有记录吗？"
                description="此操作不可恢复"
                onConfirm={clearAllRecords}
                okText="确定"
                cancelText="取消"
              >
                <Button 
                  danger 
                  icon={<ClearOutlined />}
                  size="small"
                >
                  清空记录
                </Button>
              </Popconfirm>
            )}
          </div>

          {history.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="暂无问卦记录"
            >
              <Button type="primary" href="/divination">
                开始第一次问卦
              </Button>
            </Empty>
          ) : (
            <List
              dataSource={history}
              renderItem={(record) => {
                const hexagram = getHexagramInfo(record.hexagramId);
                return (
                  <HistoryItem>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <Space direction="vertical" size="small">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <HexagramDisplay>
                                {hexagram.symbol} {hexagram.name}卦
                              </HexagramDisplay>
                              <Tag color={record.type === 'ai' ? 'blue' : 'green'}>
                                {record.type === 'ai' ? 'AI问卦' : '传统占卜'}
                              </Tag>
                            </div>
                            
                            {record.question && (
                              <div>
                                <Text strong>问题：</Text>
                                <Text>{record.question}</Text>
                              </div>
                            )}
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              <Space size="small">
                                <CalendarOutlined style={{ color: '#666' }} />
                                <Text type="secondary">{formatTime(record.timestamp)}</Text>
                              </Space>
                              
                              <Tag color={hexagram.fortune === '大吉' ? 'green' : 
                                         hexagram.fortune === '吉' ? 'blue' : 
                                         hexagram.fortune === '中吉' ? 'orange' : 'red'}>
                                {hexagram.fortune}
                              </Tag>
                            </div>
                          </Space>
                        </div>
                        
                        <Space>
                          <Button 
                            size="small" 
                            icon={<EyeOutlined />}
                            onClick={() => viewRecord(record)}
                          >
                            查看
                          </Button>
                          <Popconfirm
                            title="确定删除这条记录吗？"
                            onConfirm={() => deleteRecord(record.id)}
                            okText="确定"
                            cancelText="取消"
                          >
                            <Button 
                              size="small" 
                              danger 
                              icon={<DeleteOutlined />}
                            />
                          </Popconfirm>
                        </Space>
                      </div>
                    </Space>
                  </HistoryItem>
                );
              }}
            />
          )}
        </Space>
      </Card>

      {/* 详细记录模态框 */}
      <Modal
        title="问卦记录详情"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={700}
      >
        {selectedRecord && (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>时间：</Text>
              <Text>{formatTime(selectedRecord.timestamp)}</Text>
            </div>
            
            <div>
              <Text strong>类型：</Text>
              <Tag color={selectedRecord.type === 'ai' ? 'blue' : 'green'}>
                {selectedRecord.type === 'ai' ? 'AI问卦' : '传统占卜'}
              </Tag>
            </div>
            
            {selectedRecord.question && (
              <div>
                <Text strong>问题：</Text>
                <Paragraph>{selectedRecord.question}</Paragraph>
              </div>
            )}
            
            {(() => {
              const hexagram = getHexagramInfo(selectedRecord.hexagramId);
              return (
                <div>
                  <Text strong>卦象：</Text>
                  <div style={{ margin: '12px 0' }}>
                    <HexagramDisplay>
                      {hexagram.symbol} {hexagram.name}卦 - {hexagram.description}
                    </HexagramDisplay>
                  </div>
                  
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div>
                      <Text strong>卦辞：</Text>
                      <Paragraph>{hexagram.judgment}</Paragraph>
                    </div>
                    
                    <div>
                      <Text strong>象辞：</Text>
                      <Paragraph>{hexagram.image}</Paragraph>
                    </div>
                    
                    <div>
                      <Text strong>含义：</Text>
                      <Paragraph>{hexagram.meaning}</Paragraph>
                    </div>
                    
                    <div>
                      <Text strong>建议：</Text>
                      <Paragraph>{hexagram.advice}</Paragraph>
                    </div>
                    
                    <div>
                      <Text strong>运势：</Text>
                      <Tag color={hexagram.fortune === '大吉' ? 'green' : 
                                 hexagram.fortune === '吉' ? 'blue' : 
                                 hexagram.fortune === '中吉' ? 'orange' : 'red'}>
                        {hexagram.fortune}
                      </Tag>
                    </div>
                  </Space>
                </div>
              );
            })()}
            
            {selectedRecord.aiResponse && (
              <div>
                <Text strong>AI解读：</Text>
                <Paragraph style={{ whiteSpace: 'pre-line' }}>
                  {selectedRecord.aiResponse}
                </Paragraph>
              </div>
            )}
          </Space>
        )}
      </Modal>
    </HistoryContainer>
  );
}

// 导出添加记录的工具函数
export const addDivinationRecord = (record) => {
  const savedHistory = localStorage.getItem('divination_history');
  let history = [];
  
  if (savedHistory) {
    try {
      history = JSON.parse(savedHistory);
    } catch (error) {
      console.error('Failed to parse history:', error);
    }
  }
  
  const newRecord = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...record
  };
  
  const newHistory = [newRecord, ...history];
  localStorage.setItem('divination_history', JSON.stringify(newHistory));
};

export default DivinationHistory;