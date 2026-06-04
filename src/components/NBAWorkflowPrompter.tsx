import React, { useMemo, useState } from 'react'
import { Button, Card } from './ui'
import { Client } from '../types/client'
import { CRMNote } from '../types/crmNote'
import { Interaction } from '../types'
import { ServiceRequest } from '../types/serviceRequest'

type ActionCard = {
  title: string
  description: string
  prompt: string
  why: string
  due: string
}

type Props = {
  client?: Client
  notes: CRMNote[]
  interactions: Interaction[]
  requests: ServiceRequest[]
}

const averyActions: ActionCard[] = [
  {
    title: 'Tax-loss harvest follow-up',
    description: 'Avery has an open growth-oriented portfolio and a recent note about reallocating tax-sensitive assets. Use this action to prepare a targeted tax conversation.',
    prompt: 'Prepare a client-ready prompt for Avery Carter that highlights tax-loss harvesting opportunities while preserving her current moderate risk profile.',
    why: 'The client is in a moderate risk position and the recent note indicates interest in optimizing tax efficiency.',
    due: 'This week'
  },
  {
    title: 'Estate beneficiary check-in',
    description: 'Avery’s profile shows KYC complete and onboarding finished. The next-best action is to confirm beneficiaries and trust alignment before the next meeting.',
    prompt: 'Draft a conversation guide for Avery Carter to verify estate plan beneficiaries and align the meeting agenda with her current family objectives.',
    why: 'It is an ideal time to close the loop on estate planning after onboarding is complete.',
    due: 'Next meeting'
  },
  {
    title: 'Quarterly portfolio pulse',
    description: 'Avery has a recent service request and an upcoming review opportunity. This action helps frame the discussion around performance, risk, and priorities.',
    prompt: 'Create a briefing prompt for Avery Carter that summarizes portfolio performance, risk posture, and recommended discussion topics for a quarterly review.',
    why: 'A quarterly review is a strong moment to reinforce trust and capture next steps.',
    due: 'Within 3 days'
  }
]

const genericActions: ActionCard[] = [
  {
    title: 'Client profile refresh',
    description: 'Review the latest client notes and update the advisory workflow prompt based on current priorities and pending requests.',
    prompt: 'Create a client-specific prompt to refresh and prioritize the next-best actions for this advisor.',
    why: 'Keeping the prompt current ensures the advisor stays aligned with the latest client status.',
    due: 'Today'
  },
  {
    title: 'Follow-up quick win',
    description: 'Identify a fast advisory action such as rebalancing, document review, or scheduling the next call.',
    prompt: 'Generate a concise next-best action prompt for a follow-up task that moves the client relationship forward.',
    why: 'A timely quick win builds momentum and client confidence.',
    due: 'This week'
  }
]

export default function NBAWorkflowPrompter({ client, notes, interactions, requests }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  const actions = useMemo(() => {
    if (client?.name === 'Avery Carter') return averyActions
    return genericActions
  }, [client])

  const selected = actions[activeIndex]
  const latestNote = notes[0]?.content
  const recentMeeting = interactions.find((interaction) => interaction.type === 'meeting')
  const latestRequest = requests[0]

  return (
    <Card className="relative overflow-hidden rounded-[2rem] border border-cyan-400/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-0 shadow-[0_25px_110px_-40px_rgba(56,189,248,0.55)] ring-1 ring-cyan-500/20">
      <div className="absolute -right-10 top-8 h-24 w-24 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -left-10 top-20 h-28 w-28 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="relative space-y-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              New
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white">Next-Best-Action Workflow Prompter</h2>
            <p className="mt-1 max-w-xl text-sm leading-6 text-slate-300">
              AI-backed workflow guidance that gives Avery a high-value next step, right from the CRM.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <div className="rounded-3xl bg-slate-900/95 px-4 py-3 text-sm text-slate-200 shadow-inner shadow-slate-900/50">
              <div className="text-slate-400">Client</div>
              <div className="mt-1 text-lg font-semibold text-white">{client?.name || 'Avery Carter'}</div>
            </div>
            <Button variant="primary" className="rounded-full px-5 py-3 text-sm font-semibold">
              Activate NBA Prompt
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {actions.map((action, index) => (
            <button
              key={action.title}
              onClick={() => setActiveIndex(index)}
              className={`rounded-3xl border px-4 py-4 text-left transition ${index === activeIndex ? 'border-cyan-400/60 bg-slate-800/95 text-white shadow-lg shadow-cyan-500/20' : 'border-slate-800 bg-slate-950/80 text-slate-300 hover:border-cyan-400/40 hover:bg-slate-900'}`}
            >
              <div className="text-sm uppercase tracking-[0.18em] text-cyan-300">Action {index + 1}</div>
              <div className="mt-3 text-base font-semibold">{action.title}</div>
              <div className="mt-2 text-sm text-slate-400">{action.due}</div>
            </button>
          ))}
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 shadow-sm shadow-slate-950/20">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Selected prompt</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{selected.title}</h3>
            </div>
            <div className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200">Priority: {selected.due}</div>
          </div>
          <p className="mt-4 text-slate-300">{selected.description}</p>
          <div className="mt-5 rounded-3xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-200">
            <div className="text-slate-400">AI prompt preview</div>
            <pre className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-100">{selected.prompt}</pre>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-900/95 p-4 text-sm text-slate-200">
              <div className="text-slate-400">Latest note</div>
              <p className="mt-2 text-sm text-slate-100">{latestNote || 'Client shared a preference for tax-efficient planning and portfolio alignment.'}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/95 p-4 text-sm text-slate-200">
              <div className="text-slate-400">Recent meeting</div>
              <p className="mt-2 text-sm text-slate-100">{recentMeeting?.summary || 'Last touchpoint reviewed current allocations and client goals.'}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/95 p-4 text-sm text-slate-200">
              <div className="text-slate-400">Open request</div>
              <p className="mt-2 text-sm text-slate-100">{latestRequest?.summary || 'No active requests. Recommend proactive outreach.'}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
