from fastapi import FastAPI
from user import userrouter
from auth import authrouter
from forexchat import forex_chat_router
from autojournal import autojournal_router
from config.database import create_db

app = FastAPI()

create_db()

app.include_router(userrouter.router)
app.include_router(authrouter.router)
app.include_router(forex_chat_router.router)
app.include_router(autojournal_router.router)

@app.get("/index")
def index():
    return {"message":"Hello World!"}