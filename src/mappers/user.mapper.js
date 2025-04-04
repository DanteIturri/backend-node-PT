export const userMapResponse = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export const usersMapResponse = (users) => {
  return users.map( userMapResponse );
}