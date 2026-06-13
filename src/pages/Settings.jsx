import { ExternalLink, HelpCircle, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col px-4 pt-6 pb-24">
      <header className="mb-6">
        <h1 className="font-serif text-xl text-ink-100">설정</h1>
      </header>

      <div className="flex flex-col gap-4">
        {/* 소개·사용법 */}
        <button onClick={() => navigate('/guide')}
          className="flex items-center justify-between bg-ink-900 rounded-xl border border-ink-700 px-4 py-3 hover:border-ink-500 transition-colors">
          <span className="flex items-center gap-2 font-sans text-sm text-ink-200">
            <HelpCircle size={16} className="text-gold-400" /> 앱 소개 · 사용법
          </span>
          <ChevronRight size={16} className="text-ink-400" />
        </button>

        {/* 앱 정보 */}
        <section>
          <h2 className="font-sans text-xs font-semibold text-ink-400 tracking-widest mb-3">앱 정보</h2>
          <div className="bg-ink-900 rounded-xl border border-ink-700 divide-y divide-ink-800">
            <Row label="버전" value="0.1.0 (웹 베타)" />
            <Row label="콘텐츠 업데이트" value="손자병법 10수" />
          </div>
        </section>

        {/* 저작권 안내 */}
        <section>
          <h2 className="font-sans text-xs font-semibold text-ink-400 tracking-widest mb-3">저작권 안내</h2>
          <div className="bg-ink-900 rounded-xl border border-ink-700 p-4">
            <p className="font-sans text-xs text-ink-400 leading-relaxed">
              이 앱의 원문은 저작재산권이 만료된 고전(BCE~17C) 텍스트를 직접 번역·인용한 것입니다.
              현대 해설(commentary)은 오리지널 저작물로, 별도 동의 없이 전재·복제할 수 없습니다.
            </p>
          </div>
        </section>

        {/* 데이터 */}
        <section>
          <h2 className="font-sans text-xs font-semibold text-ink-400 tracking-widest mb-3">내 데이터</h2>
          <div className="bg-ink-900 rounded-xl border border-ink-700 divide-y divide-ink-800">
            <Row label="저장 방식" value="기기 로컬 (서버 없음)" />
            <Row label="수집 정보" value="없음" />
          </div>
        </section>
      </div>
    </div>
  )
}

function Row({ label, value, href }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="font-sans text-sm text-ink-300">{label}</span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 font-sans text-sm text-gold-400 hover:text-gold-300">
          {value}
          <ExternalLink size={12} />
        </a>
      ) : (
        <span className="font-sans text-sm text-ink-400">{value}</span>
      )}
    </div>
  )
}
