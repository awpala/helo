INSERT INTO users (
    username,
    password,
    profile_picture
) VALUES (
    ${username},
    ${password},
    ${profile_picture}
)
RETURNING user_id, username;