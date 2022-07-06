export const getData = (url:string) => {
    fetch(url).then((response) => response.json()).then((data:any) => {
        const arrayTemp : any = Object.values(data);
        return arrayTemp;
    }).catch((error:any) => {
        console.log("ERROR API RETURN", error)
    });
}