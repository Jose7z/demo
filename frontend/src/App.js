import React, { useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { UserOutlined, DashboardOutlined, LogoutOutlined, DatabaseOutlined, UploadOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import EnvanterList from './components/EnvanterList';
import EnvanterForm from './components/EnvanterForm';
import 'antd/dist/reset.css';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      if (!formData.etiketno) {
        throw new Error('Etiket No boş olamaz');
      }
      const requestData = {
        etiketno: parseInt(formData.etiketno, 10), 
        urunailesi: formData.urunailesi || '',
        modeladi: formData.modeladi || '',
        durum: formData.durum || '',
        lokasyonadi: formData.lokasyonadi || '',
        lokasyonkodu: formData.lokasyonkodu || '',
        lokasyontipi: formData.lokasyontipi || '',
        sorumluluksicil: formData.sorumluluksicil || '',
        sorumluluk: formData.sorumluluk || '',
        sinif: formData.sinif || '',
        irsaliyetarihi: formData.irsaliyetarihi || null
      };
      console.log('Gönderilen veri:', requestData);
      const response = await fetch('http://localhost:8080/api/envanter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Veri eklenemedi');
      }
      const result = await response.json();
      console.log('Başarılı:', result);
      window.location.reload();
    } catch (error) {
      console.error('Hata detayı:', error);
      alert('Veri eklenirken bir hata oluştu: ' + error.message);
    }
  };

  const items = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <DatabaseOutlined />,
      label: 'Envanter',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'Export',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible 
        collapsed={collapsed}
      >
        <div style={{ 
          height: 32, 
          margin: 16, 
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 6
        }} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['2']}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: '0 16px', 
          background: colorBgContainer, 
          display: 'flex', 
          alignItems: 'center', 
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              marginRight: 16
            }}
          />
          <h1 style={{ margin: 0, fontSize: '18px', flex: 1 }}>Envanter Yönetim Sistemi</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <UserOutlined style={{ fontSize: '18px' }} />
            <span>John Doe</span>
            <LogoutOutlined style={{ cursor: 'pointer' }} />
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <EnvanterForm onSubmit={handleSubmit} />
            </div>
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <EnvanterList />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Envanter Yönetim Sistemi ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;