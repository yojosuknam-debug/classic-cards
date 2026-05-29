import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { X, Download, Loader2, Share2 } from 'lucide-react'
import ShareCard from './ShareCard'
import packs from '../content/packs.json'

export default function ShareModal({ card, onClose }) {
  const cardRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const pack = packs.find(p => p.id === card.packId) || packs[0]
  const scale = Math.min((window.innerWidth * 0.88) / 1080, 0.42)

  async function getDataUrl() {
    if (!cardRef.current) return null
    return toPng(cardRef.current, { width: 1080, height: 1080, pixelRatio: 2 })
  }

  async function handleDownload() {
    setLoading(true)
    try {
      const dataUrl = await getDataUrl()
      if (!dataUrl) return
      const link = document.createElement('a')
      link.download = `card-${card.id}.png`
      link.href = dataUrl
      link.click()
      setDone(true)
      setTimeout(() => setDone(false), 2500)
    } catch (err) {
      console.error('이미지 저장 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleNativeShare() {
    setLoading(true)
    try {
      const dataUrl = await getDataUrl()
      if (!dataUrl) return
      const blob = await (await fetch(dataUrl)).blob()
      const file = new File([blob], `card-${card.id}.png`, { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: card.originalTextKo,
          text: `${card.originalText}\n\n${card.originalTextKo}\n\n— 고전 전략 카드덱`,
        })
      } else {
        await handleDownload()
      }
    } catch (err) {
      if (err.name !== 'AbortError') console.error('공유 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <div className="flex justify-between items-center w-full">
          <p className="font-sans text-sm text-ink-300">이미지 미리보기</p>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-200 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* 카드 미리보기 */}
        <div
          style={{
            width: 1080 * scale,
            height: 1080 * scale,
            overflow: 'hidden',
            borderRadius: 16,
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            flexShrink: 0,
          }}
        >
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: 1080, height: 1080 }}>
            <ShareCard ref={cardRef} card={card} pack={pack} />
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-2 w-full">
          {/* 인스타·SNS 공유 (파일 공유 API) */}
          <button
            onClick={handleNativeShare}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                       bg-gold-400 text-ink-950 font-sans text-sm font-semibold
                       hover:bg-gold-300 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Share2 size={16} />
            )}
            공유하기 (카카오·인스타 등)
          </button>

          {/* PNG 저장 */}
          <button
            onClick={handleDownload}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                       bg-ink-800 border border-ink-600 font-sans text-sm text-ink-300
                       hover:border-ink-400 disabled:opacity-50 transition-colors"
          >
            {done ? (
              <span>저장됐어요 ✓</span>
            ) : (
              <><Download size={15} /> PNG 저장 (1080×1080)</>
            )}
          </button>
        </div>

        <p className="font-sans text-xs text-ink-500 text-center">
          이미지에 출처가 자동으로 포함됩니다
        </p>
      </div>
    </div>
  )
}
