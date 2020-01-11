import { Dimensions,StyleSheet } from "react-native";
const h=Dimensions.get('window').height;
const w=Dimensions.get('window').width;

const styles = StyleSheet.create({
  title:{
    padding:10,
    paddingTop:20,
    fontSize:28,
    fontWeight: 'bold',
    color:'#000',
    textAlign: 'center',
    textShadowColor: '#fff',
    textShadowRadius: 10,
    textShadowOffset: { width: 1, height: 1 },
  }
});
export default styles;
