from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.models.user_models import offices, atms, Base
from database.db import drop_everything
import params.config as env
import json

URL = f'postgresql+psycopg2://{env.DBUSER}:{env.DBPASSWORD}@{env.DBHOST}:{env.DBPORT}/{env.DBNAME}'
engine = create_engine(URL, echo=False)
drop_everything(engine)
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()


try:
    with open("offices.json") as file:
        data = json.load(file)
        for i in data:
            session.add(offices(**i))   
            session.commit()
    print(f"Данные успешно импортированы в таблицу {offices.__tablename__}.")
except Exception as e:
    session.rollback()
    print(e)
    
try:
    with open("atms.json") as file:
        data = json.load(file)
        for i in data["atms"]:
            session.add(atms(**i))   
            session.commit()
    print(f"Данные успешно импортированы в таблицу {atms.__tablename__}.")
except Exception as e:
    session.rollback()
    print(e)

session.close()
