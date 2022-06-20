import {PlayerProvider} from "./providers/PlayerProvider";
import {GameProvider} from "./providers/GameProvider";
import {AppRouter} from "./routers/AppRouter";

function App() {
  return (
    <PlayerProvider>
      <GameProvider>
        <AppRouter />
      </GameProvider>
    </PlayerProvider>
  );
}

export default App;
