
export const getExtensionCapitalFromURI=(uri)=>{
    let parts = uri.split(".")
    let part = parts[parts.length - 1]
    let ext = part.split("?")[0]

    let capital = ext.toUpperCase()
    return capital
}

export const getVideoId=(url)=>{
    let parts = url.split("/")
    let id = parts[parts.length - 1]
    console.log(id)
    return id
}