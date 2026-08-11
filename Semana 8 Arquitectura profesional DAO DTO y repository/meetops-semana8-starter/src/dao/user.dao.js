import { UserModel } from "../models/user.model.js";

/**
 * TODO: implementar acceso a Mongo con UserModel.
 * Métodos esperados: create, findByEmail, findById, findAll
 */
export class UserDAO {
    create(data) {
        return UserModel.create(data);
    }

    findByEmail(email) {
        return UserModel.findOne({ email }).lean();
    }

    findById(id) {
        return UserModel.findById(id).lean();
    }

    findAll() {
        return UserModel.find().lean();
    }
}
