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
  ListItem,
  List
} from "native-base";

import styles from "./styles";

const datas = [
  {
    key: "Header1",
    text: "Only Title"
  },
  {
    key: "Header2",
    text: "Icon Buttons"
  },
  {
    key: "Header3",
    text: "Text Buttons"
  },
  {
    key: "Header4",
    text: "Icon Button and Text Button"
  },
  {
    key: "Header5",
    text: "Icon and Text Button"
  },
  {
    key: "Header6",
    text: "Multiple Icon Buttons"
  },
  {
    key: "Header7",
    text: "Title and Subtitle"
  },
  {
    key: "Header8",
    text: "Custom Background Color"
  },
  {
    key: "HeaderSpan",
    text: "Header Span"
  },
  {
    key: "HeaderNoShadow",
    text: "Header without shadow"
  },
  {
    key: "HeaderNoLeft",
    text: "Header noLeft"
  },
  {
    key: "HeaderTransparent",
    text: "Header Transparent"
  }
];

class HeaderNB extends Component {
  // eslint-disable-line

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
            <Title>Headers</Title>
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

export default HeaderNB;
