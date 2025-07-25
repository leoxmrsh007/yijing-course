import React, { useState, useEffect } from 'react';
import { Card, Input, Select, Typography, Space, List, Tag, Button, Modal, Checkbox, Row, Col, Empty, Divider } from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  EyeOutlined, 
  BookOutlined,
  StarOutlined,
  ClearOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { hexagrams, trigrams, learningMaterials } from '../data/yijingData';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const FilterCard = styled(Card)`
  margin-bottom: 20px;
  
  .ant-card-body {
    padding: 16px;
  }
`;

const ResultItem = styled.div`
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

const HexagramSymbol = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 18px;
`;

function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [filters, setFilters] = useState({
    fortune: [],
    difficulty: [],
    trigram: []
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // 从localStorage加载搜索历史
  useEffect(() => {
    const savedHistory = localStorage.getItem('search_history');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse search history:', error);
      }
    }
  }, []);

  // 保存搜索历史
  const saveSearchHistory = (query) => {
    if (!query.trim()) return;
    
    const newHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('search_history', JSON.stringify(newHistory));
  };

  // 执行搜索
  const performSearch = () => {
    if (!searchQuery.trim() && searchType === 'all' && Object.values(filters).every(arr => arr.length === 0)) {
      setResults([]);
      return;
    }

    setLoading(true);
    saveSearchHistory(searchQuery);

    setTimeout(() => {
      let searchResults = [];

      // 搜索卦象
      if (searchType === 'all' || searchType === 'hexagrams') {
        const hexagramResults = hexagrams.filter(hexagram => {
          const matchesQuery = !searchQuery.trim() || 
            hexagram.name.includes(searchQuery) ||
            hexagram.description.includes(searchQuery) ||
            hexagram.judgment.includes(searchQuery) ||
            hexagram.image.includes(searchQuery) ||
            hexagram.meaning.includes(searchQuery) ||
            hexagram.advice.includes(searchQuery);

          const matchesFortune = filters.fortune.length === 0 || filters.fortune.includes(hexagram.fortune);
          
          const matchesTrigram = filters.trigram.length === 0 || 
            filters.trigram.some(trigramName => 
              hexagram.upperTrigram === trigramName || hexagram.lowerTrigram === trigramName
            );

          return matchesQuery && matchesFortune && matchesTrigram;
        }).map(hexagram => ({
          ...hexagram,
          type: 'hexagram'
        }));

        searchResults = [...searchResults, ...hexagramResults];
      }

      // 搜索学习资料
      if (searchType === 'all' || searchType === 'materials') {
        const materialResults = learningMaterials.filter(material => {
          const matchesQuery = !searchQuery.trim() || 
            material.title.includes(searchQuery) ||
            (material.description && material.description.includes(searchQuery)) ||
            (Array.isArray(material.content) ? 
              material.content.some(item => item.includes(searchQuery)) : 
              material.content && material.content.includes(searchQuery));

          const matchesDifficulty = filters.difficulty.length === 0 || 
            (material.difficulty && filters.difficulty.includes(material.difficulty));

          return matchesQuery && matchesDifficulty;
        }).map(material => ({
          ...material,
          type: 'material'
        }));

        searchResults = [...searchResults, ...materialResults];
      }

      // 搜索八卦
      if (searchType === 'all' || searchType === 'trigrams') {
        const trigramArray = Object.entries(trigrams).map(([name, data]) => ({
          name,
          ...data
        }));
        
        const trigramResults = trigramArray.filter(trigram => {
          return !searchQuery.trim() || 
            trigram.name.includes(searchQuery) ||
            trigram.symbol.includes(searchQuery) ||
            trigram.element.includes(searchQuery) ||
            trigram.direction.includes(searchQuery) ||
            trigram.meaning.includes(searchQuery);
        }).map(trigram => ({
          ...trigram,
          type: 'trigram'
        }));

        searchResults = [...searchResults, ...trigramResults];
      }

      setResults(searchResults);
      setLoading(false);
    }, 500);
  };

  // 清空搜索
  const clearSearch = () => {
    setSearchQuery('');
    setSearchType('all');
    setFilters({ fortune: [], difficulty: [], trigram: [] });
    setResults([]);
  };

  // 查看详情
  const viewDetails = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // 使用历史搜索
  const handleHistorySearch = (query) => {
    setSearchQuery(query);
  };

  // 清空搜索历史
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('search_history');
  };

  // 渲染搜索结果项
  const renderResultItem = (item) => {
    switch (item.type) {
      case 'hexagram':
        return (
          <ResultItem key={`hexagram-${item.id}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, display: 'flex', gap: '16px' }}>
                <HexagramSymbol>{item.symbol}</HexagramSymbol>
                <div style={{ flex: 1 }}>
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Text strong style={{ fontSize: '16px' }}>{item.name}卦</Text>
                      <Tag color="blue">卦象</Tag>
                      <Tag color={item.fortune === '大吉' ? 'green' : 
                                 item.fortune === '吉' ? 'blue' : 
                                 item.fortune === '中吉' ? 'orange' : 'red'}>
                        {item.fortune}
                      </Tag>
                    </div>
                    <Text type="secondary">{item.description}</Text>
                    <Paragraph ellipsis={{ rows: 2 }}>{item.meaning}</Paragraph>
                  </Space>
                </div>
              </div>
              <Button 
                size="small" 
                icon={<EyeOutlined />}
                onClick={() => viewDetails(item)}
              >
                查看
              </Button>
            </div>
          </ResultItem>
        );

      case 'material':
        return (
          <ResultItem key={`material-${item.id}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <BookOutlined style={{ color: '#1890ff' }} />
                    <Text strong style={{ fontSize: '16px' }}>{item.title}</Text>
                    <Tag color="green">学习资料</Tag>
                    <Tag color={item.difficulty === '入门' ? 'blue' : 
                               item.difficulty === '进阶' ? 'orange' : 'red'}>
                      {item.difficulty}
                    </Tag>
                  </div>
                  <Text type="secondary">{item.description}</Text>
                </Space>
              </div>
              <Button 
                size="small" 
                icon={<EyeOutlined />}
                onClick={() => viewDetails(item)}
              >
                查看
              </Button>
            </div>
          </ResultItem>
        );

      case 'trigram':
        return (
          <ResultItem key={`trigram-${item.symbol}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Text strong style={{ fontSize: '16px' }}>{item.symbol}</Text>
                    <Tag color="purple">八卦</Tag>
                    <Tag>{item.element}</Tag>
                    <Tag>{item.direction}</Tag>
                  </div>
                  <Text type="secondary">{item.meaning}</Text>
                </Space>
              </div>
              <Button 
                size="small" 
                icon={<EyeOutlined />}
                onClick={() => viewDetails(item)}
              >
                查看
              </Button>
            </div>
          </ResultItem>
        );

      default:
        return null;
    }
  };

  return (
    <SearchContainer>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 标题 */}
        <div style={{ textAlign: 'center' }}>
          <SearchOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
          <Title level={2}>高级搜索</Title>
          <Paragraph>
            深度搜索卦象、学习资料和八卦知识，快速找到您需要的内容。
          </Paragraph>
        </div>

        {/* 搜索框 */}
        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Input.Search
              placeholder="输入关键词搜索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={performSearch}
              size="large"
              loading={loading}
              enterButton="搜索"
            />
            
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>搜索类型：</Text>
                <Select
                  value={searchType}
                  onChange={setSearchType}
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  <Option value="all">全部</Option>
                  <Option value="hexagrams">卦象</Option>
                  <Option value="materials">学习资料</Option>
                  <Option value="trigrams">八卦</Option>
                </Select>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: 'right' }}>
                  <Space>
                    <Button onClick={performSearch} type="primary" loading={loading}>
                      搜索
                    </Button>
                    <Button onClick={clearSearch} icon={<ClearOutlined />}>
                      清空
                    </Button>
                  </Space>
                </div>
              </Col>
            </Row>
          </Space>
        </Card>

        {/* 高级筛选 */}
        <FilterCard title={<><FilterOutlined /> 高级筛选</>} size="small">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Text strong>运势筛选：</Text>
              <Checkbox.Group
                value={filters.fortune}
                onChange={(values) => setFilters({...filters, fortune: values})}
                style={{ width: '100%', marginTop: '8px' }}
              >
                <Row>
                  <Col span={12}><Checkbox value="大吉">大吉</Checkbox></Col>
                  <Col span={12}><Checkbox value="吉">吉</Checkbox></Col>
                  <Col span={12}><Checkbox value="中吉">中吉</Checkbox></Col>
                  <Col span={12}><Checkbox value="凶">凶</Checkbox></Col>
                </Row>
              </Checkbox.Group>
            </Col>
            
            <Col xs={24} md={8}>
              <Text strong>难度筛选：</Text>
              <Checkbox.Group
                value={filters.difficulty}
                onChange={(values) => setFilters({...filters, difficulty: values})}
                style={{ width: '100%', marginTop: '8px' }}
              >
                <Row>
                  <Col span={12}><Checkbox value="入门">入门</Checkbox></Col>
                  <Col span={12}><Checkbox value="进阶">进阶</Checkbox></Col>
                  <Col span={12}><Checkbox value="高级">高级</Checkbox></Col>
                </Row>
              </Checkbox.Group>
            </Col>
            
            <Col xs={24} md={8}>
              <Text strong>八卦筛选：</Text>
              <Select
                mode="multiple"
                placeholder="选择八卦"
                value={filters.trigram}
                onChange={(values) => setFilters({...filters, trigram: values})}
                style={{ width: '100%', marginTop: '8px' }}
              >
                {Object.entries(trigrams).map(([name, trigram]) => (
                  <Option key={name} value={name}>
                    {trigram.symbol} - {name} - {trigram.element}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </FilterCard>

        {/* 搜索历史 */}
        {searchHistory.length > 0 && (
          <Card 
            title={<><HistoryOutlined /> 搜索历史</>} 
            size="small"
            extra={
              <Button size="small" onClick={clearHistory}>
                清空历史
              </Button>
            }
          >
            <Space wrap>
              {searchHistory.map((query, index) => (
                <Tag 
                  key={index}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleHistorySearch(query)}
                >
                  {query}
                </Tag>
              ))}
            </Space>
          </Card>
        )}

        {/* 搜索结果 */}
        <Card title={`搜索结果 (${results.length})`}>
          {results.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="暂无搜索结果"
            >
              <Text type="secondary">尝试调整搜索关键词或筛选条件</Text>
            </Empty>
          ) : (
            <div>
              {results.map(renderResultItem)}
            </div>
          )}
        </Card>
      </Space>

      {/* 详情模态框 */}
      <Modal
        title={selectedItem?.name || selectedItem?.title || selectedItem?.symbol}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={700}
      >
        {selectedItem && (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {selectedItem.type === 'hexagram' && (
              <>
                <div>
                  <Text strong>卦象：</Text>
                  <Text>{selectedItem.symbol} {selectedItem.name}卦</Text>
                </div>
                <div>
                  <Text strong>描述：</Text>
                  <Paragraph>{selectedItem.description}</Paragraph>
                </div>
                <div>
                  <Text strong>卦辞：</Text>
                  <Paragraph>{selectedItem.judgment}</Paragraph>
                </div>
                <div>
                  <Text strong>象辞：</Text>
                  <Paragraph>{selectedItem.image}</Paragraph>
                </div>
                <div>
                  <Text strong>含义：</Text>
                  <Paragraph>{selectedItem.meaning}</Paragraph>
                </div>
                <div>
                  <Text strong>建议：</Text>
                  <Paragraph>{selectedItem.advice}</Paragraph>
                </div>
                <div>
                  <Text strong>运势：</Text>
                  <Tag color={selectedItem.fortune === '大吉' ? 'green' : 
                             selectedItem.fortune === '吉' ? 'blue' : 
                             selectedItem.fortune === '中吉' ? 'orange' : 'red'}>
                    {selectedItem.fortune}
                  </Tag>
                </div>
              </>
            )}
            
            {selectedItem.type === 'material' && (
              <>
                <div>
                  <Text strong>难度：</Text>
                  <Tag color={selectedItem.difficulty === '入门' ? 'blue' : 
                             selectedItem.difficulty === '进阶' ? 'orange' : 'red'}>
                    {selectedItem.difficulty}
                  </Tag>
                </div>
                <div>
                  <Text strong>描述：</Text>
                  <Paragraph>{selectedItem.description}</Paragraph>
                </div>
                <div>
                  <Text strong>内容：</Text>
                  <Paragraph style={{ whiteSpace: 'pre-line' }}>
                    {selectedItem.content}
                  </Paragraph>
                </div>
              </>
            )}
            
            {selectedItem.type === 'trigram' && (
              <>
                <div>
                  <Text strong>八卦：</Text>
                  <Text>{selectedItem.symbol}</Text>
                </div>
                <div>
                  <Text strong>属性：</Text>
                  <Space>
                    <Tag>{selectedItem.element}</Tag>
                    <Tag>{selectedItem.direction}</Tag>
                  </Space>
                </div>
                <div>
                  <Text strong>含义：</Text>
                  <Paragraph>{selectedItem.meaning}</Paragraph>
                </div>
              </>
            )}
          </Space>
        )}
      </Modal>
    </SearchContainer>
  );
}

export default AdvancedSearch;