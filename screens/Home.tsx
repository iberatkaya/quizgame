import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
//@ts-ignore
import { AdMobBanner } from 'react-native-admob'
import { adunitid/* , demobanner */ } from './appid';

interface State {
   loadedAd: boolean
};

interface Props {
   navigation: NavigationStackProp
}

interface Nav {
   navigation: { openDrawer: Function }
}

export class Home extends Component<Props, State>{

   constructor(props: any) {
      super(props);
      this.state = {
         loadedAd: false
      };
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

   mainViewBottomPadding = () => {
      if (this.state.loadedAd)
         return 60;
      else
         return 0;
   }

   render() {
      return (
         <SafeAreaView style={{ flex: 1, backgroundColor: '#ff1232', paddingBottom: this.mainViewBottomPadding() }}>
            <StatusBar backgroundColor="#5df25d" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
               <View style={styles.mainview}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("Game", { type: 'Random' })} style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ff6365' }}>
                     <Text style={styles.text}>Random</Text>
                  </TouchableOpacity>
                  <View style={styles.row}>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate("Game", { type: 'Economics' })} style={{ flex: 1, justifyContent: 'center', backgroundColor: '#34ef23' }}>
                        <Text style={styles.text}>Economics</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate("Game", { type: 'Government' })} style={{ flex: 1, justifyContent: 'center', backgroundColor: '#65b6ff' }}>
                        <Text style={styles.text}>Government</Text>
                     </TouchableOpacity>
                  </View>
                  <View style={styles.row}>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate("Game", { type: 'USA History' })} style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ff9f45' }}>
                        <Text style={styles.text}>USA History</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate("Game", { type: 'Europe History' })} style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f053fa' }}>
                        <Text style={styles.text}>Europe History</Text>
                     </TouchableOpacity>
                  </View>
                  <View style={styles.row}>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate("Game", { type: 'World History' })} style={{ flex: 1, justifyContent: 'center', backgroundColor: '#7392af' }}>
                        <Text style={styles.text}>World History</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate("Game", { type: 'Marketing' })} style={{ flex: 1, justifyContent: 'center', backgroundColor: '#b22aff' }}>
                        <Text style={styles.text}>Marketing</Text>
                     </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("Game", { type: 'Psychology' })} style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ff3456' }}>
                     <Text style={styles.text}>Psychology</Text>
                  </TouchableOpacity>
               </View>
            </ScrollView>
            <AdMobBanner
               style={{ position: 'absolute', bottom: 0 }}
               adSize="smartBannerPortrait"
               adUnitID={adunitid}
               onAdLoaded={() => { this.setState({ loadedAd: true }); }}
               onAdFailedToLoad={(error: string) => console.error(error)}
            />
         </SafeAreaView>
      )
   }
}

export default Home;

const styles = StyleSheet.create({
   text: {
      fontSize: 22,
      fontFamily: 'sans-serif-light',
      color: 'white',
      textAlign: 'center',
   },
   row: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between'
   },
   mainview: {
      backgroundColor: 'white',
      flex: 1
   }
})