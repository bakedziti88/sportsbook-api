const sportsRouter = require('express').Router()

const sports = ['NFL', 'UFC', 'CF']

sportsRouter.get('/:sport', (request, response, next) => {
	const sport = request.params.sport.toUpperCase()
	console.log(request.path)
	
	if (!sports.find(s => s === sport) && sport !== 'SPORTS') {
		console.log('sport not found')
		
		next()
	}
	else {
		response.json({sports})
	}
})

module.exports = sportsRouter