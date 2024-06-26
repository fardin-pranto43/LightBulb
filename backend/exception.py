from fastapi import HTTPException, status


class BE_Exception:
    def custom_exception(status_code, detail):
        return HTTPException(status_code=status_code, detail=detail)

    DbException = HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail='An error occured while accessing db')
    ServerException = HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                    detail='an unexpected error occured')
    BadRequest = HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='invaild request')
    NotFound = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='request could not be processed as required item was not found')
    CommunityNotFound = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail="Community not found")
    UserNotFound = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    UserNotInCommunity = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail="User not in community")
    AlreadyFollowing = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST, detail="Already following")
    TikzError = HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Error occurred during TikZ compilation or image conversion")
    ImageError = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    AlreadyLiked = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail="Already Liked")
    AlreadyInCommunity = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST, detail="Already in community")
    UserNotInCommunity = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST, detail="User not in community")