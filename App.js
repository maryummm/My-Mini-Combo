/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// In App.js in a new project


import 'react-native-gesture-handler';


import React , {useEffect} from 'react';
import { Button, StyleSheet, TouchableHighlight, TouchableOpacity,StatusBar,View,Image, ImageBackground,ActivityIndicator} from 'react-native';
import { createDrawerNavigator ,DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar,Caption,Text,Paragraph,Drawer,Title,Switch,TouchableRipple } from 'react-native-paper';
import RootStackScreen from './screens/RootStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';

const Drawerr = createDrawerNavigator();
const HomeStack =createStackNavigator();
const NotificationsStack =createStackNavigator();
const SearchStack =createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack=createStackNavigator();

import {AuthContext} from './components/Context';
import {Users} from './model/users';
function DrawerContent(props){

  const[isDarkTheme,setIsDarkTheme]= React.useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  } 
 
  const {signOut} =React.useContext(AuthContext);
  
  return(
    <View style={{flex:1}}>
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection:'row', marginRight:20}}>
            <Avatar.Image source={{uri:'https://static.toiimg.com/thumb/msid-69153814,width-1200,height-900,resizemode-4/.jpg'}}
            size={60} />
              <View style={{marginLeft:20}}>
            <Title style={styles.title}>
              Maryam Khan
            </Title>
            <Caption style={styles.caption}>
              @maryummmm
            </Caption>
              </View>
          </View>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={styles.paragraph,styles.caption}>80</Paragraph>
              <Caption style={styles.caption}> Following</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={styles.paragraph,styles.caption}>45</Paragraph>
              <Caption style={styles.caption}> Followers</Caption>
            </View>
          </View>
        </View>
      
      </View>
      <Drawer.Section style={styles.drawerSection}>
      <DrawerItem
        icon={({color,size}) => ( <MaterialCommunityIcons name="home" color={color} size={size} />) }
        label="Home"
        onPress={() => {props.navigation.navigate('Home')}}
        />
        <DrawerItem
        icon={({color,size}) => ( <MaterialCommunityIcons name="bell" color={color} size={size} />) }
        label="Updates"
        onPress={() => {props.navigation.navigate('Updates')}}
        />
         <DrawerItem
        icon={({color,size}) => ( <MaterialCommunityIcons name="bell" color={color} size={size} />) }
        label="Search"
        onPress={() => {props.navigation.navigate('Search')}}
        />
        <DrawerItem
        icon={({color,size}) => ( <MaterialCommunityIcons name="settings-helper" color={color} size={size} />) }
        label="Settings"
        onPress={() => {props.navigation.navigate('Bookmarks')}}
        />
        <DrawerItem
        icon={({color,size}) => ( <MaterialCommunityIcons name="bookmark" color={color} size={size} />) }
        label="Bookmarks"
        onPress={() => {props.navigation.navigate('Settings')}}
        />
      </Drawer.Section>
      <Drawer.Section title="Preferences">
<TouchableRipple onPress={()=>{toggleTheme()}}>
  <View style={styles.preference}>
    <Text>
      Dark Mode
    </Text>
    <View pointerEvents="none">
    <Switch value={isDarkTheme} />
    </View>
   
    
  </View>
</TouchableRipple>
      </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
        icon={({color,size}) => ( <MaterialCommunityIcons name="exit-to-app" color={color} size={size} />) }
        label="Sign Out"
        onPress={() => signOut()}
        />
      </Drawer.Section>
    
    </View>
    
    );
}
const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};
function MainTabScreen(){

return(
<Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      shifting="true"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
tabBarColor: "purple",
    
          tabBarIcon: ({color}) => {
            return(
            <MaterialCommunityIcons name="home" color={color} size={25} />
          );
            }
        }}
      />
      <Tab.Screen
        name="Updates"
        component={NotificationsStackScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: 'green',
          tabBarIcon: ({color}) => {
            return(
            <MaterialCommunityIcons name="bell" color={color} size={25} />);
            }
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarColor: 'blue',
          tabBarIcon: ({color}) => {
            return(
            <MaterialCommunityIcons name="search-web" color={color} size={25} />);
            }
        }}
      />
    </Tab.Navigator>
  );
      }

function NotificationsStackScreen({ navigation }) {
  return(
      <NotificationsStack.Navigator>
      <NotificationsStack.Screen name="Updates" component={NotificationsScreen} options={{
        headerStyle:{
          backgroundColor:'green'
        },
        headerTintColor:'white',
        headerTitleAlign:'center',
        headerLeft:() => {
          return (<MaterialCommunityIcons.Button name='menu' size={30} backgroundColor='green'onPress={() => navigation.openDrawer()
          }/>);
         }
      
      }}/>
      
    </NotificationsStack.Navigator>
    );
  }
  function SearchStackScreen({ navigation }) {
    return(
        <SearchStack.Navigator>
        <SearchStack.Screen name="Search" component={SearchScreen} options={{
          headerStyle:{
            backgroundColor:'blue'
          },
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerLeft:() => {
            return (<MaterialCommunityIcons.Button name='menu' size={30} backgroundColor='blue'onPress={() => navigation.openDrawer()
            }/>);
           }
        
        }}/>
        
      </SearchStack.Navigator>
      );
    }
  function HomeStackScreen({ navigation }) {
    return(
      <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        headerStyle:{
          backgroundColor:'purple'
        },
        headerTintColor:'white',
        headerTitleAlign:'center',
        headerLeft:() => {
         return (<MaterialCommunityIcons.Button name='menu' size={30} backgroundColor='purple'onPress={() => navigation.openDrawer()
         }/>);
        }
        }}/>
      
      
      
    </HomeStack.Navigator>
    );
  }
  
function HomeScreen({ navigation }) {
  let [quote, setQuote] = React.useState('')
  let [source, setSource] = React.useState('')

  function fetchApiCall () {
    fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": "820261c235msh4ed6f6639976535p1c638fjsn52df8f87c38a"
      }
    })
      .then(response => response.json())
      .then(response => {
       setQuote(response.content)
       setSource(response.originator.name)
        
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <StatusBar backgroundColor="purple" barStyle="light-content"/>
       <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' ,color:'pink', }}>
       <ImageBackground source={{uri: 'https://images.hdqwalls.com/download/neon-city-buildings-reflection-skycrapper-minimalism-4k-mw-640x1136.jpg'}}
       style={{width: 600, height: 600, alignItems: 'center'}} 
       >
         <View style={{top:150}}>
         <Image source={logo}
       style={{width: 50, height: 50,alignSelf:'center'}} 
       />
       <View color="white"><Text style={{color:"white",margin:5,backgroundColor:"black", fontFamily:"Algerian",fontSize:20}}>Welcome back!</Text></View>
         </View>
       
        
      <View style={{allignItems:'center',justifyContent:'center'}}>
  
        <View style={styles.button, {allignItems:'center',width: 280,top:200,justifyContent:'center'}}>
          <TouchableOpacity onPress={()=> fetchApiCall()}>
          <LinearGradient
        colors={['purple','black']}>
         <View style={styles.circleGradient}>
          <Text style={styles.buttonText,{color:"white",justifyContent:'center',alignSelf:'center', fontSize:20}}>Get the quote for the day</Text>
          </View>
          </LinearGradient>
          </TouchableOpacity>
       
  </View>
     
        </View>
      
      
      <View style={styles.quoteContainer} opacity={0.6}>
        <View>
          <Text style={styles.quote}>
           {quote}
          </Text>
          <Text style={styles.source}>
           {source}
          </Text>
           
        </View>
      </View>
     
       </ImageBackground>
    </View>
    </View>
  );
}
function SettingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <StatusBar backgroundColor="green" barStyle="light-content"/>
      <Button
        onPress={() => navigation.navigate('Updates')}
        title="Go to notifications"
      />
      <Text>
        Check your setting here!
      </Text>
    </View>
  );
}
function BookmarkScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Updates')}
        title="Go to notifications"
      />
    </View>
  );
}
function NotificationsScreen({ navigation }) {
  let [country, setCountry] = React.useState('')
  let [totalDeaths, setTotalDeaths] = React.useState('')
  let [totalRecoveredCases, setTotalRecoveredCases] = React.useState('')
  let [updatedDateTime, setUpdatedDateTime] = React.useState('')
  function fetchApiCall () {
    fetch("https://coronavirus-smartable.p.rapidapi.com/stats/v1/IN/", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com",
        "x-rapidapi-key": "820261c235msh4ed6f6639976535p1c638fjsn52df8f87c38a"
      }
    })
      .then(response => response.json())
      .then(response => {
        setCountry(response.location.countryOrRegion)
        setTotalDeaths(response.stats.newDeaths)
        setTotalRecoveredCases(response.stats.totalRecoveredCases)
        setUpdatedDateTime(response.updatedDateTime)
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <StatusBar backgroundColor="green" barStyle="light-content"/>
       <ImageBackground source={{uri: 'https://static4.depositphotos.com/1015060/482/i/600/depositphotos_4824453-stock-photo-green-park.jpg'}}
       style={{width: 600, height: 600, alignItems: 'center'}} 
       >
       <View style={{allignItems:'center',justifyContent:'center'}}>
  
  <View style={styles.button, {allignItems:'center',width: 280,top:150,justifyContent:'center'}}>
    <TouchableOpacity onPress={()=> fetchApiCall()}>
    <LinearGradient
  colors={['black','green']}>
   
    <Text style={styles.buttonText,{color:"white",justifyContent:'center',alignSelf:'center',fontFamily:'algerian',fontSize:30}}>Get Covid19 Stats</Text>
    
    </LinearGradient>
    </TouchableOpacity>
 
</View>

  </View>


<View style={{ height:300,
    width:280,
    top:200,
    marginHorizontal: 40,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20}} opacity={0.4}>
          <Text style={{fontSize: 25,
    textAlign: 'center',
    fontStyle: 'italic',
    color:'white'}}>
            Country : {country}
          </Text>
          <Text style={styles.quote}>
           Total Deaths : {totalDeaths}
          </Text>
          <Text style={{fontSize: 25,
    textAlign: 'center',
    fontStyle: 'italic',
    color:'white'}}>
           Total Recovered Cases : {totalRecoveredCases}
          </Text>
          <Text style={styles.quote}>
            Updated On: {updatedDateTime}
          </Text>
</View>
      </ImageBackground>
    </View>
  );
}
function SearchScreen({ navigation }) {
  return (
   // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       //<StatusBar backgroundColor="purple" barStyle="light-content"/>
      
      <WebView source={{ uri: 'https://www.google.com/' }} />
    //</View>
  );
}
const styles=StyleSheet.create({
  drawerContent:{
    flex:1,
  },
  userInfoSection:{
    paddingLeft:10,
    margin:20,
  },
  title:{
    fontSize:16,
    marginTop:3,
    fontWeight:'bold',
    color:'pink'
  },
  quote: {
    fontSize: 25,
    textAlign: 'center',
    fontStyle: 'italic',
    color:'black'
  },
  source: {
    textAlign: 'right',
    marginTop: 15,
    color:'purple'
  },
  quoteContainer: {
    height:240,
    width:280,
    top:230,
    marginHorizontal: 40,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20
  },
  caption:{
    fontSize:14,
    lineHeight:14,
  },
  row:{
    marginTop:20,
    flexDirection:'row',
    alignItems:'center'
  },
  section:{
    marginRight:15,
    flexDirection:'row',
    alignItems:'center'
  },
  button: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: '#0645AD'
  },
  buttonText: {
    color: '#fff'
  },
  paragraph:{
    fontWeight:'bold',
    marginRight:3
  },
  drawerSection:{
    marginTop:15
  },
  bottomDrawerSection:{
    marginBottom:15,
    borderTopColor:'#f4f4f4',
    borderTopWidth:1
  },
  preference:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:12,
    paddingHorizontal:16

  },
});

const App=()=>{

  const initialLoginState = {
    isLoading: true,
    userName:null,
    userToken:null,
  };

  const loginReducer = (prevState, action) => {
    switch(action.type){
      case 'RETRIEVE_TOKEN': 
      return{
        ...prevState,
        userToken: action.token,
        isLoading: false,
      }; 
      case 'LOGIN': return{
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
      };
      case 'LOGOUT': return{
        ...prevState,
        userName: null,
        userToken: null,
        isLoading: false,
      };
      case 'REGISTER': return{
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
      };
    }
  };

  const [loginState,dispatch]=React.useReducer(
    loginReducer, 
    initialLoginState
    );



const authContext =React.useMemo(
  () => ({
signIn:async(foundUser) => {
 
 const userToken=String(foundUser[0].userToken);
 const userName=foundUser[0].userName;
  
    try {
      await AsyncStorage.setItem('userToken', userToken);
    } catch (e) {
      console.log(e);
    }
  
  //console.log('user token:',userToken);
  dispatch({type:'LOGIN',id:userName,token:userToken});
},
signUp:()=>{
 
  dispatch({type:'REGISTER',id:userName,token:userToken});
},
signOut:async()=>{
  try {
     
    await AsyncStorage.removeItem('userToken');
  } catch (e) {
    console.log(e);
  }
 dispatch({type:'LOGOUT'});
},
}),
[],
);

useEffect(()=> {
  setTimeout(async() => {
    let userToken;
    userToken=null;
    try {
     
      userToken=await AsyncStorage.getItem('userToken');
    } catch (e) {
      console.log(e);
    }
    dispatch({type:'RETRIEVE_TOKEN',token:userToken});;
  }, 1000);
},[]);


  if(loginState.isLoading){
    return (
<View style={{ flex:1 , justifyContent:"center" ,alignItems:"center"}}>
  <ActivityIndicator color="black" size="large" />
</View>
    );
  }
   return(
     <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      {loginState.userToken !== null ? (
     <Drawerr.Navigator drawerContent={props => <DrawerContent{...props}/>}>
      <Drawerr.Screen name="HomeDrawer" component={MainTabScreen} />
      <Drawerr.Screen name="Bookmarks" component={BookmarkScreen} />
      <Drawerr.Screen name="Settings" component={SettingScreen} />
     </Drawerr.Navigator>
      )
     :
     <RootStackScreen/>
      }
    </NavigationContainer>
    </AuthContext.Provider>
  );
   
   };
   
export default App;
/* {
  return (

<Drawerr.Navigator drawerContent={props => <DrawerContent{...props}/>}>
      <Drawerr.Screen name="HomeDrawer" component={MainTabScreen} />
      <Drawerr.Screen name="Bookmarks" component={BookmarkScreen} />
      <Drawerr.Screen name="Settings" component={SettingScreen} />
     </Drawerr.Navigator>



    <Drawer.section title="Preferences">
<TouchableRipple>
  <View style={styles.preference}>
    <Text>
      Dark Mode
    </Text>
    
  </View>
</TouchableRipple>
      </Drawer.section>
      
     // <Drawer.Screen name="Home" component={MainTabScreen} />
    
     // </Drawer.Navigator>

    <NavigationContainer>
     <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color,size }) => {
            return(
            <MaterialCommunityIcons name="home" color={color} size={size} />
          );
            }
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color,size }) => {
            return(
            <MaterialCommunityIcons name="bell" color={color} size={size} />);
            }
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
} */


