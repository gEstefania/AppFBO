
export const getExtensionCapitalFromURI=(uri)=>{
    let parts = uri.split(".")
    let part = parts[parts.length - 1]
    let ext = part.split("?")[0]

    let capital = ext.toUpperCase()
    return capital
}

export const getVideoId=(url)=>{
    console.log('URL',url)
    // verificar si la url esta indefinida
    if(url === undefined){
        return ['Xu0XxCwRbHY']
    } else {
        let parts = url.split("/")
        let id = parts[parts.length - 1]
        console.log(id)
        return id
    }
}

export const countWords = (str) => {
    if (str === null || str === undefined || str === '') {
        return 0
    }
    const arr = str.split(' ');
    return arr.filter(word => word !== '').length;

}