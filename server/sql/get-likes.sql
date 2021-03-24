select (select count(*) from weramble.likes where post = ${post})as likes,
    ( select count(*) as liked from weramble.likes where post = ${post} and username = ${username} ) as liked