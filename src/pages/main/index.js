import React, {Component} from 'react';
import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import global from '../../global/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Container,
    Content,
    Text,
} from 'native-base';

import styles from './styles';

class Main extends Component {
    static navigationOptions = {
        header: null,
    };
    static propTypes = {
        name: PropTypes.string,
    };

    render() {
        return (
          <Container style={global.container}>
              <Content>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Calendar')} >
                      <ImageBackground source={require('../../images/album/01_January-4.png')} style={global.backgroundImage} imageStyle={global.backgroundImage}>
                          <Text style={styles.title}>
                              January
                          </Text>
                          <View style={global.bottomView}>
                              <Text style={styles.title}>
                                  Wednesday, Dec 4th
                              </Text>
                          </View>
                      </ImageBackground>
                  </TouchableOpacity>
              </Content>
          </Container>
        );
    }
}

function bindAction(dispatch) {
    return {};
}

const mapStateToProps = state => ({
    name: state.user.name,
});

export default connect(mapStateToProps, bindAction)(Main);
