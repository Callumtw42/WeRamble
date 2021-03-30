select (select count(*) from weramble.follows where post = ${post})as follows,
    ( select count(*) as followed from weramble.follows where post = ${post} and username = ${username} ) as followed