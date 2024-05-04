import { createTheme } from '@rneui/themed';

export const Colors = {
  Border: 'rgba(22, 18, 63, .1)',
  LightLime: '#abd699',
  FreshLemon: '#FFE26A',
  Teal: '#75c9b7',
  Mint: '#c7ddcc',
  Navy: '#16123f',
};

const theme = createTheme({
  lightColors: {
    primary: Colors.Navy,
    secondary: Colors.Teal,
    warning: Colors.FreshLemon,
  },
  darkColors: {
    primary: Colors.Navy,
  },
  components: {
    Button: {
      titleStyle: {
        fontFamily: 'Play-Bold',
      },
      buttonStyle: {
        borderRadius: 4,
      },
    },
    ListItem: {
      containerStyle: {
        borderRadius: 4,
        borderColor: Colors.Border,
        borderWidth: 1,
        backgroundColor: 'transparent',
        marginVertical: 8,
      },
    },
    Card: {
      containerStyle: {
        borderRadius: 4,
      },
    },
    CardTitle: {
      style: {
        fontSize: 34,
        fontWeight: 'bold',
        fontFamily: 'Play-Bold',
      },
    },
    ListItemTitle: {
      style: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Play-Bold',
        textTransform: 'capitalize',
      },
    },
    ListItemSubtitle: {
      style: {
        fontSize: 16,
        fontStyle: 'italic',
        fontFamily: 'EduTASBeginner-SemiBold',
      },
    },
    Tile: {
      overlayContainerStyle: { backgroundColor: 'rgba(0,0,0,0.5)' },
      titleStyle: { fontSize: 34, fontWeight: 'bold' },
    },
  },
  mode: 'light',
});

export default theme;
