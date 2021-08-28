const request = require('request')
const cheerio = require('cheerio')

async function scrapeLinks(links) {
    if (!links) return null

    return new Promise((resolve, reject) => {
        request(links, (error, response, html) => {
            if (error) resolve(error)
    
            const $ = cheerio.load(html)
            let result = $('.sg-text.sg-text--break-words.brn-rich-content.js-answer-content').text()
    
            resolve(result)
        })
    })
}

module.exports = { scrapeLinks }