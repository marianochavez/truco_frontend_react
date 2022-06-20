import {UserProvider} from "./providers/PlayerProvider";
import {BoardProvider} from "./providers/BoardProvider";
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
