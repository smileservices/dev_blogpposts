# asyncio queues

Put coroutines on a queue then get their result out

https://docs.python.org/3/library/asyncio-queue.html

Most basic example:

```
import asyncio
import random

async def produce(id:int, q:asyncio.Queue) -> str:
    print(f'produce START {id}')
    await asyncio.sleep(random.choice(range(1,4)))
    print(f'produce DONE {id}')
    await q.put(f'produce {id}')

async def consume(q):
    while True:
        res = await q.get()
        print(f'consume START <{res}>')
        await asyncio.sleep(random.choice(range(1, 4)))
        print(f'consume DONE <{res}>')
        q.task_done()

async def main(prods, consums):
    q = asyncio.Queue()
    producers = [asyncio.create_task(produce(i, q)) for i in range(prods)]
    consumers = [asyncio.create_task(consume(q)) for i in range(consums)]
    await asyncio.gather(*producers)
    await q.join()
    for c in consumers:
        c.cancel()
        
if __name__ == '__main__':
    asyncio.run(main(10, 5))
```