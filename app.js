const pdfParse = require('pdf-parse')
const fs = require('fs')
const questionFinder = require('./utils/question')
const answerFinder = require('./utils/answer')
const scrapper = require('./utils/scrape')

fs.readFile('./test/sst.pdf' , async(err , pdfBuffer) => {
    if (err) throw err

    let answerText = []
    const result = await pdfParse(pdfBuffer)
    const questions = questionFinder.getQuestion(result.text)
    const answerLink = await answerFinder.getAnswers(questions)

    for (let i = 0; i < answerLink.length; i++) {
        let answers = await scrapper.scrapeLinks(answerLink[i])
        answerText.push(answers)
    }
})