import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, Modal, Pressable, StyleSheet, TextInput } from 'react-native';
import { sortList } from '../common/global';

import { Text, View } from '../components/Themed';

interface Props {
    onSearchAction: Function;
    search: string;
    changeModalVisibility: Function;
    sortedType: string;
}

export default function SearchSection (props: Props) {
    const {onSearchAction, search, changeModalVisibility, sortedType } = props;

    useEffect(() => {
        
    }, []);

    const sortedName = sortList.find((x:any) => x.value == sortedType)?.label;
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
                onPress={() => {
                    Keyboard.dismiss();
                    changeModalVisibility(true);
                }}
            >
                <View style={styles.sortContainer}>
                    <Text style={styles.sortText}>{sortedName}</Text>
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
