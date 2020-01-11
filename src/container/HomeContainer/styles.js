import {Dimensions} from "react-native";

const h = Dimensions.get("window").height;
const w = Dimensions.get("window").width;
export default {
    mb10: {
        marginBottom: h * 0.010
    },
    logoImage: {
        width: h * 0.1,
        height: h * 0.130,
        marginTop: h * 0.030,
        marginLeft: 20
    },
    logoRight: {flex: 1, marginTop: h * 0.030},
    topRec: {
        backgroundColor: '#F58322', borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between',
        width: '100%',
        marginTop: h * 0.01
    },
    whiteRec: {
        backgroundColor: '#fff', borderRadius: 15,
        flexDirection: 'row', justifyContent: 'space-between',
        // marginBottom:h*0.020,
        width: '100%',
    },
    goLeft: {fontSize: 17, color: '#fff', fontWeight: '400', margin: h * 0.020},
    goBtn: {
        width: h * 0.110,
        height: h * 0.050,
        margin: h * 0.010,
    },
    goArrow: {
        width: 55,
        bottom: -50,
        right: 25,
        alignSelf: 'flex-end',
        // height:120,
    },
    reportText: {
        fontSize: w * 0.05, color: '#000000', fontWeight: '600', top: h * 0.010,
        alignSelf: 'center'
    },
    titleText:{
        fontSize:w*0.07,
    },
    rightText:{
        textAlign: 'right',
    }
};
