function getLatestDate(xs: any): Date {
    if (xs.length) {
        return new Date(xs.reduce((m: any,v: any,i: any) => (v.date_utc > m.date_utc) && i ? v : m).date_utc * 1000);
    }
    return new Date()
}

export default getLatestDate