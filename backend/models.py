from sqlalchemy import Boolean, Column, Integer, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import passlib.hash as _hash

from config.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer,primary_key=True,index=True)
    email = Column(String(120),unique=True,nullable=False)
    hashed_password = Column(String,nullable=False)
    is_active = Column(Boolean,default=True)
    username = Column(String(120),default="")
    date_created = Column(DateTime,default=datetime.now(timezone.utc))
    date_updated = Column(DateTime,default=datetime.now(timezone.utc))

    forexchats = relationship("ForexChat",back_populates="owner")
    autojournals = relationship("AutoJournal",back_populates="owner")

    def verify_password(self,password: str):
        return _hash.bcrypt.verify(password,self.hashed_password)


class ForexChat(Base):
    __tablename__ = "forexchats"
    id = Column(Integer,primary_key=True,index=True)
    owner_id = Column(Integer,ForeignKey("users.id"))
    image_url = Column(String,nullable=True)
    # prompt = Column(String(240),nullable=False)
    response = Column(String(240),nullable=True)
    date_created = Column(DateTime,default=datetime.now(timezone.utc))
    date_updated = Column(DateTime,default=datetime.now(timezone.utc))

    owner = relationship("User",back_populates="forexchats")

class AutoJournal(Base):
    __tablename__ = "autojournals"
    id = Column(Integer,primary_key=True,index=True)
    owner_id = Column(Integer,ForeignKey("users.id"))
    trade_image_url = Column(String,nullable=False)
    journal_entry = Column(String)
    date_created = Column(DateTime,default=datetime.now(timezone.utc))
    date_updated = Column(DateTime,default=datetime.now(timezone.utc))

    owner = relationship("User",back_populates="autojournals")



