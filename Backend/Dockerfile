# The first instruction is what image we want to base our container on
# We Use an official Python runtime as a parent image
FROM python:3.9.6-alpine

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory to /drf
# NOTE: all the directives that follow in the Dockerfile will be executed in
# that directory.
WORKDIR ./drf_src

RUN ls .

# Install the required packages, including psycopg2 dependencies
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev postgresql-dev \
    && apk add postgresql-client
RUN apk add git
# Get the Real World example app
RUN git clone https://github.com/Neakio/Airnote.git /drf_src


# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip
RUN pip install -r /drf_src/Backend/requirements.txt

VOLUME /drf_src/Backend
