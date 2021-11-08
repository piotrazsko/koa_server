FROM mongo

WORKDIR /app

COPY . /app




EXPOSE 27017

# CMD ["python", "index.py"]
