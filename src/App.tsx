import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from './store/gameStore'
import HomeScreen from './screens/HomeScreen'
import StoryIntroScreen from './screens/StoryIntroScreen'
import ChapterScreen from './screens/ChapterScreen'
import MinigameScreen from './screens/MinigameScreen'
import FinalScreen from './screens/FinalScreen'

const slide = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { duration: 0.3, ease: 'easeInOut' as const },
}

function App() {
  const screen = useGameStore((s) => s.currentScreen)

  return (
    <AnimatePresence mode="wait">
      {screen === 'home' && (
        <motion.div key="home" {...slide} className="min-h-screen">
          <HomeScreen />
        </motion.div>
      )}
      {screen === 'story-intro' && (
        <motion.div key="story-intro" {...slide} className="min-h-screen">
          <StoryIntroScreen />
        </motion.div>
      )}
      {(screen === 'intro' || screen === 'chapter') && (
        <motion.div key={`chapter-${screen}`} {...slide} className="min-h-screen">
          <ChapterScreen />
        </motion.div>
      )}
      {(screen === 'minigame' || screen === 'result') && (
        <motion.div key="minigame" {...slide} className="min-h-screen">
          <MinigameScreen />
        </motion.div>
      )}
      {screen === 'final' && (
        <motion.div key="final" {...slide} className="min-h-screen">
          <FinalScreen />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
