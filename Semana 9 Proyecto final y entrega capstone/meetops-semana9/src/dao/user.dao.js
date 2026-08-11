import { UserModel } from "../models/user.model.js";

/** Acceso crudo a Mongo — solo habla con el model. */
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
