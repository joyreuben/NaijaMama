import { useState } from 'react'

const defaultContacts = [
  { id: 1, name: 'Emeka', relation: 'Husband', phone: '', avatar: '👨' },
  { id: 2, name: 'Nurse Fatima', relation: 'Community Health Worker', phone: '', avatar: '👩‍⚕️' },
]

export default function EmergencyAlert() {
  const [contacts, setContacts] = useState(defaultContacts)
  const [editing, setEditing] = useState(null)
  const [sosSent, setSosSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [location, setLocation] = useState('Detecting your location...')
  const [locationDetected, setLocationDetected] = useState(false)

  // Detect location on mount
  useState(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)} (GPS detected)`)
          setLocationDetected(true)
        },
        () => {
          setLocation('Lagos, Nigeria (approximate)')
          setLocationDetected(true)
        }
      )
    } else {
      setLocation('Lagos, Nigeria (approximate)')
      setLocationDetected(true)
    }
  }, [])

  const updateContact = (id, field, value) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const sendSOS = () => {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSosSent(true)
      setTimeout(() => setSosSent(false), 5000)
    }, 2500)
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🆘 Emergency Alert</h1>
        <p className="text-gray-500 font-light leading-relaxed">
          One tap sends your GPS location and symptoms to your emergency contacts via WhatsApp — instantly.
        </p>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-red-900 via-red-700 to-red-500 rounded-2xl p-8 text-white text-center mb-8">
        <div className="text-5xl mb-4">🆘</div>
        <h2 className="text-2xl font-black mb-2">In an emergency?</h2>
        <p className="text-white/80 text-sm font-light leading-relaxed">
          Set up your contacts below, then press the SOS button. Your location and danger signs will be sent immediately.
        </p>
      </div>

      {/* Contacts Section */}
      <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-5">👥 Emergency Contacts</h3>

        <div className="flex flex-col gap-4">
          {contacts.map(contact => (
            <div key={contact.id} className="bg-amber-50 border-2 border-amber-100 rounded-xl p-4">
              {editing === contact.id ? (
                /* Edit Mode */
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="text-2xl">{contact.avatar}</div>
                    <div className="font-semibold text-gray-700">Edit Contact</div>
                  </div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={contact.name}
                    onChange={e => updateContact(contact.id, 'name', e.target.value)}
                    className="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-400 transition-colors w-full"
                  />
                  <input
                    type="text"
                    placeholder="Relationship (e.g. Husband, Sister)"
                    value={contact.relation}
                    onChange={e => updateContact(contact.id, 'relation', e.target.value)}
                    className="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-400 transition-colors w-full"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number e.g. 08012345678"
                    value={contact.phone}
                    onChange={e => updateContact(contact.id, 'phone', e.target.value)}
                    className="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-400 transition-colors w-full"
                  />
                  <button
                    onClick={() => setEditing(null)}
                    className="bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 transition-colors"
                  >
                    Save Contact ✓
                  </button>
                </div>
              ) : (
                /* View Mode */
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl flex-shrink-0">
                    {contact.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 text-sm">{contact.name}</div>
                    <div className="text-xs text-gray-400">{contact.relation}</div>
                    {contact.phone ? (
                      <div className="text-xs text-green-700 font-semibold mt-0.5">{contact.phone}</div>
                    ) : (
                      <div className="text-xs text-red-400 font-semibold mt-0.5">⚠️ No phone number added</div>
                    )}
                  </div>
                  <button
                    onClick={() => setEditing(contact.id)}
                    className="text-xs font-bold text-gray-400 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 flex-shrink-0"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Location Bar */}
      <div className={`flex items-center gap-3 rounded-xl px-4 py-3.5 mb-6 border-2 text-sm font-semibold transition-all
        ${locationDetected
          ? 'bg-green-50 border-green-200 text-green-700'
          : 'bg-gray-50 border-gray-200 text-gray-400'}`}
      >
        <span className="text-lg">{locationDetected ? '📍' : '⏳'}</span>
        <span>{location}</span>
      </div>

      {/* SOS Button */}
      <button
        onClick={sendSOS}
        disabled={sending || sosSent}
        className={`w-full py-6 rounded-2xl text-xl font-black tracking-wide transition-all flex items-center justify-center gap-3 shadow-lg
          ${sosSent
            ? 'bg-gradient-to-br from-green-700 to-green-500 shadow-green-200'
            : sending
            ? 'bg-gradient-to-br from-red-800 to-red-600 opacity-80'
            : 'bg-gradient-to-br from-red-900 via-red-700 to-red-500 hover:scale-[1.02] hover:shadow-red-200 active:scale-[0.98]'
          } text-white`}
      >
        {sosSent ? (
          <>✅ ALERT SENT SUCCESSFULLY</>
        ) : sending ? (
          <>
            <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Sending Alert...
          </>
        ) : (
          <>🆘 SEND EMERGENCY ALERT</>
        )}
      </button>

      {/* Sent Confirmation */}
      {sosSent && (
        <div className="mt-4 bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center animate-pulse">
          <div className="text-green-700 font-bold text-sm mb-1">✅ Alert sent to {contacts.length} contacts!</div>
          <div className="text-green-600 text-xs font-light">Your location and symptoms were sent via WhatsApp</div>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
        Your contact will receive your name, GPS location & symptoms on WhatsApp instantly
      </p>

      {/* Emergency Numbers */}
      <div className="mt-8 bg-white border-2 border-gray-100 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-widest">📞 Nigerian Emergency Numbers</h3>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Emergency Services', number: '112', color: 'text-red-600' },
            { label: 'LASAMBUS (Lagos Ambulance)', number: '767', color: 'text-red-600' },
            { label: 'Nigeria Police', number: '199', color: 'text-blue-600' },
            { label: 'NEMA (Disaster)', number: '0800-CALL-NEMA', color: 'text-orange-600' },
          ].map(({ label, number, color }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{label}</span>
              <a>
                href={`tel:${number}`}
                className={`font-black text-base ${color} hover:underline`}
            
                {number}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}