# Elasticsearch Basics

free, open source

You can send data in the form of JSON documents to Elasticsearch using the API or ingestion tools such as Logstash and Amazon Kinesis Firehose. Elasticsearch automatically stores the original document and adds a searchable reference to the document in the cluster’s index. You can then search and retrieve the document using the Elasticsearch API. You can also use Kibana, an open-source visualization tool, with Elasticsearch to visualize your data and build interactive dashboards.

https://www.elastic.co/blog/found-elasticsearch-from-the-bottom-up


## build on top of Lucene

Lucene is a Java library. You can include it in your project and refer to its functions using function calls.

Elasticsearch is a JSON Based, Distributed, web server build over Lucene. Though it's Lucene who is doing the actual work beneath, Elasticsearch provides us a convenient layer over Lucene. Each shard that gets created in Elasticsearch is a separate Lucene instance. So to summarize

Elasticsearch is built over Lucene and provides a JSON based REST API to refer to Lucene features.
Elasticsearch provides a distributed system on top of Lucene. A distributed system is not something Lucene is aware of or built for. Elasticsearch provides this abstraction of distributed structure.
Elasticsearch provides other supporting features like thread-pool, queues, node/cluster monitoring API, data monitoring API, Cluster management, etc.

## how does it work
https://stackoverflow.com/questions/2705670/how-does-lucene-work

Lucene creates a big index. The index contains word id, number of docs where the word is present, and the position of the word in those documents. So when you give a single word query it just searches the index (O(1) time complexity). Then the result is ranked using different algorithms. For multi-word query just take the intersection of the set of files where the words are present. Thus Lucene is very very fast.

Lucene works with Term frequency and Inverse document frequency. It creates an index mapping each word with the document and it's frequency count which is nothing but inverse index on the document.

https://en.wikipedia.org/wiki/Tf%E2%80%93idf

## Components

### index
- is like a database
https://www.monterail.com/blog/how-to-index-objects-elasticsearch


### nodes
- distributed, across multiple servers

### shards, replicas
- distributed across multiple nodes

### mapping
- contains how the data is being mapped
- must be supplied when creating the index


### analysis
https://www.elastic.co/guide/en/elasticsearch/reference/6.4/indices-analyze.html

part 1
https://www.youtube.com/watch?v=Vija2TyBLiI
part 2
https://www.youtube.com/watch?v=_dWUmfbM4gE
part 3
https://www.youtube.com/watch?v=_yhc09j8zUg

Lucene Analyzers
https://www.youtube.com/watch?v=I9bgz8_bM20

https://www.elastic.co/blog/found-text-analysis-part-1
https://logz.io/blog/elasticsearch-mapping/

- breaking down the text into tokens flow ex. [word1, word2, word3]
- use it in
	- query
	- mapping parameter
	- index setting
- has:
	- analizer:
		- tokenizer (breaks down string to tokens)
		- filter (stopwords (ex. no "a", "this", "and" etc), lowercase, etc)
- attached to a field
	- can have different analyzers for index or query



