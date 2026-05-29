import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import packs from '../content/packs.json'
import { getCardsByPack } from '../lib/cards'

export default function Store() {
  const navigate = useNavigate()
  const totalCards = packs.reduce((s, p) => s + p.cardCount, 0)

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-24">
      <header>
        <h1 className="font-serif text-xl text-ink-100">카드덱 컬렉션</h1>
        <p className="font-sans text-xs text-ink-400 mt-1">총 {packs.length}개 고전 · {totalCards}수 · 전체 무료</p>
      </header>

      <div className="flex flex-col gap-4">
        {packs.map(pack => (
          <PackCard key={pack.id} pack={pack} navigate={navigate} />
        ))}
      </div>
    </div>
  )
}

function PackCard({ pack, navigate }) {
  const previewCards = getCardsByPack(pack.id).filter(c =>
    pack.previewCardIds.includes(c.id)
  )

  return (
    <div className="rounded-2xl border border-ink-700 overflow-hidden">
      <div className={`bg-gradient-to-r ${pack.color} p-5`}>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-2xl">{pack.emoji}</span>
            <h2 className="font-serif text-lg text-white mt-1">{pack.title}</h2>
            <p className="font-sans text-xs text-white/60 mt-0.5">{pack.source}</p>
          </div>
          <span className={`text-xs font-sans ${pack.accentColor} mt-1`}>
            {pack.cardCount}수
          </span>
        </div>
        <p className="font-sans text-xs text-white/70 mt-2 leading-relaxed">{pack.description}</p>
      </div>

      <div className="bg-ink-900 divide-y divide-ink-800">
        {previewCards.map(card => (
          <button
            key={card.id}
            onClick={() => navigate(`/card/${card.id}`)}
            className="w-full flex items-center justify-between px-4 py-3
                       hover:bg-ink-800 transition-colors text-left"
          >
            <div className="flex-1 min-w-0">
              <p className={`font-serif text-sm ${pack.accentColor}`}
                 style={{ direction: pack.scriptDir === 'rtl' ? 'rtl' : 'ltr' }}>
                {card.originalText}
              </p>
              <p className="font-sans text-xs text-ink-400 mt-0.5 line-clamp-2">{card.originalTextKo}</p>
            </div>
            <ChevronRight size={16} className="text-ink-600 flex-shrink-0 ml-2" />
          </button>
        ))}
      </div>
    </div>
  )
}
