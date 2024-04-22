module.exports = {
    dialect: 'postgres',
    /*  url: 'postgresql://postgres:EPUzKAqqLcMCzssytlsOBbupDSjrzdqn@viaduct.proxy.rlwy.net:35443/railway', */

    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'codeburguerapi',
    define: {
        timespamps: true,
        underscored: true,
        underscoredAll: true
    }
}