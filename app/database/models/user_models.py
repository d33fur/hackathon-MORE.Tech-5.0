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
    FLOAT
)
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
import params.config as env
from sqlalchemy.dialects.postgresql import JSONB

Base = declarative_base()

class offices(Base): #отделения банка
    __tablename__ = 'offices'

    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    salePointName = Column(String(200), nullable=False)
    address = Column(String(200), nullable=False)
    salePointCode = Column(String(100), nullable=True, default='null')
    status = Column(String(100), nullable=False)
    openHours = Column(JSONB)
    rko = Column(String(100), nullable=True)
    network = Column(String(100), nullable=True, default='null')
    openHoursIndividual = Column(JSONB)
    officeType = Column(String(100), nullable=False)
    salePointFormat = Column(String(200), nullable=False)
    salePointFormat = Column(String(100), nullable=False)
    suoAvailability = Column(String(100), nullable=True) # Y/N
    hasRamp = Column(String(100), nullable=True) # Y/N
    latitude = Column(FLOAT, nullable=False)
    longitude = Column(FLOAT, nullable=False)
    metroStation = Column(String(200), nullable=True)
    distance = Column(Integer, nullable=False)
    kep = Column(Boolean, nullable=True) # квалифицированный сертификат электронной подписи для бизнеса на USB-токене с поддержкой NFC
    myBranch = Column(Boolean, nullable=True)
    
class atms(Base): #банкоматы
    __tablename__ = 'atms'

    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    address = Column(String(200), nullable=False)
    latitude = Column(FLOAT, nullable=False)
    longitude = Column(FLOAT, nullable=False)
    allDay = Column(Boolean, nullable=True)
    services = Column(JSONB)
