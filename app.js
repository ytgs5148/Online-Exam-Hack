const pdfParse = require('pdf-parse')
const fs = require('fs')
const questionFinder = require('./utils/question')
const answerFinder = require('./utils/answer')
const scraper = require('./utils/scrape.js')

fs.readFile('./test/math.pdf' , async (err , pdfBuffer) => {
    if (err) throw err

    const result = await pdfParse(pdfBuffer)
    const questions = questionFinder.getQuestion(result.text)
    const answerLink = await answerFinder.getAnswers(questions)
    const answer = await scraper.scrapeAnswers(answerLink)

    // console.log(answerLink)
})