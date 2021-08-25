const config = require('../config.json')

module.exports.getQuestion = (text) => {
    const textArray = text.split('\n').filter(e => String(e).trim())
    let questionArray = []

    for (let i = 0; i < textArray.length; i++) {
        let array = textArray[i]
        if (!this.isQuestion(array)) continue
        else questionArray.push(array)
    }

    return questionArray ?? null
}

module.exports.isQuestion = (text) => {
    if (!text) return false

    const charArray = text.split('')
    
    if (charArray.length < config.iteratorLimiter) return false
    else if (!isNaN(parseInt(charArray[0]))) return true
    else return false
}