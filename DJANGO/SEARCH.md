Elasticsearch
Algolia - pay!
https://github.com/typesense/typesense

https://stackoverflow.com/questions/10622021/suggest-like-google-with-postgresql-trigrams-and-full-text-search

https://rocky.dev/full-text-search


You can quote phrases in tsquery or tsvector like the below. You can add a :* after a tsquery term to do a prefix search:

```sql
select
'''new york city'''::tsvector   @@ '''new yo'':*'::tsquery, --true
'''new york times'''::tsvector  @@ '''new yo'':*'::tsquery, --true
'''new york'''::tsvector        @@ '''new yo'':*'::tsquery, --true
'''new'''::tsvector             @@ '''new yo'':*'::tsquery, --false
'new'::tsvector                 @@ '''new yo'':*'::tsquery, --false
'new york'::tsvector            @@ '''new yo'':*'::tsquery  --false
```

The main problem is that to_tsvector() and [plain]to_tsquery() will strip your quotes. You can write your own versions that don't do this (it's not that hard), or do some post-processing after them to build your term n-grams.

The extra single quotes above are just escapes. select $$ i heart 'new york city' $$::tsvector; is equivalent.