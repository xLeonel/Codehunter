import React, { useEffect } from 'react';
import Button from '../Button';
import './style.css';
import logo from '../../assets/images/logoSenai.png';
// import fotoUser from '../../assets/images/fotoUser.jpg';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { ClickAwayListener, createStyles, Grow, IconButton, ListItemIcon, MenuItem, MenuList, Paper, Popper, Theme } from '@material-ui/core';
import { AccountCircleOutlined, ExitToAppOutlined, ExpandLess, ExpandMore, HomeOutlined, MenuOutlined, SettingsOutlined } from '@material-ui/icons';

import { usuarioLogado, parseJWT } from '../../services/auth'
import ImageUploading, { ImageType } from "react-images-uploading";


function NavBar() {

    const [images, setImages] = React.useState([]);

    const onChange = (
        imageList: ImageType,
        // addUpdateIndex: number[] | undefined
    ) => {
        setImages(imageList as never[]);
    };


    //let role = 1; // 1 user  2 adm  3 empresa

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

                console.log(dados.foto)

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

    const getStringUrl = () => {
        if (parseJWT().Role === '1') {
            return "user"
        }
        else if (parseJWT().Role === '2') {
            return "adm"
        }
        else if (parseJWT().Role === '3') {
            return "empresa"
        }
    }

    const useStyles = makeStyles({
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        }
    });

    const outrosStilos = makeStyles((theme: Theme) =>
        createStyles({
            paper: {
                marginTop: 10,
                marginRight: 85
            }
        }),
    );

    const classe = outrosStilos();

    type Anchor = 'top' | 'left' | 'bottom' | 'right';


    const classes = useStyles();

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

    const [open, setOpen] = React.useState(false);

    const arrayIcon = [<HomeOutlined />, <AccountCircleOutlined />, <SettingsOutlined />];

    const list = (anchor: Anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Dashboard', 'Perfil', 'Configurações'].map((text, index) => (
                    <Link className="link" to={text === 'Dashboard' ? `/${getStringUrl()}/dashboard` : text === 'Perfil' ? '/perfil' : '/configuracoes'}><ListItem button key={text}>
                        {/* <ListItemIcon>{index === 0 ? <HomeOutlined /> : <ExitToAppOutlined />}</ListItemIcon> */}
                        <ListItemIcon>{arrayIcon[index]}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                    </Link>
                ))}
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

    const anchorRef = React.useRef<HTMLButtonElement>(null);


    const estiloDropDown = {
        color: '#FFFFFF'
    };

    const estiloHam = {
        width: '50px',
        height: '50px',
        color: '#FFFFFF'
    };

    const navbar = () => {

        if (!usuarioLogado()) {
            return (
                <div className="navbarOriginal">
                    <nav>
                        <div className="left">
                            <Link to="/"><img className="logo" src={logo} alt="logo senai" /></Link>
                        </div>
                        <div className="rightDeslogado">
                            <Link to="/tipousuario"><Button className="buttonDesbugado" type="button" value="Entrar" /></Link>
                        </div>
                    </nav>
                </div>
            )
        }
        else {
            return (
                <div className="navbarOriginal">
                    <nav>
                        <div className="left">
                            <Link to="/"><img src={logo} alt="logo senai" /></Link>
                        </div>

                        <div className="right">
                            <div className="BotaoResponsivo">
                                <Link to={parseJWT().Role === '1' ? '/user/dashboard' : parseJWT().Role === '2' ? '/adm/dashboard' : '/empresa/dashboard'}><Button className="buttonDesbugado" type="button" value="Dashboard" /></Link>
                            </div>

                            <div className="modalUser">
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
                                {/* <img className="image" src={fotoUser} alt="foto de perfil" /> */}
                                <p className="texto">{parseJWT().Name}</p>
                                <div className="dropdown">
                                    {/* <img src={dropdown} alt="menu dropdown" onClick={handleToggle} ref={anchorRef} /> */}
                                    {/* <ThemeProvider theme={temaNav}> */}
                                    <IconButton aria-label="expandless" onClick={handleToggle} ref={anchorRef}>{open ? <ExpandLess style={estiloDropDown} /> : <ExpandMore style={estiloDropDown} />}</IconButton>
                                    {/* </ThemeProvider> */}

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

                        </div>


                        {(['right'] as Anchor[]).map((anchor) => (
                            <React.Fragment key={anchor}>
                                {/* <div className="rightBurguer" ><img src={menu} onClick={toggleDrawer(anchor, true)} alt="dropdown" /></div> */}
                                <div className="rightBurguer" >
                                    <IconButton onClick={toggleDrawer(anchor, true)}><MenuOutlined style={estiloHam} /></IconButton>
                                </div>
                                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                                    {list(anchor)}
                                </Drawer>
                            </React.Fragment>
                        ))}

                    </nav>
                </div>

            )
        }
    }

    return (
        navbar()
    );
}

export default NavBar;