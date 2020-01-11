import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  List,
  ListItem
} from "native-base";
import styles from "./styles";

const datas = [
  {
    key: "Default",
    text: "Default Button"
  },
  {
    key: "Outline",
    text: "Outline Button"
  },
  {
    key: "Rounded",
    text: "Rounded Button"
  },
  {
    key: "Block",
    text: "Block Button"
  },
  {
    key: "Full",
    text: "Full Button"
  },
  {
    key: "Custom",
    text: "Custom Size Button"
  },
  {
    key: "Transparent",
    text: "Transparent Button"
  },
  {
    key: "IconBtn",
    text: "Icon Button"
  },
  {
    key: "Disabled",
    text: "Disabled Button"
  }
];

class NHButton extends Component {
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
            <Title>Buttons</Title>
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

export default NHButton;
