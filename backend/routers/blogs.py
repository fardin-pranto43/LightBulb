from fastapi import APIRouter, Depends
from models import Blog
from database import get_collection
from exception import BE_Exception as exception

router = APIRouter(prefix="/blogs", tags=["blogs"])


def get_blog_collection():
    return get_collection('blogs')


@router.post("/",response_model=Blog)
async def create_blog(blog: Blog, collection=Depends(get_blog_collection)):
    blog_dict = blog.dict(by_alias=True)
    
    # check if it got any issues with user id
    if blog_dict["uid"] is None:
        raise exception.BadRequest
    
    users = get_collection("users")
    user = await users.find_one({"_id": blog_dict["uid"]})
    if user is None:
        raise exception.UserNotFound
    
    # check if the user belngs to the given community id
    if blog_dict["commid"] is not None:
        community = await get_collection("communities").find_one({"_id": blog_dict["commid"]})
        if community is None:
            raise exception.CommunityNotFound
        if blog_dict["uid"] not in community["memberlist"]:
            raise exception.UserNotInCommunity
        
    result = await collection.insert_one(blog_dict)
    blog_dict["_id"] = result.inserted_id
    return blog_dict

@router.get("/{blog_id}",response_model=Blog)
async def get_blog(blog_id: str, collection=Depends(get_blog_collection)):
    blog = await collection.find_one({"_id": blog_id})
    if blog is None:
        raise exception.NotFound
    return blog


@router.put("/{blog_id}",response_model=Blog)
async def update_blog(blog_id: str, blog: Blog, collection=Depends(get_blog_collection)):
    blog_dict = blog.dict(by_alias=True)
    
    if blog_dict is None or blog_dict["_id"] is None:
        raise exception.BadRequest
    
    blog = await collection.find_one({"_id": blog_id})
    if blog["uid"] != blog_dict["uid"]:
        raise exception.BadRequest
    
    if blog["commid"] != blog_dict["commid"]:
        raise exception.BadRequest
    
    result = await collection.replace_one({"_id": blog_id}, blog_dict)
    if result.modified_count == 0:
        raise exception.NotFound
    return blog_dict

@router.delete("/{blog_id}",response_model=Blog)
async def delete_blog(blog_id: str, collection=Depends(get_blog_collection)):
    blog = await collection.find_one({"_id": blog_id})
    if blog is None:
        raise exception.NotFound
    await collection.delete_one({"_id": blog_id})
    return blog

@router.get("/",response_model=list[Blog])
async def get_blogs(collection=Depends(get_blog_collection)):
    blogs = []
    async for blog in collection.find():
        blogs.append(blog)
    return blogs


# In given api document, api endpoint is :"users/{user_id}/blogs"
# But in this method , the api endpoint is: "blogs/{user_id}/users"
# In user, use this method accordingly
@router.get("/{user_id}/users",response_model=list[Blog])
async def get_user_blogs(user_id: str, collection=Depends(get_blog_collection)):
    blogs = []
    async for blog in collection.find({"uid": user_id}):
        blogs.append(blog)
    return blogs

# In given api document, api endpoint is :"communities/{community_id}/blogs"
# But in this method , the api endpoint is: "blogs/{community_id}/communities"
# In community, use this method accordingly
@router.get("/{community_id}/communities",response_model=list[Blog])
async def get_community_blogs(community_id: str, collection=Depends(get_blog_collection)):
    blogs = []
    async for blog in collection.find({"commid": community_id}):
        blogs.append(blog)
    return blogs
