import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card } from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: 'rgba(0, 0, 0, 0.88)',
            }}
          >
            欢迎使用 门店管理平台
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(0, 0, 0, 0.65)',
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            这是一个组织门店的项目
          </p>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
