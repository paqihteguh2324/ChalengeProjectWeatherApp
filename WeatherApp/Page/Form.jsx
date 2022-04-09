// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { StyleSheet, Text, View , TextInput, ImageBackground, TouchableOpacity} from 'react-native';

//import SearchableDropdown component
import SearchableDropdown from './../lib';



const Form = ({navigation}) => {
  //Data Source for the SearchableDropdown
  const [serverData, setServerData] = useState([]);
  const [pilihan, setPilihan] = useState('');
  const [kota, setKota] = useState([]);
  const [Pkota, setPkota] = useState('');
  const [username, setUsername] = useState('')
  
  const onPencet=()=>{
      if(Pkota !== '' && username !== '' && pilihan !== '' ){
          navigation.navigate('Utama',{nama: {username}, kota:{Pkota}})
          setUsername('');
          setPkota('');
          setPilihan('');
      }
    else{
      alert('tidak boleh ada field yang kosong')
    }
}

const perkotaan = (nama) => {
    var kota = nama.split(" ");
    var hasil = kota[1];
    console.log(hasil)
    setPkota(hasil);
}


const daftarKota = (id, nama) => {
    setPilihan(nama)
    fetch(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`)
    .then((response) => response.json())
    .then((responseJson) => {
      //Successful response from the API Call
      setKota(responseJson.kota_kabupaten);
      console.log(kota);
    })
    .catch((error) => {
      console.error(error);
    });}

const daftarProvinsi= () =>{
    fetch('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
        .then((response) => response.json())
        .then((responseJson) => {
        //Successful response from the API Call
        setServerData(responseJson.provinsi);
        // console.log(serverData);
        })
        .catch((error) => {
        console.error(error);
        });
    }
      useEffect(() => {
      daftarKota()
      daftarProvinsi();
  }, []);

  return (
    
       <View style={styles.container}>
        <ImageBackground source={require('./../assets/background.png')} style={{flex:1, padding:25, justifyContent:"center"}}>
        <Text style={{fontSize:50, alignSelf:"center", fontWeight:"bold", paddingBottom:50}}>Weather App</Text>
        <Text>Masukan Nama Anda</Text>
        <TextInput style={styles.input}
          value={username}
           onChangeText={setUsername}
              />
        <Text style={styles.headingText}>
          Masukan Nama Provinsi
        </Text>
        <SearchableDropdown
          onTextChange={(text) => (text)}
          //On text change listner on the searchable input
          onItemSelect={(item) => daftarKota(item.id, item.nama)}

          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',  
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '50%',
          }}
          items={serverData}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder={pilihan}
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
          
        />
        <Text style={styles.headingText}>
          Masukan nama Kota
        </Text>
        <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          //On text change listner on the searchable input
          onItemSelect={(item) => perkotaan(item.nama)}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '50%',
          }}
          items={kota}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder={Pkota}
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
          
        />
        <TouchableOpacity style={{alignSelf:"center", padding:10, backgroundColor:"#b5cae8", borderWidth:2, borderRadius:10, marginTop:30, borderColor:"white"}}
          onPress={()=>onPencet()}
        >
          <Text style={{fontWeight:"bold"}}>Process</Text>
        </TouchableOpacity>
       </ImageBackground>  
      </View>
      
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
  input:{
    borderWidth:1,
    padding: 10,
    marginTop: 2,
    backgroundColor: '#FAF9F8',
    borderColor: '#bbb',
    
  }
});
