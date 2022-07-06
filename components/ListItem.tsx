import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

interface Props {
    navigation:any,
    data:any,
}

export default function ListItem (props: Props) {
  const {navigation, data} = props;

  console.log(data)
  useEffect(() => {
  }, []);

  const getItem = (item:any) => {
    navigation.navigate('DetailPage')
  };

  const ItemView = (item:any) => {
    console.log(item);
    return (
        <Text style={styles.text} onPress={() => getItem(item)}>
            {item.beneficiary_name.toUpperCase()}
        </Text>
    );
  };
 
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      >
      </View>
    );
  };

  return (
    <SafeAreaView>
        {
            <FlatList
                data={data}
                renderItem={({ item }) => ItemView(item)}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
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
  }
});
