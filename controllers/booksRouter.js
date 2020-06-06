const booksRouter = require('express').Router()
const sportsRouter = require('./sportsRouter')

const routes = ['DraftKings', 'FanDuel', 'PointsBet']


booksRouter.get('/:book?/:sport?', (request, response, next) => {
	const book = request.params.book
	const sport = request.params.sport
	
	console.log(`${book} ${sport}`)
	
	if (!routes.find(r => r === book) && book !== 'books') {
		console.log('Unknown book')
		next()
	}
	else {
		response.json({books: routes})
	}
})

booksRouter.get('/', (request, response) => {
	console.log('I don\'t know, the home page?')
	response.json({sportsbooks: routes})
})


module.exports = booksRouter