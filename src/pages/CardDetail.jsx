import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'
import CardView from '../components/CardView'
import { getCardById } from '../lib/cards'
import { isPackUnlocked } from '../lib/storage'

export default function CardDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const card = getCardById(id)

  if (!card) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <p className="font-sans text-ink-400">카드를 찾을 수 없어요.</p>
        <button onClick={() => navigate(-1)} className="font-sans text-sm text-gold-400">돌아가기</button>
      </div>
    )
  }

  const unlocked = card.isFree || isPackUnlocked(card.packId)

  return (
    <div className="flex flex-col px-4 pt-4 pb-24">
      <button onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-ink-400 hover:text-ink-200
                   transition-colors mb-5 self-start">
        <ArrowLeft size={18} />
        <span className="font-sans text-sm">뒤로</span>
      </button>

      {unlocked ? (
        <>
          <CardView card={card} showActions />
          {/* 태그 클릭 → 상황 필터 */}
          <div className="mt-4">
            <p className="font-sans text-xs text-ink-500 mb-2">같은 상황의 다른 카드</p>
            <div className="flex flex-wrap gap-2">
              {card.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => navigate(`/filter/${encodeURIComponent(tag)}`)}
                  className="px-3 py-1.5 rounded-full bg-ink-800 border border-ink-700
                             hover:border-gold-400/50 text-xs font-sans text-ink-300
                             hover:text-gold-400 transition-colors"
                >
                  #{tag} 카드 더보기
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 py-16">
          <div className="w-16 h-16 rounded-full bg-ink-800 flex items-center justify-center">
            <Lock size={28} className="text-ink-500" />
          </div>
          <div className="text-center">
            <p className="font-serif text-2xl text-ink-400 mb-1">{card.originalText}</p>
            <p className="font-sans text-sm text-ink-500">이 카드는 잠겨 있어요</p>
          </div>
          <button onClick={() => navigate('/store')}
            className="px-6 py-3 rounded-xl bg-gold-400/10 border border-gold-400
                       font-sans text-sm text-gold-400 hover:bg-gold-400/20 transition-colors">
            팩 전체 보기
          </button>
        </div>
      )}
    </div>
  )
}
