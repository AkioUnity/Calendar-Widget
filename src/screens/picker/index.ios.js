import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Right,
  Body,
  Left,
  List,
  ListItem
} from "native-base";
import styles from "./styles";

const datas = [
  {
    key: "RegularPicker",
    text: "Regular"
  },
  {
    key: "PickerWithIcon",
    text: "Picker with Icon"
  },
  {
    key: "PlaceholderPicker",
    text: "Placeholder"
  },
  {
    key: "PlaceholderPickerNote",
    text: "Placeholder (without note)"
  },
  {
    key: "PickerTextItemText",
    text: "Picker text and item text style"
  },
  {
    key: "BackButtonPicker",
    text: "Custom Back Button"
  },
  {
    key: "CustomHeaderPicker",
    text: "Custom Header"
  },
  {
    key: "HeaderPicker",
    text: "Custom Header Text"
  },
  {
    key: "HeaderStylePicker",
    text: "Custom Header Style"
  }
];

class NHPicker extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Picker</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data.key)}
              >
                <Left>
                  <Text>
                    {data.text}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" style={{ color: "#999" }} />
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default NHPicker;
