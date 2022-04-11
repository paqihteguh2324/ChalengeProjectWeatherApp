import { StyleSheet, Text, View, ImageBackground, Image, FlatList, TouchableHighlight, ScrollView, Alert } from 'react-native'
import React,{useState, useEffect} from 'react'
import { Ionicons, MaterialIcons, MaterialCommunityIcons,Entypo, Fontisto} from '@expo/vector-icons';
import { format} from 'date-fns'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Utama(route) {
    const [weather, setWeather] = useState([]);
    const [CurentDate, setCurent] = useState('');
    const [waktu, setWaktu] = useState('');
    const [today, setToday] = useState([]);
    const data = route.route.params;
    

  const getWaktu = () =>{
    var hours = new Date().getHours();
    if(hours >= 5 && hours<10 ){
      setWaktu('Pagi');
    }else if(hours >=10 && hours <15 ){
      setWaktu('Siang');
    }else if(hours >=15 && hours <18 ){
      setWaktu('Sore');
    }else{
      setWaktu('Malam');
    }
    console.log(hours);
  }

  const getCurrentDate=()=>{
      var date = new Date().getDate();
      var month = new Date().getMonth()+1;
      var year = new Date().getFullYear();
      if (date > 9 ) {
        var strip = '-'
      }else{
        var strip = '-0'
      }
      if (month > 9 ) {
        var mth = '-'
      }else{
        var mth = '-0'
      }
      var hasil = year+ mth + month+ strip +date;
      var huruf = hasil.toString();
      var bisa = new Date(huruf);
      var formattedDate = format(bisa, "eeee,MMMM dd, yyyy");
      setCurent(formattedDate);
  }

  const getDate=(hari)=>{
    var date = new Date().getDate()+hari;
      var month = new Date().getMonth()+1;
      var year = new Date().getFullYear();
        if (date > 9 ) {
          var strip = '-'
        }else{
          var strip = '-0'
        }
        if (month > 9 ) {
          var mth = '-'
        }else{
          var mth = '-0'
        }
      var hasil = year+ mth + month+strip+date;
      var huruf = hasil.toString();
      var bisa = new Date(huruf);
      var formattedDate = format(bisa, "eeee MM/dd");
    return formattedDate;
  }

const onRefresh = () => {
            dataToday();
            getWaktu();
            dataWeather();
            getCurrentDate();
        Alert.alert('Reload Success', 'Data berhasil di update')

 
}
    
const dataWeather = () => {
    const kota = data.kota.Pkota
    const apikey = 'd3b08cb55bbed34fce5e5ec758a5b9fa'
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${kota}&appid=${apikey}&units=metric&cnt=40`)
    .then((response) => response.json())
    .then((responseJson) => {
      //Successful response from the API Call
     setWeather(responseJson.list);
    })
    .catch((error) => {
      console.error(error);
    });
  }

const dataToday = () =>{
  const kota = data.kota.Pkota
  const apikey = 'd3b08cb55bbed34fce5e5ec758a5b9fa'
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apikey}&units=metric`)
  .then((response) => response.json())
  .then((responseJson) => {
    //Successful response from the API Call
   setToday(responseJson)
  })
  .catch((error) => {
    console.error(error);
  });
}

    useEffect(()=>{
        dataToday();
        getWaktu();
        dataWeather();
        getCurrentDate();
    },[])
    
  return (
    <View style={{flex:1}}>
         <ImageBackground source={require('./../assets/background.png')} style={{flex:1, padding:20, paddingTop:35}}>
           <View>
                    <View style={styles.header}>
                    <TouchableOpacity  onPress={()=>route.navigation.navigate('Form') }>
                    <Ionicons name="arrow-back" size={30} color="black"/>
                    </TouchableOpacity>
                    <View>
                    <Text style={{fontSize:25, alignSelf:"center"}}>{data.kota.Pkota}</Text>
                    <Text style={{fontSize:14, alignSelf:"center"}}>{CurentDate}</Text>
                    </View>
                    <TouchableOpacity onPress={()=> onRefresh()}>     
                      <MaterialIcons name="refresh" size={30} color="black"/>             
                    </TouchableOpacity>
                    </View>
              <FlatList
              data={today.weather}
              keyExtractor={(item, index) => 'h' + index.toString()}
              renderItem={({item})=>( 
              <View>
               <View style={{flexDirection:"row", justifyContent:"space-between", backgroundColor: 'rgba(0, 140, 255, 0.5)', borderRadius:10, marginBottom:5, paddingHorizontal:10}}>
                <View>
                  <Text style={{marginTop:9, fontSize:17}}>Selamat {waktu}, {data.nama.username}</Text>
                  <Text style={{fontSize:30}}>{today.main.temp}°C</Text>
                </View>
                <View style={{justifyContent:"center", alignItems:"center"}}>
                  <Text style={{marginTop:9, fontSize:17, marginBottom:9}}>{item.main}</Text>
                  <Image source={{ uri:`http://openweathermap.org/img/wn/${item.icon}.png`}} style={{ width: 70, height: 70, shadowColor:"#000000" }}/>
              </View>  
              </View>   
                <View style={{flexDirection:"row", justifyContent:"space-between", padding:10, backgroundColor: 'rgba(0, 140, 255, 0.5)', borderRadius:10}}>
                    <View style={{ alignItems:"center"}}>
                      <MaterialCommunityIcons name="water-percent" size={24} color="black" />
                      <Text>{today.main.humidity}%</Text>
                      <Text>Humidity</Text>
                    </View>
                    <View style={{ alignItems:"center"}}>
                      <Entypo name="compass" size={24} color="black" />
                      <Text>{today.main.pressure} hpa</Text>
                      <Text>Pressure</Text>
                    </View>
                      <View style={{ alignItems:"center"}}>
                      <Ionicons name="cloud-outline" size={24} color="black" />
                      <Text>{today.clouds.all}%</Text>
                      <Text>Cloudiness</Text>
                      </View>
                      <View style={{ alignItems:"center"}}> 
                      <Fontisto name="wind" size={24} color="black" />
                      <Text>{today.wind.speed}m/s</Text>
                      <Text>Wind</Text>
                      </View>
                  </View>
                  </View>
             )}
              />
          </View>
         <View style={{backgroundColor: 'rgba(0, 140, 255, 0.5)', borderRadius:10, marginTop:20}}>
         <ScrollView 
         horizontal={true}
         ><View style={{flexDirection:"row"}}>
           <View style={{width:60, height:490, alignItems:"center"}}>
             <View style={styles.tanggal}><Text>{getDate(0)}</Text></View>
             <View style={styles.tanggal}><Text>{getDate(1)}</Text></View>
             <View style={styles.tanggal}><Text>{getDate(2)}</Text></View>
             <View style={styles.tanggal}><Text>{getDate(3)}</Text></View>
             <View style={styles.tanggal}><Text>{getDate(4)}</Text></View> 
           </View>
           <View >
                <FlatList
                    data={weather}
                    numColumns={8}
                    listKey={(item, index) => 'E' + index.toString()}
                    keyExtractor={(item, index) => 'D' + index.toString()}
                    renderItem={({item}) =>{
                      var masuk=item.weather;
                      var tgl = item.dt_txt.split(" ");
                      var hasil = tgl[0];
                      var hasiltime = tgl[1]
                      var date = new Date(hasil);
                      var temp = item.main.temp;
                      
                      return(
                           
                              <View style={{paddingHorizontal:5, paddingVertical:3}}>
                                  <FlatList
                                  data={masuk}
                                  listKey={(item, index) => 'F' + index.toString()}
                                  keyExtractor={(item, index) => item.id}
                                  renderItem={({item}) => 
                                  {
                                  return(
                                    <TouchableHighlight style={{}}>
                                    <View style={{alignItems:"center", overflow:"scroll", paddingVertical:5}}>
                                            <Text style={{fontSize:17}}>{hasiltime}</Text>
                                            <Image source={{uri:`http://openweathermap.org/img/wn/${item.icon}.png`}} style={{ width: 40, height: 40 }}/>
                                            <Text style={{fontWeight:"bold"}}>{temp}°C</Text>
                                            </View>
                                            </TouchableHighlight> 
                                            )}}
                                          />
                              </View>                   
                          )
                        }}
                    />
                    </View>
             </View>       
        </ScrollView>
        </View>
         </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        flexDirection:"row", justifyContent:"space-between", marginBottom:10
    }, tanggal:{
      paddingVertical:30, alignSelf:"center"
    }
})

