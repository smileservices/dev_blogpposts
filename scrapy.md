# Scrapy
https://docs.scrapy.org/

```
pip install scrapy
scrapy startproject {name}
```

## Useful

1. Can use the scrapy shell command
```
scrapy shell "http://quotes.toscrape.com/page/1/"
```

2. Closing the spider
```
class SomePipeline(object):

    def process_item(self, item, spider):
        spider.crawler.engine.close_spider(self, reason='finished')
```

## Examples

spider that follows links on page and then gets the next one

```
import scrapy


class QuotesSpider(scrapy.Spider):
    name = "quotes"

    def start_requests(self):
        urls = 'http://quotes.toscrape.com/'
        yield scrapy.Request(urls, self.parse)

    def parse(self, response):

    	# gets all author links from the page
        author_page_links = response.css('.author + a')
    	
    	# visits every link
        yield from response.follow_all(author_page_links, self.parse_author)

        # gets next page link
        pagination_links = response.css('li.next a')
        # does the same for the next one too
        yield from response.follow_all(pagination_links, self.parse)

    def parse_author(self, response):
        def extract_with_css(query):
            return response.css(query).get(default='').strip()

        yield {
            'name': extract_with_css('h3.author-title::text'),
            'birthdate': extract_with_css('.author-born-date::text'),
        }
```

## Selectors:

get all href of links from div with class job_title
```
response.css('div.job_title a').xpath('@href').getall()
```

## Pipelines:
-- take the output from spider and pass it through multiple methods

exceptions:  DropItem, Deffered (for signaling a blocking operation)


pipelines.py
```

class TutorialPipeline:
    def process_item(self, item, spider):
        # do stuff to the item here
        return new_item

class SecondPipeline:
    def process_item(self, item, spider):
        #do stuff
        return item
```

settings.py
```
ITEM_PIPELINES = {
    'tutorial.pipelines.SecondPipeline': 200
    'tutorial.pipelines.TutorialPipeline': 100, # will get executed first (100<200)
}
```