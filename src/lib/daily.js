export function getDailyCard(cards) {
  if (!cards || cards.length === 0) return null
  const daysSinceEpoch = Math.floor(Date.now() / 86400000)
  return cards[daysSinceEpoch % cards.length]
}

export function getCardById(cards, id) {
  return cards.find(c => c.id === id) || null
}

export function getFreecards(cards) {
  return cards.filter(c => c.isFree)
}
