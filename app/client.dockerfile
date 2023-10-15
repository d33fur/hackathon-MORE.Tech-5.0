FROM --platform=linux/amd64 tiangolo/meinheld-gunicorn:latest

WORKDIR /app

COPY ./requirements.txt ./requirements.txt

RUN pip install -r requirements.txt 

COPY . .

CMD ["python3", "client.py", "-u"]
#CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:7000", "client:app"]
#CMD ["python3", "client.app"]