import React, { useState, useCallback } from 'react';
import { Card, Input, Row, Col, Typography, Tag, Modal, Space, Divider, Collapse, Tooltip } from 'antd';
import { SearchOutlined, BookOutlined, SoundOutlined } from '@ant-design/icons';
import { hexagrams, trigrams } from '../data/yijingData';
import AudioPlayer from './AudioPlayer';
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const LibraryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const HexagramCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
  
  .hexagram-symbol {
    font-size: 2.5rem;
    text-align: center;
    margin: 10px 0;
    color: #722ed1;
  }
  
  .hexagram-name {
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    color: #1890ff;
  }
`;

const DetailModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 15px;
  }
  
  .hexagram-detail-symbol {
    font-size: 4rem;
    text-align: center;
    color: #722ed1;
    margin: 20px 0;
  }
`;

const TrigramInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  
  .trigram-item {
    text-align: center;
    padding: 15px;
    background: #f0f2f5;
    border-radius: 10px;
    flex: 1;
    margin: 0 10px;
  }
`;

const HexagramLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHexagram, setSelectedHexagram] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 过滤卦象
  const filteredHexagrams = hexagrams.filter(hexagram => 
    hexagram.name.includes(searchTerm) || 
    hexagram.description.includes(searchTerm) ||
    hexagram.meaning.includes(searchTerm)
  );

  const showHexagramDetail = useCallback((hexagram) => {
    console.log('点击的卦象:', hexagram.name, 'ID:', hexagram.id);
    // 直接设置新状态，React会自动处理状态更新
    setSelectedHexagram(hexagram);
    setModalVisible(true);
  }, []);

  const getFortuneColor = (fortune) => {
    switch(fortune) {
      case '大吉': return 'red';
      case '吉': return 'green';
      case '中吉': return 'blue';
      case '中平': return 'orange';
      case '凶': return 'volcano';
      default: return 'default';
    }
  };

  return (
    <LibraryContainer>
      <Card>
        <Title level={2} style={{ textAlign: 'center', color: '#722ed1' }}>
          <BookOutlined /> 六十四卦典籍
        </Title>
        
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <Search
            placeholder="搜索卦名、描述或含义..."
            allowClear
            size="large"
            style={{ maxWidth: '400px' }}
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Paragraph style={{ textAlign: 'center', fontSize: '16px', color: '#666' }}>
          周易六十四卦，每卦都蕴含着深刻的人生智慧。点击任意卦象查看详细解读。
        </Paragraph>
      </Card>

      <div style={{ marginTop: '20px' }}>
        <Row gutter={[16, 16]}>
          {filteredHexagrams.map((hexagram) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={hexagram.id}>
              <HexagramCard
                size="small"
                onClick={() => showHexagramDetail(hexagram)}
              >
                <div className="hexagram-symbol">{hexagram.symbol}</div>
                <div className="hexagram-name">{hexagram.name}</div>
                <div style={{ textAlign: 'center', margin: '10px 0' }}>
                  <Text type="secondary">{hexagram.description}</Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Tag color={getFortuneColor(hexagram.fortune)}>
                    {hexagram.fortune}
                  </Tag>
                </div>
              </HexagramCard>
            </Col>
          ))}
        </Row>
      </div>

      {/* 卦象详情模态框 */}
      <DetailModal
        title={null}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setSelectedHexagram(null);
        }}
        footer={null}
        width={700}
        destroyOnClose={true}
      >
        {selectedHexagram && (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="hexagram-detail-symbol">{selectedHexagram.symbol}</div>
              <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                第{selectedHexagram.id}卦 - {selectedHexagram.name}卦
              </Title>
              {console.log('模态框显示的卦象:', selectedHexagram.name, 'ID:', selectedHexagram.id)}
              <Title level={3} style={{ margin: '10px 0', color: '#666' }}>
                {selectedHexagram.description}
              </Title>
              <Tag color={getFortuneColor(selectedHexagram.fortune)} style={{ fontSize: '16px', padding: '5px 15px' }}>
                {selectedHexagram.fortune}
              </Tag>
            </div>

            <TrigramInfo>
              <div className="trigram-item">
                <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>
                  {trigrams[selectedHexagram.upperTrigram]?.symbol}
                </div>
                <Text strong>上卦</Text>
                <div>{selectedHexagram.upperTrigram}</div>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {trigrams[selectedHexagram.upperTrigram]?.meaning}
                </Text>
              </div>
              <div className="trigram-item">
                <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>
                  {trigrams[selectedHexagram.lowerTrigram]?.symbol}
                </div>
                <Text strong>下卦</Text>
                <div>{selectedHexagram.lowerTrigram}</div>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {trigrams[selectedHexagram.lowerTrigram]?.meaning}
                </Text>
              </div>
            </TrigramInfo>

            <Card size="small">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text strong style={{ fontSize: '16px', color: '#722ed1' }}>卦辞：</Text>
                  <Paragraph style={{ fontSize: '16px', margin: '8px 0', fontStyle: 'italic' }}>
                    {selectedHexagram.judgment}
                  </Paragraph>
                  <AudioPlayer 
                    text={`卦辞：${selectedHexagram.judgment}`}
                    title="朗读卦辞"
                  />
                </div>
                
                <div>
                  <Text strong style={{ fontSize: '16px', color: '#722ed1' }}>象辞：</Text>
                  <Paragraph style={{ fontSize: '16px', margin: '8px 0', fontStyle: 'italic' }}>
                    {selectedHexagram.image}
                  </Paragraph>
                  <AudioPlayer 
                    text={`象辞：${selectedHexagram.image}`}
                    title="朗读象辞"
                  />
                </div>
                
                {selectedHexagram.tuanCi && (
                  <div>
                    <Text strong style={{ fontSize: '16px', color: '#722ed1' }}>彖辞：</Text>
                    <Paragraph style={{ fontSize: '16px', margin: '8px 0', fontStyle: 'italic' }}>
                      {selectedHexagram.tuanCi}
                    </Paragraph>
                    <AudioPlayer 
                      text={`彖辞：${selectedHexagram.tuanCi}`}
                      title="朗读彖辞"
                    />
                  </div>
                )}
                
                <Divider />
                
                <div>
                  <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>卦象含义：</Text>
                  <Paragraph style={{ fontSize: '16px', margin: '8px 0' }}>
                    {selectedHexagram.meaning}
                  </Paragraph>
                  <AudioPlayer 
                    text={`含义：${selectedHexagram.meaning}`}
                    title="朗读含义"
                  />
                </div>
                
                <div>
                  <Text strong style={{ fontSize: '16px', color: '#52c41a' }}>人生指导：</Text>
                  <Paragraph style={{ fontSize: '16px', margin: '8px 0' }}>
                    {selectedHexagram.advice}
                  </Paragraph>
                  <AudioPlayer 
                    text={`建议：${selectedHexagram.advice}`}
                    title="朗读建议"
                  />
                </div>
                
                {selectedHexagram.yaoCi && (
                  <div>
                    <Text strong style={{ fontSize: '16px', color: '#fa8c16' }}>爻辞详解：</Text>
                    <Collapse size="small" style={{ marginTop: '10px' }}>
                      {selectedHexagram.yaoCi.map((yao, index) => (
                        <Collapse.Panel 
                          header={`${yao.yao}: ${yao.text}`} 
                          key={index}
                          extra={<Tooltip title={yao.pronunciation}><SoundOutlined /></Tooltip>}
                        >
                          <Space direction="vertical" size="small" style={{ width: '100%' }}>
                            <Text><strong>读音：</strong>{yao.pronunciation}</Text>
                            <Text><strong>释义：</strong>{yao.meaning}</Text>
                            <AudioPlayer 
                              text={`${yao.yao}，${yao.text}，${yao.meaning}`}
                              title="朗读此爻"
                              size="small"
                            />
                          </Space>
                        </Collapse.Panel>
                      ))}
                    </Collapse>
                  </div>
                )}
                
                {selectedHexagram.difficultWords && selectedHexagram.difficultWords.length > 0 && (
                  <div>
                    <Text strong style={{ fontSize: '16px', color: '#13c2c2' }}>生僻字注音：</Text>
                    <div style={{ marginTop: '10px' }}>
                      {selectedHexagram.difficultWords.map((word, index) => (
                        <Tooltip key={index} title={word.meaning}>
                          <Tag 
                            color="cyan" 
                            style={{ margin: '4px', cursor: 'pointer' }}
                            onClick={() => {
                              const utterance = new SpeechSynthesisUtterance(`${word.word}，读音${word.pronunciation}，意思是${word.meaning}`);
                              utterance.lang = 'zh-CN';
                              utterance.rate = 0.7; // 稍慢的语速便于学习
                              utterance.pitch = 1;
                              utterance.volume = 0.8;
                              
                              // 尝试使用中文语音
                              const voices = window.speechSynthesis.getVoices();
                              const chineseVoice = voices.find(voice => 
                                voice.lang.includes('zh') || voice.lang.includes('cmn')
                              );
                              if (chineseVoice) {
                                utterance.voice = chineseVoice;
                              }
                              
                              utterance.onerror = (event) => {
                                console.error('语音朗读错误:', event.error);
                              };
                              
                              speechSynthesis.speak(utterance);
                            }}
                          >
                            {word.word} [{word.pronunciation}]
                          </Tag>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <AudioPlayer 
                    text={`${selectedHexagram.name}卦，${selectedHexagram.description}。卦辞：${selectedHexagram.judgment}。象辞：${selectedHexagram.image}。含义：${selectedHexagram.meaning}。建议：${selectedHexagram.advice}`}
                    title="朗读完整内容"
                  />
                </div>
              </Space>
            </Card>

            <Card size="small" style={{ background: '#f6ffed' }}>
              <Text strong style={{ color: '#389e0d' }}>学习要点：</Text>
              <Paragraph style={{ margin: '8px 0' }}>
                {selectedHexagram.name}卦由{selectedHexagram.upperTrigram}卦在上，{selectedHexagram.lowerTrigram}卦在下组成。
                {trigrams[selectedHexagram.upperTrigram]?.meaning}与{trigrams[selectedHexagram.lowerTrigram]?.meaning}的结合，
                形成了独特的卦象意义，指导我们在相应情况下的行为准则。
              </Paragraph>
            </Card>
          </Space>
        )}
      </DetailModal>
    </LibraryContainer>
  );
};

export default HexagramLibrary;