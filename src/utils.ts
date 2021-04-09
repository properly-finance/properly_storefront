export function trimElipsis(
    str: string,
    maxSize: number = 20,
    elipsSymbol: string = "...",
){
    return str 
      ? str.length > maxSize
          ? str.substring(0, maxSize - elipsSymbol.length) + elipsSymbol
          : str
      : elipsSymbol
}