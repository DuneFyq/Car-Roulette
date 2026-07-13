import { ref, watch, onMounted, computed } from 'vue';

type Theme = 'light' | 'dark';

const currentTheme = ref<Theme>('dark');

export function useTheme() {
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
  };

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme;
  };

  watch(currentTheme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('app-theme', newTheme);
  });

  onMounted(() => {
    const saved = localStorage.getItem('app-theme') as Theme | null;

    if (saved) {
      currentTheme.value = saved;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      currentTheme.value = prefersDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', currentTheme.value);
  });

  return {
    theme: currentTheme,
    isDark: computed(() => currentTheme.value === 'dark'),
    toggleTheme,
    setTheme,
  };
}