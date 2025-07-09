function getDefaultProfilePhoto(username) {
  const initial = username?.[0]?.toUpperCase() || 'U';
  return `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(initial)}&background=ffe5e5&color=ff6666&length=1&format=svg`;
}

export default getDefaultProfilePhoto;