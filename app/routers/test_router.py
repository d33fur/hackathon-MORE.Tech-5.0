from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from database import db
from database.models import user_models

from schemas.schemas import ATMsList, BranchModel, BranchesList, UserCoordinates
from services.test_service import *
from services import geo, ai



test_router = APIRouter()

bert_path = 'saved_weights_1_cpu.pt'# in app folder
ai_search = ai.BERT_search(bert_path)

'''
@test_router.get('/test', response_model=TestShema)
async def route_registration() -> JSONResponse:
    data = TestShema(test_param="this is test param")
    return JSONResponse(dict(data), status_code=status.HTTP_200_OK)
'''

@test_router.get('/get_branches', response_model=BranchesList)
async def get_branches() -> JSONResponse:
    #Session = db.sessionmaker(bind=db.engine)
    #session = Session()
    with db.sessionmaker(bind=db.engine)() as session:
        branches = session.query(user_models.offices).all()
    
    branches = list(map(lambda x: x.to_json_scheme(), branches))

    #branches.sort(key=geo.DistanceSorter(user_cords.latitude, user_cords.longitude))
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
    data = []
    return JSONResponse(dict(data), status_code=status.HTTP_200_OK)

@test_router.get('/search')
async def search(query:str) -> JSONResponse:
    data = ai_search.predict(query)
    return JSONResponse(data[:5], status_code=status.HTTP_200_OK)