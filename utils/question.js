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
    for (let i = 0; i < 25; i++) {
        if (charArray[0] == this.getLetterFromIndex(index) && charArray[1] == ")") return true;
    }
    if (!isNaN(parseInt(charArray[0]))) return true
    else return false
}

module.exports.getLetterFromIndex = (index) => {
    if (index == 0) return "a";
    if (index == 1) return "b";
    if (index == 2) return "c";
    if (index == 3) return "d";
    if (index == 4) return "e";
    if (index == 5) return "f";
    if (index == 6) return "g";
    if (index == 7) return "h";
    if (index == 8) return "i";
    if (index == 9) return "j";
    if (index == 10) return "k";
    if (index == 11) return "l";
    if (index == 12) return "m";
    if (index == 13) return "n";
    if (index == 14) return "o";
    if (index == 15) return "p";
    if (index == 16) return "q";
    if (index == 17) return "r";
    if (index == 18) return "s";
    if (index == 19) return "t";
    if (index == 20) return "u";
    if (index == 21) return "v";
    if (index == 22) return "w";
    if (index == 23) return "x";
    if (index == 24) return "y";
    if (index == 25) return "z";
}