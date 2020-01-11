import { Dimensions, StyleSheet } from "react-native";

const h = Dimensions.get("window").height;
const w = Dimensions.get("window").width;
const styles: any = StyleSheet.create({
  container: {
    backgroundColor: '#473F3F',
  },
  imageThumbnail:{
    marginTop:h*0.02,
    width:w*0.3,
    height:h*0.19,
    resizeMode:'contain',
  },
  itemText:{
    textAlign: "center",
    color: "#FFF",
    fontSize:11,
    justifyContent: 'center',
  },
  bigImage:{
    marginTop:20,
    width:w*0.85,
    height:h*0.85,
    resizeMode:'contain',
  },
  bigText:{
    padding:10,
    textAlign: "center",
    color: "#FFF",
    fontSize:22,
    justifyContent: 'center',
  },
  bottomBtn:{
    marginTop:-10,
    width:w*0.55,
    height:w*0.25,
    resizeMode:'contain',
    alignSelf:'center',
  }
});
export default styles;
