import React, { useState, useEffect, useCallback } from 'react';
import { Table, Input, Button, Space, Popconfirm, Modal, Form, Select, message } from 'antd';
import { DeleteOutlined, UserSwitchOutlined } from '@ant-design/icons';
import axios from 'axios';



axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.replace('/login');
            return Promise.reject('No token found');
        }
        
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.replace('/login');
        }
        return Promise.reject(error);
    }
);


function EnvanterList({ filteredData }) {
    const [envanterler, setEnvanterler] = useState([]);
    const [error, setError] = useState(null);
    const [assignForm] = Form.useForm();
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/envanter');
            console.log('Response data type:', typeof response.data);
            console.log('Response data:', response.data);

            if (!response.data) {
                throw new Error('No data received from server');
            }

            const dataArray = Array.isArray(response.data) ? response.data : [];
            setEnvanterler(dataArray);
            
            if (dataArray.length === 0) {
                setError('Kayıtlı envanter bulunmamaktadır');
            } else {
                setError(null);
            }

        } catch (error) {
            console.error('Fetch error details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
            setEnvanterler([]);
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleApiError = (error) => {
        if (error.response) {
            // Server responded with a status code outside of 2xx
            console.error('Error response:', error.response);
            switch (error.response.status) {
                case 401:
                    setError('Oturum süreniz dolmuş olabilir. Lütfen tekrar giriş yapın.');
                    window.location.replace('/login');
                    break;
                case 403:
                    setError('Yetkiniz bulunmamaktadır');
                    break;
                default:
                    setError(`Sunucu hatası: ${error.response.status}`);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
            setError('Sunucudan yanıt alınamadı');
        } else {
            // Error in request setup
            console.error('Request setup error:', error.message);
            setError(`İstek hatası: ${error.message}`);
        }
    };

    useEffect(() => {
        if (filteredData) {
            setEnvanterler(filteredData);
        } else {
            fetchData();
        }
    }, [filteredData, fetchData]);

    const handleAssignment = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/assign', {
                etiketno: selectedItem.etiketno,
                sorumluluksicil: values.sorumluluksicil,
                sorumluluk: values.sorumluluk,
                action: values.action
            });

            if (response.status === 200) {
                message.success(values.action === 'assign' ? 'Ürün başarıyla atandı!' : 'Ürün başarıyla geri alındı!');
                setIsAssignModalVisible(false);
                assignForm.resetFields();
                await fetchData();
            }
        } catch (error) {
            console.error('Assignment error:', error);
            message.error('İşlem sırasında bir hata oluştu!');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (etiketno) => {
        setLoading(true);
        try {
            await axios.delete(`/api/envanter/${etiketno}`);
            message.success('Kayıt başarıyla silindi');
            setEnvanterler(prev => prev.filter(item => item.etiketno !== etiketno));
        } catch (error) {
            console.error('Delete error:', error);
            message.error('Veri silinirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };
    
    

    const columns = [
        {
            title: 'Etiket No',
            dataIndex: 'etiketno',
            key: 'etiketno',
            sorter: (a, b) => a.etiketno - b.etiketno
        },
        {
            title: 'Ürün',
            dataIndex: 'urunailesi',
            key: 'urunailesi',
            sorter: (a, b) => a.urunailesi.localeCompare(b.urunailesi)
        },
        {
            title: 'Model',
            dataIndex: 'modeladi',
            key: 'modeladi',
            sorter: (a, b) => a.modeladi.localeCompare(b.modeladi)
        },
        {
            title: 'Durum',
            dataIndex: 'durum',
            key: 'durum',
            sorter: (a, b) => a.durum.localeCompare(b.durum)
        },
        {
            title: 'Lokasyon',
            dataIndex: 'lokasyonadi',
            key: 'lokasyonadi',
            sorter: (a, b) => a.lokasyonadi.localeCompare(b.lokasyonadi)
        },
        {
            title: 'Lokasyon Kodu',
            dataIndex: 'lokasyonkodu',
            key: 'lokasyonkodu',
            sorter: (a, b) => a.lokasyonkodu.localeCompare(b.lokasyonkodu)
        },
        {
            title: 'Lokasyon Tipi',
            dataIndex: 'lokasyontipi',
            key: 'lokasyontipi',
            sorter: (a, b) => a.lokasyontipi.localeCompare(b.lokasyontipi)
        },
        {
            title: 'Sorumluluk Sicil',
            dataIndex: 'sorumluluksicil',
            key: 'sorumluluksicil',
            sorter: (a, b) => a.sorumluluksicil.localeCompare(b.sorumluluksicil)
        },
        {
            title: 'Sorumluluk',
            dataIndex: 'sorumluluk',
            key: 'sorumluluk',
            sorter: (a, b) => a.sorumluluk.localeCompare(b.sorumluluk)
        },
        {
            title: 'Sınıf',
            dataIndex: 'sinif',
            key: 'sinif',
            sorter: (a, b) => a.sinif.localeCompare(b.sinif)
        },
        {
            title: 'İrsaliye Tarihi',
            dataIndex: 'irsaliyetarihi',
            key: 'irsaliyetarihi',
            sorter: (a, b) => new Date(a.irsaliyetarihi) - new Date(b.irsaliyetarihi)
        },
        {
            title: 'İşlemler',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Popconfirm
                        title="Bu kaydı silmek istediğinizden emin misiniz?"
                        onConfirm={() => handleDelete(record.etiketno)}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Sil
                        </Button>
                    </Popconfirm>
                    <Button
                        type="link"
                        icon={<UserSwitchOutlined />}
                        onClick={() => {
                            setSelectedItem(record);
                            setIsAssignModalVisible(true);
                        }}
                    >
                        Ata/Geri Al
                    </Button>
                </Space>
            ),
        },
    ];

    const renderError = () => {
        if (error) {
            return (
                <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    background: '#fff1f0',
                    border: '1px solid #ffa39e',
                    borderRadius: '4px'
                }}>
                    <h3 style={{ color: '#cf1322' }}>Hata</h3>
                    <p>{error}</p>
                </div>
            );
        }
        return null;
    };
    const handleFormSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/envanter', values);
            if (response.status === 200 || response.status === 201) {
                message.success('Yeni ürün başarıyla eklendi!');
                await fetchData();
            }
        } catch (error) {
            console.error('New item error:', error);
            if (error.response?.status === 403) {
                message.error('Yetkiniz bulunmamaktadır!');
            } else {
                message.error('Ürün eklenirken bir hata oluştu!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            
            
            
            {renderError()}
            <Table
                loading={loading}
                columns={columns}
                dataSource={envanterler}
                rowKey="etiketno"
                scroll={{ x: true }}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} kayıt`
                }}
                bordered
                size="middle"
            />

            <Modal
                title="Ürün Atama/Geri Alma"
                open={isAssignModalVisible}
                onCancel={() => {
                    setIsAssignModalVisible(false);
                    assignForm.resetFields();
                }}
                footer={null}
            >
                <Form
                    form={assignForm}
                    onFinish={handleAssignment}
                    layout="vertical"
                >
                    <Form.Item label="Etiket No">
                        <Input disabled value={selectedItem?.etiketno} />
                    </Form.Item>
                    <Form.Item
                        name="sorumluluksicil"
                        label="Sorumluluk Sicil"
                        rules={[{ required: true, message: 'Sorumluluk sicil numarası gerekli!' }]}
                    >
                        <Input placeholder="Sorumluluk sicil numarası giriniz" />
                    </Form.Item>
                    <Form.Item
                        name="sorumluluk"
                        label="Sorumluluk"
                        rules={[{ required: true, message: 'Sorumluluk bilgisi gerekli!' }]}
                    >
                        <Input placeholder="Sorumluluk bilgisi giriniz" />
                    </Form.Item>
                    <Form.Item
                        name="action"
                        label="İşlem"
                        rules={[{ required: true, message: 'İşlem seçiniz!' }]}
                    >
                        <Select>
                            <Select.Option value="assign">Ata</Select.Option>
                            <Select.Option value="unassign">Geri Al</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Onayla
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default EnvanterList;