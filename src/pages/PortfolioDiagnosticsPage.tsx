import React, { useMemo, useState } from 'react'
import { Button, Card } from '../components/ui'

const alertItems = [
  {
    id: 'drift',
    title: 'Allocation drift detected',
    summary: 'Equity weight has moved ahead of target by 7%.',
    detail: 'Portfolio drift has increased due to recent market moves, which can distort the intended risk exposure.',
    action: 'Recommend a partial rebalance toward target weights and review the equity concentration with the client.'
  },
  {
    id: 'technology',
    title: 'Technology concentration high',
    summary: 'Technology exposure is 22%, above the desired diversified threshold.',
    detail: 'Heavy tech concentration increases vulnerability to sector-specific volatility and could exceed the client’s comfort level.',
    action: 'Discuss diversification strategies and consider trimming high-concentration positions if appropriate.'
  },
  {
    id: 'cash',
    title: 'Excess cash position',
    summary: 'Cash is sitting at 13.5%, which is above the target allocation.',
    detail: 'Holding too much cash may reduce return potential and delay the pace toward long-term goals.',
    action: 'Evaluate near-term liquidity needs and deploy excess cash into higher-conviction sleeves if aligned with the plan.'
  }
]

const allocationData = [
  { label: 'Equity', current: 62, target: 55, color: 'from-cyan-500 to-sky-500' },
  { label: 'Fixed Income', current: 24, target: 30, color: 'from-blue-500 to-indigo-500' },
  { label: 'Cash', current: 13.5, target: 8, color: 'from-slate-500 to-slate-400' },
  { label: 'Alternatives', current: 0.5, target: 7, color: 'from-emerald-500 to-lime-400' }
]

export default function PortfolioDiagnosticsPage() {
  const [activeAlert, setActiveAlert] = useState(alertItems[0])
  const [talkingPoints, setTalkingPoints] = useState<string[] | null>(null)
  const [confirmation, setConfirmation] = useState('')

  const healthCards = useMemo(
    () => [
      { label: 'Health Score', value: '82', sub: 'Out of 100' },
      { label: 'Allocation Drift', value: '7.8%', sub: 'From target mix' },
      { label: 'Technology Concentration', value: '22%', sub: 'Sector exposure' },
      { label: 'Cash Position', value: '13.5%', sub: 'Above target' }
    ],
    []
  )

  const handleActionClick = (message: string) => {
    setConfirmation(message)
    setTalkingPoints(null)
    window.setTimeout(() => setConfirmation(''), 3000)
  }

  const generateTalkingPoints = () => {
    setTalkingPoints([
      'Highlight the healthy portfolio structure while flagging the current allocation drift toward equities.',
      'Advise on reducing technology concentration and bring excess cash into productive use.',
      'Confirm next steps for a client review and a recommended rebalance plan.'
    ])
    setConfirmation('')
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.9)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
              New
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold text-white">Real-Time Portfolio Diagnostics Hub</h1>
              <span className="rounded-2xl bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">Anderson Household</span>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              A polished advisor dashboard showing portfolio health, diagnostics, allocation drift, and client-ready action tools for the Anderson Household.
            </p>
          </div>
          <div className="rounded-[2rem] border border-cyan-500/20 bg-slate-950/90 px-5 py-4 text-sm text-slate-200 shadow-lg shadow-cyan-500/10">
            <div className="flex flex-wrap gap-3 text-slate-400">
              <div>Last refreshed</div>
              <div className="font-semibold text-white">Today 9:45 AM</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-3xl bg-slate-900/80 px-4 py-3">
                <div className="text-slate-400">AUM</div>
                <div className="mt-2 text-xl font-semibold text-white">$4.8M</div>
              </div>
              <div className="rounded-3xl bg-slate-900/80 px-4 py-3">
                <div className="text-slate-400">Risk Profile</div>
                <div className="mt-2 text-xl font-semibold text-white">Moderate Growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {healthCards.map((card) => (
              <div key={card.label} className="rounded-[1.75rem] border border-slate-800 bg-slate-950/95 p-5 shadow-[0_15px_40px_-25px_rgba(14,165,233,0.4)]">
                <div className="text-sm uppercase tracking-[0.24em] text-cyan-300">{card.label}</div>
                <div className="mt-4 text-3xl font-semibold text-white">{card.value}</div>
                <div className="mt-2 text-sm text-slate-400">{card.sub}</div>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 shadow-[0_20px_60px_-30px_rgba(56,189,248,0.18)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Diagnostic Alerts</p>
                <h2 className="text-2xl font-semibold text-white">Click an alert to see details</h2>
              </div>
              <div className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-200">3 alerts active</div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {alertItems.map((alert) => (
                <button
                  key={alert.id}
                  onClick={() => {
                    setActiveAlert(alert)
                    setTalkingPoints(null)
                    setConfirmation('')
                  }}
                  className={`rounded-[1.5rem] border p-4 text-left transition ${activeAlert.id === alert.id ? 'border-cyan-400/80 bg-cyan-500/10 text-white shadow-lg shadow-cyan-500/10' : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-cyan-400/40 hover:bg-slate-900'}`}
                >
                  <div className="text-sm uppercase tracking-[0.24em] text-cyan-300">{alert.title}</div>
                  <div className="mt-3 text-sm leading-6 text-slate-300">{alert.summary}</div>
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-6 text-slate-200 shadow-inner shadow-slate-950/20">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">What happened</p>
                  <p className="mt-3 text-lg font-semibold text-white">{activeAlert.title}</p>
                </div>
                <div className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200">Advisor action ready</div>
              </div>
              <div className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
                <div>
                  <div className="text-slate-400">Why it matters</div>
                  <p className="mt-2 text-slate-100">{activeAlert.detail}</p>
                </div>
                <div>
                  <div className="text-slate-400">Suggested advisor action</div>
                  <p className="mt-2 text-slate-100">{activeAlert.action}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 shadow-[0_20px_60px_-30px_rgba(14,165,233,0.25)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Allocation Diagnostics</p>
                <h2 className="text-2xl font-semibold text-white">Current vs target allocation</h2>
              </div>
              <div className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-200">Portfolio overweight in Equity</div>
            </div>
            <div className="mt-5 space-y-5">
              {allocationData.map((item) => {
                const diff = item.current - item.target
                const currentWidth = Math.min(item.current, 100)
                return (
                  <div key={item.label} className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{item.label}</span>
                      <span className="font-semibold text-white">{item.current}% / {item.target}%</span>
                    </div>
                    <div className="h-4 overflow-hidden rounded-full bg-slate-900">
                      <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${currentWidth}%` }} />
                    </div>
                    <div className="text-xs text-slate-500">{diff >= 0 ? `+${diff.toFixed(1)}% above target` : `${Math.abs(diff).toFixed(1)}% below target`}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-cyan-500/30 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 p-6 shadow-[0_30px_80px_-40px_rgba(34,211,238,0.35)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">AI Summary</p>
                <h2 className="text-2xl font-semibold text-white">Portfolio health snapshot</h2>
              </div>
              <span className="rounded-full bg-cyan-500/15 px-3 py-2 text-xs uppercase tracking-[0.2em] text-cyan-200">Healthy with caveats</span>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              The portfolio is generally healthy, but it needs review because allocation drift is creating overweight equity exposure, technology concentration is elevated, and excess cash is reducing potential efficiency.
            </p>
            <div className="mt-6">
              <Button variant="primary" className="w-full rounded-full px-5 py-3 text-sm font-semibold" onClick={generateTalkingPoints}>
                Generate Advisor Talking Points
              </Button>
              {talkingPoints && (
                <div className="mt-5 rounded-[1.5rem] border border-cyan-500/20 bg-slate-900/95 p-4 text-sm text-slate-200">
                  <div className="text-slate-400">Talking points</div>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-100">
                    {talkingPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)]">
            <div className="text-sm uppercase tracking-[0.24em] text-cyan-300">Actions</div>
            <div className="mt-5 grid gap-3">
              <Button variant="secondary" className="w-full rounded-full px-5 py-3 text-sm font-semibold text-slate-100" onClick={() => handleActionClick('Rebalance recommendation created.')}>Create Rebalance Recommendation</Button>
              <Button variant="secondary" className="w-full rounded-full px-5 py-3 text-sm font-semibold text-slate-100" onClick={() => handleActionClick('Client review scheduled.')}>Schedule Client Review</Button>
              <Button variant="secondary" className="w-full rounded-full px-5 py-3 text-sm font-semibold text-slate-100" onClick={() => handleActionClick('Service request opened.')}>Open Service Request</Button>
              <Button variant="secondary" className="w-full rounded-full px-5 py-3 text-sm font-semibold text-slate-100" onClick={() => handleActionClick('Note added to CRM timeline.')}>Add Note to CRM Timeline</Button>
            </div>
            {confirmation && (
              <div className="mt-5 rounded-[1.5rem] border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
                {confirmation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
