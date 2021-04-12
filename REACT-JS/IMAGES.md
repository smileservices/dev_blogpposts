# HANDLING IMAGES IS A PAIN IN THE ASS

There are a few ways to approach this issue
1. Upload to application server; handle resizing/optimizing locally
    1.a use multiform wih formdata
        Pros: standardized ?
        Problems: need to serialize/deserialize any json type data

    1.b use json to pass file content
        Pros: flexible
        Problems: client need to encode the file(costly)

2. Upload to application; use a cdn like Cloudflare for resizing/optimizing
    Pros: faster
    Problems: higher costs

3. Use an external service like AWS S3 for all image related
    Pros: faster
    Problems: highest costs
