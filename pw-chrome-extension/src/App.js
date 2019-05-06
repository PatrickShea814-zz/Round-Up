import React from 'react';
import ExtensionNav from './Components/NavigationBar/NavigationBar';
import ItemPreview from './Components/ItemLinkPreview/ItemPreview';
import SaveItem from './Components/SaveItem/SaveItem';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ExtensionNav />
        <ItemPreview />
        <SaveItem />
      </header>
    </div>
  );
}

export default App;
