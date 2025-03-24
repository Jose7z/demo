import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';

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
    <Paper style={{ margin: '20px 0' }}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputStyle}>
          <TextField
            required
            fullWidth
            label="Etiket No"
            value={formData.etiketno}
            onChange={(e) => setFormData({...formData, etiketno: e.target.value})}
          />
        </div>
        <div style={inputStyle}>
          <TextField
            fullWidth
            label="Ürün"
            value={formData.urunailesi}
            onChange={(e) => setFormData({...formData, urunailesi: e.target.value})}
          />
        </div>
        {/* Diğer TextField'lar için aynı yapıyı tekrarlayın */}
        <div style={inputStyle}>
          <TextField
            fullWidth
            label="Model"
            value={formData.modeladi}
            onChange={(e) => setFormData({...formData, modeladi: e.target.value})}
          />
        </div>
        <div style={inputStyle}>
          <TextField
            fullWidth
            label="Durum"
            value={formData.durum}
            onChange={(e) => setFormData({...formData, durum: e.target.value})}
          />
        </div>
        <div style={inputStyle}>
          <TextField
            fullWidth
            label="Lokasyon"
            value={formData.lokasyonadi}
            onChange={(e) => setFormData({...formData, lokasyonadi: e.target.value})}
          />
        </div>
        <div style={inputStyle}>
          <TextField
            fullWidth
            label="Lokasyon Kodu"
            value={formData.lokasyonkodu}
            onChange={(e) => setFormData({...formData, lokasyonkodu: e.target.value})}
          />
        </div>
        <div style={inputStyle}>
          <TextField
            fullWidth
            label="Lokasyon Tipi"
            value={formData.lokasyontipi}
            onChange={(e) => setFormData({...formData, lokasyontipi: e.target.value})}
          />
        </div>
        <div style={inputStyle}>
          <TextField
            fullWidth
            label="Sorumluluk Sicil"
            value={formData.sorumluluksicil}
            onChange={(e) => setFormData({...formData, sorumluluksicil: e.target.value})}
          />
        </div>
        <div style={inputStyle}>
          <TextField
            fullWidth
            label="Sorumluluk"
            value={formData.sorumluluk}
            onChange={(e) => setFormData({...formData, sorumluluk: e.target.value})}
          />
        </div>
        <div style={inputStyle}>
          <TextField
            fullWidth
            label="Sınıf"
            value={formData.sinif}
            onChange={(e) => setFormData({...formData, sinif: e.target.value})}
          />
        </div>
        <div style={inputStyle}>
          <TextField
            fullWidth
            label="İrsaliye Tarihi"
            type="date"
            value={formData.irsaliyetarihi}
            onChange={(e) => setFormData({...formData, irsaliyetarihi: e.target.value})}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div style={buttonContainerStyle}>
          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
          >
            Ekle
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default EnvanterForm;