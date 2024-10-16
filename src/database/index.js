/* import Sequelize from "sequelize";
import User from '../app/models/User.js' */
/* import mongoose from 'mongoose' */

/* import configDataBase from '../config/dataBase'
 *//* import Products from "../app/models/Products";
import Category from "../app/models/Category";
import mongoose from "mongoose";

const models = [User, Products, Category]

class Database {
    constructor() {
        this.init()
        this.mongo()
    }
    init() {
        this.connection = new Sequelize('postgresql://postgres:yHermoNvIgYSxeelkIFejUAKayukSKkE@junction.proxy.rlwy.net:40432/railway')
        models.map((model) => model.init(this.connection)).map(model => model.associate && model.associate(this.connection.models)) 
    }

    mongo() {
        this.mongoConnection = mongoose.connect('mongodb://mongo:ISltnxhtgHdcNogWnZnswXNJhUFzwusq@junction.proxy.rlwy.net:59516',
            {
                useNewUrlParser: true,
                 useUnifiedTopology: true   
            })
    }
}

export default new Database() */

import Sequelize from "sequelize";
import User from '../app/models/User.js';
import Products from "../app/models/Products.js";
import Category from "../app/models/Category.js";
import mongoose from "mongoose";

const models = [User, Products, Category];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize('postgresql://postgres:yHermoNvIgYSxeelkIFejUAKayukSKkE@junction.proxy.rlwy.net:40432/railway');
        models.map((model) => model.init(this.connection))
              .map((model) => model.associate && model.associate(this.connection.models));
    }

    mongo() {
        this.mongoConnection = mongoose.connect('mongodb://mongo:ISltnxhtgHdcNogWnZnswXNJhUFzwusq@junction.proxy.rlwy.net:59516')
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.log('Error connecting to MongoDB:', err));
    }
}

export default new Database();
