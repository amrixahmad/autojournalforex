from fastapi import APIRouter,HTTPException,Depends
from sqlalchemy.orm import Session
from typing import List
import schemas
import config.token as _token
import config.database as _db
from forexchat.forex_chat_service import ForexChatService

router = APIRouter(prefix="/api/forex_chat",tags=["Forex Coach"])

@router.post("",response_model=schemas.ForexChatCreate)
async def create_forex_chat(
    forex_chat: schemas.ForexChatCreate,
    user: schemas.User = Depends(_token.get_current_user),
    db: Session = Depends(_db.get_db)
    ):
    return await ForexChatService.create_forex_chat(forex_chat,user,db)

@router.get("/all",response_model=List[schemas.ForexChat])
async def get_forex_chats(
    user: schemas.User = Depends(_token.get_current_user),
    db: Session = Depends(_db.get_db)
    ):
    return await ForexChatService.get_all_user_forex_chat(user=user,db=db)

# @router.put("/{forex_chat_id}",response_model=schemas.ForexChat)
# async def update_user_ForexChat(
#     forex_chat_id: int,
#     forex_chat: schemas.ForexChatCreate,
#     user: schemas.User = Depends(_token.get_current_user),
#     db: Session = Depends(_db.get_db)
#     ):
#     return await ForexChatService.update_forex_chat(forex_chat_id,forex_chat,user,db)

@router.get("/{forex_chat_id}",response_model=schemas.ForexChat)
async def get_forex_chat(
    forex_chat_id: int,
    user: schemas.User = Depends(_token.get_current_user),
    db: Session = Depends(_db.get_db)
    ):
    return await ForexChatService.get_user_forex_chat(forex_chat_id,user,db)

@router.delete("/{forex_chat_id}")
async def delete_forex_chat(
    forex_chat_id: int,
    user: schemas.User = Depends(_token.get_current_user),
    db: Session = Depends(_db.get_db)
    ):
    return await ForexChatService.delete_user_forex_chat(forex_chat_id,user,db)