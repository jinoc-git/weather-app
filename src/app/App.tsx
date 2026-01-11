import { MainProvider } from './providers';
import { Router } from './router';

function App() {
  return (
    <MainProvider>
      <Router />
    </MainProvider>
  );
}

export default App;
