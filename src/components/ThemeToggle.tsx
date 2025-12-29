import { Moon, Sun, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useTheme, ColorTheme, themeConfigs } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { mode, colorTheme, toggleMode, setColorTheme } = useTheme();

  return (
    <div className="flex items-center gap-1">
      {/* Mode Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMode}
        className="h-9 w-9"
      >
        {mode === 'dark' ? (
          <Moon className="h-4 w-4 text-primary" />
        ) : (
          <Sun className="h-4 w-4 text-primary" />
        )}
        <span className="sr-only">Toggle theme mode</span>
      </Button>

      {/* Color Theme Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Palette className="h-4 w-4 text-primary" />
            <span className="sr-only">Select color theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="text-xs font-mono text-muted-foreground">
            COLOR THEME
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(Object.keys(themeConfigs) as ColorTheme[]).map((theme) => (
            <DropdownMenuItem
              key={theme}
              onClick={() => setColorTheme(theme)}
              className={`flex items-center gap-2 cursor-pointer ${colorTheme === theme ? 'bg-primary/20' : ''}`}
            >
              <span>{themeConfigs[theme].icon}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{themeConfigs[theme].name}</span>
                <span className="text-xs text-muted-foreground">{themeConfigs[theme].description}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
