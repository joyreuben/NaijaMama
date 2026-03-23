import { useState } from 'react'
import { weekData, trimesterDangers } from '../data/pregnancyWeeks'

export default function PregnancyTracker() {
  const [lmp, setLmp] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    if (!lmp) return

    const lmpDate = new Date(lmp)
    const today = new Date()
    const diffDays = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24))
    const week = Math.min(Math.max(Math.floor(diffDays / 7), 1), 40)
    const trimester = week <= 12 ? 1 : week <= 26 ? 2 : 3

    const dueDate = new Date(lmpDate)
    dueDate.setDate(dueDate.getDate() + 280)
    const dueDateStr = dueDate.toLocaleDateString('en-NG', {
      day: 'numeric', month: 'long', year: 'numeric'
    })

    const weeks = Object.keys(weekData).map(Number).sort((a, b) => a - b)
    const closest = weeks.reduce((prev, curr) =>
      Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev
    )

    setResult({ week, trimester, dueDateStr, data: weekData[closest] })
  }

  const trimesterNames = { 1: '1st Trimester', 2: '2nd Trimester', 3: '3rd Trimester' }
  const trimesterColors = {
    1: 'from-rose-700 to-red-500',
    2: 'from-green-800 to-green-600',
    3: 'from-red-900 to-red-600'
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">📅 Pregnancy Tracker</h1>
        <p className="text-gray-500 font-light leading-relaxed">
          Enter your Last Menstrual Period (LMP) date to track your pregnancy week by week.
        </p>
      </div>

      {/* LMP Input */}
      <div className="bg-white border-2 border-amber-100 rounded-2xl p-6 mb-8 flex flex-wrap items-center gap-4">
        <label className="text-sm font-semibold text-gray-700 flex-shrink-0">
          📆 Last Menstrual Period:
        </label>
        <input
          type="date"
          value={lmp}
          onChange={e => { setLmp(e.target.value); setResult(null) }}
          className="flex-1 min-w-[180px] border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:border-red-400 transition-colors"
        />
        <button
          onClick={calculate}
          disabled={!lmp}
          className="bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 flex-shrink-0"
        >
          Calculate →
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="animate-fade-in">
          {/* Week Banner */}
          <div className={`bg-gradient-to-br ${trimesterColors[result.trimester]} text-white rounded-2xl p-8 mb-6 flex justify-between items-center flex-wrap gap-6`}>
            <div>
              <div className="text-8xl font-black leading-none">{result.week}</div>
              <div className="text-white/80 text-lg mt-2 font-light">Weeks Pregnant</div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold inline-block mb-3">
                {trimesterNames[result.trimester]}
              </div>
              <div className="text-white/75 text-sm">Due date: {result.dueDateStr}</div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Baby Size */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Baby's Size</div>
              <div className="text-3xl font-black text-gray-900">{result.data.size}</div>
              <div className="text-sm text-gray-400 mt-1">{result.data.fruit}</div>
            </div>

            {/* Baby Weight */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Baby's Weight</div>
              <div className="text-3xl font-black text-gray-900">{result.data.weight}</div>
              <div className="text-sm text-gray-400 mt-1">Approximate</div>
            </div>

            {/* Weekly Tip */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 col-span-2">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">💡 This Week's Tip</div>
              <p className="text-gray-700 text-sm leading-relaxed font-light">{result.data.tip}</p>
            </div>

            {/* Danger Signs */}
            <div className="bg-white border-2 border-red-100 rounded-2xl p-6 col-span-2">
              <div className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4">⚠️ Watch Out For This Trimester</div>
              <div className="flex flex-col gap-3">
                {trimesterDangers[result.trimester].map((d, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-800">
                    <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => window.location.href = '/checker'}
            className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold text-base hover:bg-red-700 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            🚨 Check My Symptoms Now →
          </button>
        </div>
      )}
    </div>
  )
}