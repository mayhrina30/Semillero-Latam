import React, { useContext, useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@mui/material/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@mui/styles';
import { Register } from '../register';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Login } from '../login';
import { UserToken } from '../../utils/contexts';
import { decodeJWT } from '../../utils/decodeJWT';

const useStyles = makeStyles({
  drawer: {
    backgroundColor: '#4E169D',
    color: '#FAFAFA',
    width: '230px', 
    height: '100%', 
    position: 'fixed',
    top: '56px', 
    left: '0px',
    zIndex: 1200, 
    
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px', 
  },
  listItem: {
    marginBottom: '1px',
  },
  listItemText: {
    fontFamily: 'Nunito',
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '20px',
    letterSpacing: '0px',
    textAlign: 'left',
  },
  listItemTextItalic: {
    fontFamily: 'Nunito',
    fontSize: '18px',
    fontStyle: 'italic',
    fontWeight: '400',
    lineHeight: '22px',
    letterSpacing: '0px',
    textAlign: 'left',
  },
  listItemWithMoreSpace: {
    marginBottom: '20px',
  }
});

const DrawerComponent = ({ isOpen, toggleDrawer }) => {
  const [activeRegister, setActiveRegister] = useState(false)
  const [activeLogin, setActiveLogin] = useState(false)
  const [admins, setAdmins] =useState(false)
  const { token, setToken } = useContext(UserToken);
  const classes = useStyles();
  useEffect(()=>{
    const storage = localStorage.getItem("token")
    if(storage && !token){
      setToken(storage)
    }
    
    if(token){
      const userDate = decodeJWT({token})
      if(userDate.authorities[0] == "ROLE_ADMIN"){ 
        setAdmins(true) 
      }
    }
  },[])
  useEffect(()=>{
    if(token){
      const userDate = decodeJWT({token})
      if(userDate.authorities[0] == "ROLE_ADMIN"){ 
        setAdmins(true) 
      }
    }
  },[token])
  const activeRegisterModal = () =>{
    setActiveRegister(!activeRegister)
  }
  const activeLoginModal = () =>{
    setActiveLogin(!activeLogin)
  }
  return (
    <Drawer open={isOpen} onClose={() => toggleDrawer(false)}
    BackdropProps={{ style: { backgroundColor: 'transparent' } }}>
      
      <div className={classes.drawer}
        role="presentation"
        onKeyDown={() => toggleDrawer(false)}
      >
        <IconButton onClick={() => toggleDrawer(false)} className={classes.closeButton}>
         
        </IconButton>
        {
          token ? (
            <div>
            {
              admins ? (
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <Typography className={classes.listItemTextItalic}  style={{fontSize: 20}}>Administrador</Typography>
                </ListItem>
                <ListItem button onClick={() => { window.location.href = '/'; }} className={classes.listItem}>
                  <Typography className={classes.listItemText}>Inicio</Typography>
                </ListItem>
                <ListItem button onClick={() => { window.location.href = '/dashboard'; }} className={classes.listItem}>
                  <Typography className={classes.listItemText}>Dashboard Administrador</Typography>
                </ListItem>
                <ListItem button onClick={() => { window.location.href = '/dashboard/proveedores'; }} className={classes.listItem}>
                  <Typography className={classes.listItemText}>Proveedores</Typography>
                </ListItem>
                <ListItem button onClick={() => { window.location.href = '/dashboard/publicaciones'; }} className={classes.listItem}>
                  <Typography className={classes.listItemText}>Publicaciones</Typography>
                </ListItem>
                
              </List>
              ):(
              <List className={classes.list}>
                <ListItem button onClick={() => { window.location.href = '/'; }} className={classes.listItem}>
                  <Typography className={classes.listItemText}>Inicio</Typography>
                </ListItem>
                <ListItem button onClick={() => { window.location.href = '/proveedores'; }} className={classes.listItem}>
                  <Typography className={classes.listItemText}>Proveedores</Typography>
                </ListItem>
                <ListItem button onClick={() => { window.location.href = '/publicaciones'; }} className={classes.listItem}>
                  <Typography className={classes.listItemText}>Publicaciones</Typography>
                </ListItem>
              </List>
              )
            }
          </div>
          ): (
          <List className={classes.list}>
            <ListItem button onClick={() => { window.location.href = '/'; }} className={classes.listItem}>
              <Typography className={classes.listItemText}>Inicio</Typography>
            </ListItem>
            <ListItem button onClick={() => { window.location.href = '/proveedores'; }} className={classes.listItem}>
              <Typography className={classes.listItemText}>Proveedores</Typography>
            </ListItem>
            <ListItem button onClick={() => { window.location.href = '/publicaciones'; }} className={classes.listItem}>
              <Typography className={classes.listItemText}>Publicaciones</Typography>
            </ListItem>
            <ListItem button onClick={()=> activeLoginModal()} className={classes.listItemWithMoreSpace}>
              <GoogleOAuthProvider clientId="635348494787-h0u5sf8bqtac38es53mdgjjvstnd72ar.apps.googleusercontent.com">
               <Login active={activeLogin} functionActive={activeLoginModal}/>            
                   <Typography className={classes.listItemText}>Iniciá sesión</Typography>
              </GoogleOAuthProvider> 
            </ListItem>
            <ListItem className={classes.listItem}>
              <Typography className={classes.listItemTextItalic}>¿Querés formar parte de la Red de Impacto ECO como Proveedor?</Typography>
            </ListItem>
            <ListItem button onClick={()=> activeRegisterModal()} className={classes.listItem}>
              <GoogleOAuthProvider clientId="635348494787-h0u5sf8bqtac38es53mdgjjvstnd72ar.apps.googleusercontent.com">
                <Register active={activeRegister} functionActive={activeRegisterModal}/><Typography className={classes.listItemText}>Registrate</Typography>
              </GoogleOAuthProvider> 
            </ListItem>
        </List>)
        }
        
      </div>
    </Drawer>
  );
};

export default DrawerComponent;