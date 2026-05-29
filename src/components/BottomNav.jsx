import { NavLink } from 'react-router-dom'
import { Home, ShoppingBag, BookMarked, Compass, Settings } from 'lucide-react'

const tabs = [
  { to: '/',          icon: Home,        label: '홈' },
  { to: '/store',     icon: ShoppingBag, label: '스토어' },
  { to: '/diagnosis', icon: Compass,     label: '진단' },
  { to: '/notes',     icon: BookMarked,  label: '내 노트' },
  { to: '/settings',  icon: Settings,    label: '설정' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center
                    bg-ink-900/95 backdrop-blur border-t border-ink-700
                    h-16 max-w-md mx-auto">
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors
             ${isActive ? 'text-gold-400' : 'text-ink-400 hover:text-ink-200'}`
          }
        >
          <Icon size={20} strokeWidth={1.5} />
          <span className="text-xs font-sans">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
