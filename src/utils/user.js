export function isGuest(user) {
  return user && user.role === 'guest';
}

export function isNormal(user) {
  return user && user.role !== 'admin';
}

export function isAdmin(user) {
  return user && user.role === 'admin';
}

export function isTutor(user) {
  return user && user.role === 'tutor';
}

export function isFollowerOf(followedUser, followingUser) {
  if (!followedUser || !followingUser) return undefined;
  return followedUser.followers.indexOf(followingUser._id) > -1;
}
