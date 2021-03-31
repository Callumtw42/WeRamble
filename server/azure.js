
const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
    authentication: {
        options: {
            userName: "callum",
            password: "0089fxcy?"
        },
        type: "default"
    },
    server: "weramble.database.windows.net",
    options: {
        database: "weramble",
        encrypt: true
    }
};

module.exports = {

    queryDatabase: (req, res, query, callback) => {
        const conn = new Connection(config);

        // Attempt to connect and execute queries if connection goes through
        conn.on("connect", err => {
            if (err) {
                console.error(err.message);
            } else {
                let results = [];
                console.log("Reading rows from the Table...");
                // Read all rows from table
                const request = new Request(
                    query,
                    (err, rowCount) => {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log(`${rowCount} row(s) returned`);
                        }
                    }
                );

                request.on("row", columns => {
                    let chunk = {};
                    columns.forEach(column => {
                        let key = column.metadata.colName
                        let value = column.value
                        chunk[key] = value;
                    });
                    results.push(chunk);
                    // console.log(chunk)
                });

                request.on("requestCompleted", columns => {
                    if (callback) callback();
                    else if (results.length > 0)
                        res.json(results);
                    else res.json([])
                    conn.close();
                });

                conn.execSql(request);
            }
        });
    }
}

