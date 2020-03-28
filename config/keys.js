const keys =
{
    google:
    {
        clientID: "349730490070-g6cnnj89uu135i7ojariqqvce1tjj5s8.apps.googleusercontent.com",
        clientSecret: "6v3GrZSMyjFRd0AM3mKltMjR"
    },
    slack:
    {
        clientID: '1029289714950.1015931563651',
        clientSecret: '383332885d72de7950c9302d1869513b'
    },
    spotify:
    {
        clientID: '6e9acca77540405fa449200282867ff2',
        clientSecret: '9e9704ab9cc34e28b62c926cf4d41925'
    },
    linkedin:
    {
        clientID: '861g3btz1qkjmp',
        clientSecret: '3t54I1K2wY1ipvOd'
    },
    github:
    {
        clientID: 'Iv1.c601515f6a41188b',
        clientSecret: '894eee9cd47b0e9916401bfcf17c38126d71190c'
    },
    postgresdb:
    {
        user: 'qoyhjqkxhdbncs',
        host: "ec2-174-129-24-148.compute-1.amazonaws.com",
        database: "daa2tq3828ika",
        password: "b382bd37261b5eb0bd16453b3b55eb52ec4d0cb7a16bc5b78aad894c1595af59",
        port: 5432,
        ssl: true
    },
    session: {
        cookieKey: 'thisismyuniquecookiekey'
    }
}
module.exports = keys;
