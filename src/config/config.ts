const config = {
    mongodb: {
        local: 'mongodb://127.0.0.1:27017/calendar',
        remote: 'mongodb://devchallenge:fullstack-5@cluster0-shard-00-00-qaqsy.mongodb.net:27017,cluster0-shard-00-01-qaqsy.mongodb.net:27017,cluster0-shard-00-02-qaqsy.mongodb.net:27017/MyDb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
    },
    secret: 'devchallenge',
};

export { config };
