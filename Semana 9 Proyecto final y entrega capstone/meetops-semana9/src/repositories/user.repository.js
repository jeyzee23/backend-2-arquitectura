import { UserDAO } from "../dao/user.dao.js";

/**
 * Repository: orquesta el DAO y aplica reglas de persistencia.
 * El service no habla con mongoose directamente.
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
