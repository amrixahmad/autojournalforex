from fastapi import HTTPException,UploadFile,File
import schemas,models
from sqlalchemy.orm import Session
import boto3
from botocore.exceptions import ClientError
from fastapi.encoders import jsonable_encoder
from pydantic import ValidationError
import config.token as _token
from chatgpt_app.chatgpt_services import OpenAIResponse

BUCKET_NAME = "autojournalforex"
BUCKET_REGION = "ap-southeast-1"

class AutoJournalService:
    # Setting up S3 client
    s3_client = boto3.client('s3', region_name=BUCKET_REGION,
                         aws_access_key_id=_token.AWS_ACCESS_KEY,
                         aws_secret_access_key=_token.AWS_SECRET_KEY)

    async def get_all_autojournals(user: schemas.User,db: Session):
        return db.query(models.AutoJournal).filter(models.AutoJournal.owner_id==user.id).all()    

    async def create_autojournal(
        image: UploadFile,
        user: schemas.User,
        db: Session
        ):
        print("autojournal endpoint was hit!")
        print(image.filename)
        print(image.content_type)
        file_content = await image.read()

        try: 
            AutoJournalService.s3_client.put_object(Bucket=BUCKET_NAME, Key=image.filename, Body=file_content)
            obj_url = f"https://{BUCKET_NAME}.s3.{BUCKET_REGION}.amazonaws.com/{image.filename}"            
            # print(obj_url)
        except ClientError as e:
            print("Unexpected error: ",e)
        
        db_autojournal = models.AutoJournal(
            owner_id=user.id,
            trade_image_url=obj_url,
            journal_entry=OpenAIResponse().journalgpt(obj_url))
        db.add(db_autojournal)
        db.commit()
        db.refresh(db_autojournal)
        return schemas.AutoJournal.from_orm(db_autojournal)
    
    async def _autojournal_selector(autojournal_id: int,user: schemas.User,db: Session):
        try:  
            db_autojournal = (db.query(models.AutoJournal)
                    .filter(models.AutoJournal.owner_id==user.id)
                    .filter(models.AutoJournal.id==autojournal_id)
                    .first())
        except:
            raise HTTPException(status_code=404,detail="journal entry not found :(")
        
        return db_autojournal
    
    async def get_user_autojournal(autojournal_id: int,user: schemas.User,db: Session):
        return await AutoJournalService._autojournal_selector(autojournal_id,user,db)

    async def delete_autojournal(
        autojournal_id: int,
        user: schemas.User,
        db: Session
        ):
        db_autojournal = (db.query(models.AutoJournal)
                        .filter(models.AutoJournal.owner_id == user.id)
                        .filter(models.AutoJournal.id == autojournal_id)
                        .first())
        db.delete(db_autojournal)
        db.commit()
        return "autojournal was deleted successfully!"