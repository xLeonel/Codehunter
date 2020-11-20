import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Home: {
        screens: {
          Início: {
            screens: {
              InicioScreen: 'inicio',
            },
          },
          Vagas: {
            screens: {
              VagaScreen: 'vagas',
            },
          },
          Dashboard: {
            screens: {
              DashboardScreen: 'dashboard',
            },
          },
        },
      },
      Splash: {
        screens: {
          SplashScreen: 'splash',
        },
      },
      Login: {
        screens: {
          LoginScreen: 'login',
        },
      },
      LoginEmpresa: {
        screens: {
          LoginEmpresaScreen: 'loginempresa',
        },
      },
      TipoUsuario: {
        screens: {
          TipoUsuarioScreen: 'tipousuario',
        },
      },
      NotFound: '*',
    },
  },
};
