import { MainLayout } from '@/app/layout';
import { MainProvider } from './providers';
import { Router } from './router';

function App() {
  return (
    <MainProvider>
      <MainLayout>
        <Router />
      </MainLayout>
    </MainProvider>
  );
}

export default App;
