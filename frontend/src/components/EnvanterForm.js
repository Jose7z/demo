import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, DatePicker, Space, ConfigProvider} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import moment from 'moment';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

function EnvanterForm({ onSubmit }) {
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
  const { styles } = useStyle();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    padding: '20px'
  };

  const inputStyle = {
    flex: '1 1 calc(25% - 16px)',
    minWidth: '250px'
  };

  const buttonContainerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  };
  

  return (
    <Form layout="vertical">
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item label="Etiket No">
            <Input
              placeholder="Etiket No giriniz"
              value={formData.etiketno}
              onChange={(e) => setFormData({...formData, etiketno: e.target.value})}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Ürün">
            <Input
              placeholder="Ürün giriniz"
              value={formData.urunailesi}
              onChange={(e) => setFormData({...formData, urunailesi: e.target.value})}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Model">
            <Input
              placeholder="Model giriniz"
              value={formData.modeladi}
              onChange={(e) => setFormData({...formData, modeladi: e.target.value})}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Durum">
            <Input
              placeholder="Durum giriniz"
              value={formData.durum}
              onChange={(e) => setFormData({...formData, durum: e.target.value})}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Lokasyon">
            <Input
              placeholder="Lokasyon giriniz"
              value={formData.lokasyonadi}
              onChange={(e) => setFormData({...formData, lokasyonadi: e.target.value})}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Lokasyon Kodu">
            <Input
              placeholder="Lokasyon Kodu giriniz"
              value={formData.lokasyonkodu}
              onChange={(e) => setFormData({...formData, lokasyonkodu: e.target.value})}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Lokasyon Tipi">
            <Input
              placeholder="Lokasyon Tipi giriniz"
              value={formData.lokasyontipi}
              onChange={(e) => setFormData({...formData, lokasyontipi: e.target.value})}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Sorumluluk Sicil">
            <Input
              placeholder="Sorumluluk Sicil giriniz"
              value={formData.sorumluluksicil}
              onChange={(e) => setFormData({...formData, sorumluluksicil: e.target.value})}
            />
          </Form.Item>
        </Col>
        <Col span={3} /> {/* Empty column for spacing */}
        <Col span={6}>
          <Form.Item label="Sorumluluk">
            <Input
              placeholder="Sorumluluk giriniz"
              value={formData.sorumluluk}
              onChange={(e) => setFormData({...formData, sorumluluk: e.target.value})}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Sınıf">
            <Input
              placeholder="Sınıf giriniz"
              value={formData.sinif}
              onChange={(e) => setFormData({...formData, sinif: e.target.value})}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="İrsaliye Tarihi">
            <DatePicker
              style={{ width: '100%' }}
              value={formData.irsaliyetarihi ? moment(formData.irsaliyetarihi) : null}
              onChange={(date) => setFormData({...formData, irsaliyetarihi: date ? date.format('YYYY-MM-DD') : ''})}
            />
          </Form.Item>
        </Col>
        <Col span={3} /> {/* Empty column for spacing */}
      </Row>
        <div style={buttonContainerStyle}>
          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            <Space>
              <Button 
                type="primary" 
                size="large" 
                icon={<PlusOutlined />}
                onClick={handleSubmit}
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