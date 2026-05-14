import { useMemo } from 'react'

/**
 * Splits text into per-character (or per-word) <span> elements
 * so GSAP can animate each chunk individually via [data-split].
 */
export default function SplitText({ children, className = '', chunkBy = 'char' }) {
  const text = String(children)

  const chunks = useMemo(() => {
    if (chunkBy === 'word') return text.split(/(\s+)/)
    return [...text]
  }, [text, chunkBy])

  return (
    <span className={className}>
      {chunks.map((c, i) =>
        c.trim() === ''
          ? <span key={i}>{c}</span>
          : <span key={i} className="split-char" data-split>{c}</span>
      )}
    </span>
  )
}
