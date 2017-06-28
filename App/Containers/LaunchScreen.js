import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import BackgroundJob from 'react-native-background-job';
import Firestack from 'react-native-firestack'
const firestack = new Firestack();
var SmsAndroid = require('react-native-sms-android');
// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends React.Component {
  componentDidMount() {
    
    console.log("LaunchScreen");
    firestack.database.ref('msg').once('value')
      .then((snapshot) => {
        const val = snapshot.val();
        console.log("firebase Data:", val);
      }).catch((err) => {
        console.log('An error occurred', err);
      })
    const backgroundJob = {
      jobKey: "myJob",
      job: () => {
        console.log("Running in background")
        firestack.database.ref('msg').once('value')
          .then((snapshot) => {
            const val = snapshot.val();
            console.log("firebase Data:", val);
          })
        firestack.database.ref('msg').on('value', (snapshot) => {
          const val = snapshot.val();
          SmsAndroid.sms(
            '04167787357', // phone number to send sms to
            val, // sms body
            'sendDirect', // sendDirect or sendIndirect
            (err, message) => {
              if (err) {
                console.log("error");
              } else {
                console.log(message); // callback message
              }
            }
          );
          console.log("firebase Data update:", val);
        });
      }
    };

    BackgroundJob.register(backgroundJob);
    var backgroundSchedule = {
      jobKey: "myJob",
      timeout: 5000,
      // period: 5000,
      // alwaysRunning: true,
      notificationTitle: "test",
      networkType: BackgroundJob.NETWORK_TYPE_METERED
    }
    BackgroundJob.cancelAll();
    //BackgroundJob.schedule(backgroundSchedule);
    BackgroundJob.getAll({ callback: console.log });
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              This probably isn't what your app is going to look like. Unless your designer handed you this screen and, in that case, congrats! You're ready to ship. For everyone else, this is where you'll see a live preview of your fully functioning app using Ignite.
            </Text>
          </View>

        </ScrollView>
      </View>
    )
  }
}
