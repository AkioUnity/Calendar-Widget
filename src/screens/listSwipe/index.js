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
  Right,
  Body,
  List,
  ListItem
} from "native-base";
import styles from "./styles";

const datas = [
  {
    key: "BasicListSwipe",
    text: "Single SwipeRow"
  },
  {
    key: "SwipeRowCustomStyle",
    text: "Swipe Row Custom Style"
  },
  {
    key: "MultiListSwipe",
    text: "Multiple List Swipe"
  }
];

class ListSwipe extends Component {
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
            <Title>List Swipe</Title>
          </Body>
          <Right />
        </Header>

        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
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
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default ListSwipe;
