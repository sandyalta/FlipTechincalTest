import { Dimensions, StyleSheet } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export const UIConstant = StyleSheet.create({
    fl1:{
        flex: 1
    },

    white:{
        color: 'rgb(255, 255, 255)',
    },

    bgWhite: {
        backgroundColor: 'rgb(255, 255, 255)',
    },

    fullWidth: {
        width: deviceWidth
    },
    bold: { 
        fontWeight: 'bold' 
    },
    italic: { 
        fontStyle: 'italic' 
    },
    underline: { 
        textDecorationLine: 'underline'
    },
});

export const globalItems = {
    deviceWidth,
    deviceHeight
}

export function FormatAmount(amount:any) {
    const regexAmount = /\B(?=(\d{3})+(?!\d))/g
    return parseFloat(amount).toFixed(0).toString().replace(regexAmount, '.')
}

export function DateFormat(date:any){
    const dateTemp = String(date).split(' ');
    const dateFormatNew = new Date(dateTemp[0]);
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `${dateFormatNew.getDate()} ${monthNames[dateFormatNew.getMonth()]} ${dateFormatNew.getFullYear()}`;
}

export const convertStatus = (statusText:any) => {
    let returnText = "";
    if(statusText == "SUCCESS" )
    {
        returnText = "Berhasil"
    } else if (statusText == "PENDING")
    {
        returnText = "Pengecekan"
    }else{
        returnText = ""
    }

    return returnText;``
}

export const sortList = [
    {
        label:'URUTKAN',
        value: ''
    },
    {
        label: 'Nama A-Z',
        value: 'asc',
    },
    {
        label: 'Nama Z-A',
        value: 'dsc',
    },
    {
        label: 'Tanggal Terbaru',
        value: 'newDate',
    },
    {
        label: 'Tanggal Terlama',
        value: 'oldDate'
    }
]