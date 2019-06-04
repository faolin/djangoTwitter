# pull official base image
FROM python:3.5

# set work directory
WORKDIR /home/francois/Documents/app_twitter_learning/back/

# set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
RUN pip install pipenv
COPY ./Pipfile /home/francois/Documents/app_twitter_learning/back/Pipfile
RUN pipenv install --skip-lock --system --dev

# copy project
COPY . /home/francois/Documents/app_twitter_learning/back/
