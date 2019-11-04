export const errors = {
    // 400
    BAD_REQUEST_USER_ALREADY_EXIST: { // Error when user want register. But this user is already exists
        message: 'User already exist',
        code: 4001
    },

    //403
    FORBIDDEN_USER_BLOCKED: { // When user try to do something with blocked account
        message: 'User is blocked',
        code: 4031
    },

    //404
    NOT_FOUND_USER_NOT_PRESENT: { // When user wants login, but email not found in DB
        message: 'User is not found',
        code: 4041
    }
}
