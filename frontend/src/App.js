import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Container, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EnvanterList from './components/EnvanterList';
import EnvanterForm from './components/EnvanterForm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import 'antd/dist/reset.css';

import './App.css';

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

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

  return (
    <div className="App">
      <AppBar position="static" sx={{ height: '48px' }}>
        <Toolbar variant="dense" sx={{ minHeight: '48px' }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            size="small"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: '1.1rem' }}>
            Envanter Yönetim Sistemi
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AccountCircleIcon sx={{ fontSize: '1.2rem' }} />
            <Typography variant="body2">
              John Doe
            </Typography>
            <Button 
              color="inherit" 
              size="small" 
              startIcon={<LogoutIcon />}
              sx={{ ml: 2, textTransform: 'none' }}
            >
              Çıkış Yap
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List style={{ width: 250 }}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Envanter" />
          </ListItem>
        </List>
      </Drawer>

      <Container style={{ marginTop: 20 }}>
        <EnvanterForm onSubmit={handleSubmit} />
        <EnvanterList />
      </Container>
    </div>
  );
}

export default App;