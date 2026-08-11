/**
 * TODO: mapear user → objeto seguro SIN password.
 * Campos: id, first_name, last_name, email, role
 */
export class UserDTO {
  constructor(user) {
    // TODO: asignar campos públicos
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.role = user.role;
  }

  static from(user) {
    return user ? new UserDTO(user) : null;
  }

  static many(users) {
    return users.map((user) => UserDTO.from(user));
  }
}
