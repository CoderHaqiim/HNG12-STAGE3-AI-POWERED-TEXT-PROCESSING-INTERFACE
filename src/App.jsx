import Nav from './components/nav'
import Maincontent from './components/maincontent'
import Searchbar from './components/searchbar'
import ErrorDisplay from './components/errorDisplay'
import { background,backgroundContext } from './redux/states/background'

function App() {
  return (
    <backgroundContext.Provider value = {background}> 
       <div className='w-full relative h-[100dvh] bg-bg1 bg-[white] flex flex-col justify-between'>
        <ErrorDisplay/>
        <Nav/>
        <Maincontent/>
        <Searchbar/>
      </div>
    </backgroundContext.Provider>
  )
}

export default App
