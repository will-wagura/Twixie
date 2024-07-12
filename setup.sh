#!/usr/bin/env bash

pipenv install && pipenv shell
cp .env.example .env
source .env
flask db migrate -m "Initial migration"
flask db upgrade head
python3 seed.py
