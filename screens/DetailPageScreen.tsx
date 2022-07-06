import { EvilIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { DateFormat, FormatAmount, globalItems, UIConstant } from '../common/global';
import { STORAGE_KEY } from '../common/store';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function DetailPageScreen({ navigation }: RootTabScreenProps<'TransactionListPage'>) {

  const [data, setData] = useState({
    id: null,
    amount: 0,
    account_number: "",
    beneficiaryBank: "",
    beneficiaryName: "",
    createdDate: "",
    uniqueCode: "",
    senderBank: "",
    remarks: "",
  });

  useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY) || '{}';
      if (value !== null) {
        const dataTemp = JSON.parse(value);
        const id = dataTemp.id;
        const amount = dataTemp.amount;
        const account_number = dataTemp.account_number;
        const beneficiaryBank = dataTemp.beneficiary_bank;
        const beneficiaryName = dataTemp.beneficiary_name;
        const createdDate = dataTemp.created_at;
        const uniqueCode = dataTemp.unique_code;
        const remarks = dataTemp.remark;
        const senderBank = dataTemp.sender_bank;
        setData({
          ...dataTemp,
          id,
          amount,
          account_number,
          beneficiaryName,
          beneficiaryBank,
          createdDate,
          uniqueCode,
          remarks,
          senderBank
        })
      }
    } catch (e) {
      alert('Failed to fetch the details from storage');
    }
};

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerDetail}>
          <View style={[styles.itemRow, styles.marginLeft]}>
            <Text style={UIConstant.bold}>{`ID TRANSAKSI: #${data.id}`}</Text>
            <Ionicons style={[styles.exitText, {marginLeft: 5}]} name='md-copy-outline' size={20}/>
          </View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgb(85, 89, 89)" />
          <View style={[styles.itemRow, styles.marginLeft,  styles.seperateRow]}>
            <Text style={UIConstant.bold}>{`DETAIL TRANSAKSI`}</Text>
            <Pressable onPress={() => navigation.navigate('TransactionListPage')}>
              <Text style={styles.exitText}>{"Tutup"}</Text>
            </Pressable>
          </View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgb(85, 89, 89)" />
          <View style={styles.contentData}>
              <View style={styles.itemRow}>
                  <Text style={UIConstant.bold}>{data.senderBank.toUpperCase()} </Text>
                  <Ionicons name='arrow-forward-sharp' size={22}/>
                  <Text style={[UIConstant.bold, {marginLeft:10}]}>{data.beneficiaryBank.toUpperCase()}</Text>                               
              </View>
              <View style={[styles.itemRow, styles.seperateRow]}>
                <View>
                  <Text style={UIConstant.bold}>{`- ${data.beneficiaryName.toUpperCase()}`} </Text>
                  <Text>{data.account_number}</Text>    
                </View>  
                <View style={styles.lastUnit}>
                  <Text style={UIConstant.bold}>{"NOMINAL"} </Text>
                  <Text>{`Rp ${FormatAmount(data.amount)}`} </Text>
                </View>                         
              </View>
              <View style={[styles.itemRow, styles.seperateRow]}>
                <View>
                  <Text style={UIConstant.bold}>{"BERITA TRANSFER"} </Text>
                  <Text>{data.remarks}</Text>    
                </View>  
                <View style={[styles.lastUnit, {marginEnd:10}]}>
                  <Text style={UIConstant.bold}>{"KODE UNIK"} </Text>
                  <Text>{data.uniqueCode} </Text>
                </View>                         
              </View>
              <View>
                  <Text style={UIConstant.bold}>{"WAKTU DIBUAT"} </Text>
                  <Text>{DateFormat(data.createdDate)} </Text>
              </View> 
          </View> 
        </View>
      </ScrollView>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(233, 240, 221)',
    marginTop: 10,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    borderWidth: 0.5,
  },
  containerDetail: {
    backgroundColor: 'rgb(255, 255, 255)',
  },
  contentData: {
    justifyContent: 'flex-start',
    width: '100%',
    padding: 10,
    margin: 10,
  },
  itemRow:{
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  marginLeft: {
    marginLeft: 20,
  },
  seperateRow: {
    justifyContent:'space-between',
    marginRight:40,
  },
  lastUnit:{
    justifyContent: 'flex-end',
  },
  exitText:{
    color: 'rgb(227, 87, 11)'
  }
});
