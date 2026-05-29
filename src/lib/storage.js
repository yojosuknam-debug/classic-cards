const KEY = 'classic-cards-data'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function getFavorites() {
  return load().favorites || []
}

export function toggleFavorite(cardId) {
  const data = load()
  const favs = data.favorites || []
  const idx = favs.indexOf(cardId)
  if (idx === -1) {
    data.favorites = [...favs, cardId]
  } else {
    data.favorites = favs.filter(id => id !== cardId)
  }
  save(data)
  return data.favorites
}

export function isFavorite(cardId) {
  return getFavorites().includes(cardId)
}

export function getNote(cardId) {
  return (load().notes || {})[cardId] || ''
}

export function setNote(cardId, text) {
  const data = load()
  data.notes = { ...(data.notes || {}), [cardId]: text }
  save(data)
}

export function getAllNotes() {
  return load().notes || {}
}

export function getUnlockedPacks() {
  return 'all'
}

export function isPackUnlocked(_packId) {
  return true
}
