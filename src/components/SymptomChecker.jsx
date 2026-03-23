import { useNavigate } from 'react-router-dom'
import { dangerSigns } from '../data/dangerSigns'

export default function SymptomChecker() {
  const [selected, setSelected] = useState([])
  const [language, setLanguage] = useState('english')
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
    setSubmitted(false)
  }

  const getResult = () => {
    const allSymptoms = dangerSigns.flatMap(g => g.symptoms)
    const selectedSymptoms = allSymptoms.filter(s => selected.includes(s.id))
    const hasDanger = selectedSymptoms.some(s => s.severity === 'danger')
    const hasWarning = selectedSymptoms.some(s => s.severity === 'warning')

    if (selected.length === 0) return null
    if (hasDanger) return 'danger'
    if (hasWarning) return 'warning'
    return 'safe'
  }

  const result = submitted ? getResult() : null

  const resultConfig = {
    danger: {
      bg: 'bg-red-600',
      icon: '🚨',
      title: 'Seek Emergency Care NOW',
      subtitle: 'You have serious danger signs. Go to the nearest hospital immediately or call for help.',
      pidgin: 'Abeg go hospital now now! E dey serious.'
    },
    warning: {
      bg: 'bg-yellow-500',
      icon: '⚠️',
      title: 'Contact Your Health Worker',
      subtitle: 'Some of your symptoms need attention. Call your nurse or midwife today.',
      pidgin: 'Call your nurse or health worker today. No wait.'
    },
    safe: {
      bg: 'bg-green-600',
      icon: '✅',
      title: 'You Seem Okay',
      subtitle: 'No danger signs detected. Keep attending your antenatal visits regularly.',
      pidgin: 'E be like say you dey okay. But still go your antenatal checkup.'
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🚨 Symptom Checker</h1>
        <p className="text-gray-500">Select all symptoms you are currently experiencing</p>
      </div>

      {/* Language Toggle */}
      <div className="flex gap-2 mb-8 bg-amber-50 p-1.5 rounded-xl w-fit">
        {['english', 'pidgin'].map(lang => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all
              ${language === lang ? 'bg-white shadow text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {lang === 'english' ? '🇬🇧 English' : '🇳🇬 Pidgin'}
          </button>
        ))}
      </div>

      {/* Symptom Groups */}
      <div className="space-y-6 mb-8">
        {dangerSigns.map(group => (
          <div key={group.id}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              {group.category}
            </h3>
            <div className="space-y-2">
              {group.symptoms.map(symptom => {
                const isSelected = selected.includes(symptom.id)
                return (
                  <div
                    key={symptom.id}
                    onClick={() => toggle(symptom.id)}
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition-all
                      ${isSelected
                        ? 'bg-red-50 border-red-300'
                        : 'bg-white border-gray-100 hover:border-red-200 hover:bg-red-50/30'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all
                        ${isSelected ? 'bg-red-600 text-white' : 'border-2 border-gray-300'}`}>
                        {isSelected && '✓'}
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {language === 'pidgin' ? symptom.pidgin : symptom.text}
                      </span>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ml-3
                      ${symptom.severity === 'danger'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-yellow-100 text-yellow-700'}`}>
                      {symptom.severity === 'danger' ? '🔴 Danger' : '🟡 Monitor'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Check Button */}
      <button
        onClick={() => setSubmitted(true)}
        disabled={selected.length === 0}
        className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg"
      >
        Check My Symptoms →
      </button>

      {/* Result */}
      {result && (
        <div className={`mt-6 ${resultConfig[result].bg} text-white rounded-2xl p-6`}>
          <div className="text-4xl mb-3">{resultConfig[result].icon}</div>
          <div className="font-bold text-xl mb-2">{resultConfig[result].title}</div>
          <div className="text-white/85 text-sm leading-relaxed">
            {language === 'pidgin'
              ? resultConfig[result].pidgin
              : resultConfig[result].subtitle}
          </div>
          {result === 'danger' && (
            <button
              onClick={() => navigate('/emergency')}
              className="mt-4 inline-flex items-center gap-2 bg-white text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-red-50 transition-all"
            >
              🆘 Send Emergency Alert →
            </button>
          )}
        </div>
      )}
    </div>
  )
}