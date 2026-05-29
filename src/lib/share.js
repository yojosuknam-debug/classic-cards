import { toPng } from 'html-to-image'

export async function generateCardImage(elementRef) {
  if (!elementRef) return null
  try {
    const dataUrl = await toPng(elementRef, {
      width: 1080,
      height: 1080,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      },
      pixelRatio: 2,
    })
    return dataUrl
  } catch (err) {
    console.error('이미지 생성 실패:', err)
    return null
  }
}

export async function downloadCardImage(elementRef, filename = 'strategy-card.png') {
  const dataUrl = await generateCardImage(elementRef)
  if (!dataUrl) return false
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
  return true
}

export async function shareCard(card, elementRef) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `오늘의 전략 한 수: ${card.originalText}`,
        text: `${card.originalText}\n\n${card.commentary}\n\n— 고전 전략 카드덱`,
        url: window.location.href,
      })
      return { method: 'native' }
    } catch (err) {
      if (err.name === 'AbortError') return { method: 'cancelled' }
    }
  }
  const copied = await copyToClipboard(
    `${card.originalText}\n${card.originalTextKo}\n\n${card.commentary}\n\n오늘의 적용: ${card.applyTip}\n\n— 고전 전략 카드덱`
  )
  return { method: 'clipboard', success: copied }
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
