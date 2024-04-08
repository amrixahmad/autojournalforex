from sqlalchemy.orm import Session
import models,schemas
import passlib.hash as _hash
from datetime import datetime

class UserService:
    async def get_users(db: Session):
        db_users = db.query(models.User).all()
        return list(map(schemas.User.from_orm,db_users))

    async def get_user_by_email(email: str,db: Session):
        return db.query(models.User).filter(models.User.email==email).first()

    async def create_user(user: schemas.UserCreate,db: Session):
        db_user = models.User(
            email=user.email,
            hashed_password=_hash.bcrypt.hash(user.password))
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    async def authenticate_user(email: str,password: str,db: Session):
        user = await UserService.get_user_by_email(email,db)

        if not user:
            return False
        if not user.verify_password(password):
            return False
        
        return user

    async def update_user_profile(
        user_profile: schemas.UserProfile,
        user: schemas.User,
        db: Session
        ):
        profile_user = (db.query(models.User)
                        .filter(models.User.id==user.id)
                        .first())
        profile_user.username = user_profile.username    
        profile_user.date_updated = datetime.utcnow()
        db.commit()
        db.refresh(profile_user)
        return schemas.User.from_orm(profile_user)


    async def delete_user(user: schemas.User,db: Session):
        db_user = db.query(models.User).filter(models.User.id==user.id).first()
        db.delete(db_user)
        db.commit()
        return "User successfully deleted"