---
category: how to
date: "2019-09-28T10:00:00Z"
description: Learn to create a Docker container in less than 60 seconds.
share: true
tags:
  - docker
  - python
title: Create your first Docker container
thumbnail: "/assets/images/overlay/rinson-chory-2vPGGOU-wLA-unsplash.jpg"
---

> Part 1 of a multi-part essay on configuring Docker in production.

## Prerequisites

1. You have Docker installed ([See instructions to install](https://docs.docker.com/install/linux/docker-ce/ubuntu/))
2. (Optional) You know to to deploy a Flask application using command line

---

Docker works on basis of configurations. It's a declarative way of telling Docker how to build images.

A typical workflow starts with a base image, works on top of it, saves it either for future use or gets reused as a base image of something else.

## Creating Your First Image

### Dockerfile

This file list down steps/configuration to build an image. In this example, we are trying to run a Flask application.

**A bit of backstory on Flask applications**

Typically, Flask applications have an entry point, `server.py` in this case. We can start the server by simply executing: `python server.py`, assuming that the current Python environment has all the dependencies installed. If not, we can install the dependencies from a requirements file.

```docker
# 1. Use this as the base image
FROM python:3.8-rc-slim

# 2. (Optional) Set the working directory to /app
WORKDIR /app

# 3. Copy the source code for deployment
COPY app /app

# 4. Install the dependencies
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# 5. Make port 5000 available to the world outside this container
EXPOSE 5000

# 6. Run app.py when the container launches
CMD ["python", "server.py"]
```

### Running the container

1. **To run the container, you first need to build it**
   THis can be achieved like this:

```
sudo docker build --tag=gettingstarted .
```

2. **Once built, make sure it is present in your local registry**

```
docker image ls
```

(More on this listing later, but you should see the container `gettingstarted` with latest tag here)

3. **Now is the time to run the container**

```
docker run -p 5000:5000 gettingstarted
```

This runs the Docker container by the given name. The `-p` parameter is the port mapping from the host OS to the container.

That's it! You have created your first Docker container!
