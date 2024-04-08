from http import client
from dotenv import load_dotenv
import os

load_dotenv()

client_id = os.getenv("AWSAccessKeyId")
client_secret = os.getenv("AWSSecretKey")

print(client_id,client_secret)