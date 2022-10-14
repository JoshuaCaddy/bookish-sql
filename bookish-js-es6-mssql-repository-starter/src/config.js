
export const mssqlConnectionConfig = {
    user: 'sa',
    password: 'MyPass@word',
    server: '127.0.0.1', // You can use 'localhost\\instance' to connect to named instance
    database: 'bookish',
    options: {
        "enableArithAbort": true
    }
};

export const secret = 'bookish-secret';



