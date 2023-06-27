from pydantic import BaseModel
from typing import List, Optional

class Features(BaseModel):
    user_id : str
    area_nm : str
    year	: int
    month	: int
    day : int
    hour : int
    restaurant_category_list : Optional[List[str]]  # Optional[List[str]]로 정의
    hotplaces_category_list : Optional[List[str]]