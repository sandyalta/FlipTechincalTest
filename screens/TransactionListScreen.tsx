import { useEffect, useState } from 'react';
import { ScrollView, ScrollViewComponent, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from '../components/ListItem';
import SearchSection from '../components/SearchSection';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TransactionListScreen({ navigation }: RootTabScreenProps<'TransactionListPage'>) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    initContent();    
  }, []);

  const initContent = async () => {
    fetch("https://recruitment-test.flip.id/frontend-test").then((response) => response.json()).then((data:any) => {
      if(data){
        const arrayTemp : any = Object.values(data);
        setOriginalData(arrayTemp);
        setData(arrayTemp);
      }
    }).catch((error:any) => {
        console.log("ERROR API RETURN", error)
    });
    
  }

  const searchFilterFunction = (text:any) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = originalData.filter(function (item:any) {
        const nameData = item.beneficiary_name
          ? item.beneficiary_name.toUpperCase()
          : ''.toUpperCase();
        const beneBankData = item.beneficiary_bank
          ? item.beneficiary_bank.toUpperCase()
          : ''.toUpperCase();
        const senderBankData = item.sender_bank
          ? item.sender_bank.toUpperCase()
          : ''.toUpperCase();
        const amountData = item.amount;
        const textData = text.toUpperCase();
        return (nameData.indexOf(textData) > -1 || beneBankData.indexOf(textData) > -1 || senderBankData.indexOf(textData) > -1);
      });
      setData(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setData(originalData);
      setSearch(text);
    }
  };


  return (
      <View style={styles.container}>
        <SearchSection onSearchAction={(text:any) => searchFilterFunction(text)} search={search}></SearchSection>
        <ScrollView>
          { data && <ListItem data={data} navigation={navigation}></ListItem>}
        </ScrollView>
        {/* <EditScreenInfo path="/screens/TransactionListScreen.tsx" /> */}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(233, 240, 221)'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
