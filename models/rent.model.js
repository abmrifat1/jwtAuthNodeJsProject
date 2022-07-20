
module.exports = (sequelize, Sequelize) => {
    const Rent = sequelize.define("rent",
        {
            rentId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false
            },
            ownerId: {
                type: Sequelize.UUID,
                allowNull: true
            },
            rentType: {
                type: Sequelize.INTEGER, // 1: req, 2: rent
                allowNull: false
            },
            district: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false
            },
            roadNumber: {
                type: Sequelize.STRING,
                allowNull: true
            },
            houseNumber: {
                type: Sequelize.STRING,
                allowNull: true
            },
            seatType: {
                type: Sequelize.INTEGER,  // flat, floor, room, seat
                allowNull: false
            },
            floorNumber: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            seatNumber: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            bedRoomNumber: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            bathRoomNumber: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            balconyNumber: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            size: {
                type: Sequelize.STRING,
                allowNull: true
            },
            seatDescription: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            condition: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            requiredGender: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            requiredReligion: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            availableDate: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            contractNumber: {
                type: Sequelize.STRING,
                allowNull: false
            },
            additionalContractNumber: {
                type: Sequelize.STRING,
                allowNull: true
            },
            facebookId: {
                type: Sequelize.STRING,
                allowNull: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true
            },
            postingDate: {
                type: Sequelize.DATEONLY,
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

    return Rent;
};