import Sequelize, { Model } from "sequelize";


class Products extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            price: Sequelize.INTEGER,
            path: Sequelize.STRING,
            offer:Sequelize.BOOLEAN,
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return `https://codeburguerapi-production-89b1.up.railway.app/product-file/${this.path}`
                }
            }
        },
            {
                sequelize
            }

        )

        return this

    }

    static associate(models) {

        this.belongsTo(models.Category,
            {
                foreignKey: 'category_id',
                as: 'category'
            })

    }



}

export default Products