from pydantic import BaseModel
from datetime import datetime

class AutoJournalBase(BaseModel):
    pass

class AutoJournalCreate(AutoJournalBase):
    pass

class AutoJournal(AutoJournalBase):
    id: int
    owner_id: int
    trade_image_url: str
    journal_entry: str = None
    date_created: datetime
    date_updated: datetime

    class Config:
        orm_mode = True

class ForexCoachBase(BaseModel):
    prompt: str    

class ForexCoachCreate(ForexCoachBase):
    pass

class ForexCoach(ForexCoachBase):
    id: int
    owner_id: int
    response: str = None
    date_created: datetime
    date_updated: datetime

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class UserProfile(BaseModel):
    username: str

class User(UserBase):
    id: int
    is_active: bool
    username: str
    date_created: datetime
    date_updated: datetime

    class Config:
        orm_mode = True