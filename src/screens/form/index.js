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
    key: "FixedLabel",
    text: "Fixed Label"
  },
  {
    key: "InlineLabel",
    text: "Inline Label"
  },
  {
    key: "FloatingLabel",
    text: "Floating Label"
  },
  {
    key: "PlaceholderLabel",
    text: "Placeholder Label"
  },
  {
    key: "StackedLabel",
    text: "Stacked Label"
  },
  {
    key: "RegularInput",
    text: "Regular Textbox"
  },
  {
    key: "UnderlineInput",
    text: "Underlined Textbox"
  },
  {
    key: "RoundedInput",
    text: "Rounded Textbox"
  },
  {
    key: "IconInput",
    text: "Icon Textbox"
  },
  {
    key: "PickerInput",
    text: "Textbox with Picker"
  },
  {
    key: "SuccessInput",
    text: "Success Input Textbox"
  },
  {
    key: "ErrorInput",
    text: "Error Input Textbox"
  },
  {
    key: "DisabledInput",
    text: "Disabled Textbox"
  },
  {
    key: "TextArea",
    text: "TextArea"
  }
];

class NHForm extends Component {
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
            <Title>Form & Inputs</Title>
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

export default NHForm;
