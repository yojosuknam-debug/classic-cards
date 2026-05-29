import sunziData from '../content/sunzi-core.json'
import analectsData from '../content/analects-core.json'
import hanfeiziData from '../content/hanfeizi-core.json'
import meditationsData from '../content/meditations-core.json'
import caigentanData from '../content/caigentan-core.json'
import stratagems36Data from '../content/36stratagems-core.json'
import rumiData from '../content/rumi-core.json'
import senecaData from '../content/seneca-core.json'
import talmudData from '../content/talmud-core.json'
import gitaData from '../content/gita-core.json'
import gorinData from '../content/gorinnosho-core.json'

const _allCards = [
  ...sunziData.cards,
  ...analectsData.cards,
  ...hanfeiziData.cards,
  ...meditationsData.cards,
  ...caigentanData.cards,
  ...stratagems36Data.cards,
  ...rumiData.cards,
  ...senecaData.cards,
  ...talmudData.cards,
  ...gitaData.cards,
  ...gorinData.cards,
]

export function getAllCards() {
  return _allCards
}

export function getCardById(id) {
  return _allCards.find(c => c.id === id) || null
}

export function getCardsByTag(tag) {
  return _allCards.filter(c => c.tags.includes(tag))
}

export function getCardsByType(strategyType) {
  return _allCards.filter(c => c.strategyType === strategyType)
}

export function getCardsByPack(packId) {
  return _allCards.filter(c => c.packId === packId)
}

export function getDailyCard() {
  const day = Math.floor(Date.now() / 86400000)
  return _allCards[day % _allCards.length]
}

export const SITUATION_TAGS = [
  { id: '협상',      label: '협상',      emoji: '🤝' },
  { id: '의사결정',  label: '의사결정',  emoji: '🧭' },
  { id: '리더십',    label: '리더십',    emoji: '👑' },
  { id: '위기관리',  label: '위기관리',  emoji: '🛡️' },
  { id: '인간관계',  label: '인간관계',  emoji: '🫂' },
  { id: '자기관리',  label: '자기관리',  emoji: '🎯' },
  { id: '학습·성장', label: '학습·성장', emoji: '📈' },
  { id: '전략·경쟁', label: '전략·경쟁', emoji: '⚡' },
]
