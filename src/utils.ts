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

export function caclPrice(
  price: string,
): string {
  return `${1 / Number(price)}`
}
