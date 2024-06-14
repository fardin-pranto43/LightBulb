from fastapi import APIRouter, HTTPException, Depends, Path, Query
from typing import List
from bson import ObjectId
from models import UserCreate, UserDB
from database import get_collection

router = APIRouter(prefix="/users", tags=["users"])


def get_users_collection():
    return get_collection('users')


@router.post("/", response_model=UserDB)
async def create_user(user: UserCreate, collection=Depends(get_users_collection)):
    existing_user = await collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_dict = user.dict()
    result = await collection.insert_one(user_dict)
    created_user = await collection.find_one({"_id": result.inserted_id})
    return UserDB(**created_user)


@router.get("/{uid}", response_model=UserDB)
async def get_user_by_id(uid: str = Path(..., title="User ID"), collection=Depends(get_users_collection)):
    user = await collection.find_one({"_id": ObjectId(uid)})
    if user:
        return UserDB(**user)
    else:
        raise HTTPException(status_code=404, detail="User not found")


@router.put("/{uid}", response_model=UserDB)
async def update_user(uid: str, user_data: UserCreate, collection=Depends(get_users_collection)):
    existing_user = await collection.find_one({"_id": ObjectId(uid)})
    if existing_user:
        await collection.update_one({"_id": ObjectId(uid)}, {"$set": user_data.dict()})
        updated_user = await collection.find_one({"_id": ObjectId(uid)})
        return UserDB(**updated_user)
    else:
        raise HTTPException(status_code=404, detail="User not found")


@router.delete("/{uid}", response_model=dict)
async def delete_user(uid: str, collection=Depends(get_users_collection)):
    delete_result = await collection.delete_one({"_id": ObjectId(uid)})
    if delete_result.deleted_count == 1:
        return {"status": "success", "message": "User deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="User not found")


@router.get("/", response_model=List[UserDB])
async def list_users(collection=Depends(get_users_collection)):
    cursor = collection.find({})
    # Adjust length as per your requirement
    users = await cursor.to_list(length=1000)
    return users


@router.get("/search", response_model=List[UserDB])
async def search_users(query: str = Query(..., title="Search Query"), collection=Depends(get_users_collection)):
    cursor = collection.find({
        "$or": [
            # Case-insensitive search by name
            {"name": {"$regex": query, "$options": "i"}},
            # Case-insensitive search by username
            {"username": {"$regex": query, "$options": "i"}}
        ]
    })
    # Adjust length as per your requirement
    users = await cursor.to_list(length=1000)
    return users


@router.get("/{uid}/followers", response_model=List[UserDB])
async def get_user_followers(uid: str = Path(..., title="User ID"), collection=Depends(get_users_collection)):
    user = await collection.find_one({"_id": ObjectId(uid)})
    if user:
        follower_ids = user.get("followers", [])
        followers = await collection.find({"_id": {"$in": follower_ids}}).to_list(length=1000)
        return followers
    else:
        raise HTTPException(status_code=404, detail="User not found")


@router.get("/{uid}/following", response_model=List[UserDB])
async def get_user_following(uid: str = Path(..., title="User ID"), collection=Depends(get_users_collection)):
    user = await collection.find_one({"_id": ObjectId(uid)})
    if user:
        following_ids = user.get("following", [])
        following = await collection.find({"_id": {"$in": following_ids}}).to_list(length=1000)
        return following
    else:
        raise HTTPException(status_code=404, detail="User not found")
