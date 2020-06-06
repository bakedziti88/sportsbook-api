const Apify = require('apify')

const data = [
	{
		book: "DraftKings",
		sports: [
			{
				name: "NFL",
				url: "https://sportsbook.draftkings.com/featured?category=game-lines&subcategory=football"
			}
		]
	}
]

const DraftKings = (sport) => {
	
	const URL = data.find(b => b.book === "DraftKings").sports.find(s => s.name === sport).url
	console.log(URL)
	
	Apify.main(async () => {
		
		const requestQueue = await Apify.openRequestQueue()
		await requestQueue.addRequest({url: "https://example.com"})
		
		const handlePageFunction = async ({request, $}) => {
			const selected = $('title').text()
			console.log('so this works')
			console.log(selected)
		}
		
		const crawler = new Apify.CheerioCrawler({
			requestQueue,
			handlePageFunction
		})
		await crawler.run()
	})
}

module.exports = {DraftKings}