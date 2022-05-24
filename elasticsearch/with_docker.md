# Running Elasticsearch instance with docker

Great article (here)[https://phoenixnap.com/kb/docker-memory-and-cpu-limit]

docker run --restart always -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" --memory="1.5g" --memory-swap="2g" --memory-reservation="1.5g" --cpus="1.0" docker.elastic.co/elasticsearch/elasticsearch:7.10.2