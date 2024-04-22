import schemas,models
from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import datetime
from chatgpt_app.chatgpt_services import OpenAIResponse

class ForexChatService:
    async def create_forex_chat(forex_chat: schemas.ForexChatCreate,user: schemas.User,db: Session):
        forex_chat = models.ForexChat(                                        
                                        prompt=forex_chat.prompt,
                                        response=OpenAIResponse().chatgpt(message=forex_chat.prompt),
                                        owner_id=user.id)
        db.add(forex_chat)
        db.commit()
        db.refresh(forex_chat)
        return schemas.ForexChat.from_orm(forex_chat)

    async def _forex_chat_selector(forex_chat_id: int,user: schemas.User,db: Session):
        try:  
            db_forex_chat = (db.query(models.ForexChat)
                    .filter(models.ForexChat.owner_id==user.id)
                    .filter(models.ForexChat.id==forex_chat_id)
                    .first())
        except:
            raise HTTPException(status_code=404,detail="forex_chat not found :(")
        
        return db_forex_chat

    # async def update_forex_chat(
    #     forex_chat_id: int,
    #     forex_chat: schemas.ForexChatCreate,
    #     user: schemas.User,
    #     db: Session):
    #     db_forex_chat = await ForexChatService._forex_chat_selector(forex_chat_id,user,db)
    #     db_forex_chat.prompt = forex_chat.prompt
    #     db_forex_chat.date_updated = datetime.utcnow()
    #     db.commit()
    #     db.refresh(db_forex_chat)
    #     return schemas.forex_chat.from_orm(db_forex_chat)

    async def get_all_user_forex_chat(user: schemas.User,db: Session):
        return db.query(models.ForexChat).filter(models.ForexChat.owner_id==user.id).all()

    async def get_user_forex_chat(forex_chat_id: int,user: schemas.User,db: Session):
        return await ForexChatService._forex_chat_selector(forex_chat_id,user,db)

    async def delete_user_forex_chat(forex_chat_id: int,user: schemas.User,db: Session):
        db_forex_chat = await ForexChatService._forex_chat_selector(forex_chat_id,user,db)
        db.delete(db_forex_chat)
        db.commit()
        return {"forex chat was deleted successfully :)"}