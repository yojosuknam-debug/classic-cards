import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'
import { getCardsByTag, SITUATION_TAGS } from '../lib/cards'
import { isPackUnlocked } from '../lib/storage'

export default function FilteredCards() {
  const { tag } = useParams()
  const navigate = useNavigate()

  const decodedTag = decodeURIComponent(tag)
  const tagInfo = SITUATION_TAGS.find(t => t.id === decodedTag)
  const cards = getCardsByTag(decodedTag)

  return (
    <div className="flex flex-col px-4 pt-6 pb-24 gap-5">
      <header className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-ink-400 hover:text-ink-200 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-2">
            {tagInfo && <span className="text-xl">{tagInfo.emoji}</span>}
            <h1 className="font-serif text-xl text-ink-100">{decodedTag}</h1>
          </div>
          <p className="font-sans text-xs text-ink-400">{cards.length}개 카드</p>
        </div>
      </header>

      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <p className="font-sans text-sm text-ink-500">이 상황에 맞는 카드가 아직 없어요</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {cards.map(card => {
            const unlocked = card.isFree || isPackUnlocked(card.packId)
            return (
              <button
                key={card.id}
                onClick={() => navigate(`/card/${card.id}`)}
                className="flex items-center justify-between p-4 rounded-xl
                           bg-ink-900 border border-ink-700 hover:border-ink-500
                           transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm text-gold-400">{card.originalText}</p>
                  <p className="font-sans text-xs text-ink-400 truncate mt-0.5">{card.originalTextKo}</p>
                  <p className="font-sans text-xs text-ink-600 mt-1">{card.source.work} · {card.source.chapter}</p>
                </div>
                {!unlocked && (
                  <Lock size={14} className="text-ink-600 flex-shrink-0 ml-2" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
