from fastapi import APIRouter,HTTPException,Depends
from sqlalchemy.orm import Session
from typing import List
import schemas
from user.userservice import UserService
import config.token as _token
import config.database as _db

router = APIRouter(prefix="/api/users",tags=["Users"])

@router.get("/all",response_model=List[schemas.User])
async def get_users(db: Session = Depends(_db.get_db)):
    return await UserService.get_users(db)

@router.post("")
async def create_user(user: schemas.UserCreate,db: Session = Depends(_db.get_db)):
    check_user = await UserService.get_user_by_email(user.email,db)
    if check_user:
        raise HTTPException(status_code=401,detail="User already exists")
    user = await UserService.create_user(user,db)
    return await _token.create_token(user)

@router.put("",response_model=schemas.User)
async def update_user_profile(
    user_profile: schemas.UserProfile,
    user: schemas.User = Depends(_token.get_current_user),
    db: Session = Depends(_db.get_db)
    ):
    return await UserService.update_user_profile(user_profile,user,db)

@router.get("/me",response_model=schemas.User)
async def get_current_user(user: schemas.User = Depends(_token.get_current_user)):
    return user

@router.delete("",status_code=201)
async def delete_user(
    user: schemas.User = Depends(_token.get_current_user),
    db: Session = Depends(_db.get_db)):
    return await UserService.delete_user(user,db)

