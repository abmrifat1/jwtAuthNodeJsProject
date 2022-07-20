
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", 
        {
            userId: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                autoIncrement: false
            },
            userType: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            ownerId: {
                type: Sequelize.UUID,
                allowNull: true
            },
            fullName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            gender: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: false
            },
            facebookId: {
                type: Sequelize.STRING,
                allowNull: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true
            },
            permanentDistrict: {
                type: Sequelize.STRING,
                allowNull: false
            },
            currentDistrict: {
                type: Sequelize.STRING,
                allowNull: false
            },
            currentUpazila: {
                type: Sequelize.STRING,
                allowNull: false
            },
            profession: {
                type: Sequelize.STRING,
                allowNull: false
            },
            instituteName: {
                type: Sequelize.STRING,
                allowNull: true
            },
            religion: {
                type: Sequelize.STRING,
                allowNull: false
            },
            dateOfBirth: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            pin: {
                type: Sequelize.STRING,
                allowNull: false
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            }
        },
        {                  
            schema: 'user_service',
            timestamps: false
        }   
    );
  
    return User;
};