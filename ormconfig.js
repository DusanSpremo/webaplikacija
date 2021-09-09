module.exports = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'dusanspremo17',
    password: process.env.DB_PASSWORD || 'password1',
    database: process.env.DB_NAME || 'Aplikacija',
    charset: 'utf8',
    driver: 'mysql',
    synchronize: false ,
    entities:[
        "src/entity/**/*.ts"
    ],
    logging: true ,
    migrations: ["src/migration/**/*.ts"],
    cli: {
      migrationsDir: "migration"
    },
    connectTimeout: 30000,
    acquireTimeout: 30000
  };