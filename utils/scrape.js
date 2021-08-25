const Brainly = require("brainly-scraper-v2")
const brain = new Brainly("id")

module.exports.scrapeAnswers = async(array) => {
    brain.search("es", "Pythagoras").then(console.log).catch(console.error)
}