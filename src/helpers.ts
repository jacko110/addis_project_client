export function dateToString(date: Date) {
    return date.toISOString().split('T')[0];
}

export function DateString(dateString: string){
    let date_obj = new Date(dateString)
    return date_obj.toDateString();
}

export function Gender(gender: string)  {
    return gender ? gender[0].toUpperCase() + gender.substring(1).toLowerCase() : ""
}