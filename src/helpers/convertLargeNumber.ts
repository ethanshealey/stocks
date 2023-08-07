const convertLargeNumber = (n: number): string => new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(n)
export default convertLargeNumber