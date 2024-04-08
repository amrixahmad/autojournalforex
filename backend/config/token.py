from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException,Depends
import jwt
from dotenv import load_dotenv
import os
import schemas,models
from sqlalchemy.orm import Session
import config.database as _db

oauth2schema = OAuth2PasswordBearer(tokenUrl="/api/token")
load_dotenv()
APP_SECRET_KEY = os.getenv("APP_SECRET_KEY")
AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

async def create_token(user: models.User):
    user_obj = schemas.User.from_orm(user)
    user_dict = user_obj.dict()
    del user_dict["date_created"]
    del user_dict["date_updated"]

    token = jwt.encode(user_dict,APP_SECRET_KEY)
    return dict(access_token=token,type="bearer")

async def get_current_user(
        db: Session = Depends(_db.get_db),
        token: str = Depends(oauth2schema)):
        try:
            payload = jwt.decode(token,APP_SECRET_KEY,algorithms=["HS256"])
            user = db.query(models.User).get(payload["id"])
        except:
            raise HTTPException(status_code=401,detail="Invalid credentials")
        
        return schemas.User.from_orm(user)