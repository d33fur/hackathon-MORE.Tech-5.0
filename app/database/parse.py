from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.models.user_models import offices, atms, Base
from params import confing as env
import json


URL = f'postgresql+psycopg2://{env.DBUSER}:{env.DBPASSWORD}@{env.DBHOST}:{env.DBPORT}/{env.DBNAME}'
engine = create_engine(URL)

def parse():
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        with open("database/offices.json") as file:
            data = json.load(file)
            for i in data:
                if i["suoAvailability"] == "Y":
                    i["suoAvailability"] = True
                else:
                    i["suoAvailability"] = False
                
                if i["hasRamp"] == "Y":
                    i["hasRamp"] = True
                else:
                    i["hasRamp"] = False
                session.add(offices(**i))   
                session.commit()
        print(f"Данные успешно импортированы в таблицу {offices.__tablename__}.")
    except Exception as e:
        session.rollback()
        print(e)
        
    try:
        with open("database/atms.json") as file:
            data = json.load(file)
            for i in data["atms"]:
                session.add(atms(**i))   
                session.commit()
        print(f"Данные успешно импортированы в таблицу {atms.__tablename__}.")
    except Exception as e:
        session.rollback()
        print(e)

    session.close()
