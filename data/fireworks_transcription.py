import time
import pandas as pd
import time
import requests
import os

url = "https://audio-turbo.us-virginia-1.direct.fireworks.ai/v1/audio/transcriptions"

api_key = os.getenv('FIREWORKS_API_KEY') # your fireworks.ai api key here

data = {
    'model': 'whisper-v3-turbo',
    'response_format': 'json'
}
headers = {
    "Authorization": f"Bearer {api_key}"
}

# Download data from https://www.kaggle.com/datasets/louisteitelbaum/911-recordings/data
df = pd.read_csv('911_metadata.csv')
df.dropna(subset=['file_name'], inplace=True)
df = df[df['id']!=506] # drop call 506 since it's blank

# transcribe
start = time.time()
transcripts = []
for i in df['id']:
    files = {
        'file': open(f'911_recordings/call_{i}.mp3', 'rb')
    }
    response = requests.post(url, headers=headers, files=files, data=data)
    result = response.json()
    transcripts.append(result['text'])
    print("Transcribed Call: ", i)

print("Time Taken: ", time.time() - start)

# create and add transcripts column to df
transcripts = pd.Series(transcripts)
df['transcript'] = transcripts
df.dropna(subset=['transcript'], inplace=True)
df['false_alarm'].replace({1.0: 'Yes', 0.0: 'No'}, inplace=True)
df['potential_death'].replace({1.0: 'Yes', 0.0: 'No'}, inplace=True)

# save df
df.to_csv('911_transcripts.csv', index=False)
