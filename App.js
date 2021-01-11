import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,TextInput,Image } from 'react-native';
import {Header} from 'react-native-elements';
import db from './localdb.js';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      text:'',
      displayText:'',
      word:"",
      definition:"",
      lexicalCategory:""
    };
  }
getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    //console.log(url)
    return fetch(url)
    .then((data)=>{
      if(data.status===200)
      {
        return data.json()
      }
      else
      {
        return null
      }
    })
    .then((response)=>{
         var responseObject = response
        if(responseObject)
        {
          var wordData = responseObject.definitions[0]         
          var definition=wordData.description
          var lexicalCategory=wordData.wordtype          
          this.setState({
            "word" : this.state.text, 
            "definition" :definition,
            "lexicalCategory": lexicalCategory                 
          })
        }
        else
        {
          this.setState({
            "word" : this.state.text, 
            "definition" :"Not Found",            
          })

        }
    
    })
  }
  


  render() {
    return (
      <View style={styles.container}>
      <Header backgroundColor='cyan'
      leftComponent={{icon:'menu'}}
      centerComponent={{text:'Dictionary App'}}
      rightComponent={{icon:''}}      
      />
      
      <TextInput 
       style={{margin:10,padding:5,backgroundColor:'white'}}
       placeholder='Enter the word'
       onChangeText={text=>{
         this.setState({
          text:text,
          isSearchPressed:false,
          word:'loading....',
          lexicalCategory:'',
          examples:[],
          definition:""
         })
       }} 
       value={this.state.text}
       />

      <TouchableOpacity style={{alignSelf:'center',padding:6,backgroundColor:'blue',borderRadius:8}}       
       onPress={() => {
         this.setState({ 
           word:db[this.state.text].word,
           lexicalCategory:db[this.state.text].lexicalCategory,
           definition:db[this.state.text].definition           
           });
       }}>
       <Text>Search</Text>
      </TouchableOpacity>

  <View style={{alignItems:'center'}}>
     <Text style={{margin:15}}>
      Word:{this.state.word}
      </Text>
      <Text style={{margin:15}}>
      Definition:{this.state.definition}
      </Text>
      <Text style={{margin:15}}>
      Lexical Category:{this.state.lexicalCategory}
     </Text>
  </View>
      
      </View>
    );
  }
}

 


const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  }
});


