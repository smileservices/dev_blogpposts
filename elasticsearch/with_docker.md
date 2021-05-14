# Running Elasticsearch instance with docker

Great article (here)[https://phoenixnap.com/kb/docker-memory-and-cpu-limit]

docker run -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" --memory="1g" --memory-swap="2g" --memory-reservation="750m" --cpus="1.0" docker.elastic.co/elasticsearch/elasticsearch:7.10.2