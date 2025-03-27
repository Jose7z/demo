import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

function EnvanterList({ filteredData }) {
    const [envanterler, setEnvanterler] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        console.log('Fetching data...');
        axios.get('http://localhost:8080/api/envanter', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Raw API Response:', response);
            const data = response.data;
            console.log('API Data:', data);
            if (Array.isArray(data)) {
                setEnvanterler(data);
            } else {
                console.error('Data is not an array:', data);
                setError('Invalid data format received');
            }
        })
        .catch(error => {
            console.error('Detailed error:', error.response || error);
            setError(error.message || 'An error occurred while fetching data');
        });
    }, []);
    useEffect(() => {
        if (filteredData) {
            setEnvanterler(filteredData);
        } else {
            // Existing fetch code for initial data load
            axios.get('http://localhost:8080/api/envanter')
                .then(response => {
                    setEnvanterler(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [filteredData]);
    const handleDelete = async (etiketno) => {
        try {
            await axios.delete(`http://localhost:8080/api/envanter/${etiketno}`);
            setEnvanterler(envanterler.filter(item => item.etiketno !== etiketno));
        } catch (error) {
            console.error('Silme hatası:', error);
            alert('Veri silinirken bir hata oluştu');
        }
    };

    const columns = [
        {
            title: 'Etiket No',
            dataIndex: 'etiketno',
            key: 'etiketno',
            sorter: (a, b) => a.etiketno.localeCompare(b.etiketno)
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
                </Space>
            ),
        },
        
    ];

    if (error) {
        return (
            <div style={{ color: 'red', padding: '20px' }}>
                <h3>Hata</h3>
                <p>{error}</p>
                <pre>Lütfen konsolu kontrol edin (F12)</pre>
            </div>
        );
    }

    if (!envanterler || envanterler.length === 0) {
        return <div style={{ padding: '20px' }}>Veriler yükleniyor...</div>;
    }
    
    return (
        
        <Table
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
    );
}

export default EnvanterList;