import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import CardView from '../components/CardView'
import { getDailyCard, SITUATION_TAGS } from '../lib/cards'
import diagnosisData from '../content/diagnosis.json'

export default function Home() {
  const navigate = useNavigate()

  const today = useMemo(() => {
    const d = new Date()
    return `${d.getMonth() + 1}월 ${d.getDate()}일`
  }, [])

  const dailyCard = useMemo(() => getDailyCard(), [])

  const savedTypeId = localStorage.getItem('diagnosisResult')
  const savedType = savedTypeId
    ? diagnosisData.resultTypes.find(t => t.id === savedTypeId)
    : null

  if (!dailyCard) return null

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-24">
      {/* 헤더 */}
      <header className="flex items-center justify-between">
        <div>
          <p className="font-sans text-xs text-ink-400 tracking-widest">{today}</p>
          <h1 className="font-serif text-xl text-ink-100 mt-0.5">오늘의 전략 한 수</h1>
        </div>
        {savedType ? (
          <button
            onClick={() => navigate('/diagnosis')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                       bg-ink-800 border border-ink-700 hover:border-ink-500 transition-colors"
          >
            <span className="text-base">{savedType.emoji}</span>
            <span className="font-sans text-xs text-ink-300">{savedType.label.split('—')[0].trim()}</span>
          </button>
        ) : (
          <button
            onClick={() => navigate('/diagnosis')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                       bg-gold-400/10 border border-gold-400/30 hover:border-gold-400/60 transition-colors"
          >
            <Sparkles size={14} className="text-gold-400" />
            <span className="font-sans text-xs text-gold-400">유형 진단</span>
          </button>
        )}
      </header>

      {/* 오늘의 카드 */}
      <CardView card={dailyCard} showActions />

      {/* 상황별 필터 */}
      <section>
        <h2 className="font-sans text-xs font-semibold text-ink-400 tracking-widest mb-3">
          지금 내 상황으로 찾기
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {SITUATION_TAGS.map(tag => (
            <button
              key={tag.id}
              onClick={() => navigate(`/filter/${encodeURIComponent(tag.id)}`)}
              className="flex flex-col items-center gap-1 p-2.5 rounded-xl
                         bg-ink-900 border border-ink-700 hover:border-ink-500
                         transition-colors active:scale-95"
            >
              <span className="text-lg">{tag.emoji}</span>
              <span className="font-sans text-xs text-ink-300 text-center leading-tight">
                {tag.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 진단 유도 (미진단 시) */}
      {!savedType && (
        <button
          onClick={() => navigate('/diagnosis')}
          className="flex items-center justify-between w-full p-4 rounded-xl
                     bg-gold-400/5 border border-gold-400/20 hover:border-gold-400/50 transition-colors"
        >
          <div>
            <p className="font-sans text-sm font-medium text-gold-400">내 전략 스타일 알아보기</p>
            <p className="font-sans text-xs text-ink-400 mt-0.5">6문항으로 맞춤 카드를 추천받아요</p>
          </div>
          <ArrowRight size={16} className="text-gold-400" />
        </button>
      )}

      {/* 전체 카드덱 보기 */}
      <button
        onClick={() => navigate('/store')}
        className="flex items-center justify-between w-full p-4 rounded-xl
                   bg-ink-900 border border-ink-700 hover:border-ink-500 transition-colors"
      >
        <div>
          <p className="font-sans text-sm font-medium text-ink-100">전체 카드덱 보기</p>
          <p className="font-sans text-xs text-ink-400 mt-0.5">6가지 고전 · 69수</p>
        </div>
        <ArrowRight size={16} className="text-ink-400" />
      </button>
    </div>
  )
}
