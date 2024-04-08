import schemas,models
from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime
from chatgpt_app.chatgpt_services import OpenAIResponse

class ForexCoachService:
    async def create_forex_coach(forex_coach: schemas.ForexCoachCreate,user: schemas.User,db: Session):
        forex_coach = models.ForexCoach(prompt=forex_coach.prompt,
                                        response=OpenAIResponse().chatgpt(message=forex_coach.prompt),
                                        owner_id=user.id)
        db.add(forex_coach)
        db.commit()
        db.refresh(forex_coach)
        return schemas.ForexCoach.from_orm(forex_coach)

    async def _forex_coach_selector(forex_coach_id: int,user: schemas.User,db: Session):
        try:  
            db_forex_coach = (db.query(models.ForexCoach)
                    .filter(models.ForexCoach.owner_id==user.id)
                    .filter(models.ForexCoach.id==forex_coach_id)
                    .first())
        except:
            raise HTTPException(status_code=404,detail="forex_coach not found :(")
        
        return db_forex_coach

    # async def update_forex_coach(
    #     forex_coach_id: int,
    #     forex_coach: schemas.ForexCoachCreate,
    #     user: schemas.User,
    #     db: Session):
    #     db_forex_coach = await ForexCoachService._forex_coach_selector(forex_coach_id,user,db)
    #     db_forex_coach.prompt = forex_coach.prompt
    #     db_forex_coach.date_updated = datetime.utcnow()
    #     db.commit()
    #     db.refresh(db_forex_coach)
    #     return schemas.forex_coach.from_orm(db_forex_coach)

    async def get_all_user_forex_coach(user: schemas.User,db: Session):
        return db.query(models.ForexCoach).filter(models.ForexCoach.owner_id==user.id).all()

    async def get_user_forex_coach(forex_coach_id: int,user: schemas.User,db: Session):
        return await ForexCoachService._forex_coach_selector(forex_coach_id,user,db)

    async def delete_user_forex_coach(forex_coach_id: int,user: schemas.User,db: Session):
        db_forex_coach = await ForexCoachService._forex_coach_selector(forex_coach_id,user,db)
        db.delete(db_forex_coach)
        db.commit()
        return {"forex_coach was deleted successfully :)"}