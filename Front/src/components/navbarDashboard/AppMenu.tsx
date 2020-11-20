import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'

import IconDashboard from '@material-ui/icons/Dashboard'
import IconPeople from '@material-ui/icons/People'
import IconBarChart from '@material-ui/icons/BarChart'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import logo from '../../assets/images/logoSenai.png';

import AppMenuItem from './AppMenuItem'
import { Link } from 'react-router-dom'
import { Work } from '@material-ui/icons'

import { parseJWT } from '../../services/auth'


//adm user empresa


//ARRAY DA SIDEBAR
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
        name: 'Minhas Vagas',
        link: '/empresa/vaga/list',

      },
      {
        name: 'Cadastrar Vaga',
        link: '/empresa/vaga/cadastro',

      },
    ],
  },
  {
    name: 'Filial',
    Icon: IconBarChart,
    items: [
      {
        name: 'Minhas Filiais',
        link: '/empresa/filial/list',

      },
      {
        name: 'Cadastrar Filial',
        link: '/empresa/filial/cadastro',

      },
    ],
  },
]



const mystyle = {
  width: "186px",
  height: "65px",
  margin: "0 40px 50px 40px"

};

const AppMenu: React.FC = () => {
  const classes = useStyles()

  return (
    <div>
      <Link to="/"><img src={logo} style={mystyle} alt="logo senai"></img></Link>
      <List component="nav" className={classes.appMenu} disablePadding>
        {parseJWT().Role === "1" ? appMenuItemsUser.map((item, index) => (<AppMenuItem {...item} key={index} />)) : parseJWT().Role === "2" ? appMenuItemsAdm.map((item, index) => (<AppMenuItem {...item} key={index} />)) : appMenuItemsEmpresa.map((item, index) => (<AppMenuItem {...item} key={index} />))}

        {/* {appMenuItems.map((item, index) => (
          <AppMenuItem {...item} key={index} />
        ))} */}
      </List>
    </div>
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme =>
  createStyles({
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
      color: '#97c05c',
    },
  }),
)

export default AppMenu
