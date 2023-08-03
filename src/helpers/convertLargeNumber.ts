const convertLargeNumber = (n: number): string => {

    let i = 0
    const values = ['', 'k', 'm', 'b', 't']
    while(n >= 1000) {
        n = n / 1000
        i++
    }

    if(n < 1) {
        n * 1000
        i--
    }

    return String(n.toFixed(2)) + (values[i] ?? '')

}

export default convertLargeNumber