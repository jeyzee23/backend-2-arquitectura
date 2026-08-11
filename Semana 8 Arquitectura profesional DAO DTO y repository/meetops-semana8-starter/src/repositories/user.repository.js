import { UserDAO } from "../dao/user.dao.js";

/**
 * TODO: delegar al DAO.
 * El service NO debe importar mongoose ni UserModel.
 */
export class UserRepository {
  constructor(dao = new UserDAO()) {
    this.dao = dao;
  }

  create(data) {
    return this.dao.create(data);
  }

  getByEmail(email) {
    return this.dao.findByEmail(email);
  }

  getById(id) {
    return this.dao.findById(id);
  }

  list() {
    return this.dao.findAll();
  }
}
