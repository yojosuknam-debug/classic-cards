import { useState } from 'react'
import { Heart, Share2, Pencil, Check, X, ImageDown } from 'lucide-react'
import { toggleFavorite, isFavorite, getNote, setNote } from '../lib/storage'
import { shareCard } from '../lib/share'
import ShareModal from './ShareModal'
import packs from '../content/packs.json'

const SCRIPT_FONT_MAP = {
  arabic:     '"Noto Naskh Arabic", serif',
  hebrew:     '"Noto Serif Hebrew", serif',
  devanagari: '"Noto Serif Devanagari", serif',
  japanese:   '"Noto Serif JP", serif',
  serif:      'Georgia, "Noto Serif KR", serif',
}

export default function CardView({ card, showActions = true }) {
  const [fav, setFav] = useState(() => isFavorite(card.id))
  const [note, setNoteState] = useState(() => getNote(card.id))
  const [showShareModal, setShowShareModal] = useState(false)
  const [editingNote, setEditingNote] = useState(false)
  const [draftNote, setDraftNote] = useState('')
  const [shareMsg, setShareMsg] = useState(null)

  const pack = packs.find(p => p.id === card.packId)
  const scriptFont = SCRIPT_FONT_MAP[pack?.scriptFont] || '"Noto Serif KR", serif'
  const isRTL = pack?.scriptDir === 'rtl'

  function handleFav() {
    const updated = toggleFavorite(card.id)
    setFav(updated.includes(card.id))
  }

  function handleEditNote() {
    setDraftNote(note)
    setEditingNote(true)
  }

  function handleSaveNote() {
    setNote(card.id, draftNote)
    setNoteState(draftNote)
    setEditingNote(false)
  }

  async function handleShare() {
    const result = await shareCard(card, null)
    if (result.method === 'clipboard') {
      setShareMsg(result.success ? '클립보드에 복사됐어요' : '공유에 실패했어요')
    } else if (result.method === 'native') {
      setShareMsg('공유 완료')
    }
    setTimeout(() => setShareMsg(null), 2000)
  }

  return (
    <article className="relative flex flex-col gap-5 rounded-2xl bg-ink-900 border border-ink-700 p-6 shadow-xl">
      {/* 출처 */}
      <header className="flex items-center justify-between">
        <span className="text-xs font-sans text-ink-400 tracking-wider uppercase">
          {card.source.work} · {card.source.chapter}
        </span>
        <span className="text-xs font-sans text-ink-500">{card.source.era}</span>
      </header>

      {/* 원문 */}
      <div className="text-center py-4">
        <p
          className="font-semibold text-gold-400 leading-relaxed"
          style={{
            fontFamily: scriptFont,
            fontSize: isRTL ? '2rem' : '1.875rem',
            direction: isRTL ? 'rtl' : 'ltr',
            letterSpacing: isRTL ? 0 : '0.15em',
          }}
        >
          {card.originalText}
        </p>
        <p className="mt-2 font-sans text-base text-ink-300 leading-relaxed">
          {card.originalTextKo}
        </p>
      </div>

      {/* 구분선 */}
      <div className="border-t border-ink-700" />

      {/* 현대 해설 */}
      <section>
        <h3 className="text-xs font-sans font-semibold text-ink-400 tracking-widest mb-2">오늘의 해설</h3>
        <p className="font-sans text-base text-ink-100 leading-relaxed">{card.commentary}</p>
      </section>

      {/* 적용 팁 */}
      <section className="bg-ink-800 rounded-xl p-4">
        <h3 className="text-xs font-sans font-semibold text-gold-400 tracking-widest mb-1.5">오늘 적용하기</h3>
        <p className="font-sans text-base text-ink-200 leading-relaxed">{card.applyTip}</p>
      </section>

      {/* 태그 */}
      <div className="flex flex-wrap gap-1.5">
        {card.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded-full bg-ink-800 text-ink-300 text-xs font-sans">
            #{tag}
          </span>
        ))}
      </div>

      {/* 메모 */}
      {editingNote ? (
        <div className="flex flex-col gap-2">
          <textarea
            autoFocus
            value={draftNote}
            onChange={e => setDraftNote(e.target.value)}
            placeholder="이 카드에 메모를 남겨두세요..."
            rows={3}
            className="w-full bg-ink-800 border border-ink-600 rounded-xl px-3 py-2
                       text-sm font-sans text-ink-100 placeholder-ink-500
                       resize-none focus:outline-none focus:border-gold-400"
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditingNote(false)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-ink-400
                         border border-ink-600 hover:border-ink-400 transition-colors">
              <X size={12} /> 취소
            </button>
            <button onClick={handleSaveNote}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-gold-400
                         border border-gold-400 hover:bg-gold-400/10 transition-colors">
              <Check size={12} /> 저장
            </button>
          </div>
        </div>
      ) : note ? (
        <div className="bg-ink-800/50 rounded-xl p-3 border border-ink-700">
          <p className="text-xs font-sans text-ink-400 mb-1">내 메모</p>
          <p className="text-sm font-sans text-ink-200">{note}</p>
          <button onClick={handleEditNote}
            className="mt-2 text-xs text-ink-400 hover:text-ink-200 transition-colors">
            수정
          </button>
        </div>
      ) : null}

      {/* 액션 버튼 */}
      {showActions && (
        <footer className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={handleFav}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-sans
                            transition-colors ${fav
                              ? 'text-red-400 bg-red-400/10'
                              : 'text-ink-400 hover:text-ink-200 hover:bg-ink-800'}`}>
                <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
                즐겨찾기
              </button>
              <button onClick={handleEditNote}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-sans
                           text-ink-400 hover:text-ink-200 hover:bg-ink-800 transition-colors">
                <Pencil size={16} />
                메모
              </button>
            </div>
            <div className="relative">
              <button onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-sans
                           text-ink-400 hover:text-ink-200 hover:bg-ink-800 transition-colors">
                <Share2 size={16} />
                공유
              </button>
              {shareMsg && (
                <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-ink-700
                                text-ink-100 text-xs rounded-lg whitespace-nowrap shadow-lg">
                  {shareMsg}
                </div>
              )}
            </div>
          </div>

          {/* 이미지 저장 버튼 */}
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                       border border-gold-400/50 text-gold-400 text-sm font-sans
                       hover:bg-gold-400/10 transition-colors"
          >
            <ImageDown size={16} />
            이미지로 저장 (인스타 공유용)
          </button>
        </footer>
      )}

      {showShareModal && (
        <ShareModal card={card} onClose={() => setShowShareModal(false)} />
      )}
    </article>
  )
}
