from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.models.user_models import offices, atms, Base
#from database.db import drop_everything
from params import config as env
import json
import random
URL = f'postgresql+psycopg2://{env.DBUSER}:{env.DBPASSWORD}@{env.DBHOST}:{env.DBPORT}/{env.DBNAME}'
engine = create_engine(URL, echo=False)

#drop_everything(engine)
#Base.metadata.create_all(engine)

def parse():
    Session = sessionmaker(bind=engine)
    session = Session()
    try:
        with open("database/offices.json") as file:
            data = json.load(file)
            for i in data:
                if i["suoAvailability"] == "Y": # замена suoAvailability в bool
                if i["suoAvailability"] == "Y": # замена suoAvailability в bool
                    i["suoAvailability"] = True
                else:
                    i["suoAvailability"] = False 
                    
                if i["hasRamp"] == "Y": # замена hasRamp в bool
                    i["suoAvailability"] = False 
                    
                if i["hasRamp"] == "Y": # замена hasRamp в bool
                    i["hasRamp"] = True
                else:
                    i["hasRamp"] = False
                    
                if i["status"] == "открытая": # замена status в bool
                    i["status"] = True
                else:
                    i["status"] = False
                    
                if i["rko"] == "есть РКО": # замена в rko в bool
                    i["rko"] = True
                else:
                    i["rko"] = False
                # станции метро в лист
                # опции
                
                # замена openHours в адекватный вид
                
                new = {"пн":[], "вт":[], "ср":[], "чт":[], "пт":[], "сб":[], "вс":[]}
                tt = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
                ttt = {"пн": "Понедельник","вт": "Вторник","ср": "Среда","чт": "Четверг","пт": "Пятница","сб": "Суббота","вс": "Воскресенье"}
                for j in i["openHours"]:
                    if(j["days"] == "Не обслуживает ЮЛ"):
                        for k in tt:
                            new[k] = []
                            
                    elif(j["hours"] != "выходной"):
                        t1 = 0
                        t2 = 0
                        for u in j["hours"][:5].split(':'):
                            t1 = 60 * t1 + int(u)
                        for u in j["hours"][6:].split(':'):
                            t2 = 60 * t2 + int(u)
                        
                        if len(j["days"]) > 2:
                            if j["days"][2] == '-':
                                start = j["days"][:2]
                                stop = j["days"][3:]
                                bb = False
                                for k in tt:
                                    if start == k:
                                        bb = True
                                    if bb:
                                        new[k].append(t1)
                                        new[k].append(t2)
                                    if stop == k:
                                        break
                            elif j["days"][2] == ',':
                                new[j["days"][:2]].append(t1)
                                new[j["days"][:2]].append(t2)
                                new[j["days"][3:]].append(t1)
                                new[j["days"][3:]].append(t2)
                            
                        else:
                            if j["hours"] == "выходной":
                                new[j["days"]] = []
                            else:
                                new[j["days"]].append(t1)
                                new[j["days"]].append(t2)
                    elif j["hours"] == "выходной":
                        if len(j["days"]) > 2:
                            if j["days"][2] == '-':
                                start = j["days"][:2]
                                stop = j["days"][3:]
                                bb = False
                                for k in tt:
                                    if start == k:
                                        bb = True
                                    if bb:
                                        new[k] = []
                                    if stop == k:
                                        break
                            elif j["days"][2] == ',':
                                new[j["days"][:2]] = []
                                new[j["days"][3:]] = []
                            
                        else:
                            if j["hours"] == "выходной":
                                new[j["days"]] = []
                            else:
                                new[j["days"]] = []
                    
                for k in tt:
                    new[k].sort()                
                i["openHours"] = [new]
                
                
                
                # Добавление openHoursStr для фронта
                
                s = []
                for k in tt:
                    st = []
                    temp = new[k]
                    if temp == []:
                        st = "Выходной"
                    else:
                        for l in range(0,len(temp)-1,2):
                            st.append(str('{:02d}:{:02d}'.format(*divmod(temp[l], 60))) + '-' + str('{:02d}:{:02d}'.format(*divmod(temp[l+1], 60))))
                    
                    s.append({"day": ttt[k],"openHours": st})
                
                new = []
                l = 0
                m = 1
                run = 1
                temp = s[l]["day"]
                temptime = s[l]["openHours"]
                while(m <= len(s) and l <= len(s)):
                    if(s[l]["openHours"] == "Выходной"):
                        new.append({"day": s[l]["day"], "openHours": s[l]["openHours"]})
                        l = m
                        m += 1
                        run = 1
                    else:
                        if (s[l]["openHours"] == s[m]["openHours"] and s[l]["openHours"] != "Выходной"):
                            temp = s[l]["day"] + " - " + s[m]["day"]
                            temptime = s[m]["openHours"]
                            m += 1
                            run += 1
                        elif s[l]["openHours"] != s[m]["openHours"]:
                            if run == 1:
                                new.append({"day": s[l]["day"], "openHours": s[l]["openHours"]})
                            else:
                                new.append({"day": temp, "openHours": temptime})
                            l = m
                            m += 1
                            run = 1
                    
                i["openHoursStr"] = new
                
                
                
                # замена openHoursIndividual в адекватный вид
                
                new = {"пн":[], "вт":[], "ср":[], "чт":[], "пт":[], "сб":[], "вс":[]}
                tt = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
                ttt = {"пн": "Понедельник","вт": "Вторник","ср": "Среда","чт": "Четверг","пт": "Пятница","сб": "Суббота","вс": "Воскресенье"}
                #if i["address"] == "125040, г. Москва, Ленинградский пр-т, д. 34":
                #    print("YOU")
                #    print(i["openHours"])
                for j in i["openHoursIndividual"]:
                    if(j["days"] == "Не обслуживает ФЛ"):
                        for k in tt:
                            new[k] = []
                    elif(j["hours"] != "выходной"):
                        t1 = 0
                        t2 = 0
                        for u in j["hours"][:5].split(':'):
                            t1 = 60 * t1 + int(u)
                        
                        for u in j["hours"][6:].split(':'):
                            t2 = 60 * t2 + int(u)
                        
                        if len(j["days"]) > 2:
                            if j["days"][2] == '-':
                                start = j["days"][:2]
                                stop = j["days"][3:]
                                bb = False
                                for k in tt:
                                    if start == k:
                                        bb = True
                                    if bb:
                                        new[k].append(t1)
                                        new[k].append(t2)
                                    if stop == k:
                                        break
                            elif j["days"][2] == ',':
                                new[j["days"][:2]].append(t1)
                                new[j["days"][:2]].append(t2)
                                new[j["days"][3:]].append(t1)
                                new[j["days"][3:]].append(t2)
                            
                        else:
                            if j["hours"] == "выходной":
                                new[j["days"]] = []
                            else:
                                new[j["days"]].append(t1)
                                new[j["days"]].append(t2)
                        
                    elif j["hours"] == "выходной":
                        if len(j["days"]) > 2:
                            if j["days"][2] == '-':
                                start = j["days"][:2]
                                stop = j["days"][3:]
                                bb = False
                                for k in tt:
                                    if start == k:
                                        bb = True
                                    if bb:
                                        new[k] = []
                                    if stop == k:
                                        break
                            elif j["days"][2] == ',':
                                new[j["days"][:2]] = []
                                new[j["days"][3:]] = []
                            
                        else:
                            if j["hours"] == "выходной":
                                new[j["days"]] = []
                            else:
                                new[j["days"]] = []   
                for k in tt:
                    new[k].sort()                
                i["openHoursIndividual"] = [new]
                
                
                
                # Добавление openHoursIndividualStr для фронта
                
                s = []
                for k in tt:
                    st = []
                    temp = new[k]
                    if temp == []:
                        st = "Выходной"
                    else:
                        for l in range(0,len(temp)-1,2):
                            st.append(str('{:02d}:{:02d}'.format(*divmod(temp[l], 60))) + '-' + str('{:02d}:{:02d}'.format(*divmod(temp[l+1], 60))))
                    s.append({"day": ttt[k],"openHours": st})
                new = []
                l = 0
                m = 1
                run = 1
                temp = s[l]["day"]
                temptime = s[l]["openHours"]
                nn = [{'day': 'Понедельник', 'openHours': ['10:00-22:00']}, {'day': 'Вторник', 'openHours': ['10:00-22:00']}, {'day': 'Среда', 'openHours': ['10:00-22:00']}, 
                      {'day': 'Четверг', 'openHours': ['10:00-22:00']}, {'day': 'Пятница', 'openHours': ['10:00-22:00']}, {'day': 'Суббота', 'openHours': ['10:00-22:00']}, {'day': 'Воскресенье', 'openHours': ['10:00-22:00']}]
                if(s == nn):
                    new = [{'day': 'Понедельник - Воскресенье', 'openHours': ['10:00-22:00']}]
                else:
                    while(m <= len(s) and l <= len(s)):
                        if(s[l]["openHours"] == "Выходной"):
                            if(l == len(s)-1 and m == len(s) and s[l]["openHours"] != "Выходной"):
                                break
                            new.append({"day": s[l]["day"], "openHours": s[l]["openHours"]})
                            l = m
                            m += 1
                            run = 1
                        else:
                            if(l == len(s) or m == len(s)):
                                new.append({"day": s[l]["day"], "openHours": s[l]["openHours"]})
                                break
                            if (s[l]["openHours"] == s[m]["openHours"] and s[l]["openHours"] != "Выходной"):
                                if(l == len(s)-2 and m == len(s)-1):
                                    temp = s[l]["day"] + " - " + s[m]["day"]
                                    temptime = s[m]["openHours"]
                                    temptime = s[m]["openHours"]
                                    new.append({"day": temp, "openHours": temptime})
                                    break
                                temp = s[l]["day"] + " - " + s[m]["day"]
                                temptime = s[m]["openHours"]
                                m += 1
                                run += 1
                            elif s[l]["openHours"] != s[m]["openHours"]:
                                if run == 1:
                                    new.append({"day": s[l]["day"], "openHours": s[l]["openHours"]})
                                    l += 1
                                else:
                                    new.append({"day": temp, "openHours": temptime})
                                l = m
                                if(m != len(s)-1):
                                    m += 1
                                run = 1
                
                
                if new == [{'day': 'Понедельник - Пятница', 'openHours': ['09:00-19:00']}, {'day': 'Суббота', 'openHours': ['10:00-17:00']}, {'day': 'Воскресенье', 'openHours': 'Выходной'}, {'day': 'Воскресенье', 'openHours': 'Выходной'}]:
                    new = [{'day': 'Понедельник - Пятница', 'openHours': ['09:00-19:00']}, {'day': 'Суббота', 'openHours': ['10:00-17:00']}, {'day': 'Воскресенье', 'openHours': 'Выходной'}]   
                i["openHoursIndividualStr"] = new
                
                my_list = []
                file1 = open("database/services.txt", "r")
                lines = file1.readlines()
                l = random.randint(0, len(lines)-1)
                r = random.randint(0, len(lines)-1)
                if(r < l):
                    temp = l
                    l = r
                    r = temp
                for m in range(l,r):
                    my_list.append(lines[random.randint(0, len(lines)-1)].strip())
                    
                i["services"] = list(set(my_list))
                
                
                
                # замена metroStation в нормальный вид
                
                tmp = []
                if(i["metroStation"] == None or i["metroStation"] == '0'):
                    i["metroStation"] = []
                else:
                    tmp = i["metroStation"].split(", ")
                    if(tmp[0] == "Москва"):
                        tmp = tmp[1:]
                    
                    ans = []
                    for l in tmp:
                        ans.append(l.split(" (")[0])
                    tmp = ans      
                    for j in range(0,len(tmp)-1):
                        #if(tmp[j].startswith("hello") and tmp[j].endswith(")"))
                        if(tmp[j].find("линия") or tmp[j].find("диаметр")):
                            tmp = tmp[0:j] + tmp[j+1:]
                        if(tmp[j].find("метро") or tmp[j].find("станция")):
                            tmp[j] = ' '.join(tmp[j].split()[1:])
                            
                if(tmp == ['']):
                    tmp = ans            
                i["metroStation"] = list(set(tmp)) 
                
                
                  
                # перегон json в строку в бд
                
                session.add(offices(**i))    
                session.commit()
        print(f"Данные успешно импортированы в таблицу {offices.__tablename__}.")
    except Exception as e:
        session.rollback()
        print(e)
        
                # перегон json в бд для atm
    try: 
                # перегон json в бд для atm
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

    
#parse()