import React from 'react'

type ModalProps = {
  title: string
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ title, open, onClose, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl max-h-[80vh] overflow-hidden rounded-3xl border-2 border-cyan-500/30 bg-slate-950 shadow-[0_30px_120px_-30px_rgba(14,165,233,0.5)]">
        <div className="relative border-b border-slate-700 bg-slate-900/95 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-1 text-sm text-slate-300">AI-powered meeting prep summary for your client request.</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-lg font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
          >
            ×
          </button>
        </div>
        <div className="max-h-[calc(80vh-5rem)] overflow-y-auto space-y-4 border-t border-slate-800 px-6 py-6 text-slate-100">
          {children}
        </div>
      </div>
    </div>
  )
}
