from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from database import db
from database.models import user_models

from schemas.schemas import ATMsList, BranchModel, BranchesList
from services.test_service import *


test_router = APIRouter()

'''
@test_router.get('/test', response_model=TestShema)
async def route_registration() -> JSONResponse:
    data = TestShema(test_param="this is test param")
    return JSONResponse(dict(data), status_code=status.HTTP_200_OK)
'''

@test_router.get('/get_test_branches', response_model=BranchesList)
async def get_test_branches() -> JSONResponse:
    branch = BranchModel(id=0,
                        salePointName = "ДО «ГУМ» Филиала № 7701 Банка ВТБ (ПАО)",
                        address = "Г. Москва, Красная площадь, д. 3",
                        status = "открытая",
                        openHours = {'пн': [600, 1140], 'вт': [600, 1140], 'ср': [600, 1140], 'чт': [600, 1140], 'пт': [600, 1080], 'сб': [], 'вс': []},
                        rko = True,
                        openHoursIndividual = {'пн': [600, 1140], 'вт': [600, 1140], 'ср': [600, 1140], 'чт': [600, 1140], 'пт': [600, 1080], 'сб': [], 'вс': []},
                        officeType = 'Да (Зона Привилегия)',
                        salePointFormat = "Универсальный",
                        suoAvailability = True,
                        hasRamp= True ,
                        latitude=55.766045,
                        longitude=37.638081,
                        metroStation = [
                            "Октябрьская (Кольцевая линия)",
                            "Октябрьская (Калужско-Рижская линия)",
                            "Шаболовская (Калужско-Рижская линия)",
                        ],
                        kep=False,
                        services=['Сопровождение ипотечных и автокредитов'],
                        averageQueueTime = [
                            [0, 0, 0, 0, 1, 0, 2, 5, 5, 5, 3, 4, 6, 7, 12, 5, 6, 4, 9, 12,10, 4, 0, 0],
                            [0, 0, 0, 0, 1, 0, 2, 5, 5, 5, 3, 4, 6, 7, 12, 5, 6, 4, 9, 12,10, 4, 0, 0],
                            [0, 0, 0, 0, 1, 0, 2, 5, 5, 5, 3, 4, 6, 7, 12, 5, 6, 4, 9, 12,10, 4, 0, 0],
                            [0, 0, 0, 0, 1, 0, 2, 5, 5, 5, 3, 4, 6, 7, 12, 5, 6, 4, 9, 12,10, 4, 0, 0],
                            [0, 0, 0, 0, 1, 0, 2, 5, 5, 5, 3, 4, 6, 7, 12, 5, 6, 4, 9, 12,10, 4, 0, 0],
                            [0, 0, 0, 0, 1, 0, 2, 5, 5, 5, 3, 4, 6, 7, 12, 5, 6, 4, 9, 12,10, 4, 0, 0],
                            [0, 0, 0, 0, 3000, 0, 2, 5, 5, 5, 3, 4, 6, 7, 12, 5, 6, 4, 9, 12,10, 4, 0, 0]
                        ],
                        currentQueue = [1045, 1055, 1100]
                        )
    branches = [branch]
    data = BranchesList(branches=branches)
    return JSONResponse(data.json(), status_code=status.HTTP_200_OK)

@test_router.get('/get_branches', response_model=BranchesList)
async def get_branches() -> JSONResponse:
    with db.sessionmaker(bind=db.engine)() as session:
        branches = session.query(user_models.offices).all()
    
    branches = list(map(lambda x: x.to_json_scheme(), branches))
    data = BranchesList(branches=branches)
    return JSONResponse(data.json(), status_code=status.HTTP_200_OK)

@test_router.get('/get_atms', response_model=ATMsList)
async def get_atms() -> JSONResponse:
    with db.sessionmaker(bind=db.engine)() as session:
        atms = session.query(user_models.atms).all()
    
    atms = list(map(lambda x: x.to_json_scheme(), atms))
    data = ATMsList(atms=atms)

    return JSONResponse(data.json(), status_code=status.HTTP_200_OK)

@test_router.post('/add_to_queue')
async def add_to_queue() -> JSONResponse:
    atms.add
    atms = []
    data = ATMsList(atms=atms)
    return JSONResponse(dict(data), status_code=status.HTTP_200_OK)

