import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Align cards to the left
    marginTop: 10,
    alignContent: 'center',
    width: '100%'
  },
  card: {
    top: 0,
    width: (Dimensions.get('window').width - 45) / 2, // Divide width equally for 3 items per line
    height: 280,
    marginBottom: 16,
    marginHorizontal: 10,
    alignItems: 'flex-start', // Căng lề trai chữ trong card
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#808890',
    shadowOffset: {
      width: 0,
      height: 4.57704496383667,
    },
    shadowOpacity: 0.25,
    // shadowRadius: 4.57704496383667,
    // elevation: 5,
  },
  cardTitle: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cardCategory: {
    paddingLeft: 5,
    paddingBottom: 5,
    textAlign: 'left',
  },
  buttonLibrary: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: 248,
    height: 120,
    left: '50%',
    top: '50%',
    marginTop: -60,
    marginLeft: -124,
    background: '#F9F8F8',
    borderWidth: 2,
    borderColor: '#2CCDCD',
    borderRadius: 7,
    borderStyle: 'dashed',
  },
  buttonText: {
    position: 'absolute',
    width: 143,
    height: 35,
    left: '50%',
    marginLeft: -71.5,
    top: '85%',
    marginTop: -17.5,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center', // Center the text horizontally
    letterSpacing: 0.05,
    color: '#000000',
  },
  buttonImage: {
    position: 'absolute',
    width: 52,
    height: 52,
    left: '50%',
    marginLeft: -26,
    top: '45%',
    marginTop: -26,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    marginTop: 5,
    marginLeft: 8,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 21,
    lineHeight: 28,
    letterSpacing: 0.095,
    color: 'rgba(238, 14, 81, 0.80)',
  },
  icon: {},
  header: {
    left: '50%',
    width: 78,
    height: 31,
    marginLeft: -39,
  },
  backIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 31,
    height: 31,
  },
  navBar: {
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
