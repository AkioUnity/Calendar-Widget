import { Dimensions, StyleSheet } from "react-native";

const h = Dimensions.get("window").height;
const w = Dimensions.get("window").width;
const styles: any = StyleSheet.create({
  calendar:{
    // opacity:0.5,
    width:w,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 35,
    height: h*0.965,
  },
  bottomBtn:{
    marginBottom:10,
    width:w*0.35*0.7,
    height:w*0.35*0.42,
    resizeMode:'contain',
    flex: 1,
    alignSelf:'center'
  }
});
export default styles;
