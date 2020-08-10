function deduplicateUsers(users) {
  const deduplicatedUsers = [];
  users.forEach((user) => {
    const userExists = deduplicatedUsers.some(
      (otherUser) => user.id === otherUser.id
    );

    if (!userExists) {
      deduplicatedUsers.push(user);
    }
  });

  return deduplicatedUsers;
}

module.exports = { deduplicateUsers };
