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
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Navi(){
  return(
   <View style={styles.lay}>
     <Text>Nav</Text>
   </View>
  );
}

const styles=StyleSheet.create({
  lay:{flex:1, alignItems:'center'} 
});





