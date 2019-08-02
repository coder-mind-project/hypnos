exports.setTimeZone = (timezone) => {
    const zone = parseInt(timezone)
    
    if( zone < -12 || zone > 12) throw 'Error, invalid Timezone' 
    
    let date = new Date()
    const hour = date.getHours() + parseInt(timezone)

    date.setHours(hour)
    
    return date
}