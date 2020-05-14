# asynchronous tasks (concurency)

to read:
http://danielputtick.com/asyncio-basics.html

Articles
---
	https://hackernoon.com/a-simple-introduction-to-pythons-asyncio-595d9c9ecf8c
	https://realpython.com/async-io-python/#setting-up-your-environment

	https://addshore.com/2018/06/python3-using-some-shared-state-in-2-async-methods/

Talks, confs, tutorials
---
	Demystifying Python's Async and Await Keywords
	https://www.youtube.com/watch?v=F19R_M4Nay4

	aiomultiprocess talk
	https://www.youtube.com/watch?v=0kXaLh8Fz3k&feature=youtu.be&t=10m30s

	A guide to asynchronous programming in Python with asyncio
	https://www.freecodecamp.org/news/a-guide-to-asynchronous-programming-in-python-with-asyncio-232e2afa44f6/

	Best in-depth explanation
	https://stackoverflow.com/questions/49005651/how-does-asyncio-actually-work

	http://lucumr.pocoo.org/2016/10/30/i-dont-understand-asyncio/

Libraries:
---
	https://github.com/alex-sherman/unsync
	https://github.com/jreese/aiomultiprocess

	https://aiohttp.readthedocs.io/en/stable/

	async server (https://vibora.io/) - alpha stage
	https://github.com/vibora-io/vibora


	import aiohttp
	import asyncio

	async def fetch(session, url):
	    async with session.get(url) as response:
	        print(await response.url())

	async def main():
	    loop = asyncio.get_event_loop()
	    async with aiohttp.ClientSession(loop=loop) as session:
	        cwlist = [loop.create_task(fetch(session, url)) for url in ['http://python.org', 'http://google.com', 'http://smile-services.ro']]
	        asyncio.gather(*cwlist)
	        
	if __name__ == "__main__":
	    asyncio.run(main())
