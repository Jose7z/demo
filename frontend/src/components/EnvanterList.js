import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';
import axios from 'axios';

function EnvanterList() {
    const [envanterler, setEnvanterler] = useState([]);
    const [orderBy, setOrderBy] = useState('etiketno');
    const [order, setOrder] = useState('asc');
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

    // Hata mesajını göster
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Yükleniyor mesajını göster
    if (envanterler.length === 0) {
        return <div>Loading...</div>;
    }

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Debug için
    console.log('Current data:', envanterler);
    console.log('OrderBy:', orderBy);
    console.log('Order:', order);

    const sortedEnvanterler = [...envanterler].sort((a, b) => {
        const valueA = a[orderBy] || '';
        const valueB = b[orderBy] || '';
        
        if (order === 'asc') {
            return valueA < valueB ? -1 : 1;
        } else {
            return valueB < valueA ? -1 : 1;
        }
    });

    return (
        <TableContainer 
            component={Paper} 
            style={{ 
                width: '100vw',
                maxWidth: '100vw',
                margin: 0,
                padding: '0 20px',
                overflowX: 'auto',
                boxShadow: 'none',
                borderRadius: 0
            }}
        >
            <Table style={{ width: '100%',
                minWidth: '100%',
                tableLayout: 'auto'
            }}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ minWidth: 120, whiteSpace: 'nowrap'}}>
                            <TableSortLabel
                                active={orderBy === 'etiketno'}
                                direction={orderBy === 'etiketno' ? order : 'asc'}
                                onClick={() => handleSort('etiketno')}
                            >
                                Etiket No
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{ minWidth: 120, whiteSpace: 'nowrap'}}>
                            <TableSortLabel
                                active={orderBy === 'urunailesi'}
                                direction={orderBy === 'urunailesi' ? order : 'asc'}
                                onClick={() => handleSort('urunailesi')}
                            >
                                Ürün
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{ minWidth: 120, whiteSpace: 'nowrap'}}>
                            <TableSortLabel
                                active={orderBy === 'modeladi'}
                                direction={orderBy === 'modeladi' ? order : 'asc'}
                                onClick={() => handleSort('modeladi')}
                            >
                                Model
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{ minWidth: 120, whiteSpace: 'nowrap'}}>
                            <TableSortLabel
                                active={orderBy === 'durum'}
                                direction={orderBy === 'durum' ? order : 'asc'}
                                onClick={() => handleSort('durum')}
                            >
                                Durum
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{ minWidth: 120, whiteSpace: 'nowrap'}}>
                            <TableSortLabel
                                active={orderBy === 'lokasyonadi'}
                                direction={orderBy === 'lokasyonadi' ? order : 'asc'}
                                onClick={() => handleSort('lokasyonadi')}
                            >
                                Lokasyon
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{ minWidth: 120, whiteSpace: 'nowrap'}}>
                            <TableSortLabel
                                active={orderBy === 'lokasyonkodu'}
                                direction={orderBy === 'lokasyonkodu' ? order : 'asc'}
                                onClick={() => handleSort('lokasyonkodu')}
                            >
                                Lokasyon Kodu
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{ minWidth: 120, whiteSpace: 'nowrap'}}>
                            <TableSortLabel
                                active={orderBy === 'lokasyontipi'}
                                direction={orderBy === 'lokasyontipi' ? order : 'asc'}
                                onClick={() => handleSort('lokasyontipi')}
                            >
                                Lokasyon Tipi
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{ minWidth: 120, whiteSpace: 'nowrap'}}>
                            <TableSortLabel
                                active={orderBy === 'sorumluluksicil'}
                                direction={orderBy === 'sorumluluksicil' ? order : 'asc'}
                                onClick={() => handleSort('sorumluluksicil')}
                            >
                                Sorumluluk Sicil
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{ minWidth: 120, whiteSpace: 'nowrap'}}>
                            <TableSortLabel
                                active={orderBy === 'sorumluluk'}
                                direction={orderBy === 'sorumluluk' ? order : 'asc'}
                                onClick={() => handleSort('sorumluluk')}
                            >
                                Sorumluluk
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{ minWidth: 120, whiteSpace: 'nowrap'}}>
                            <TableSortLabel
                                active={orderBy === 'sinif'}
                                direction={orderBy === 'sinif' ? order : 'asc'}
                                onClick={() => handleSort('sinif')}
                            >
                                Sınıf
                            </TableSortLabel>
                        </TableCell>
                        <TableCell style={{ minWidth: 120, whiteSpace: 'nowrap'}}>
                            <TableSortLabel
                                active={orderBy === 'irsaliyetarihi'}
                                direction={orderBy === 'irsaliyetarihi' ? order : 'asc'}
                                onClick={() => handleSort('irsaliyetarihi')}
                            >
                                İrsaliye Tarihi
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedEnvanterler.map((envanter) => (
                        <TableRow key={envanter.etiketno}>
                            <TableCell>{envanter.etiketno}</TableCell>
                            <TableCell>{envanter.urunailesi}</TableCell>
                            <TableCell>{envanter.modeladi}</TableCell>
                            <TableCell>{envanter.durum}</TableCell>
                            <TableCell>{envanter.lokasyonadi}</TableCell>
                            <TableCell>{envanter.lokasyonkodu}</TableCell>
                            <TableCell>{envanter.lokasyontipi}</TableCell>
                            <TableCell>{envanter.sorumluluksicil}</TableCell>
                            <TableCell>{envanter.sorumluluk}</TableCell>
                            <TableCell>{envanter.sinif}</TableCell>
                            <TableCell>{envanter.irsaliyetarihi}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default EnvanterList;