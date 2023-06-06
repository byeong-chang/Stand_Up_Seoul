import boto3
import os

def get_file_paths(folder_path):
    file_paths = []
    
    for root, directories, files in os.walk(folder_path):
        for file in files:
            file_path = os.path.join(root, file)
            file_paths.append(file_path)
    
    return file_paths

AWS_ACCESS_KEY_ID ="AWS_ACCESS_KEY_ID 입력"
AWS_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY 입력"
AWS_DEFAULT_REGION = "ap-northeast-2" # REGION 입력

s3 = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_DEFAULT_REGION
)

# 폴더 경로 설정
folder_path = 'C:/last_project/MangoPlate/images'

# 폴더 내의 파일 경로들을 가져옴
file_paths = get_file_paths(folder_path)

# 결과 출력
for path_ in file_paths:
    path_ = path_.replace('\\', '/')
    filePath, fileName = os.path.split(path_)
    with open(path_, 'rb') as file:
        s3.put_object(
            Body = file,
            Bucket = 'standupseoul',
            Key = 'restaurant/' + fileName,
            ContentType = 'image/jpg'
        )