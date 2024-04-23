import schemas,models
from sqlalchemy.orm import Session
from fastapi import HTTPException,UploadFile,Form
import boto3
from botocore.exceptions import ClientError
from datetime import datetime
import config.token as _token
from chatgpt_app.chatgpt_services import OpenAIResponse

class ForexChatService:
    
    # Setting up S3 client
    s3_client = boto3.client('s3', region_name=_token.BUCKET_REGION,
                        aws_access_key_id=_token.AWS_ACCESS_KEY,
                        aws_secret_access_key=_token.AWS_SECRET_KEY)

    async def create_forex_chat(
                                # forex_chat: schemas.ForexChatCreate,
                                image: UploadFile,                                
                                user: schemas.User,
                                db: Session):
        
        file_content = await image.read()

        try: 
            ForexChatService.s3_client.put_object(Bucket=_token.BUCKET_NAME, Key=image.filename, Body=file_content)
            obj_url = f"https://{_token.BUCKET_NAME}.s3.{_token.BUCKET_REGION}.amazonaws.com/{image.filename}"            
            # print(obj_url)
        except ClientError as e:
            print("Unexpected error: ",e)

        db_chat = models.ForexChat(  
                                        image_url=obj_url,                                      
                                        # prompt=forex_chat.prompt,
                                        response=OpenAIResponse().visiongpt(trade_ss=obj_url),
                                        owner_id=user.id)
        db.add(db_chat)
        db.commit()
        db.refresh(db_chat)
        return schemas.ForexChat.from_orm(db_chat)

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