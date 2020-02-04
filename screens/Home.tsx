import React, { Component } from 'react'
import { Text, View, ScrollView, Platform, StyleSheet, StatusBar, TouchableOpacity, ToastAndroid } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from "@react-native-community/netinfo";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import SplashScreen from 'react-native-splash-screen';
const { AdMobBanner, AdMobRewarded } = require('react-native-admob');
const { SliderBox } = require('react-native-image-slider-box');
import { adunitid, videoadid, demobanner, demovideo } from './appid';
import { setHighScore, setLives } from './Actions';
import { User } from './Reducer';

export const DEFAULT_LIVES = 7;

interface State {
   loadedAd: boolean,
   screen: string
};

interface Props {
   navigation: NavigationStackProp,
   user: User,
   setHighScore: (num: number) => void,
   setLives: (num: number) => void
}

interface Nav {
   navigation: { openDrawer: Function }
}

export class Home extends Component<Props, State>{

   constructor(props: any) {
      super(props);
      this.state = {
         loadedAd: false,
         screen: 'Home'
      };
   }


   async componentDidMount() {
      try {
         await this.loadHighScore();
         await this.loadLives();
         await AdMobRewarded.setAdUnitID(demovideo);
         await AdMobRewarded.addEventListener('rewarded', async () => {
            let reward = 3;
            let { lives } = this.props.user;
            lives += reward;
            this.props.setLives(lives);
            await AsyncStorage.setItem("lives", lives.toString());
         });
         SplashScreen.hide();
      } catch (e) {
         SplashScreen.hide();
         console.log(e);
      }
   }

   async componentWillUnmount() {
      await AdMobRewarded.removeAllListeners();
   }


   static navigationOptions = ({ navigation }: Nav) => ({
      title: 'Home',
      headerLeft: () => (
         <TouchableOpacity
            onPress={() => {
               navigation.openDrawer();
            }}
         >
            <MIcon
               style={{ paddingLeft: 12 }}
               size={32}
               color="white"
               name="menu"
            />
         </TouchableOpacity>
      )
   });

   loadHighScore = async () => {
      const highScoreStr = await AsyncStorage.getItem("highScore");
      const highScore = highScoreStr === null ? 0 : parseInt(highScoreStr);
      this.props.setHighScore(highScore);
   }

   loadLives = async () => {
      const livesstr = await AsyncStorage.getItem("lives");
      const playDateStr = await AsyncStorage.getItem("playDate");
      const playDate = playDateStr === null ? 0 : parseInt(playDateStr);
      let lives = livesstr === null ? DEFAULT_LIVES : parseInt(livesstr);
      if (playDate !== new Date().getDate() && lives < DEFAULT_LIVES)
         lives = DEFAULT_LIVES;
      this.props.setLives(lives);
   }

   mainViewBottomPadding = () => {
      if (this.state.loadedAd)
         return 60;
      else
         return 0;
   }

   quizNavigate = async (index: number) => {
      const { navigation, user } = this.props;
      if(user.lives < 1){
         ToastAndroid.show("Watch a video for more lives", ToastAndroid.LONG)
         return;
      }
      if (index === 0)
         navigation.navigate("Game", { type: "Random" })
      else if (index === 1)
         navigation.navigate("Game", { type: "Economics" })
      else if (index === 2)
         navigation.navigate("Game", { type: "Government" })
      else if (index === 3)
         navigation.navigate("Game", { type: "USA History" })
      else if (index === 4)
         navigation.navigate("Game", { type: "Europe History" })
      else if (index === 5)
         navigation.navigate("Game", { type: "World History" })
      else if (index === 6)
         navigation.navigate("Game", { type: "Marketing" })
      else if (index === 7)
         navigation.navigate("Game", { type: "Psychology" })
   }

   render() {
      return (
         <SafeAreaView style={{ flex: 1, paddingTop: 0, backgroundColor: '#fff', paddingBottom: this.mainViewBottomPadding() }}>
            <StatusBar backgroundColor="#5df25d" />
            <ScrollView>
               <View style={styles.score}>
                  <Text style={styles.scoreText}>High Score: {this.props.user.highScore}</Text>
               </View>
               <View style={{ height: 1, backgroundColor: '#ddd' }} />
               <View style={styles.lives}>
                  <Text style={styles.scoreText}>Remaining Lives: {this.props.user.lives}</Text>
               </View>
               <SliderBox
                  ImageComponent={FastImage}
                  images={[require('../assets/0.png'), require('../assets/1.png'), require('../assets/2.png'), require('../assets/3.png'), require('../assets/4.png'), require('../assets/5.png'), require('../assets/6.png'), require('../assets/7.png')]}
                  onCurrentImagePressed={(index: number) => this.quizNavigate(index)}
                  dotColor="#111"
                  inactiveDotColor="#ccc"
                  circleLoop
               />
               <TouchableOpacity
                  style={styles.ad}
                  onPress={async () => {
                     try {
                        await AdMobRewarded.requestAd();
                        await AdMobRewarded.showAd();
                     } catch (e) {
                        console.log(e);
                        const info = await NetInfo.fetch();
                        if(!info.isConnected){
                           ToastAndroid.show("No internet connection!", ToastAndroid.LONG);
                        }
                        else if(this.props.user.lives !== 0)
                           ToastAndroid.show("Could not find an ad!", ToastAndroid.LONG);
                        else if(this.props.user.lives === 0){
                           ToastAndroid.show("Could not find an ad! Here is a life.", ToastAndroid.LONG);
                           this.props.setLives(1);
                           await AsyncStorage.setItem("lives", '1');   
                        }
                     }
                  }}
               >
                  <MIcon name="video" size={64} color="#288" />
                  <Text style={styles.adText}>Watch an ad for more lives! </Text>
               </TouchableOpacity>
            </ScrollView>
            <AdMobBanner
               style={{ position: 'absolute', bottom: 0 }}
               adSize="smartBannerPortrait"
               adUnitID={demobanner}
               onAdLoaded={() => { this.setState({ loadedAd: true }); }}
               onAdFailedToLoad={(error: string) => console.error(error)}
            />
         </SafeAreaView>
      )
   }
}

interface StateRedux {
   user: User
}

const mapStateToProps = (state: StateRedux) => {
   const { user } = state;
   return { user };
};

const mapDispatchToProps = (dispatch: any) => (
   bindActionCreators({
      setHighScore,
      setLives
   }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
   score: {
      paddingVertical: 8,
      backgroundColor: '#e9e9e9'
   },
   lives: {
      paddingVertical: 8,
      backgroundColor: '#ffdddd'
   },
   scoreText: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: Platform.OS === "android" ? 'sans-serif-light' : "Helvetica" 
   },
   row: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between'
   },
   ad: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 32
   },
   adText: {
      fontSize: 14,
      color: '#999'
   }
})