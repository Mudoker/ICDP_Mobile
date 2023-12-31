import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  backGround: {
    position: 'relative',
    width: '100%',
    height: '100%',
    // backgroundColor: 'black',
    // backgroundColor: 'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapLogo: {
    flex: 1,
    right: 0,
    left: 0,
    bottom: 250,
  },
  logo: {
    width: 100,
    height: 150,
    alignSelf: 'center',
  },
  title: {
    position: 'absolute',
    width: 159,
    height: 30,
    left: '50%',
    top: 50,
    transform: [{ translateX: -79 }],
    // fontFamily: 'Neue Haas Grotesk Text Pro',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: -0.015,
    color: '#D9D9D9',
    opacity: 0.9,
  },

  infoContainer: {
    position: 'absolute',
    width: 346,
    height: '100%',
    top: '50%',
    // marginLeft: -173,
    marginTop: -170,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'flex-end',
  },
  passwordContainer: {
    flexDirection: 'column',
  },
  notifyContainer: {
    fontSize: 21,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    left: '-1%',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0)',
    color: '#163892',
    fontWeight: '700',
    // fontFamily: 'Neue Haas Grotesk Text Pro',
  },
  footNote: {
    // fontFamily: 'Neue Haas Grotesk Text Pro',
    fontWeight: '700',
    fontSize: 10,
    top: -23,
    letterSpacing: 0.035,
    alignSelf: 'center'
  },
  stroke: {
    width: 100,
    height: 1,
    backgroundColor: '#988D8D',
  },
  helpTextContainer: {
    flex: 2,
    left: 0,
    right: 0,
    alignItems: 'center',
    marginTop: 10, // Add margin top to the helpTextContainer
  },
  helpText: {
    // fontFamily: 'Neue Haas Grotesk Text Pro',
    color: '#988D8D',
    marginHorizontal: 10,
    marginBottom: 10, // Add margin bottom to the helpText
  },
  footNoteLink: {
    color: '#36D66C',
  },
  icon: {
    position: 'absolute',
    top: 110,
    left: '16%'
  },
  input: {
    width: 270,
    height: 40,
    backgroundColor: 'rgb(253, 249, 255)',
    color: 'black',
    alignSelf: 'center',
    paddingLeft: '13%',
    marginBottom: 10,
    // paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderBottomColor: '#A59B9B',
  },
  otpContainer: {
    flex: 1,
    alignSelf: 'center',
    zIndex: 999
  },
  funcText: {
    fontWeight: '700',
    letterSpacing: 0.04,
    color: '#988D8D',
    // fontFamily: 'Neue Haas Grotesk Text Pro',
    fontSize: 11,
    marginTop: 10,
  },
  buttonContainer: {
    // flex: 0.7, -> Format error on Android
    flex: 0.4,
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    top: -380,
    zIndex: 111
  },
  button: {
    zIndex: 100,
    backgroundColor: 'rgba(7, 121, 255, 0.8)',
    width: 205,
    height: 31,
    // top: -290,
    left: '50%',
    marginLeft: -102.5,
    marginBottom: 10, // Adjust the value as needed
    justifyContent: 'center',
    borderRadius: 2.5,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(189, 195, 199, 0.8)',
    width: 150,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: 10,
  },
  authorContainer: {
    position: 'absolute',
    paddingBottom: 10,
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
  }
});
