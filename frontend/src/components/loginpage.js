import React, { useState } from 'react';
import { Form, Input, Button, Card, Layout, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const { Content } = Layout;

function LoginPage({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [form] = Form.useForm();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const loginData = {
        username: values.username.trim().toLowerCase(),
        password: values.password
      };

      console.log('Sending login request:', { username: loginData.username }); // Debug log

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store both user data and token
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token); // Make sure backend sends token
        message.success('Giriş başarılı!');
        onLogin(data);
      } else {
        message.error(data.message || 'Giriş başarısız!');
        form.resetFields(['password']);
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Sunucu bağlantısında hata oluştu!');
      form.resetFields(['password']);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const registerData = {
        username: values.username.trim().toLowerCase(),
        email: values.email.trim().toLowerCase(),
        password: values.password
      };

      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',  // Add CORS mode
        body: JSON.stringify(registerData)
      });

      const data = await response.json();
      
      if (response.ok) {
        message.success({
          content: 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.',
          duration: 3,
          style: {
            marginTop: '20vh',
          },
        });
        form.resetFields();
        setIsLogin(true);
      } else {
        message.error({
          content: data.message || 'Kayıt olurken bir hata oluştu!',
          duration: 3,
          style: {
            marginTop: '20vh',
          },
        });
        form.resetFields(['password']);
      }
    } catch (error) {
      message.error({
        content: 'Sunucu bağlantısında hata oluştu!',
        duration: 3,
        style: {
          marginTop: '20vh',
        },
      });
      form.resetFields(['password']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          title="Envanter Yönetim Sistemi"
          style={{
            width: 400,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px'
          }}
        >
          {isLogin ? (
            <>
              <Form form={form} onFinish={handleLogin}>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Kullanıcı adı gerekli!' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Kullanıcı Adı" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Şifre gerekli!' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Şifre" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading} block>
                    Giriş Yap
                  </Button>
                </Form.Item>
                <Button type="link" onClick={() => setIsLogin(false)} block>
                  Hesabınız yok mu? Kayıt olun
                </Button>
              </Form>
            </>
          ) : (
            <>
              <Form form={form} onFinish={handleRegister}>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Kullanıcı adı gerekli!' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Kullanıcı Adı" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Email gerekli!' },
                    { type: 'email', message: 'Geçerli bir email giriniz!' }
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Şifre gerekli!' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Şifre" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading} block>
                    Kayıt Ol
                  </Button>
                </Form.Item>
                <Button type="link" onClick={() => setIsLogin(true)} block>
                  Zaten hesabınız var mı? Giriş yapın
                </Button>
              </Form>
            </>
          )}
        </Card>
      </Content>
    </Layout>
  );
}

export default LoginPage;