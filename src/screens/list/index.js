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
    key: "NHBasicList",
    text: "Basic List"
  },
  {
    key: "NHListItemSelected",
    text: "ListItem Selected"
  },
  {
    key: "NHListDivider",
    text: "List Divider"
  },
  {
    key: "NHListHeader",
    text: "List Header"
  },
  {
    key: "NHListIcon",
    text: "List Icon"
  },
  {
    key: "NHListAvatar",
    text: "List Avatar"
  },
  {
    key: "NHListThumbnail",
    text: "List Thumbnail"
  },
  {
    key: "NHListSeparator",
    text: "List Separator"
  },
  {
    key: "NHListItemNoIndent",
    text: "List NoIndent"
  }
];

class NHList extends Component {
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
            <Title>List</Title>
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
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default NHList;
