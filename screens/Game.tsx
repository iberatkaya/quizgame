import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import Eco from '../questions/eco'
import Gov from '../questions/gov'
import His_eu from '../questions/his_eu'
import His_us from '../questions/his_us'
import His_world from '../questions/his_world'
import Marketing from '../questions/marketing'
import Psy from '../questions/psy'


interface Props {
   navigation: NavigationStackProp
}

interface Question {
   question: string,
   a: string,
   b: string,
   c: string,
   d: string,
   ans: string
}

interface State {
   clickable: boolean,
   score: number,
   question: Question,
   tileColors: Array<"#e3e3e3" | "#f77" | "#7f7">,
   questions: Array<Question>,
   fontSize: number,
   pastQuestionIndeces: Array<number>,
   currentIndex: number,
   type: string
}

interface Nav {
   navigation: { getParam: Function }
}

export class Game extends Component<Props, State>{

   constructor(props: Props) {
      super(props);
      this.state = {
         clickable: true,
         currentIndex: 0,
         tileColors: ["#e3e3e3", "#e3e3e3", "#e3e3e3", "#e3e3e3"],
         fontSize: 13,
         pastQuestionIndeces: [],
         question: {
            a: '',
            b: '',
            c: '',
            d: '',
            ans: '',
            question: ''
         },
         questions: [],
         score: 0,
         type: this.props.navigation.getParam("type")
      }
   }

   static navigationOptions = ({ navigation }: Nav) => ({
      title: navigation.getParam("type"),
   });

   randomNum = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min) + min);
   }

   componentDidMount() {
      let questions = [];
      if (this.state.type === 'Random') {
         for (let i in Eco) {
            //@ts-ignore
            questions.push({ ...Eco[i] } as Question)
         }
         for (let i in Gov) {
            //@ts-ignore
            questions.push({ ...Gov[i] } as Question)
         }
         for (let i in His_eu) {
            //@ts-ignore
            questions.push({ ...His_eu[i] } as Question)
         }
         for (let i in His_us) {
            //@ts-ignore
            questions.push({ ...His_us[i] } as Question)
         }
         for (let i in His_world) {
            //@ts-ignore
            questions.push({ ...His_world[i] } as Question)
         }
         for (let i in Marketing) {
            //@ts-ignore
            questions.push({ ...Marketing[i] } as Question)
         }
         for (let i in Psy) {
            //@ts-ignore
            questions.push({ ...Psy[i] } as Question)
         }
         let index = this.randomNum(0, questions.length);
         let pastindeces = [...this.state.pastQuestionIndeces];
         pastindeces.push(index);
         let fontSize = 13;
         if (questions[index].a.length < 10 && questions[index].b.length < 10 && questions[index].c.length < 10 && questions[index].d.length < 10)
            fontSize = 20
         else if (questions[index].a.length < 20 && questions[index].b.length < 20 && questions[index].c.length < 20 && questions[index].d.length < 20)
            fontSize = 18
         else if (questions[index].a.length < 26 && questions[index].b.length < 26 && questions[index].c.length < 26 && questions[index].d.length < 26)
            fontSize = 16
         else if (questions[index].a.length < 32 && questions[index].b.length < 32 && questions[index].c.length < 32 && questions[index].d.length < 32)
            fontSize = 15
         this.setState({ fontSize, currentIndex: index, question: questions[index], pastQuestionIndeces: pastindeces, questions: questions })
      }
      else if (this.state.type === 'Economics') {
         for (let i in Eco) {
            //@ts-ignore
            questions.push({ ...Eco[i] } as Question)
         }
         let index = this.randomNum(0, questions.length);
         let pastindeces = [...this.state.pastQuestionIndeces];
         pastindeces.push(index);
         let fontSize = 13;
         if (questions[index].a.length < 10 && questions[index].b.length < 10 && questions[index].c.length < 10 && questions[index].d.length < 10)
            fontSize = 20
         else if (questions[index].a.length < 20 && questions[index].b.length < 20 && questions[index].c.length < 20 && questions[index].d.length < 20)
            fontSize = 18
         else if (questions[index].a.length < 26 && questions[index].b.length < 26 && questions[index].c.length < 26 && questions[index].d.length < 26)
            fontSize = 16
         else if (questions[index].a.length < 32 && questions[index].b.length < 32 && questions[index].c.length < 32 && questions[index].d.length < 32)
            fontSize = 15
         this.setState({ fontSize, currentIndex: index, question: questions[index], pastQuestionIndeces: pastindeces, questions: questions })
      }
      else if (this.state.type === 'Government') {
         for (let i in Gov) {
            //@ts-ignore
            questions.push({ ...Gov[i] } as Question)
         }
         let index = this.randomNum(0, questions.length);
         let pastindeces = [...this.state.pastQuestionIndeces];
         pastindeces.push(index);
         let fontSize = 13;
         if (questions[index].a.length < 10 && questions[index].b.length < 10 && questions[index].c.length < 10 && questions[index].d.length < 10)
            fontSize = 20
         else if (questions[index].a.length < 20 && questions[index].b.length < 20 && questions[index].c.length < 20 && questions[index].d.length < 20)
            fontSize = 18
         else if (questions[index].a.length < 26 && questions[index].b.length < 26 && questions[index].c.length < 26 && questions[index].d.length < 26)
            fontSize = 16
         else if (questions[index].a.length < 32 && questions[index].b.length < 32 && questions[index].c.length < 32 && questions[index].d.length < 32)
            fontSize = 15
         this.setState({ fontSize, currentIndex: index, question: questions[index], pastQuestionIndeces: pastindeces, questions: questions })
      }
      else if (this.state.type === 'USA History') {
         for (let i in His_us) {
            //@ts-ignore
            questions.push({ ...His_us[i] } as Question)
         }
         let index = this.randomNum(0, questions.length);
         let pastindeces = [...this.state.pastQuestionIndeces];
         pastindeces.push(index);
         let fontSize = 13;
         if (questions[index].a.length < 10 && questions[index].b.length < 10 && questions[index].c.length < 10 && questions[index].d.length < 10)
            fontSize = 20
         else if (questions[index].a.length < 20 && questions[index].b.length < 20 && questions[index].c.length < 20 && questions[index].d.length < 20)
            fontSize = 18
         else if (questions[index].a.length < 26 && questions[index].b.length < 26 && questions[index].c.length < 26 && questions[index].d.length < 26)
            fontSize = 16
         else if (questions[index].a.length < 32 && questions[index].b.length < 32 && questions[index].c.length < 32 && questions[index].d.length < 32)
            fontSize = 15
         this.setState({ fontSize, currentIndex: index, question: questions[index], pastQuestionIndeces: pastindeces, questions: questions })
      }
      else if (this.state.type === 'Europe History') {
         for (let i in His_eu) {
            //@ts-ignore
            questions.push({ ...His_eu[i] } as Question)
         }
         let index = this.randomNum(0, questions.length);
         let pastindeces = [...this.state.pastQuestionIndeces];
         pastindeces.push(index);
         let fontSize = 13;
         if (questions[index].a.length < 10 && questions[index].b.length < 10 && questions[index].c.length < 10 && questions[index].d.length < 10)
            fontSize = 20
         else if (questions[index].a.length < 20 && questions[index].b.length < 20 && questions[index].c.length < 20 && questions[index].d.length < 20)
            fontSize = 18
         else if (questions[index].a.length < 26 && questions[index].b.length < 26 && questions[index].c.length < 26 && questions[index].d.length < 26)
            fontSize = 16;
         else if (questions[index].a.length < 32 && questions[index].b.length < 32 && questions[index].c.length < 32 && questions[index].d.length < 32)
            fontSize = 15
         this.setState({ fontSize, currentIndex: index, question: questions[index], pastQuestionIndeces: pastindeces, questions: questions })
      }
      else if (this.state.type === 'World History') {
         for (let i in His_eu) {
            //@ts-ignore
            questions.push({ ...His_world[i] } as Question)
         }
         let index = this.randomNum(0, questions.length);
         let pastindeces = [...this.state.pastQuestionIndeces];
         pastindeces.push(index);
         let fontSize = 13;
         if (questions[index].a.length < 10 && questions[index].b.length < 10 && questions[index].c.length < 10 && questions[index].d.length < 10)
            fontSize = 20
         else if (questions[index].a.length < 20 && questions[index].b.length < 20 && questions[index].c.length < 20 && questions[index].d.length < 20)
            fontSize = 18
         else if (questions[index].a.length < 26 && questions[index].b.length < 26 && questions[index].c.length < 26 && questions[index].d.length < 26)
            fontSize = 16;
         else if (questions[index].a.length < 32 && questions[index].b.length < 32 && questions[index].c.length < 32 && questions[index].d.length < 32)
            fontSize = 15
         this.setState({ fontSize, currentIndex: index, question: questions[index], pastQuestionIndeces: pastindeces, questions: questions })
      }
      else if (this.state.type === 'Marketing') {
         for (let i in Marketing) {
            //@ts-ignore
            questions.push({ ...Marketing[i] } as Question)
         }
         let index = this.randomNum(0, questions.length);
         let pastindeces = [...this.state.pastQuestionIndeces];
         pastindeces.push(index);
         let fontSize = 13;
         if (questions[index].a.length < 10 && questions[index].b.length < 10 && questions[index].c.length < 10 && questions[index].d.length < 10)
            fontSize = 20;
         else if (questions[index].a.length < 20 && questions[index].b.length < 20 && questions[index].c.length < 20 && questions[index].d.length < 20)
            fontSize = 18;
         else if (questions[index].a.length < 26 && questions[index].b.length < 26 && questions[index].c.length < 26 && questions[index].d.length < 26)
            fontSize = 16;
         else if (questions[index].a.length < 32 && questions[index].b.length < 32 && questions[index].c.length < 32 && questions[index].d.length < 32)
            fontSize = 15
         this.setState({ fontSize, currentIndex: index, question: questions[index], pastQuestionIndeces: pastindeces, questions: questions })
      }
      else if (this.state.type === 'Psychology') {
         for (let i in Psy) {
            //@ts-ignore
            questions.push({ ...Psy[i] } as Question)
         }
         let index = this.randomNum(0, questions.length);
         let pastindeces = [...this.state.pastQuestionIndeces];
         pastindeces.push(index);
         let fontSize = 13;
         if (questions[index].a.length < 10 && questions[index].b.length < 10 && questions[index].c.length < 10 && questions[index].d.length < 10)
            fontSize = 20
         else if (questions[index].a.length < 20 && questions[index].b.length < 20 && questions[index].c.length < 20 && questions[index].d.length < 20)
            fontSize = 18
         else if (questions[index].a.length < 26 && questions[index].b.length < 26 && questions[index].c.length < 26 && questions[index].d.length < 26)
            fontSize = 16
         else if (questions[index].a.length < 32 && questions[index].b.length < 32 && questions[index].c.length < 32 && questions[index].d.length < 32)
            fontSize = 15
         this.setState({ fontSize, currentIndex: index, question: questions[index], pastQuestionIndeces: pastindeces, questions: questions })
      }
   }

   submit = (val: "a" | "b" | "c" | "d", index: number) => {
      let colors = [...this.state.tileColors];
      let score = this.state.score;
      if (val === this.state.question.ans) {
         colors[index] = "#7f7";
         score++;
      }
      else {
         colors[index] = "#f77";
         if (this.state.question.ans === 'a')
            colors[0] = "#7f7";
         if (this.state.question.ans === 'b')
            colors[1] = "#7f7";
         if (this.state.question.ans === 'c')
            colors[2] = "#7f7";
         if (this.state.question.ans === 'd')
            colors[3] = "#7f7";
      }
      this.setState({ tileColors: colors, clickable: false, score }, () => {
         setTimeout(() => {
            let { questions } = this.state;
            let index = this.randomNum(0, questions.length);
            for(let i = 0; i<this.state.pastQuestionIndeces.length; i++){
               if(index === this.state.pastQuestionIndeces[i]){
                  index = this.randomNum(0, questions.length);
                  i=0;
               }
            }
            let pastindeces = [...this.state.pastQuestionIndeces];
            pastindeces.push(index);
            let fontSize = 13;
            if (questions[index].a.length < 10 && questions[index].b.length < 10 && questions[index].c.length < 10 && questions[index].d.length < 10)
               fontSize = 20
            else if (questions[index].a.length < 20 && questions[index].b.length < 20 && questions[index].c.length < 20 && questions[index].d.length < 20)
               fontSize = 18
            else if (questions[index].a.length < 26 && questions[index].b.length < 26 && questions[index].c.length < 26 && questions[index].d.length < 26)
               fontSize = 16
            else if (questions[index].a.length < 32 && questions[index].b.length < 32 && questions[index].c.length < 32 && questions[index].d.length < 32)
               fontSize = 15
            this.setState({ fontSize, currentIndex: index, tileColors: ["#e3e3e3", "#e3e3e3", "#e3e3e3", "#e3e3e3"], question: questions[index], pastQuestionIndeces: pastindeces, questions, clickable: true })
         }, 2500)
      })
   }

   render() {
      return (
         <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.score}>
               <Text style={styles.scoreText}>Score: {this.state.score}</Text>
            </View>
            <View style={styles.question}>
               <Text style={styles.questionText}>{'\t\t'}{this.state.question.question}</Text>
            </View>
            <View style={{ flex: 1 }}></View>
            <View style={styles.row}>
               <TouchableOpacity disabled={!this.state.clickable} onPress={() => this.submit("a", 0)} style={{ ...styles.questionTile, backgroundColor: this.state.tileColors[0] }}>
                  <Text style={{ ...styles.choiceText, fontSize: this.state.fontSize }}><Text style={styles.choice}>a)</Text> {this.state.question.a}</Text>
               </TouchableOpacity>
               <TouchableOpacity disabled={!this.state.clickable} onPress={() => this.submit("b", 1)} style={{ ...styles.questionTile, backgroundColor: this.state.tileColors[1] }}>
                  <Text style={{ ...styles.choiceText, fontSize: this.state.fontSize }}><Text style={styles.choice}>b)</Text> {this.state.question.b}</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.row}>
               <TouchableOpacity disabled={!this.state.clickable} onPress={() => this.submit("c", 2)} style={{ ...styles.questionTile, backgroundColor: this.state.tileColors[2] }}>
                  <Text style={{ ...styles.choiceText, fontSize: this.state.fontSize }}><Text style={styles.choice}>c)</Text> {this.state.question.c}</Text>
               </TouchableOpacity>
               <TouchableOpacity disabled={!this.state.clickable} onPress={() => this.submit("d", 3)} style={{ ...styles.questionTile, backgroundColor: this.state.tileColors[3] }}>
                  <Text style={{ ...styles.choiceText, fontSize: this.state.fontSize }}><Text style={styles.choice}>d</Text>) {this.state.question.d}</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      )
   }
}

export default Game

const styles = StyleSheet.create({
   score: {
      paddingVertical: 8,
      flex: 0.2,
      backgroundColor: '#e9e9e9'
   },
   scoreText: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'sans-serif-light'
   },
   question: {
      height: '6%',
      marginHorizontal: 10,
      marginVertical: 10
   },
   questionText: {
      fontFamily: 'sans-serif-light',
      fontSize: 18
   },
   row: {
      paddingHorizontal: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1
   },
   questionTile: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 10,
      margin: 4,
      borderRadius: 24,
   },
   choice: {
      color: '#444'
   },
   choiceText: {
      fontFamily: 'sans-serif-light',
      fontSize: 14
   }
})