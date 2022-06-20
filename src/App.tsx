import {UserProvider} from "./providers/PlayerProvider";
import {BoardProvider} from "./providers/GameProvider";
import {AppRouter} from "./routers/AppRouter";

function App() {
  return (
    <UserProvider>
      <BoardProvider>
        <AppRouter />
      </BoardProvider>
    </UserProvider>
  );
}

export default App;
