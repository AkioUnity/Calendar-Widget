import React, {Component} from 'react';
import {TouchableOpacity, ImageBackground, Image, FlatList,Linking} from 'react-native';
import global from '../../global/styles';
import { WebView } from 'react-native-webview';
import {
    Container,
    Content,
    Text,
    View,
} from 'native-base';
import styles from './styles';
import Tweet from './tweet';

const DATA = [
    {
        id: 'Facebook',
        image: require('../../images/information/Icon_Facebook.png'),
        url: 'fb://page/kaybearcosplay',
    },
    {
        id: 'Instagram',
        image: require('../../images/information/Icon_Instagram.png'),
        url: 'https://www.instagram.com/kayyybear/',
    },
    {
        id: 'Twitter',
        image: require('../../images/information/Icon_Twitter.png'),
        url: 'https://www.twitter.com/kayyybearxo',
    },
    {
        id: 'Patren',
        image: require('../../images/information/Icon_Patreon.png'),
        url: 'https://www.patreon.com/kayyybear',
    },
    {
        id: 'Gumroad',
        image: require('../../images/information/Icon_Gumroad.png'),
        url: 'https://www.gumroad.com/kayyybear',
    },
    {
        id: 'Shopify',
        image: require('../../images/information/Icon_Shopify.png'),
        url: 'https://www.kaybear.shop',
    },
    {
        id: 'OnlyFans',
        image: require('../../images/information/Icon_OnlyFans.png'),
        url: 'https://www.onlyfans.com/kayyybear',
    },
    {
        id: 'Youtube',
        image: require('../../images/information/Icon_Youtube.png'),
        url: 'https://www.youtube.com/kaybear',
    },
    {
        id: 'Twitch',
        image: require('../../images/information/Icon_Twitch.png'),
        url: 'https://www.twitch.tv/kayyybear',
    },
];

class Information extends Component {
    handleClick = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " +url);
            }
        });
    };
    render() {
        return (
          <Container style={styles.container}>
              <Content contentContainerStyle={{flex:1}}>
                  <ImageBackground source={require('../../images/information/information.png')}
                                   imageStyle={global.informationImage}
                                   style={global.informationImage}>
                      <View style={global.informationBottom} >
                          <FlatList
                            data={DATA}
                            renderItem={({item}) => (
                              <TouchableOpacity onPress={() => this.handleClick(item.url)}>
                              <View style={{flex: 1, flexDirection: 'column'}}>
                                  <Image style={styles.imageThumbnail} source={item.image}/>
                                  <Text style={styles.itemText}>
                                      {item.id}
                                  </Text>
                              </View>
                              </TouchableOpacity>
                            )}
                            //Setting the number of column
                            numColumns={3}
                            keyExtractor={(item, index) => index.toString()}
                          />
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('Album')}>
                              <Image source={require('../../images/information/albumtest.png')} style={styles.bottomBtn}>
                              </Image>
                          </TouchableOpacity>
                      </View>
                  </ImageBackground>
              <Tweet
                tweetUrl={'https://twitter.com/kayyybearxo'}
              />
              </Content>
          </Container>
        );
    }
}

export default Information;
