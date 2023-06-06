import requests
import json

def detail_search(contentId, contentTypeId):
    url = 'http://apis.data.go.kr/B551011/KorService1/detailIntro1'
    params = {'numOfRows': 100,
        'MobileOS' : 'WIN',
        'MobileApp' : 'StandUP',
        '_type' : 'json',
        'contentId' : contentId, 
        'contentTypeId' : contentTypeId,
        'serviceKey' : 'servicekey'}
    data = requests.get(url, params = params)
    return data.json()

def return_items(contentId, contentTypeId):
    result = detail_search(contentId, contentTypeId)
    result = result['response']['body']['items']['item'][0]

    usefee = result.get('usefee')  # 값이 없으면 None으로 설정
    infocenterculture = result.get('infocenterculture')
    usetimeculture = result.get('usetimeculture')
    restdateculture = result.get('restdateculture')
    parkingculture = result.get('parkingculture')
    chkbabycarriageculture = result.get('chkbabycarriageculture')
    chkpetculture = result.get('chkpetculture')
    chkcreditcardculture = result.get('chkcreditcardculture')

    return usefee, infocenterculture, usetimeculture, restdateculture, parkingculture, chkbabycarriageculture, chkpetculture, chkcreditcardculture