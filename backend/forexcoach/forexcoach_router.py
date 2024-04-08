from fastapi import APIRouter,HTTPException,Depends
from sqlalchemy.orm import Session
from typing import List
import schemas
import config.token as _token
import config.database as _db
from forexcoach.forexcoach_service import ForexCoachService

router = APIRouter(prefix="/api/forex_coach",tags=["Forex Coach"])

@router.post("",response_model=schemas.ForexCoachCreate)
async def create_forex_coach(
    forex_coach: schemas.ForexCoachCreate,
    user: schemas.User = Depends(_token.get_current_user),
    db: Session = Depends(_db.get_db)
    ):
    return await ForexCoachService.create_forex_coach(forex_coach,user,db)

@router.get("/all",response_model=List[schemas.ForexCoach])
async def get_forex_coaches(
    user: schemas.User = Depends(_token.get_current_user),
    db: Session = Depends(_db.get_db)
    ):
    return await ForexCoachService.get_all_user_forex_coach(user=user,db=db)

# @router.put("/{forex_coach_id}",response_model=schemas.ForexCoach)
# async def update_user_ForexCoach(
#     forex_coach_id: int,
#     forex_coach: schemas.ForexCoachCreate,
#     user: schemas.User = Depends(_token.get_current_user),
#     db: Session = Depends(_db.get_db)
#     ):
#     return await ForexCoachService.update_forex_coach(forex_coach_id,forex_coach,user,db)

@router.get("/{forex_coach_id}",response_model=schemas.ForexCoach)
async def get_ForexCoach(
    forex_coach_id: int,
    user: schemas.User = Depends(_token.get_current_user),
    db: Session = Depends(_db.get_db)
    ):
    return await ForexCoachService.get_user_forex_coach(forex_coach_id,user,db)

@router.delete("/{forex_coach_id}")
async def delete_ForexCoach(
    forex_coach_id: int,
    user: schemas.User = Depends(_token.get_current_user),
    db: Session = Depends(_db.get_db)
    ):
    return await ForexCoachService.delete_user_forex_coach(forex_coach_id,user,db)