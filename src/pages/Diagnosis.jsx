import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, RotateCcw, Share2 } from 'lucide-react'
import diagnosisData from '../content/diagnosis.json'
import { getCardsByType } from '../lib/cards'
import { shareCard } from '../lib/share'

function calcResult(answers) {
  const counts = {}
  Object.values(answers).forEach(type => {
    counts[type] = (counts[type] || 0) + 1
  })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
}

export default function Diagnosis() {
  const navigate = useNavigate()
  const [step, setStep] = useState('start') // start | q:0..5 | result
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [resultType, setResultType] = useState(null)

  const questions = diagnosisData.questions
  const types = diagnosisData.resultTypes

  function startDiagnosis() {
    setAnswers({})
    setQIndex(0)
    setStep('question')
  }

  function handleAnswer(mapsTo) {
    const next = { ...answers, [questions[qIndex].id]: mapsTo }
    setAnswers(next)
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1)
    } else {
      const typeId = calcResult(next)
      setResultType(typeId)
      setStep('result')
      localStorage.setItem('diagnosisResult', typeId)
    }
  }

  function handleBack() {
    if (qIndex > 0) {
      const prev = { ...answers }
      delete prev[questions[qIndex - 1].id]
      setAnswers(prev)
      setQIndex(qIndex - 1)
    } else {
      setStep('start')
    }
  }

  const result = types.find(t => t.id === resultType)

  if (step === 'start') {
    const saved = localStorage.getItem('diagnosisResult')
    const savedResult = saved ? types.find(t => t.id === saved) : null

    return (
      <div className="flex flex-col px-4 pt-6 pb-24 gap-6">
        <header>
          <h1 className="font-serif text-xl text-ink-100">나의 전략 스타일</h1>
          <p className="font-sans text-xs text-ink-400 mt-1">6문항 · 약 2분</p>
        </header>

        {savedResult && (
          <div className="bg-ink-900 border border-ink-700 rounded-2xl p-5">
            <p className="font-sans text-xs text-ink-400 mb-2">지난 결과</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{savedResult.emoji}</span>
              <div>
                <p className="font-serif text-lg text-ink-100">{savedResult.label}</p>
                <p className="font-sans text-xs text-ink-400 mt-0.5 line-clamp-2">{savedResult.desc}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => { setResultType(saved); setStep('result') }}
                className="flex-1 py-2 rounded-xl bg-ink-800 text-ink-200 text-sm font-sans hover:bg-ink-700 transition-colors"
              >
                결과 다시 보기
              </button>
              <button
                onClick={startDiagnosis}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-ink-600 text-ink-400 text-sm font-sans hover:border-ink-400 transition-colors"
              >
                <RotateCcw size={14} /> 다시 하기
              </button>
            </div>
          </div>
        )}

        <div className="bg-ink-900 border border-ink-700 rounded-2xl p-5">
          <h2 className="font-sans text-sm font-semibold text-ink-200 mb-2">어떤 유형이 있나요?</h2>
          <div className="flex flex-col gap-2">
            {types.map(t => (
              <div key={t.id} className="flex items-center gap-3">
                <span className="text-xl w-8">{t.emoji}</span>
                <div>
                  <p className="font-sans text-sm text-ink-200">{t.label}</p>
                  <p className="font-sans text-xs text-ink-500">{t.strength}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={startDiagnosis}
          className="w-full py-4 rounded-2xl bg-gold-400/10 border border-gold-400
                     font-serif text-base text-gold-400 hover:bg-gold-400/20 transition-colors"
        >
          진단 시작하기
        </button>
      </div>
    )
  }

  if (step === 'question') {
    const q = questions[qIndex]
    const progress = ((qIndex) / questions.length) * 100

    return (
      <div className="flex flex-col px-4 pt-6 pb-24 gap-5">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="text-ink-400 hover:text-ink-200 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 bg-ink-800 rounded-full h-1.5">
            <div
              className="bg-gold-400 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-sans text-xs text-ink-400">{qIndex + 1}/{questions.length}</span>
        </div>

        <div className="pt-4">
          <p className="font-serif text-lg text-ink-100 leading-relaxed">{q.text}</p>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          {q.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.mapsTo)}
              className="w-full text-left p-4 rounded-xl bg-ink-900 border border-ink-700
                         hover:border-gold-400/50 hover:bg-ink-800
                         font-sans text-sm text-ink-200 leading-relaxed
                         transition-all duration-150 active:scale-[0.98]"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (step === 'result' && result) {
    const cards = getCardsByType(result.id).filter(c => c.isFree).slice(0, 3)

    return (
      <div className="flex flex-col px-4 pt-6 pb-24 gap-6">
        <header className="flex items-center gap-3">
          <button onClick={() => setStep('start')} className="text-ink-400 hover:text-ink-200 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-serif text-xl text-ink-100">진단 결과</h1>
        </header>

        {/* 결과 카드 */}
        <div className="bg-ink-900 border border-ink-700 rounded-2xl p-6">
          <div className="text-center mb-5">
            <span className="text-5xl block mb-3">{result.emoji}</span>
            <h2 className="font-serif text-2xl text-gold-400">{result.label}</h2>
          </div>
          <p className="font-sans text-sm text-ink-200 leading-relaxed mb-4">{result.desc}</p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-start">
              <span className="font-sans text-xs text-emerald-400 font-semibold w-10 flex-shrink-0">강점</span>
              <span className="font-sans text-xs text-ink-300">{result.strength}</span>
            </div>
            <div className="flex gap-2 items-start">
              <span className="font-sans text-xs text-amber-400 font-semibold w-10 flex-shrink-0">주의</span>
              <span className="font-sans text-xs text-ink-300">{result.watch}</span>
            </div>
          </div>
        </div>

        {/* 추천 카드 */}
        {cards.length > 0 && (
          <section>
            <h3 className="font-sans text-xs font-semibold text-ink-400 tracking-widest mb-3">
              {result.label}에게 맞는 카드
            </h3>
            <div className="flex flex-col gap-2">
              {cards.map(card => (
                <button
                  key={card.id}
                  onClick={() => navigate(`/card/${card.id}`)}
                  className="flex items-center justify-between p-4 rounded-xl
                             bg-ink-900 border border-ink-700 hover:border-ink-500 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-gold-400">{card.originalText}</p>
                    <p className="font-sans text-xs text-ink-400 truncate mt-0.5">{card.originalTextKo}</p>
                  </div>
                  <ArrowRight size={14} className="text-ink-600 flex-shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 추천 팩 보기 */}
        <button
          onClick={() => navigate('/store')}
          className="w-full py-3 rounded-xl bg-ink-900 border border-ink-700
                     font-sans text-sm text-ink-300 hover:border-ink-500 transition-colors"
        >
          추천 팩 전체 보기 →
        </button>

        <button
          onClick={startDiagnosis}
          className="flex items-center justify-center gap-1.5 w-full py-2 text-ink-500 text-sm font-sans hover:text-ink-300 transition-colors"
        >
          <RotateCcw size={14} /> 다시 하기
        </button>
      </div>
    )
  }

  return null
}
