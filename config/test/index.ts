export default {
    applications: {
        database: 'postgres',
        prisma: {
            enable: true,
            url: process.env.DATABASE_URL,
        }
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
