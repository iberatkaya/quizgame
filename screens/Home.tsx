import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, StatusBar, TouchableOpacity, ToastAndroid } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
const { AdMobBanner, AdMobRewarded } = require('react-native-admob');
const { SliderBox } = require('react-native-image-slider-box');
import { adunitid, demobanner, demovideo } from './appid';
import { setHighScore, setLives } from './Actions';
import { User } from './Reducer';

interface State {
   loadedAd: boolean,
   visible: boolean
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
         visible: false
      };
   }


   async componentDidMount() {
      try {
         this.highScore();
         AdMobRewarded.setAdUnitID(demovideo);
         AdMobRewarded.addEventListener('rewarded', async () => {
            let reward = 2;
            let { lives } = this.props.user;
            lives += reward;
            this.props.setLives(lives);
            await AsyncStorage.setItem("lives", lives.toString());
         });
         AdMobRewarded.addEventListener('adClosed', () => {
            console.log('AdMobRewarded => adClosed');
         });
      } catch (e) {
         console.log(e);
      }
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

   highScore = async () => {
      const highScoreStr = await AsyncStorage.getItem("highScore");
      const highScore = highScoreStr === null ? 0 : parseInt(highScoreStr);
      if (highScore > this.props.user.highScore && this.props.user.highScore !== 0)
         this.setState({ visible: true }, () => {
            this.props.setHighScore(highScore);
         })
      else if (highScore > this.props.user.highScore)
         this.props.setHighScore(highScore);
   }

   loadLives = async () => {
      const livesstr = await AsyncStorage.getItem("lives");
      const playDateStr = await AsyncStorage.getItem("playDate");
      console.log(playDateStr);
      const playDate = playDateStr === null ? 0 : parseInt(playDateStr);
      let lives = livesstr === null ? 3 : parseInt(livesstr);
      if (playDate !== new Date().getDate() && lives < 3)
         lives = 3;
      this.props.setLives(lives);
   }

   mainViewBottomPadding = () => {
      if (this.state.loadedAd)
         return 60;
      else
         return 0;
   }

   quizNavigate = async (index: number) => {
      const { navigation } = this.props;
      let { lives } = this.props.user;
      if (lives === 0)
         ToastAndroid.show("Please watch an ad for more lives!", ToastAndroid.LONG);
      this.props.setLives(lives - 1);
      await AsyncStorage.setItem("lives", (lives - 1).toString());
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
      else if (index === 5)
         navigation.navigate("Game", { type: "Psychology" })
   }

   render() {
      return (
         <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingBottom: this.mainViewBottomPadding() }}>
            <StatusBar backgroundColor="#5df25d" />
            <ScrollView>
               <View style={styles.score}>
                  <Text style={styles.scoreText}>High Score: {this.props.user.highScore}</Text>
                  <View style={{ height: 1, backgroundColor: '#ddd', marginVertical: 6 }} />
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
                        await AdMobRewarded.requestAd()
                        await AdMobRewarded.showAd()
                     } catch (e) {
                        console.log(e);
                     }
                  }}
               >
                  <MIcon name="video" size={64} color="#288" />
                  <Text style={styles.adText}>Watch an ad for more lives! </Text>
               </TouchableOpacity>
            </ScrollView>
            <Dialog
               visible={this.state.visible}
               dialogAnimation={new SlideAnimation({
                  slideFrom: 'bottom',
               })}
               onTouchOutside={() => { this.setState({ visible: false }); }}
               onHardwareBackPress={() => { this.setState({ visible: false }); return true }}
               dialogTitle={<DialogTitle title="High Score!" />}
               footer={
                  <DialogFooter>
                     <DialogButton
                        text="OK"
                        onPress={() => this.setState({ visible: false })}
                     />
                  </DialogFooter>
               }
            >
               <DialogContent style={{ paddingVertical: 8 }}>
                  <Text style={{ fontSize: 16, fontFamily: 'sans-serif-light' }}>You've reached a new high score!{'\n'}Well done!</Text>
               </DialogContent>
            </Dialog>
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
   scoreText: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'sans-serif-light'
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