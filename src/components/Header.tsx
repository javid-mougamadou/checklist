import { SunIcon, MoonIcon, MenuIcon } from './icons'
import { THEME_ICON_COLORS } from '../constants/theme'
import type { Theme } from '../constants/theme'

const PROJECT_NAME = 'Checklist'

type HeaderProps = {
  theme: Theme
  onToggleTheme: () => void
}

const getThemeToggleLabel = (theme: Theme): string =>
  theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'

const getThemeMenuLabel = (theme: Theme): string =>
  theme === 'dark' ? 'Mode clair' : 'Mode sombre'

function ThemeIconButton({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const iconClassName = THEME_ICON_COLORS[theme]
  const isDarkMode = theme === 'dark'

  return (
    <button
      type="button"
      className="btn btn-circle btn-ghost"
      onClick={onToggleTheme}
      aria-label={getThemeToggleLabel(theme)}
    >
      {isDarkMode ? (
        <SunIcon className={iconClassName} />
      ) : (
        <MoonIcon className={iconClassName} />
      )}
    </button>
  )
}

function ThemeMenuButton({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const iconClassName = THEME_ICON_COLORS[theme]
  const isDarkMode = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggleTheme}
      className="flex w-full items-center justify-between gap-2 px-4 py-2"
    >
      <span>{getThemeMenuLabel(theme)}</span>
      {isDarkMode ? (
        <SunIcon className={iconClassName} size="sm" />
      ) : (
        <MoonIcon className={iconClassName} size="sm" />
      )}
    </button>
  )
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const iconColor = THEME_ICON_COLORS[theme]

  return (
    <header className="navbar fixed top-0 z-50 w-full bg-base-100/80 backdrop-blur-sm">
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex-none">
          <a href="/" className="btn btn-ghost text-xl font-bold text-base-content">
            {PROJECT_NAME}
          </a>
        </div>

        {/* Desktop: bouton thème en haut à droite */}
        <div className="hidden flex-none md:block">
          <ThemeIconButton theme={theme} onToggleTheme={onToggleTheme} />
        </div>

        {/* Mobile: menu burger avec option thème */}
        <div className="dropdown dropdown-end flex-none md:hidden">
          <label
            tabIndex={0}
            className={`btn btn-circle btn-ghost ${iconColor}`}
            aria-label="Menu"
          >
            <MenuIcon />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg"
          >
            <li>
              <ThemeMenuButton theme={theme} onToggleTheme={onToggleTheme} />
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
