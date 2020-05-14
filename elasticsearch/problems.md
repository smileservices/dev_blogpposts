## Reindexing

https://stackoverflow.com/questions/33858542/how-to-really-reindex-data-in-elasticsearch


Make a POST request to "localhost:9200/_reindex"
```
{
    "source": {
        "index": "currentIndex"
    },
    "dest": {
        "index": "newIndex"
    }
}
```