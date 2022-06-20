import PageContent from './PageContent';
import NavBar from './NavBar';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <NavBar />
        <PageContent />
      </div>
    </QueryClientProvider>
  );
}

export default App;
