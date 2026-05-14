/* Character images use unoptimized so Next.js doesn't reformat
   the PNG — mix-blend-mode:screen requires true pixel values */
export default function CharacterLayer({
  id,
  src,
  alt = '',
  depth,
  dataOpacity,
  style = {},
  imgStyle = {},
  blendVariant = '',
  auraStyle = null,
}) {
  return (
    <div
      className="char-layer absolute pointer-events-none"
      data-id={id}
      data-depth={depth}
      data-opacity={dataOpacity}
      style={style}
    >
      {auraStyle && (
        <div className="absolute inset-0 -z-10 pointer-events-none" style={auraStyle} />
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={`char-blend ${blendVariant} w-full h-auto select-none`}
        style={imgStyle}
        loading="eager"
      />
    </div>
  )
}
