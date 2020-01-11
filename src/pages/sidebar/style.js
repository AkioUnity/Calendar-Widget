const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  drawerCover: {
    // alignSelf: "stretch",
    // height: deviceHeight / 8,
    // width: null,
    width: 200,
    height: 70,
    left: Platform.OS === "android" ? deviceWidth / 22 : deviceWidth / 20,
    top: Platform.OS === "android" ? deviceHeight / 24 : deviceHeight / 23,
    position: "relative",
    marginBottom: 40,
    resizeMode: "cover"
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 22 : deviceWidth / 20,
    top: Platform.OS === "android" ? deviceHeight / 24 : deviceHeight / 23,
    width: 210,
    height: 75,
    resizeMode: "cover"
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20,
    color: "#ffffff"
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  logOut: {
    fontSize: Platform.OS === "ios" ? 15 : 13,
    fontWeight: "500",
    textAlign: "center",
    margin: 20,
    marginTop: 70,
    bottom: 0,
    color: "#798f5e",
    borderColor: "#bababa",
    // position: "absolute"
  }
};
