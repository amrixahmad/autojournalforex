from fastapi import APIRouter,Depends,File,UploadFile,HTTPException
from sqlalchemy.orm import Session
from typing import List
import schemas
import config.token as _token
import config.database as _db
from autojournal.autojournal_service import AutoJournalService

router = APIRouter(prefix="/api/autojournal",tags=["Autojournal"])

@router.get("/all")
async def get_all_autojournals(
    user: schemas.User = Depends(_token.get_current_user),
    db: Session = Depends(_db.get_db)
    ):
    return await AutoJournalService.get_all_autojournals(user=user,db=db)

@router.post("")
async def create_autojournal(   
    image: UploadFile = File(...),
    user: schemas.User = Depends(_token.get_current_user),
    db: Session = Depends(_db.get_db)
    ):
    return await AutoJournalService.create_autojournal(image,user,db)

@router.delete("/{autojournal_id}")
async def delete_autojournal(
    autojournal_id: int,
    user: schemas.User = Depends(_token.get_current_user),
    db: Session = Depends(_db.get_db)
    ):
    return await AutoJournalService.delete_autojournal(autojournal_id=autojournal_id,user=user,db=db)
