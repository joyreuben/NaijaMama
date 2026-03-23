import { Link } from 'react-router-dom'

export default function Home() {
  const features = [
    {
      path: '/checker',
      icon: '🚨',
      label: 'Check Symptoms',
      desc: 'Know if you need urgent care right now',
      color: 'from-red-700 to-red-500',
      shadow: 'hover:shadow-red-200',
    },
    {
      path: '/tracker',
      icon: '📅',
      label: 'Pregnancy Tracker',
      desc: 'Your week-by-week pregnancy guide',
      color: 'from-green-800 to-green-600',
      shadow: 'hover:shadow-green-200',
    },
    {
      path: '/hospitals',
      icon: '🏥',
      label: 'Find Hospital',
      desc: 'Nearest NHIS maternity clinic',
      color: 'from-blue-800 to-blue-600',
      shadow: 'hover:shadow-blue-200',
    },
    {
      path: '/emergency',
      icon: '🆘',
      label: 'Emergency Alert',
      desc: 'One tap sends your location',
      color: 'from-orange-700 to-orange-500',
      shadow: 'hover:shadow-orange-200',
    },
  ]

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-bold px-4 py-2 rounded-full border border-red-100 mb-8 uppercase tracking-widest">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        Helping Nigerian Mothers Stay Safe
      </div>

      {/* Title */}
      <h1 className="text-5xl font-black text-gray-900 leading-tight mb-6">
        Every mother deserves to{' '}
        <span className="text-red-600 relative">
          survive
          <span className="absolute bottom-1 left-0 w-full h-1 bg-red-200 rounded-full -z-10" />
        </span>{' '}
        childbirth.
      </h1>

      {/* Description */}
      <p className="text-gray-500 text-lg font-light leading-relaxed mb-10 max-w-lg mx-auto">
        82 Nigerian mothers die every day from preventable complications. NaijaMama helps you recognize danger signs, track your pregnancy, and get help — fast.
      </p>

      {/* Stats */}
      <div className="flex justify-center gap-12 mb-12">
        {[
          ['82', 'Deaths/Day'],
          ['70%', 'Preventable'],
          ['36', 'States'],
        ].map(([num, label]) => (
          <div key={label}>
            <div className="text-4xl font-black text-red-600">{num}</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-semibold">{label}</div>
          </div>
        ))}
      </div>

      {/* Language Toggle */}
      <div className="flex justify-center gap-2 mb-10">
        {['🇬🇧 English', '🇳🇬 Pidgin', '🇳🇬 Hausa', '🇳🇬 Yoruba'].map((lang, i) => (
          <button
            key={lang}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border
              ${i === 0
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-gray-500 border-gray-200 hover:border-red-300 hover:text-red-600'}`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        {features.map(f => (
          <Link
            key={f.path}
            to={f.path}
            className={`bg-gradient-to-br ${f.color} text-white p-6 rounded-2xl text-left transition-all hover:-translate-y-1 hover:shadow-xl ${f.shadow}`}
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <div className="font-bold text-lg mb-1">{f.label}</div>
            <div className="text-white/75 text-sm font-light">{f.desc}</div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-red-900 via-red-700 to-red-500 rounded-2xl p-8 text-white">
        <div className="text-3xl mb-3">🤱</div>
        <h3 className="text-xl font-black mb-2">Built for every Nigerian mother</h3>
        <p className="text-white/75 text-sm font-light leading-relaxed mb-6">
          From Lagos to Zamfara. In English, Pidgin, Hausa and Yoruba. On any phone. Even with poor internet.
        </p>
        <Link
          to="/checker"
          className="inline-flex items-center gap-2 bg-white text-red-600 font-black px-8 py-3 rounded-xl hover:bg-red-50 transition-all hover:-translate-y-0.5 text-sm"
        >
          🚨 Check My Symptoms Now →
        </Link>
      </div>

    </div>
  )
}