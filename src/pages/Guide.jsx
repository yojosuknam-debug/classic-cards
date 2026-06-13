import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles, BookOpen, Compass, BookMarked, ShoppingBag, ShieldCheck, Wallet, HelpCircle } from 'lucide-react'

// 고전 전략 카드덱 — 소개 + 사용법 페이지. /guide 라우트.
export default function Guide() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col px-4 pt-6 pb-24">
      <header className="mb-5 flex items-center justify-between">
        <h1 className="font-serif text-xl text-ink-100">소개 · 사용법</h1>
        <button onClick={() => navigate('/')}
          className="flex items-center gap-1 rounded-xl border border-ink-700 bg-ink-800 px-3 py-1.5 font-sans text-xs text-ink-200 hover:border-ink-500">
          <ArrowLeft size={13} /> 홈으로
        </button>
      </header>

      {/* 광고 — 매력 */}
      <section className="rounded-2xl border border-gold-400/30 bg-gold-400/5 p-5 text-center">
        <p className="font-sans text-xs tracking-widest text-gold-400">CLASSIC STRATEGY DECK</p>
        <h2 className="mt-1 font-serif text-2xl text-ink-100">2,500년 전략을, 하루 한 장.</h2>
        <p className="mt-2 font-sans text-sm leading-relaxed text-ink-300">
          손자병법을 비롯한 동서양 고전의 전략을 <b className="text-gold-300">카드 한 장</b>으로 읽습니다.
          원문과 <b className="text-gold-300">오늘의 일·관계·일터에 바로 쓰는 현대 해설</b>을 함께 — 어렵지 않게, 매일 한 수씩.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Badge icon={Wallet} title="전부 무료">11팩 119수 전체 개방</Badge>
          <Badge icon={ShieldCheck} title="서버 없음">내 노트는 기기에만 저장</Badge>
          <Badge icon={Sparkles} title="하루 1장">오늘의 전략 한 수</Badge>
        </div>
      </section>

      {/* 이런 분께 */}
      <section className="mt-5">
        <h2 className="mb-2 font-sans text-xs font-semibold tracking-widest text-ink-400">이런 분께</h2>
        <ul className="space-y-1.5 rounded-2xl border border-ink-700 bg-ink-900 p-4 font-sans text-sm text-ink-300">
          <li>• 고전이 좋지만 원문은 부담스러웠던 분</li>
          <li>• 협상·갈등·결정 앞에서 옛 지혜를 한 줄 얻고 싶은 분</li>
          <li>• 하루 한 장, 짧고 깊은 읽을거리를 찾는 분</li>
        </ul>
      </section>

      {/* 사용법 */}
      <section className="mt-5">
        <h2 className="mb-3 font-sans text-xs font-semibold tracking-widest text-ink-400">사용법</h2>
        <Step n="1" icon={Sparkles} title="오늘의 카드 읽기">홈에서 매일 바뀌는 <b className="text-ink-100">‘오늘의 전략 한 수’</b>를 읽습니다. 카드를 누르면 원문과 현대 해설이 펼쳐집니다.</Step>
        <Step n="2" icon={Compass} title="유형 진단">간단한 진단으로 <b className="text-ink-100">내 전략 유형</b>을 찾고, 그에 맞는 카드를 추천받습니다.</Step>
        <Step n="3" icon={ShoppingBag} title="스토어에서 팩 둘러보기">손자병법 등 <b className="text-ink-100">주제별 팩(전체 무료)</b>을 골라 원하는 수를 읽습니다. 상황 태그로 필터링도 됩니다.</Step>
        <Step n="4" icon={BookMarked} title="내 노트에 모으기">마음에 드는 수를 저장해 <b className="text-ink-100">나만의 전략 노트</b>를 만듭니다(기기에만 저장).</Step>
      </section>

      <section className="mt-5 rounded-2xl border border-ink-700 bg-ink-900 p-4">
        <div className="mb-1 flex items-center gap-2 font-sans text-sm font-semibold text-ink-100"><BookOpen size={15} className="text-gold-400" /> 콘텐츠에 대해</div>
        <p className="font-sans text-xs leading-relaxed text-ink-400">
          원문은 저작권이 만료된 고전을 직접 번역·인용했고, 현대 해설은 이 앱의 오리지널 저작물입니다.
          전략은 참고용이며 모든 결정의 책임은 본인에게 있습니다.
        </p>
      </section>

      <div className="mt-6 flex justify-center">
        <button onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 rounded-xl bg-gold-400/15 border border-gold-400/40 px-5 py-3 font-sans font-semibold text-gold-300 hover:border-gold-400/70">
          <Sparkles size={16} /> 오늘의 카드 보기
        </button>
      </div>
    </div>
  )
}

function Badge({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-ink-700 bg-ink-900 p-2.5">
      <div className="flex items-center justify-center gap-1 text-gold-400"><Icon size={14} /><span className="font-sans text-xs font-semibold">{title}</span></div>
      <div className="mt-0.5 font-sans text-[10px] text-ink-400">{children}</div>
    </div>
  )
}

function Step({ n, icon: Icon, title, children }) {
  return (
    <div className="mb-3 flex gap-3 rounded-2xl border border-ink-700 bg-ink-900 p-4">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-400/15 font-serif text-sm font-bold text-gold-300">{n}</div>
      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-2 font-sans text-sm font-semibold text-ink-100"><Icon size={15} className="text-gold-400" /> {title}</div>
        <p className="font-sans text-sm leading-relaxed text-ink-300">{children}</p>
      </div>
    </div>
  )
}
