import User from "../model/User"
import VisaType from "../model/VisaType"



const associateModels = () => {

   
    // User.hasMany(Post, {
    //     foreignKey: "post_by",
    //     as: "posts",
    //     sourceKey: "uuid"
    // })

    // Post.belongsTo(User, {
    //     foreignKey: "post_by",
    //     as: "user",
    //     targetKey: "uuid"
    // })

    // User.belongsToMany(Category, {
    //     through: UserCategory,
    //     as: 'categories',
    //     foreignKey: "user_uuid",
    //     sourceKey: "uuid"
    // });

    // Category.belongsToMany(User, {
    //     through: UserCategory,
    //     as: 'users',
    //     foreignKey: "category_uuid",
    //     sourceKey: "uuid"
    // });


    // Blog.belongsToMany(VisaType,{
    //     through:BlogCategories,
    //     as: 'category',
    //     foreignKey: "category_uuid",
    //     otherKey:'blog_uuid',
    //     sourceKey: "uuid"
    // })


}
export default associateModels