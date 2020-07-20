SELECT p.post_id, p.title, p.img, u.username, u.profile_picture
FROM posts AS p
JOIN users AS u
    ON p.author_id = u.user_id
WHERE u.user_id != $1
    AND p.title LIKE '%' || $2 || '%'
ORDER BY p.post_id;