import { useEffect, useRef, useState } from 'react';
import { Modal, ScrollView, ScrollViewComponent, StyleSheet } from 'react-native';
import { sortList } from '../common/global';
import ListItem from '../components/ListItem';
import SearchSection from '../components/SearchSection';
import SortModalList from '../components/SortModalList';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TransactionListScreen({ navigation }: RootTabScreenProps<'TransactionListPage'>) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [sortedType, setSortedType] = useState('');
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

  const [modalOpen, setModalOpen] = useState(false);
  const changeModalVisibility = (bool:boolean) => {
    setModalOpen(bool);
  }

  const sortFunction = (value:any) => {
    let tempData= data;
    if(value == "" || value == undefined){
      setData(originalData);
      setSortedType(value);
    }
    else if(value == "asc"){
      tempData = data.sort((a: any,b :any) => {
        return a.beneficiary_name > b.beneficiary_name ? 1 : -1
      })
    }
    else if(value == 'dsc'){
      tempData = data.sort((a: any,b :any) => {
        return b.beneficiary_name > a.beneficiary_name ? 1 : -1
      })
    }
    else if(value == 'newDate'){
      tempData = data.sort((a: any,b :any) => {
        return a.completed_at > b.completed_at ? 1 : -1
      })
    }
    else if(value == 'oldDate'){
      tempData = data.sort((a: any,b :any) => {
        return b.completed_at > a.completed_at ? 1 : -1
      })
    }
    setData(tempData);
    changeModalVisibility(false);
    setSortedType(value);

  }


  return (
      <View style={styles.container}>
        <SearchSection onSearchAction={(text:any) => searchFilterFunction(text)} search={search} changeModalVisibility={changeModalVisibility} sortedType={sortedType} ></SearchSection>
        <ScrollView>
          { data && <ListItem data={data} navigation={navigation}></ListItem>}
        </ScrollView>
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={modalOpen}
          onRequestClose={() => changeModalVisibility(false)}
        >
          <SortModalList onSortFunction={(value:any) => sortFunction(value)} changeModalVisibility={changeModalVisibility} sortedType={sortedType}></SortModalList>
        </Modal>
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
