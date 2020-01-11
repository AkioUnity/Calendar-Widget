import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Left,
  Body,
  Right,
  List,
  ListItem
} from "native-base";
import styles from "./styles";

const datas = [
  {
    key: "BasicCard",
    text: "Basic Card"
  },
  {
    key: "NHCardHeaderAndFooter",
    text: "Card Header & Footer"
  },
  {
    key: "NHCardItemBordered",
    text: "Bordered CardItem"
  },
  {
    key: "NHCardTransparent",
    text: "Transparent Card"
  },
  {
    key: "NHCardItemButton",
    text: "Button CardItem"
  },
  {
    key: "NHCardList",
    text: "Card List"
  },
  {
    key: "NHCardImage",
    text: "Card Image"
  },
  {
    key: "NHCardShowcase",
    text: "Card Showcase"
  },
  {
    key: "NHCardCustomBorderRadius",
    text: "Card Custom BorderRadius"
  }
];

class NHCard extends Component {
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
            <Title>Card</Title>
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

export default NHCard;
