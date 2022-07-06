import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { convertStatus, DateFormat, FormatAmount, UIConstant } from '../common/global';
import { saveData } from '../common/store';
import { Text, View } from '../components/Themed';


interface Props {
    navigation:any,
    data:any,
}

export default function ListItem (props: Props) {
  const {navigation, data} = props;

  const getItem = (item:any) => {
    saveData(item);
    navigation.navigate('DetailPage')
  };

  const ItemView = (item:any) => {
    return (
        <Pressable style={item.status == "SUCCESS" ? styles.itemSucces : styles.itemPending} onPress={() => getItem(item)}>  
            <View style={styles.item2}>  
                <View style={styles.contentData}>
                    <View style={styles.itemRow}>
                        <Text style={UIConstant.bold}>{item.sender_bank.toUpperCase()} </Text>
                        <Ionicons name='arrow-forward-sharp' size={20}/>
                        <Text style={UIConstant.bold}>{item.beneficiary_bank.toUpperCase()}</Text>                               
                    </View>
                        <Text>{item.beneficiary_name.toUpperCase()}</Text>    
                    <View style={styles.itemRow}>
                        <Text>{`Rp ${FormatAmount(item.amount)}`} </Text>
                        <Ionicons style={styles.iconDot} name='ellipse' size={10}/>
                        <Text>{DateFormat(item.completed_at)}</Text>                
                    </View>
                </View>                    
                <View style={item.status == "SUCCESS" ? styles.statusSuccess : styles.statusPending}>
                    <Text style={UIConstant.white}>{convertStatus(item.status)}</Text>    
                </View>
            </View>            
        </Pressable>
    );
  };

  return (
    <SafeAreaView>
        {
            <FlatList
                data={data}
                renderItem={({ item }) => ItemView(item)}
                keyExtractor={(item, index) => index.toString()}
            />
        }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    padding: 10,
    margin: 10,
  },
  itemPending: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    shadowOffset: { width: 200, height: 200, },
    shadowColor: '#000',
    shadowOpacity: 1.0,
    borderWidth: 1,
    borderRadius: 10,        
    borderLeftColor: 'rgb(227, 87, 11)',
    borderTopColor: 'rgb(255, 255, 255)',
    borderRightColor : 'rgb(255, 255, 255)',
    borderBottomColor : 'rgb(255, 255, 255)',
    borderLeftWidth : 10,
    marginRight: 5
  },
  itemSucces: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    shadowOffset: { width: 200, height: 200, },
    shadowColor: '#000',
    shadowOpacity: 1.0,
    borderWidth: 1,
    borderRadius: 10,        
    borderLeftColor: 'rgb(83, 183, 137)',
    borderTopColor: 'rgb(255, 255, 255)',
    borderRightColor : 'rgb(255, 255, 255)',
    borderBottomColor : 'rgb(255, 255, 255)',
    borderLeftWidth : 10,
    marginRight: 5
},
statusPending:{
    flexDirection: 'row',
    marginLeft: 'auto',
    width: 80,
    alignItems: 'center',
    height: 40,
    backgroundColor: 'rgb(227, 87, 11)',
    padding: 10,        
    marginVertical: 5,
    marginHorizontal: 5,        
    borderWidth: 1,
    borderColor: 'rgb(255, 255, 255)',
    borderRadius: 10,
},

statusSuccess:{
    flexDirection: 'row',
    marginLeft: 'auto',
    width: 80,
    alignItems: 'center',
    height: 40,
    backgroundColor: 'rgb(83, 183, 137)',
    padding: 10,        
    marginVertical: 5,
    marginHorizontal: 5,        
    borderWidth: 1,
    borderColor: 'rgb(255, 255, 255)',
    borderRadius: 10,
},

item2:{
    ...UIConstant.bgWhite,
    flex: 1,
    flexDirection: 'row'
},

contentData: {
    justifyContent: 'flex-start',
},
smallWindow:{        
    flexDirection: 'row',
    marginLeft: 'auto',
    width: 80,
    alignItems: 'center',
    height: 40,
    backgroundColor: 'rgb(227, 87, 11)',
    padding: 10,        
    marginVertical: 5,
    marginHorizontal: 5,        
    // marginLeft: 100,
    borderWidth: 1,
    borderColor: 'rgb(255, 255, 255)',
    borderRadius: 10,
},
itemRow:{
    flex: 1,
    flexDirection: 'row'
},
iconDot:{
    alignContent: 'center',
    marginTop: 5,
    marginRight: 2,
}
});
