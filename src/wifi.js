import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Alert,Button,Image,
  TextInput,ListView,
  Modal,Picker,
  ScrollView,Slider,
  StyleSheet,
  Switch,Text,Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width;
function Cardy(props){
  return (
  <View style={styles.card}>
     <View style={styles.icons}>
      <View style={{flexDirection:'row'}}>
       <Icon name='code-tags' color='#000000' size={25}/>
       <Text style={{color:'#000000',fontWeight:'bold', fontSize:16, textAlignVertical:'center', marginLeft:10}}>Example:</Text>
       </View>
       <Icon name='content-copy' color='#f33446' size={25}/>
     </View>
  </View>
  );
}
export default function Login(){
  return(
   <View style={styles.lay}>
     <ScrollView>
      <View style={styles.lay}>
      <Text style={[styles.header, {width:width}]}>Introduction</Text>
      <Cardy body="import React from 'react';"/>
     </View>
     </ScrollView>
   </View>
  );
}

const styles=StyleSheet.create({
  lay:{flex:1, alignItems:'center'},
  card:{width:(width*(0.9)),height:400, backgroundColor:'#f33442',borderRadius:20},
  icons:{flexDirection:'row', justifyContent:'space-between', margin:10, alignItems:'center'},
   header:{fontWeight:'bold', fontSize:20,textAlign:'center'}, 
});





