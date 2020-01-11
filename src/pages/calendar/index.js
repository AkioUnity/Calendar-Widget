import React, {Component} from 'react';
import {TouchableOpacity, ImageBackground,Image,Platform,Linking} from 'react-native';
import global from '../../global/styles';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import RNCalendarEvents from "react-native-calendar-events";
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import {Container, Content, Text, View} from 'native-base';
import styles from './styles';
import moment from 'moment';

const utcDateToString = (momentInUTC: moment): string => {
    let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return s;
};

class CalendarPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key:1,
            marks:{},
            all_event:''
        };
    }

    componentWillMount() {
        this._fetchAllEvents();
    }
    render() {
        return (
          <Container>
              <Content>
                  <ImageBackground source={require('../../images/January.png')} style={global.backgroundImage}
                                   imageStyle={global.backgroundImage}>
                      <Calendar style={styles.calendar}
                                key={this.state.key}
                                theme={{
                                    calendarBackground: 'rgba(0,0,0,0)',
                                    textSectionTitleColor: '#75ff58',
                                    dayTextColor: 'white',
                                    todayTextColor: '#8aa7ff',
                                    selectedDayTextColor: '#ffe663',
                                    monthTextColor: '#ffa1f1',
                                    textMonthFontWeight:'500',
                                    textMonthFontSize:24,
                                    indicatorColor: '#ffaa9c',
                                    selectedDayBackgroundColor: '#050507',
                                    arrowColor: '#ffc1c3',
                                    textDisabledColor: '#7b7b7b',
                                    'stylesheet.calendar.header': {
                                        week: {
                                            margin:15,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }
                                    }
                                }}
                                markedDates={this.state.marks}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => {
                            console.log('day', day);   //dateString: "2019-12-18"
                            Linking.openURL('content://com.android.calendar/time');
                            // if (Platform.OS === 'ios') {
                            //     Linking.openURL('calshow:');
                            // } else if (Platform.OS === 'android') {
                            // }
                            // if (day.dateString in this.state.marks){
                            //     CalendarPage.editCalendarEventWithId(this.state.marks[day.dateString].id,this);
                            // }
                            // else{
                            //     CalendarPage.addToCalendar('', day.timestamp,day.dateString,this);
                            // }

                            // CalendarPage.showCalendarEventWithId('70');
                        }}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={(day) => {
                            console.log('long press day', day);
                        }}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'MMM yyyy'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={(month) => {
                            console.log('month changed', month);
                        }}
                        // Do not show days of other months in month page. Default = false
                        hideExtraDays={false}
                        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                        // day from another month that is visible in calendar page. Default = false
                        disableMonthChange={false}
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                        firstDay={1}
                        // Hide day names. Default = false
                        hideDayNames={false}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        onPressArrowLeft={substractMonth => substractMonth()}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                        onPressArrowRight={addMonth => addMonth()}
                      />
                      <View style={global.bottomView}>
                          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                              <Image source={require('../../images/Backarrowtest.png')} style={styles.bottomBtn} >
                              </Image>
                          </TouchableOpacity>
                          <View style={{flex:2}}/>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('Information')}>
                              <Image source={require('../../images/infotest.png')} style={styles.bottomBtn} >
                              </Image>
                          </TouchableOpacity>
                      </View>
                  </ImageBackground>
                  <Text>
                      {this.state.all_event}
                  </Text>

              </Content>
          </Container>
        );
    }

    _fetchAllEvents = async () => {
        try {
            await RNCalendarEvents.authorizeEventStore();
            let allEvents = await RNCalendarEvents.fetchAllEvents(
              "2019-12-01T19:26:00.000Z",
              "2019-12-29T19:26:00.000Z"
            );
            console.log(allEvents);
            //id,startDate: "2019-12-17T00:00:00.000Z"
            let marks={};
            for (let i=0;i<allEvents.length;i++){
                let iso=allEvents[i].startDate;
                let dStr=iso.substr(0,10);
                console.log(dStr);
                marks[dStr]={marked: true,id:allEvents[i].id,title:allEvents[i].title};
            }
            this.setState({marks:marks});
            this.setState({all_event:JSON.stringify(allEvents)});
        } catch (error) {
            alert("Failed to get events");
        }
    };
    static addToCalendar = (title: string, startDateUTC: moment,dateString:string,Calendar:CalendarPage) => {

        const eventConfig = {
            title,
            startDate: utcDateToString(startDateUTC),
            endDate: utcDateToString(moment.utc(startDateUTC).add(1, 'hours')),
            notes: '',
            navigationBarIOS: {
                tintColor: 'orange',
                backgroundColor: 'green',
                titleColor: 'blue',
            },
        };

        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
          .then(
            (eventInfo: {
                calendarItemIdentifier: string,
                eventIdentifier: string,
            }) => {
                // alert('a event added'+JSON.stringify(eventInfo));
                console.log(JSON.stringify(eventInfo));
                if ('eventIdentifier' in eventInfo){
                    Calendar._fetchAllEvents();
                    // Calendar.state.marks[dateString]={marked: true,id:eventInfo.eventIdentifier};
                    // Calendar.setState({marks:Calendar.state.marks,key: Math.random()});
                    // console.log(Calendar.state);
                }
            }
          )
          .catch((error: string) => {
              // handle error such as when user rejected permissions
              alert('Error -> ' + error);
          });
    };

    static editCalendarEventWithId = (eventId: string,Calendar:CalendarPage) => {
        const eventConfig = {
            eventId,
        };

        AddCalendarEvent.presentEventEditingDialog(eventConfig)
          .then(eventInfo => {
              Calendar._fetchAllEvents();
              // alert('eventInfo -> ' + JSON.stringify(eventInfo));
          })
          .catch((error: string) => {
              alert('Error -> ' + error);
          });
    };

    static showCalendarEventWithId = (eventId: string) => {
        const eventConfig = {
            eventId,
            allowsEditing: true,
            allowsCalendarPreview: true,
            navigationBarIOS: {
                tintColor: 'orange',
                backgroundColor: 'green',
            },
        };

        AddCalendarEvent.presentEventViewingDialog(eventConfig)
          .then(eventInfo => {
              alert('eventInfo -> ' + JSON.stringify(eventInfo));
          })
          .catch((error: string) => {
              alert('Error -> ' + error);
          });
    };
}

export default CalendarPage;
