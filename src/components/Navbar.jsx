import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  const links = [
    { path: '/checker', label: '🚨 Symptom Check' },
    { path: '/tracker', label: '📅 Tracker' },
    { path: '/hospitals', label: '🏥 Hospitals' },
  ]

  return (
    <nav className="bg-white border-b-2 border-amber-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
          🤱
        </div>
        <span className="font-black text-xl text-red-600 tracking-tight">
          Naija<span className="text-green-700">Mama</span>
        </span>
      </Link>

      <div className="flex items-center gap-2">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all
              ${location.pathname === link.path
                ? 'bg-red-50 text-red-600'
                : 'text-gray-400 hover:bg-amber-50 hover:text-gray-700'}`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/emergency"
          className={`ml-2 px-4 py-2 rounded-xl text-sm font-bold transition-all
            ${location.pathname === '/emergency'
              ? 'bg-red-700 text-white'
              : 'bg-red-600 text-white hover:bg-red-700'}`}
        >
          🆘 Emergency
        </Link>
      </div>
    </nav>
  )
}
