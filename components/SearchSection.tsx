import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';

interface Props {
    onSearchAction: Function;
    search: string;
}

export default function SearchSection (props: Props) {
    const {onSearchAction, search} = props;

    useEffect(() => {
        
    }, []);

    const sortFunction = () => {
        
    };

    return (
        <View style={styles.searchContainer}>
            <EvilIcons style={styles.searchIcon} name={'search'} size={20} color="#000"/>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => onSearchAction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder={"Cari nama, bank, atau nominal"}
            />
            <Pressable
                style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                width: '20%'
                })}
                onPress={() =>{
                Keyboard.dismiss();
                sortFunction();
                }}
            >
                <View style={styles.sortContainer}>
                <Text style={styles.sortText}>{"URUTKAN"}</Text>
                <Ionicons style={styles.sortIcon} name={'chevron-down'} size={18} color="#000"/>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    width: '95%',
    marginVertical: 5,
  },
  searchIcon:{
    padding: 10
  },
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    color: '#424242',
    width: '50%',
  },
  sortButton:{
    width: '20%'
  },
  sortContainer:{
    flexDirection: 'row',
    marginLeft: -10,
  },
  sortText: {
    color: 'rgb(227, 97, 50)'
  },
  sortIcon: {
    color: 'rgb(227, 97, 50)'
  },
});
