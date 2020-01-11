import React, {Component} from "react";
import {WebView} from "react-native-webview";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";
import styles from "./styles";

const datas = [
  {
    name: "Home",
    key: "Home",
    icon: "home"
  },
  {
    name: "Course Library",
    key: "course",
    icon: "arrow-up"
  },
  {
    name: "Performance Tracker",
    key: "tracker",
    icon: "arrow-down"
  },
  {
    name: "Quick Reference Guide",
    key: "reference",
    icon: "repeat"
  },
  {
    name: "Support",
    key: "support",
    icon: "easel"
  },
  {
    name: "User Guide",
    key: "guide",
    icon: "notifications"
  },
  {
    name: "safety Website",
    key: "website",
    icon: "radio-button-off"
  }
];

class WebPage extends Component {
  render() {
    const {navigation} = this.props;
    const url = navigation.getParam('url', 'no');
      return (
          <Container style={styles.container}>
            <Header>
              <Left>
                <Button
                    transparent
                    onPress={() => this.props.navigation.navigate("DrawerOpen")}
                >
                  <Icon name="menu"/>
                </Button>
              </Left>
              <Body>
              <Title>Safety In Numbers</Title>
              </Body>
              <Right/>
            </Header>
            <WebView
                source={{uri: url}}
                // style={{marginTop: 20}}
            />
          </Container>
      );
  };
}

export default WebPage;
