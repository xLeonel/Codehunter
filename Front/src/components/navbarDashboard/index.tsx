import React, { useEffect } from 'react';
import clsx from 'clsx'
import { Link, useHistory } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import AppMenu from './AppMenu'
import { ClickAwayListener, Divider, Grow, Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Popper } from '@material-ui/core'
import './style.css';
import { AccountCircleOutlined, ExitToAppOutlined, ExpandLess, ExpandMore, HomeOutlined, MenuOutlined, Notifications, SettingsOutlined, Work } from '@material-ui/icons'
import AppMenuItem from './AppMenuItem'
// import fotoUser from '../../assets/images/fotoUser.jpg';
import IconDashboard from '@material-ui/icons/Dashboard'
import IconPeople from '@material-ui/icons/People'
import IconBarChart from '@material-ui/icons/BarChart'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import Button from '../Button'

import ImageUploading, { ImageType } from "react-images-uploading";


import { parseJWT } from '../../services/auth'


interface NavBarProps {
  componente: any
}


const App: React.FC<NavBarProps> = (props) => {

  const [images, setImages] = React.useState([]);

  const onChange = (
    imageList: ImageType,
    // addUpdateIndex: number[] | undefined
  ) => {
    // data for submit

    // console.log(imageList, addUpdateIndex);

    setImages(imageList as never[]);
  };

  useEffect(() => {
    listar();
  }, []);

  const listar = () => {
    fetch('http://localhost:5000/api/Usuario', {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(dados => {
        // setUsuario(dados);

        const foto: ImageType = {
          dataURL: `data:image/jpeg;base64,${dados.foto}`
        }

        var imagens = [foto];

        setImages(imagens as never[])
      })
      .catch(erro => console.error(erro))
  }


  let history = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/');
  }

  const classes = useStyles()

  //MENU HAMBURGUER

  const [open, setOpen] = React.useState(false);


  type Anchor = 'top' | 'left' | 'bottom' | 'right';

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const arrayIcon = [<HomeOutlined />, <AccountCircleOutlined />, <SettingsOutlined />];


  const stilos = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

  const classeMenuHamb = stilos()

  const outrosStilos = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        marginTop: 10,
        marginRight: 10
      },
      appMenu: {
        width: '100%',
      },
      navList: {
        width: drawerWidth,
      },
      menuItem: {
        width: drawerWidth,
      },
      menuItemIcon: {
        color: '#fff',
      },
    }),
  );

  const classe = outrosStilos();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  //ARRAY DO MENU HAMBUGUER
  const appMenuItemsUser = [
    {
      name: 'Dashboard',
      link: '/user/dashboard',
      Icon: IconDashboard
    },
    {
      name: 'Teste de Personalidade',
      link: '/user/testepersonalidade',
      Icon: IconPeople,
    }
  ]

  const appMenuItemsAdm = [
    {
      name: 'Dashboard',
      link: '/adm/dashboard',
      Icon: IconDashboard,
    },
    {
      name: 'Estágios',
      link: '/adm/estagios',
      Icon: IconLibraryBooks,
    },
    {
      name: 'Empresas',
      link: '/adm/empresas',
      Icon: IconBarChart,
    },
    {
      name: 'Vagas',
      link: '/adm/vagas',
      Icon: Work,
    },
    {
      name: 'Usuários',
      link: '/adm/usuarios',
      Icon: IconPeople,
    }
  ]

  const appMenuItemsEmpresa = [
    {
      name: 'Dashboard',
      link: '/empresa/dashboard',
      Icon: IconDashboard,
    },
    {
      name: 'Vagas',
      Icon: Work,
      items: [
        {
          name: 'Cadastrar Vaga',
          link: '/empresa/vaga/cadastro',

        },
        {
          name: 'Minhas Vagas',
          link: '/empresa/vaga/list',

        },
      ],
    },
    {
      name: 'Filial',
      Icon: IconBarChart,
      items: [
        {
          name: 'Cadastrar Filial',
          link: '/empresa/filial/cadastro',

        },
        {
          name: 'Minhas Filiais',
          link: '/empresa/filial/list',

        },
      ],
    },
  ]

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classeMenuHamb.list, {
        [classeMenuHamb.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <List>
        {['Home', 'Perfil', 'Configurações'].map((text, index) => (
          <Link className="link" to={text === 'Home' ? '/' : text === 'Perfil' ? '/perfil' : '/configuracoes'}><ListItem button key={text}>
            {/* <ListItemIcon>{index === 0 ? <HomeOutlined /> : <ExitToAppOutlined />}</ListItemIcon> */}
            <ListItemIcon>{arrayIcon[index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <List component="nav" className={classe.appMenu} disablePadding>
          {parseJWT().Role === "1" ? appMenuItemsUser.map((item, index) => (<AppMenuItem {...item} key={index} />)) : parseJWT().Role === "2" ? appMenuItemsAdm.map((item, index) => (<AppMenuItem {...item} key={index} />)) : appMenuItemsEmpresa.map((item, index) => (<AppMenuItem {...item} key={index} />))}
          {/* {appMenuItems.map((item, index) => (
                      <AppMenuItem {...item} key={index} />
                  ))} */}
        </List>
      </List>
      <Divider />
      <List>
        {['Sair'].map((text, index) => (
          <Link to='/' className="link" onClick={event => {
            event.preventDefault();
            logout();
          }}><ListItem button key={text}>
              <ListItemIcon><ExitToAppOutlined /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem></Link>
        ))}
      </List>
    </div>
  );

  const estiloNotification = {
    width: '35px',
    height: '35px'
  };

  const estiloHam = {
    width: '50px',
    height: '50px',
    color: '#000000DE'
  };

  const estiloDropDown = {
    color: '#000000DE'
  };

  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const navbar = () => {

    if (parseJWT().Role === "1") {
      return (
        <div className="rightDashboard">
          <div className="botaoNavDashboard">
            <Link to="/vagas"><Button className="buttonVagasDashboard" type="button" value="Vagas" /></Link>
            <div className="iconeDashboard">
              <Icon><Notifications style={estiloNotification} /></Icon>
            </div>

          </div>

          <div className="modalUserDashboard">
            <ImageUploading
              value={images}
              onChange={onChange}
            >
              {({
                imageList,
                dragProps,

              }) => (
                  // write your building UI
                  <div>
                    {imageList.map((image, index) => (
                      <div key={index}>
                        <img className="image" src={image.dataURL} alt="foto de perfil" />
                      </div>
                    ))}
                  </div>
                )}
            </ImageUploading>
            {/* <img className="imageDashboard" src={fotoUser} alt="foto de perfil" /> */}
            <p className="textoDashboard">{parseJWT().Name}</p>
            <div className="dropdownDashboard">
              {/* <img src={dropdown} alt="menu dropdown" onClick={handleToggle} ref={anchorRef} /> */}
              {/* SETA Q DESCE MENU */}
              <IconButton aria-label="expandless" onClick={handleToggle} ref={anchorRef}>{open ? <ExpandLess style={estiloDropDown} /> : <ExpandMore style={estiloDropDown} />}</IconButton>

              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal className={classe.paper}>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          <Link className="link" to="/perfil"><MenuItem onClick={handleClose}>Perfil</MenuItem></Link>
                          <Link to="/configuracoes" className="link"><MenuItem onClick={handleClose}>Configurações</MenuItem></Link>
                          <Link to="/" className="link" onClick={event => {
                            event.preventDefault();
                            logout();
                          }}><MenuItem onClick={handleClose}>Sair</MenuItem></Link>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </div>

          {(['right'] as Anchor[]).map((anchor) => (
            <React.Fragment key={anchor}>
              <div className="rightBurguerDashboard" >
                <IconButton onClick={toggleDrawer(anchor, true)}><MenuOutlined style={estiloHam} /></IconButton>
              </div>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      )

    }
    else {
      return (
        <div className="rightDashboard">
          <div className="botaoNavDashboard">
            {/* <Link to="/"><Button className="button" type="button" value="Dashboard" /></Link> */}
            <div className="iconeDashboard">
              <Icon><Notifications style={estiloNotification} /></Icon>
            </div>
          </div>

          <div className="modalUserDashboard">
            <ImageUploading
              value={images}
              onChange={onChange}
            >
              {({
                imageList,
                dragProps,

              }) => (
                  // write your building UI
                  <div>
                    {imageList.map((image, index) => (
                      <div key={index}>
                        <img className="image" src={image.dataURL} alt="foto de perfil" />
                      </div>
                    ))}
                  </div>
                )}
            </ImageUploading>
            {/* <img className="imageDashboard" src={fotoUser} alt="foto de perfil" /> */}
            <p className="textoDashboard">{parseJWT().Name}</p>
            <div className="dropdown">
              {/* <img src={dropdown} alt="menu dropdown" onClick={handleToggle} ref={anchorRef} /> */}
              <IconButton aria-label="expandless" onClick={handleToggle} ref={anchorRef}>{open ? <ExpandLess style={estiloDropDown} /> : <ExpandMore style={estiloDropDown} />}</IconButton>

              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal className={classe.paper}>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          <Link className="link" to="/perfil"><MenuItem onClick={handleClose}>Perfil</MenuItem></Link>
                          <Link to="/configuracoes" className="link"><MenuItem onClick={handleClose}>Configurações</MenuItem></Link>
                          <Link to="/" className="link" onClick={event => {
                            event.preventDefault();
                            logout();
                          }}><MenuItem onClick={handleClose}>Sair</MenuItem></Link>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </div>

          {(['right'] as Anchor[]).map((anchor) => (
            <React.Fragment key={anchor}>
              <div className="rightBurguerDashboard" >
                <IconButton onClick={toggleDrawer(anchor, true)}><MenuOutlined style={estiloHam} /></IconButton>
              </div>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      )
    }
  }


  return (
    // <BrowserRouter>
    <div className={clsx('App', classes.root)}>
      <CssBaseline />
      <Drawer className="response"
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <AppMenu />
      </Drawer>
      <main className={classes.content}>

        {navbar()}

        <Divider />
        <Container maxWidth="lg" className={classes.container}>

          {/* {getPage()} */}

          {props.componente}

          {/* {window.location.pathname === '/dashboard' ?  UserDashboard : history.push('/empresas/vagas')} */}
          {/* {selectPage} */}
          {/* FAZER IF  {history.push('/a')}; */}

        </Container>
      </main>
    </div>
    // </BrowserRouter>
  )
}

const drawerWidth = 280

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    //COR BACKGBROUND SIDEBAR
    background: '#1F1F20',
    // COR LETRA SIDEBAR
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),

  },
}))

export default App
