import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  List,
  ListItem,
  Text
} from "native-base";

const datas = [
  {
    key: "AccordionDefault",
    text: "Default Accordion"
  },
  {
    key: "AccordionIcon",
    text: "Icon and Expanded Icon"
  },
  {
    key: "AccordionIconStyle",
    text: "Icon and Expanded Icon style"
  },
  {
    key: "AccordionHeaderContentStyle",
    text: "Header and Content style"
  },
  {
    key: "AccordionCustomHeaderContent",
    text: "Custom Header and Content"
  }
];

class NHAccordion extends Component {
  render() {
    return (
      <Container>
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
            <Title>Accordion</Title>
          </Body>
          <Right />
        </Header>

        <Content style={{ backgroundColor: "white" }}>
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

export default NHAccordion;
