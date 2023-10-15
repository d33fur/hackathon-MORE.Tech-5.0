from typing import List, Dict, Optional
from pydantic import BaseModel


class BranchModel(BaseModel):
    id: int
    salePointName: Optional [str] = ''
    address: Optional [str] = ''
    salePointCode: Optional[str] = None
    status: Optional [str] = 'закрытая'
    openHours: Optional[ Dict[str, List[int]]] = {'пн': [], 'вт': [], 'ср': [], 'чт': [], 'пт': [], 'сб': [], 'вс': []}
    rko: Optional [bool] = False
    network: Optional[str] = None
    openHoursIndividual: Optional [Dict[str, List[int]]] = {'пн': [], 'вт': [], 'ср': [], 'чт': [], 'пт': [], 'сб': [], 'вс': []}
    officeType: str
    salePointFormat: str
    suoAvailability: bool
    hasRamp: bool
    latitude: float
    longitude: float
    metroStation:  List[str]
    distance:int = 0
    kep: bool # квалицифированная электронная подпись
    myBranch: bool = False
    services: Optional [List[str]] = []
    averageQueueTime: List[List[int]] = [[0 for _ in range(24)] for _ in range(7)]
    currentQueue: Optional [List[int]] = []


class ATMModel(BaseModel):
    id: int
    address: str
    latitude: float
    longitude: float
    allDay: bool
    services: List[str]
    averageQueueTime: Optional [List[List[int]]] # время ожидания в очереди на каждый час дня недели, если час нерабочий пишем 0


class BranchesList(BaseModel):
    branches: List[BranchModel]


class ATMsList(BaseModel):
    atms: List[ATMModel]

class UserCoordinates(BaseModel):
    latitude: float
    longitude: float
