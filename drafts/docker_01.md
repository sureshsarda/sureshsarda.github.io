# Docker

# Your first container
> Part 1 of a multi part essay on configuring Docker in production

## First Container
- Create your first container
- Run the container

```docker
# Use an official Python runtime as a parent image
FROM python:3.8-rc-slim

# Set the working directory to /app
WORKDIR /app

# Copy data from app directory to the docker image
COPY app /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run app.py when the container launches
CMD ["python", "server.py"]
```

## Configuring your first container
- venv
- Ports
- Making sure everything works fine