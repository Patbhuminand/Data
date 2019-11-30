import React from 'react';
import { StyleSheet, Text, Image, View, StatusBar, TouchableOpacity, TextInput, Modal
  , TouchableHighlight, Alert, ScrollView } from 'react-native';
import { Container, Header, Content, Item, Label, Button, Left, Body, Right, Icon,Footer, FooterTab, CardItem
  , Card, Thumbnail, Form, Input } from 'native-base';
import Constants from "expo-constants";
import DrawerIcon from '../Drawer/DrawerIcon';
import database2 from '../../database/Sqlite';
import Items1 from './Item1';

class ShortNote extends React.Component {

  constructor(props) {
  super(props)

  }

  state = {
    text: null,
    edittext: null,
  };

  componentDidMount() {
    this.update();
  }

  onPressAdd = () => {
    this.addText();
    this.setState({ text: null });
  };

  addText() {
    if (this.state.text === null || this.state.text === "") {
      return false;
    }
    database2.putText(this.state.text,this.add_text_success,this.add_text_fail)
  };

  add_text_success=async()=>{
    this.update();
  }

  add_text_fail=async(error)=>{
      console.log(error);
  }

  delete_Complete=(id)=>{
    database2.deleteText(id);
    this.update();
  }

  update (){
    this.todone.update();
  };

  onChangeText = text => this.setState({ text });

  render() {
    return (
      <LinearGradient
       colors={['#7F7FD5', '#86A8E7', '#91EAE4']}
       style={{flex: 1}}>
      <HeaderNavigationBar {...this.props} />
      <View style={{flex:1,justifyContent: 'center'}}>
          <TextInput
              style={styles.nameInput}
              placeholder="What do you need to do ?"
              onChangeText={this.onChangeText}/>

          <TouchableOpacity
              style={styles.touchableUser}
              onPress={this.onPressAdd}>
              <Text style={{fontSize:20, color:'#ffffff',textAlign:'center'}}>Create</Text>
          </TouchableOpacity>

          <ScrollView style={styles.listArea}>
              <Items2
                ref={todone=>(this.todone = todone)}
                  onPressComplate={this.delete_Complete}
                    />
        </ScrollView>

      </View>
      </LinearGradient>
    );
  }
}

const offset = 16;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  flexRow: {
    flexDirection: "row"
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8
  },
  listArea: {
    backgroundColor: "transparent",
    flex: 1,
    paddingTop: 16
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8
  },
  nameInput: {
        alignItems: 'center',
        height:50,
        backgroundColor: 'transparent',
        padding: 5,
        margin:5,
        borderRadius: 50,
        borderColor:'white',
        borderWidth : 1,
        fontSize:20,
    },
    buttonText: {
        alignItems: 'center',
        height:50,
        backgroundColor: '#86A8E7',
        padding: 10,
        margin:5,
        borderRadius: 50,
        borderColor:'white',
        borderWidth : 1,
        fontSize:30,
        color:'#ffffff'
    },
    touchableUser:{
      alignItems: 'center',
      padding:10,
      borderRadius: 50,
      borderColor:'white',
      borderWidth : 1,
      margin:5,
      marginTop:2,
    }
});

export default ShortNote;
