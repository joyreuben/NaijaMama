import { useState } from 'react'
import { hospitals } from '../data/hospitals'

export default function HospitalFinder() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [searched, setSearched] = useState(false)

  const search = () => {
    if (!query.trim()) return
    const q = query.toLowerCase().trim()
    let found = []

    for (const [state, hosps] of Object.entries(hospitals)) {
      if (q.includes(state) || state.includes(q)) {
        found = hosps
        break
      }
    }

    setResults(found)
    setSearched(true)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') search()
  }

  const states = ['Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Enugu', 'Kaduna', 'Delta']

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🏥 Find a Hospital</h1>
        <p className="text-gray-500 font-light leading-relaxed">
          Find the nearest NHIS-accredited maternity hospital or clinic in your state.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setSearched(false) }}
          onKeyDown={handleKey}
          placeholder="Enter your state e.g. Lagos, Abuja, Kano..."
          className="flex-1 min-w-[200px] border-2 border-gray-200 bg-white rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-red-400 transition-colors"
        />
        <button
          onClick={search}
          disabled={!query.trim()}
          className="bg-red-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-red-700 transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Search →
        </button>
      </div>

      {/* Quick State Chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {states.map(state => (
          <button
            key={state}
            onClick={() => { setQuery(state.toLowerCase()); setResults(hospitals[state.toLowerCase()]); setSearched(true) }}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
          >
            {state}
          </button>
        ))}
      </div>

      {/* Results */}
      {searched && results && results.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
            {results.length} hospitals found
          </p>
          {results.map((h, i) => (
            <div
              key={i}
              className="bg-white border-2 border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:border-red-200 hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                🏥
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-sm leading-snug mb-1">{h.name}</div>
                <div className="text-xs text-gray-400 mb-2">📍 {h.address}</div>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                    Maternity
                  </span>
                  {h.nhis && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                      NHIS Accredited
                    </span>
                  )}
                </div>
              </div>

              {/* Distance + Call */}
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-black text-red-600">{h.distance}km</div>
                <div className="text-xs text-gray-400 mb-2">away</div>
                <a
                  href={`tel:${h.phone}`}
                  className="bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-green-800 transition-colors inline-block"
                >
                  📞 Call
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {searched && results && results.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-gray-100">
          <div className="text-5xl mb-4">🏥</div>
          <div className="font-bold text-gray-700 text-lg mb-2">No hospitals found</div>
          <p className="text-gray-400 text-sm">Try: Lagos, Abuja, Kano, Rivers, Oyo, Enugu, Kaduna or Delta</p>
        </div>
      )}

      {/* Empty State */}
      {!searched && (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <div className="text-5xl mb-4">🔍</div>
          <div className="font-bold text-gray-700 text-lg mb-2">Search for your state</div>
          <p className="text-gray-400 text-sm">Or tap one of the quick buttons above</p>
        </div>
      )}
    </div>
  )
}