import React, { useRef,useState,useEffect } from "react";import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Animated, StatusBar,TouchableOpacity,ScrollView,StyleSheet,Text,Pressable,BackHandler,Button,TextInput,View,DrawerLayoutAndroid,Alert, Modal} from "react-native";
import Welcome from "./Welcome";import { Divider } from "react-native-paper";

//screens
import Navi from './src/nav';import About from './src/about';import Bot from './src/bot';import Forum from './src/forum';
import info from './src/info';import News from './src/news';import Outlook from './src/outlook';import Reg from './src/reg';import Login from './src/wifi'
import Register from "./src/reg";import Notices from "./src/side/notices";import Profile from "./src/side/profile";import Settings from "./src/side/settings";

export default function App() {
  const Nav = createNativeStackNavigator();const drawer = useRef(null);const [m, setM] = useState(false);const [page,setPage]=useState("home");
  const exitApp=()=>{
    if(page==="home"){
    Alert.alert("Exit App","Are you sure you want to exit the app?",[{text:'Cancel',onPress:()=>null,style:'cancel'},{text:'Yes',onPress:()=>BackHandler.exitApp()}])
    return true;
    }else{
      navigation.navigate("Home");setPage("home")
    }
  }
  useEffect(()=>{BackHandler.addEventListener("hardwareBackPress",exitApp);return()=>BackHandler.removeEventListener("hardwareBackPress",exitApp);},[]);
  function Drop(props){
    return(
      <Modal visible={m} transparent={true} statusBarTranslucent={false} animationType={"slide"}>
        <View style={styles.mod}>
        {[{name:"Profile"},{name:"Notices"},{name:"Settings"}].map((item,k)=>(
          <TouchableOpacity activeOpacity={0.1} underlayColor="#0021EC" key={k} onPress={()=>{setM(false);props.navigation.navigate(item.name);setPage("other")}}><Text style={styles.mTxt}>{item.name}</Text></TouchableOpacity>
        ))}
        <Divider color='#000' width={140}/>
        <TouchableOpacity activeOpacity={0.1} underlayColor="#0021EC" onPress={()=>setM(false)}><Text style={[styles.mTxt,{color:"red"}]}>Close</Text></TouchableOpacity>
        </View>
      </Modal>
    );
  }
  const options ={
    all:{headerStyle: {backgroundColor: '#ffffff'},headerTintColor: '#000000',headerTitleStyle: {fontWeight: 'bold',color:'#000000'},},
    home:{title:'Cailogistics: Client',
      headerRight: () =>(
        <View style={{flexDirection: 'row',alignItems:'center',justifyContent: 'center'}}>
           <Icon color="#000000" size={30} onPress={()=>setM(true)} name="dots-vertical"/>
          </View>),
      headerLeft: () =><View style={{marginRight:70}}><Icon color="#000000" size={30} name="currency-eth" onPress={()=>drawer.current.openDrawer()}/></View>,
    }
  }
const headerHeight = 50;let scrollValue = 0;let headerVisible = true;let focused = false;
function MainMenu({ navigation }) {
  const animation = useRef(new Animated.Value(1)).current;
  const translateY = animation.interpolate({inputRange: [0, 1],outputRange: [0, 5],});
  const inputTranslateY = animation.interpolate({inputRange: [0, 1],outputRange: [headerHeight / 4, 0],});
  const opacity = animation;
  const onScroll = (e) => {
    if (focused) return;
    const y = e.nativeEvent.contentOffset.y;
    if (y > scrollValue && headerVisible && y > headerHeight) {Animated.spring(animation, {toValue: 0,useNativeDriver: true,bounciness: 0,}).start();headerVisible = false;}
    if (y < scrollValue && !headerVisible) {Animated.spring(animation, {toValue: 1,useNativeDriver: true,bounciness: 0,}).start();headerVisible = true;}
    scrollValue = y;};
const [newHere, setNew]=useState(false);
  const navigationView = () => (
    <View style={styles.lay}>
      <Text style={styles.dtext}>I'm in the Drawer!</Text>
      {[{nav:'Home',icon:'home'},{nav:'Nav',icon:'finance'},{nav:'Wifi Login',icon:'web'},{nav:'Outlook',icon:'web'},
      {nav:'Chatbot',icon:'account-box'},{nav:'News',icon:'account-box'},{nav:'Register',icon:'account-box'},{nav:'Forum',icon:'account-box'},
      {nav:'Info',icon:'account-box'},{nav:'About',icon:'account-box'}
      ].map((d,k)=>(<View key={k}><Pressable style={styles.drawerItem} onPress={()=>{navigation.navigate(d.nav);setPage("other")}}>
         <Icon name={d.icon} size={25} color="#0069ff" style={{ margin: 4 }}/>
          <Text style={styles.dtext}>{d.nav}</Text>
     </Pressable><Divider color='#0069ff' width={140}/></View>))}
      <Button title="Close drawer" onPress={() => drawer.current.closeDrawer()}/>
    </View>
  );
  return (
      <DrawerLayoutAndroid ref={drawer} drawerWidth={250} drawerPosition={"left"} renderNavigationView={navigationView}>
    <View style={styles.container}>
      {newHere&&<Welcome/>}
      {m&&<Drop navigation={navigation}/>}
      <StatusBar backgroundColor='#ffffff' barStyle='dark-content'/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 5}} onScroll={onScroll}>
        {[{title: "Dynamics Nav",des: "Connect to the Nav system using this web client",scr:"Nav",icon: "finance"},
          {title: "Wifi Login",des: "Login to your wifi with ease.",scr:"Wifi",icon: "wifi-arrow-left",},
          {title: "Outlook",des: "Access your outlook account.",scr:"Outlook",icon: "microsoft-outlook",},
          {title: "Chatbot",des: "Talk to our personal assistant.",src:"Chatbot",icon: "wechat",},
          {title: "News",des: "Read the recent activities happening here at Cailogistics",scr:"News",icon: "newspaper-variant-outline",},
          {title: "Attendance Register",des: "Register your attendance without having to wait in line at the gate.",scr:"Register",icon: "account-plus",},
          {title: "Forum",des: "Share your thoughts with co-workers anonymously.",scr:"Forum",icon: "forum",},
          {title: "Infomation",des: "Access relevant info like phone numbers and more",scr:"Info",icon: "folder-information",},
          {title: "About Cailogistics",des: "See what we are all about",scr: "About",icon: "information",},
          ].map((x,k)=> (
            <TouchableOpacity activeOpacity={0.1} underlayColor="#0021EC" onPress={()=>{navigation.navigate(x.scr);setPage("other")}}>
            <View style={styles.item} key={k}>
              <View style={styles.itemIn}><Icon name={x.icon} size={30} color="#ffffff" style={{ flex: 1, marginVertical: 25 }}/></View>
              <View style={{ flex: 3 }}>
                <Text style={styles.langTitle}>{x.title}</Text>
                <Text style={styles.langDes}>{x.des}</Text>
              </View>
              <View style={{ flex: 1,marginLeft:20 }}><Icon name="chevron-double-right" size={25} color="#0069ff" /></View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    </DrawerLayoutAndroid>
  );
}
  return (
    <NavigationContainer>
      <Nav.Navigator screenOptions={options.all}>
        <Nav.Screen name="Home" component={MainMenu} options={options.home}/>
        <Nav.Screen name="Nav" component={Navi}/>
        <Nav.Screen name="Wifi" component={Login}/>
        <Nav.Screen name="Outlook" component={Outlook}/>
        <Nav.Screen name="Chatbot" component={Bot} />
        <Nav.Screen name="News" component={News}/>
        <Nav.Screen name="Register" component={Register} />
        <Nav.Screen name="Forum" component={Forum} />
        <Nav.Screen name="Info" component={info} />
        <Nav.Screen name="About" component={About} />
        <Nav.Screen name="Profile" component={Profile} />
        <Nav.Screen name="Settings" component={Settings} />
        <Nav.Screen name="Notices" component={Notices} />
      </Nav.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  langTitle: {color:'#000000',fontSize:18,fontWeight: "bold"},
  langDes: {color:'#e0e0e0'},
  mod:{justifyContent:'center',paddingVertical:10, borderRadius:10, alignItems:'flex-start',width:140,backgroundColor:'#ffffff',alignSelf:'flex-end', marginTop:25,elevation:10,marginRight:20},
  mTxt:{fontWeight:'bold',color:'#0069ff',marginLeft:15,marginVertical:10,fontSize:18,width:140},
  drawerItem: {alignItems: 'center',justfyContent: 'space-between',flexDirection: 'row',marginVertical:10,marginHorizontal:10},
  dtext: { marginLeft:20,color:'#0069ff',fontWeight: 'bold', fontSize:18, flex:1},
  item: {height:80,marginHorizontal:10,marginVertical:5, borderRadius: 6,flexDirection: "row",justifyContent: "space-between",alignItems: "center",shadowColor: "#0069ff",shadowOpacity: 20,shadowRadius: 20,elevation: 5,backgroundColor: "#ffffff"},
  itemIn:{flexDirection: "column",backgroundColor: "#0069ff",alignItems: "center",justifyContent: "center",flex: 1,borderRadius: 6,marginRight: 10,},
  t:{fontSize:20,marginLeft:10,fontWeight: 'bold'}
});
