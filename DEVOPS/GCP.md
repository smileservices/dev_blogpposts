## How to deploy a local image to GCP by using docker

1. Create local image 
`DOCKER_BUILDKIT=1 docker build . -f _DOCKER/dockerfile_deploy -t <gcp repo image path>`

`<gcp repo image path>` is the path in the GCP registry that we save the image to; for L2 company app it's `eu.gcr.io/devop-tests/layer2/container`

2. Push to GCP registry
`docker push <gcp repo image path>`

3. Deploy to GCP App Engine:
    a. make sure the .yaml config file is present

`gcloud app deploy --image-url=<gcp repo image path> <yaml config file>`



Ex for L2 Company Container:

1. Build image
`DOCKER_BUILDKIT=1 docker build . -f _DOCKER/dockerfile_deploy --ssh default=~/.ssh/id_rsa_lionstep -t eu.gcr.io/devop-tests/layer2/container`

2. Push to registry:
`docker push eu.gcr.io/devop-tests/layer2/container`

3. Deploy
`_DEPLOYMENT/prepare .`
`gcloud app deploy --image-url=eu.gcr.io/devop-tests/layer2/container api_dev.yml`