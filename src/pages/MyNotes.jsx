import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, StickyNote, ChevronRight } from 'lucide-react'
import { getFavorites, getAllNotes } from '../lib/storage'
import { getCardById, getAllCards } from '../lib/cards'

export default function MyNotes() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('favorites')
  const [favorites, setFavorites] = useState([])
  const [notes, setNotes] = useState({})

  useEffect(() => {
    setFavorites(getFavorites())
    setNotes(getAllNotes())
  }, [])

  const favCards = favorites.map(getCardById).filter(Boolean)
  const noteEntries = Object.entries(notes)
    .filter(([, text]) => text.trim())
    .map(([id, text]) => ({ card: getCardById(id), text }))
    .filter(e => e.card)

  return (
    <div className="flex flex-col px-4 pt-6 pb-24">
      <header className="mb-5">
        <h1 className="font-serif text-xl text-ink-100">내 노트</h1>
        <p className="font-sans text-xs text-ink-400 mt-1">즐겨찾기 {favCards.length} · 메모 {noteEntries.length}</p>
      </header>

      <div className="flex gap-1 bg-ink-900 rounded-xl p-1 mb-5">
        <TabButton active={tab === 'favorites'} onClick={() => setTab('favorites')}>
          <Heart size={14} /> 즐겨찾기
          {favCards.length > 0 && <span className="ml-1 text-ink-400">{favCards.length}</span>}
        </TabButton>
        <TabButton active={tab === 'notes'} onClick={() => setTab('notes')}>
          <StickyNote size={14} /> 메모
          {noteEntries.length > 0 && <span className="ml-1 text-ink-400">{noteEntries.length}</span>}
        </TabButton>
      </div>

      {tab === 'favorites' && (
        <div className="flex flex-col gap-2">
          {favCards.length === 0 ? (
            <EmptyState
              icon={<Heart size={32} className="text-ink-600" />}
              message="아직 즐겨찾기한 카드가 없어요"
              sub="카드 하단의 즐겨찾기 버튼을 눌러보세요"
            />
          ) : favCards.map(card => (
            <CardRow key={card.id} card={card} navigate={navigate} />
          ))}
        </div>
      )}

      {tab === 'notes' && (
        <div className="flex flex-col gap-3">
          {noteEntries.length === 0 ? (
            <EmptyState
              icon={<StickyNote size={32} className="text-ink-600" />}
              message="아직 메모한 카드가 없어요"
              sub="카드의 메모 버튼을 눌러 생각을 기록해보세요"
            />
          ) : noteEntries.map(({ card, text }) => (
            <button
              key={card.id}
              onClick={() => navigate(`/card/${card.id}`)}
              className="flex flex-col gap-2 p-4 rounded-xl bg-ink-900 border border-ink-700
                         hover:border-ink-500 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <p className="font-serif text-sm text-gold-400">{card.originalText}</p>
                <ChevronRight size={14} className="text-ink-500" />
              </div>
              <p className="font-sans text-xs text-ink-300 leading-relaxed line-clamp-2">{text}</p>
              <p className="font-sans text-xs text-ink-500">{card.source.work} · {card.source.chapter}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg
                  text-sm font-sans transition-colors
                  ${active ? 'bg-ink-700 text-ink-100' : 'text-ink-400 hover:text-ink-200'}`}
    >
      {children}
    </button>
  )
}

function CardRow({ card, navigate }) {
  return (
    <button
      onClick={() => navigate(`/card/${card.id}`)}
      className="flex items-center justify-between p-4 rounded-xl
                 bg-ink-900 border border-ink-700 hover:border-ink-500
                 transition-colors text-left"
    >
      <div className="flex-1 min-w-0">
        <p className="font-serif text-sm text-gold-400">{card.originalText}</p>
        <p className="font-sans text-xs text-ink-400 truncate mt-0.5">{card.originalTextKo}</p>
        <p className="font-sans text-xs text-ink-600 mt-1">{card.source.work}</p>
      </div>
      <ChevronRight size={16} className="text-ink-600 flex-shrink-0 ml-2" />
    </button>
  )
}

function EmptyState({ icon, message, sub }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      {icon}
      <p className="font-sans text-sm text-ink-400">{message}</p>
      <p className="font-sans text-xs text-ink-600 text-center">{sub}</p>
    </div>
  )
}
