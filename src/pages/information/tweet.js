import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet, ScrollView, View, Dimensions, TouchableOpacity, Linking} from 'react-native';
import PropTypes from 'prop-types';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

// adapted from: https://stackoverflow.com/a/49310105/4488853
class Tweet extends Component {
    static propTypes = {
        tweetUrl: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            embedHtml: null,
            status: 'status_id',
        };
    }

    componentDidMount() {
        this.setupEmbed();
    }

    setupEmbed() {
        // pass in the Twitter Web URL
        let tweetUrl =
          'https://publish.twitter.com/oembed?limit=1&url=' + encodeURIComponent(this.props.tweetUrl);
        fetch(tweetUrl, {method: 'GET', headers: {Accepts: 'application/json'}}).then(
          resp => {
              resp.json().then(json => {
                  console.log(json);
                  let html = json.html;
                  this.setState({
                      embedHtml: html,
                  });
              });
          },
        );
    }

    handleClick = () => {
        let url = this.props.tweetUrl;
        // url='https://twitter.com/kayyybearxo/status/1210047819832320002';
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });
    };

    renderEmbed() {
        if (this.state.embedHtml) {
            console.log("----------------");
            console.log(this.state.embedHtml);
            let html = `<!DOCTYPE html>\
      <html>\
        <head>\
          <meta charset="utf-8">\
          <meta name="viewport" content="width=device-width, initial-scale=1.0">\
          </head>\
          <body>\
            ${this.state.embedHtml}\
          </body>\
      </html>`;
            return (

                  <View style={styles.webviewWrap}>
                      <WebView  source={{html: html}} style={styles.webview}/>
                  </View>
              // <TouchableOpacity onPress={() => this.handleClick()}>
              // </TouchableOpacity>
            );
        }
    }

    render() {
        return (
          <ScrollView>
              {this.renderEmbed()}
          </ScrollView>
        );
    }
}

export default Tweet;

const styles = StyleSheet.create({
    webviewWrap: {
        width: w * 0.92,
        height: h * 0.28,
        borderRadius: 20,
        marginTop: 10,
        padding: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fff',
    },
    webview: {
        width: w * 0.92,
        height: h * 0.28,
        alignSelf: 'center',
        justifyContent: 'center',
    },
});
