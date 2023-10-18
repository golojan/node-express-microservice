export default {
    applications: {
        database: 'postgres',
        prisma: {
            enable: true,
            url: process.env.DATABASE_URL,
        },
        redis: {
            enable: false,
            host: "",
            port: "",
            password: "",
            db: ""
        },
        elastic: {
            enable: false,
            host: "",
            port: "",
            user: "",
            password: ""
        },
        kafka: {
            enable: false,
            host: "",
            port: "",
            user: "",
            password: ""
        },
    },
    databases: {
        postgres: {
            enable: false,
            host: "",
            port: "",
            user_database: "",
            user_collection: ""
        }
    }
};
