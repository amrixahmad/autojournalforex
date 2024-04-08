from fastapi import APIRouter,HTTPException,Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import config.database as _db, config.token as _token
from user.userservice import UserService

router = APIRouter(prefix="/api/token",tags=["Authentication"])

@router.post("")
async def generate_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(_db.get_db)):
    user = await UserService.authenticate_user(form_data.username,form_data.password,db)
    if not user:
        raise HTTPException(status_code=401,detail="Invalid credentials")
    return await _token.create_token(user)