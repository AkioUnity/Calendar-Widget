import React, { Component } from 'react';
import { Image ,FlatList } from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Content,
  Text,
  ListItem,
  Icon,
  Container,
  Left,
  Button,
} from 'native-base';
import styles from './style';
import {NavigationActions,StackActions} from 'react-navigation';

// const drawerImage = require('../../../assets/logo-kitchen-sink.png');
const datas = [
  {
    name: 'Home',
    key: 'Home',
    route: 'Home',
    icon: 'home',
    url:'no',
  },
  {
    name: 'Submit a Report',
    key: 'ReportRoute',
    route: 'ReportRoute',
    icon: 'report',
    url:'no',
  },
];

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 2,
    };
  }

  handleLogout(){
    console.log('logout');
    // logout(() => this.props.navigation.dispatch(resetAction));
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: '#333333' }}
        >
          {/*<Image source={drawerCover} style={styles.drawerCover} />*/}
          {/*<Image square style={styles.drawerCover} source={drawerImage} />*/}

          <FlatList
            data={datas}
            renderItem={({item}) =>
              <ListItem
                button
                // noBorder
                onPress={() => this.props.navigation.navigate(item.route,{url:item.url,name:item.name})}
              >
                <Left>
                  {/*<Icon*/}
                    {/*active*/}
                    {/*name={item.icon}*/}
                    {/*style={{ color: "#5bbdfe", fontSize: 22, width: 26 }}*/}
                  {/*/>*/}
                  <Text style={styles.text}>
                    {item.name}
                  </Text>
                </Left>
              </ListItem>}
          />
          <Button rounded bordered light block style={styles.logOut}
            onPress={() => this.handleLogout()}>
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


function matchDispatchToProps(dispatch) {
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, matchDispatchToProps)(SideBar);
