import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from './Themed';
import { globalItems, sortList } from '../common/global';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    changeModalVisibility: Function,
    onSortFunction: Function,
    sortedType: string,
}

export default function SortModalList (props:Props) {
    const list = sortList.map((i:any, idx:any) => {
        return (
            <TouchableOpacity
                style={styles.listContainer}
                key={idx}
                onPress={() => props.onSortFunction(i.value)}
            >
                <View style={styles.listItem}>
                    <Ionicons style={{marginTop:10}} name={props.sortedType == i.value ? 'radio-button-on' : 'radio-button-off'} size={20} color={'rgb(227, 87, 11)'}></Ionicons>
                    <Text style={styles.text}>
                        {i.label}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    })
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => props.changeModalVisibility(false)}
        >
            <View style={[styles.modal]}>
                {list}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(233, 240, 221)'
    },
    text: {
        fontSize: 20,
        margin: 10,
    },
    modal: {
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 10,
        height: globalItems.deviceHeight/2,
        width: globalItems.deviceWidth-20
    },
    listContainer: {
        alignItems:'flex-start'
    },
    listItem: {
        flexDirection: 'row',
        padding:10,
    }
});