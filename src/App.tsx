import { FluentProvider, webDarkTheme } from '@fluentui/react-components';
import { Navigation } from './shared/Navigation';

const App = () => {
    return (
      <FluentProvider theme={webDarkTheme}>
        <Navigation />
      </FluentProvider>
    );
};

export default App;