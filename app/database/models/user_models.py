from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    String,
    Boolean,
    TIMESTAMP,
    MetaData,
    create_engine,
    VARCHAR,
    FLOAT,
    ARRAY,
    PickleType
)
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.mutable import MutableList
from schemas import schemas


Base = declarative_base()

class offices(Base): #отделения банка
    __tablename__ = 'offices'

    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    salePointName = Column(String(200), nullable=False)
    address = Column(String(200), nullable=False)
    salePointCode = Column(String(100), nullable=True, default='null')
    status = Column(Boolean, nullable=True, default='null')
    openHours = Column(JSONB)
    openHoursStr = Column(JSONB)
    rko = Column(Boolean, nullable=True, default='null')
    network = Column(String(100), nullable=True, default='null')
    openHoursIndividual = Column(JSONB)
    openHoursIndividualStr = Column(JSONB)
    officeType = Column(String(100), nullable=False)
    salePointFormat = Column(String(200), nullable=False)
    salePointFormat = Column(String(100), nullable=False)
    suoAvailability = Column(Boolean, nullable=True) # Y/N
    hasRamp = Column(Boolean, nullable=True) # Y/N
    latitude = Column(FLOAT, nullable=False)
    longitude = Column(FLOAT, nullable=False)
    metroStation = Column(JSONB)
    distance = Column(Integer, nullable=False)
    kep = Column(Boolean, default=False) # квалифицированный сертификат электронной подписи для бизнеса на USB-токене с поддержкой NFC
    myBranch = Column(Boolean, nullable=True)
    services = Column(JSONB)
    averageQueueTime = Column(JSONB)
    currentQueue = Column(JSONB)

    def to_json_scheme(self):
        return schemas.BranchModel(
            id = self.id,
            salePointName = self.salePointName,
            address = self.address,
            salePointCode = self.salePointCode,
            status = self.status,
            openHours = dict(self.openHours[0]),
            rko = self.rko,
            network = self.network,
            openHoursIndividual = dict(self.openHoursIndividual[0]),
            officeType = self.officeType,
            salePointFormat = self.salePointFormat,
            suoAvailability = self.suoAvailability,
            hasRamp = self.hasRamp,
            latitude = self.latitude,
            longitude = self.longitude,
            metroStation = self.metroStation or [],
            distance = self.distance,
            kep = self.kep,
            myBranch = self.myBranch,
            services = self.services,
            averageQueueTime = self.averageQueueTime,
            currentQueue = self.currentQueue
        )

    
class atms(Base): #банкоматы
    __tablename__ = 'atms'

    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    address = Column(String(200), nullable=False)
    latitude = Column(FLOAT, nullable=False)
    longitude = Column(FLOAT, nullable=False)
    allDay = Column(Boolean, nullable=True)
    
#class banks(Base): #отделения банка
#    tablename = 'banks'
#
#    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
#    full_name = Column(String(200), nullable=False)
#    name = Column(String(100), nullable=False)
#    regionn = Column(String(100), nullable=False)
#    city = Column(String(100), nullable=False)
#    division_format = Column(String(100), nullable=False)
#    address = Column(String(200), nullable=False)
#    subordination = Column(String(300), nullable=False)
#    affiliation_by_central_bank = Column(String(200), nullable=False)
#    working_hours = Column(String(100), nullable=False)
#    format = Column(String(100), nullable=False)
#    vip = Column(String(100), nullable=True)
#    premium = Column(String(100), nullable=True)
#    safe_deposit = Column(String(100), nullable=False)
#    code_biscuit = Column(Integer, nullable=False)
#    options = Column(String(500), nullable=True, default='')
