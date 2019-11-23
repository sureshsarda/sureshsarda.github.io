# Hello GCP

```bash
# Building a docker image
sudo docker build --tag=hello-gcp-api .

# Enable GCR and docker
gcloud auth configure-docker
```

Go to GCP, enable Container registry


Next is tag the image in your local machine and then push it to the container registery
```bash
# Tag locally
docker tag hello-gcp-api gcr.io/aye-hello-gcp/api

# Push
docker push gcr.io/aye-hello-gcp/api
```

