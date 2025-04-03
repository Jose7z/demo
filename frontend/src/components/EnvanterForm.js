import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, DatePicker, Space, ConfigProvider, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';


function EnvanterForm({ onSubmit, onSearch }) {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(formData).some(value => !value);
    if (hasEmptyFields) {
        message.error('Lütfen tüm alanları doldurunuz!');
        return;
    }
    
    try {
        const requestData = {
            etiketno: formData.etiketno ? parseInt(formData.etiketno, 10) : null,
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

        await onSubmit(requestData);
        message.success('Yeni ürün başarıyla eklendi!');
        setFormData({
            etiketno: '',
            urunailesi: '',
            modeladi: '',
            durum: '',
            lokasyonadi: '',
            lokasyonkodu: '',
            lokasyontipi: '',
            sorumluluksicil: '',
            sorumluluk: '',
            sinif: '',
            irsaliyetarihi: ''
        });
    } catch (error) {
        console.error('Form submission error:', error);
        if (error.response?.status === 403) {
            message.error('Yetkiniz bulunmamaktadır!');
        } else {
            message.error('Ürün eklenirken bir hata oluştu: ' + (error.response?.data?.message || error.message));
        }
    }
};

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(formData);
  };
  const [searchText, setSearchText] = useState('');

  const buttonContainerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  };
  const [formData, setFormData] = useState({
    etiketno: '',
    urunailesi: '',
    modeladi: '',
    durum: '',
    lokasyonadi: '',
    lokasyonkodu: '',
    lokasyontipi: '',
    sorumluluksicil: '',
    sorumluluk: '',
    sinif: '',
    irsaliyetarihi: ''
});


  return (

    <Form layout="vertical">
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item label="Etiket No">
            <Input
              placeholder="Etiket No giriniz"
              value={formData.etiketno}
              onChange={(e) => setFormData({ ...formData, etiketno: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Ürün">
            <Input
              placeholder="Ürün giriniz"
              value={formData.urunailesi}
              onChange={(e) => setFormData({ ...formData, urunailesi: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Model">
            <Input
              placeholder="Model giriniz"
              value={formData.modeladi}
              onChange={(e) => setFormData({ ...formData, modeladi: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Durum">
            <Input
              placeholder="Durum giriniz"
              value={formData.durum}
              onChange={(e) => setFormData({ ...formData, durum: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Lokasyon">
            <Input
              placeholder="Lokasyon giriniz"
              value={formData.lokasyonadi}
              onChange={(e) => setFormData({ ...formData, lokasyonadi: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Lokasyon Kodu">
            <Input
              placeholder="Lokasyon Kodu giriniz"
              value={formData.lokasyonkodu}
              onChange={(e) => setFormData({ ...formData, lokasyonkodu: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Lokasyon Tipi">
            <Input
              placeholder="Lokasyon Tipi giriniz"
              value={formData.lokasyontipi}
              onChange={(e) => setFormData({ ...formData, lokasyontipi: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Sorumluluk Sicil">
            <Input
              placeholder="Sorumluluk Sicil giriniz"
              value={formData.sorumluluksicil}
              onChange={(e) => setFormData({ ...formData, sorumluluksicil: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={3} />
        <Col span={6}>
          <Form.Item label="Sorumluluk">
            <Input
              placeholder="Sorumluluk giriniz"
              value={formData.sorumluluk}
              onChange={(e) => setFormData({ ...formData, sorumluluk: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Sınıf">
            <Input
              placeholder="Sınıf giriniz"
              value={formData.sinif}
              onChange={(e) => setFormData({ ...formData, sinif: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="İrsaliye Tarihi">
            <DatePicker
              style={{ width: '100%' }}
              value={formData.irsaliyetarihi ? moment(formData.irsaliyetarihi) : null}
              onChange={(date) => setFormData({ ...formData, irsaliyetarihi: date ? date.format('YYYY-MM-DD') : '' })}
            />
          </Form.Item>
        </Col>
        <Col span={3} />
      </Row>
      <div style={buttonContainerStyle}>
        <ConfigProvider>
          <Space size ="middle">
          <Button
              type="primary"
              size="default"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              style={{ backgroundColor: '#1677ff' }}
            >
              Ara
            </Button>
            <Button
              type="primary"
              size="default"
              icon={<PlusOutlined />}
              onClick={handleSubmit}
              className="custom-button"
            >
              Ekle
            </Button>
          </Space>
        </ConfigProvider>
      </div>
      
    </Form>

  );
}

export default EnvanterForm;