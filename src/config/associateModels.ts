import CourseChapterPoints from "../model/CourseChapterPoints"
import CourseChapters from "../model/CourseChapters"
import Courses from "../model/Courses"
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

    Courses.hasMany(CourseChapters, {
        foreignKey: "course_uuid",
        as: "chapters",
        sourceKey: "uuid"
    })

    CourseChapters.belongsTo(Courses, {
        foreignKey: "course_uuid",
        as: "chapter_of",
        targetKey: "uuid"
    })

    CourseChapters.hasMany(CourseChapterPoints, {
        foreignKey: "chapter_uuid",
        as: "chapter_points",
        sourceKey: "uuid"
    })

    CourseChapterPoints.belongsTo(CourseChapters, {
        foreignKey: "chapter_uuid",
        as: "chapter_point_of",
        targetKey: "uuid"
    })

}
export default associateModels