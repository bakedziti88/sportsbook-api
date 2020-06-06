const router = require('express').Router()
const scraper = require('../utils/scrapers')

//Temp database
const bookData =
[
	{
		book: 'DraftKings',
		sports: [
			'NFL', 'UFC', 'CF'
		]
	},
	{
		book: 'FanDuel',
		sports: [
			'NFL', 'UFC', 'CF'
		]
	},
	{
		book: 'PointsBet',
		sports: [
			'NFL', 'UFC', 'CF'
		]
	}
]


router.get('/:book?/:sport?', (request, response, next) => {
	
	//This get path will be processed from left to right, like a tree structure / file structure
	//First validate book parameter
	//Then check if sport is defined or not
	
	
	let book = request.params.book
	
	if (!book) {
		next()
	}
	else {
		
		book = book.toUpperCase()
		//Check what the value of book is, do we have it listed in our db? (db is just the array at top named books)
		
		if (!bookData.find(r => r.book.toUpperCase() === book) && book !== 'BOOKS') {
			console.log('Unknown book')
			next()
		}
		else {
			
			//Now since book is found, we need to decide what book it is specifically
			
			let sport = request.params.sport
			if (!sport) {
				
				//Since sport is undefined/falsy, our path looks somthing like: api/:book
				//Do a simple decision here: api/books returns lists of books, but api/:book will return all the supported sports
				
				
				if (book === 'BOOKS') {
					response.json({
						books: bookData.map(entry => entry.book)
					})
				}
				else {
					response.json({
						sports: bookData.find(b => b.book.toUpperCase() === book).sports
					})
				}
			}
			else {
				
				
				//We are at the path /api/:book/:sport since sport is defined as something
				sport = sport.toUpperCase()
				
				//Change the value of book, so it refers to an object instead of a name we're looking for
				book = bookData.find(b => b.book.toUpperCase() === book)
				
				if (!book) {
					console.log('/api/books/:sport is not a supported path')
					next()
				}
				else if (!book.sports.find(s => s.toUpperCase() === sport) && sport !== 'SPORTS') {
					console.log('Known book, but unknown/unsupported sport')
					next()
				}
				else {
					response.json({
						message: 'All matchups for the sport will be listed here. Will implement api/:book/:sport/:matchup next to display odds/spread data scraped from the books'
					})
					
				}
			}
		}
	}
})

router.get('/', async (request, response) => {
	await scraper.DraftKings('NFL')
	
	response.json({bookData})
})


module.exports = router