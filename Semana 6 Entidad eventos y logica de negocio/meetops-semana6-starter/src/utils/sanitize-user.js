export const sanitizeUser = (user) => {
  const doc = user?.toObject ? user.toObject() : { ...user };
  delete doc.password;
  return doc;
};
