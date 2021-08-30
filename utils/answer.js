const axios = require('axios')
const config = require('../config.json')

module.exports.getAnswers = async(array) => {
    const answer = []

    for (let i = 0; i < array.length; i++) {
        let currentQuestion = array[i]
        let result = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${config.API}&cx=${config.CX}&q=${encodeURI(currentQuestion)}`)
        let resultArray = result.data.items
        let bestResult = this.findBestAnswer(resultArray , currentQuestion)
        answer.push(bestResult.link)
        console.log(`Found Question: ${currentQuestion}`)
    }

    return answer
}

module.exports.findBestAnswer = (array , string) => {
    if (!array || !string) {
        console.log(`Couldn't get answers`)
        return {link: null}
    }

    const likeliNess = []
    array.forEach(text => {
        text = text.title
        var longer = text
        var shorter = string

        if (text.length < string.length) {
            longer = string
            shorter = text
        }

        var longerLength = longer.length
        if (longerLength == 0) likeliNess.push(1.0)

        likeliNess.push((longerLength - this.editDistance(longer , shorter)) / parseFloat(longerLength))
    })

    let largestNumber = this.getLargest(likeliNess)
    let accurateResult = this.getAccurateResult(largestNumber , likeliNess , array)
    return accurateResult
}

module.exports.editDistance = (s1 , s2) => {
    s1 = s1.toLowerCase()
    s2 = s2.toLowerCase()

    var costs = new Array()
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i
        for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
            costs[j] = j
        else {
            if (j > 0) {
            var newValue = costs[j - 1]
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1
            costs[j - 1] = lastValue
            lastValue = newValue
            }
        }
        }
        if (i > 0)
        costs[s2.length] = lastValue
    }
    return costs[s2.length]
}

module.exports.getLargest = (array) => {
    var largest = array[0]
    for (var i = 0; i < array.length; i++) {
        if (largest < array[i]) {
            largest = array[i]
        }
    }

    return largest
}

module.exports.getAccurateResult = (largestNumber , likeliNess , array) => {
    for (let i = 0; i < likeliNess.length; i++) {
        if (likeliNess[i] == largestNumber) {
            index = i
            break
        }
    }
    
    for (let j = 0; j < array.length; j++) {
        if (j == index) {
            return array[j]
        }
    }
}

module.exports.delay = async(time) => {
    return new Promise(function(resolve){
        setTimeout(resolve, time*1000)
    })
}