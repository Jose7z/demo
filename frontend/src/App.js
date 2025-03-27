import React, { useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { UserOutlined, DashboardOutlined, LogoutOutlined, DatabaseOutlined, UploadOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import EnvanterList from './components/EnvanterList';
import EnvanterForm from './components/EnvanterForm';
import 'antd/dist/reset.css';
import './App.css';
import { utils as XLSXUtils, write as XLSXWrite } from 'xlsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/loginpage';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('user');
  };
  const [currentUser, setCurrentUser] = useState(null);
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
  };

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


  const handleSearch = async (formData) => {
    try {

      const queryParams = Object.entries(formData)
        .filter(([_, value]) => value && value !== '')
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

      const response = await fetch(`http://localhost:8080/api/envanter/search?${queryParams}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Arama yapılırken bir hata oluştu');
      }

      const result = await response.json();
      setFilteredData(result);
    } catch (error) {
      console.error('Arama hatası:', error);
      alert('Arama yapılırken bir hata oluştu: ' + error.message);
    }
  };

  // Excel export kısmı 

  const handleExport = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/envanter');
      const data = await response.json();

      const ws = XLSXUtils.json_to_sheet(data);
      const wb = XLSXUtils.book_new();
      XLSXUtils.book_append_sheet(wb, ws, "Envanter");

      const excelBuffer = XLSXWrite(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `envanter_${new Date().toISOString().split('T')[0]}.xlsx`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export hatası:', error);
      alert('Veriler export edilirken bir hata oluştu');
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
      onClick: handleExport
    },
  ];

  const MainLayout = () => (

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
            <span>{currentUser?.username || 'Kullanıcı'}</span>
            <LogoutOutlined
              style={{ cursor: 'pointer' }}
              onClick={handleLogout}
            />
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
              <EnvanterForm onSubmit={handleSubmit} onSearch={handleSearch} />


            </div>
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <EnvanterList filteredData={filteredData} />

            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Envanter Yönetim Sistemi ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          !isAuthenticated ?
            <LoginPage onLogin={handleLogin} /> :
            <Navigate to="/" replace />
        } />
        <Route path="/*" element={
          isAuthenticated ?
            <MainLayout /> :
            <Navigate to="/login" replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;