import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import test_router
from database.db import db_create
from services import ai

app: FastAPI = FastAPI()



@app.on_event('startup')
async def startup():
    db_create()

origins = [
    'http://localhost', 
    'http://localhost:8080', 
    'http://localhost:3000', 
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(
    test_router,
    prefix='/api',
    tags=['test']
)

if __name__ == '__main__':
    #app.run(host="0.0.0.0", port=7000, debug=True)
    uvicorn.run(app, host='0.0.0.0', port=7000)
