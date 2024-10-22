import AddOn from "../model/AddOn"
import Agent from "../model/Agent"
import AgentProfile from "../model/AgentProfile"
import CourseChapterPoints from "../model/CourseChapterPoints"
import CourseChapters from "../model/CourseChapters"
import Courses from "../model/Courses"
import JobApplicants from "../model/JobApplicants"
import JobPost from "../model/JobPost"
import Package from "../model/Packages"
import Subscription from "../model/Subscription"
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


    // Define the association for agent and agent profile
    Agent.hasOne(AgentProfile, { foreignKey: 'agent_id', as: 'profile' });
    AgentProfile.belongsTo(Agent, { foreignKey: 'agent_id' });

    JobApplicants.belongsTo(User, {
        foreignKey: "user_uuid",
        as: "applicant_user",
        targetKey: "uuid"
    })
    User.hasMany(JobApplicants, {
        foreignKey: "user_uuid",
        as: "applied_for",
        sourceKey: "uuid"
    })

    JobApplicants.belongsTo(JobPost, {
        foreignKey: "job_post_uuid",
        as: "applicant_job",
        targetKey: "uuid"
    })

    JobPost.hasMany(JobApplicants, {
        foreignKey: "job_post_uuid",
        as: "job_applicants",
        sourceKey: "uuid"
    })

    Agent.hasMany(Subscription, { foreignKey: 'agent_uuid' });
    Subscription.belongsTo(Agent, { foreignKey: 'agent_uuid' });

    Package.hasMany(Subscription, { foreignKey: 'package_uuid' });
    Subscription.belongsTo(Package, { foreignKey: 'package_uuid' });

    Subscription.hasMany(AddOn, { foreignKey: 'subscription_uuid' });
    AddOn.belongsTo(Subscription, { foreignKey: 'subscription_uuid' });

}
export default associateModels