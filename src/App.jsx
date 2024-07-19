import Header from './components/header/Header'

// styling import
import "./sass/reset.scss"
import "./sass/global.scss";
import Footer from './components/footer/Footer';
import Dashboard from './components/dashboard/Dashboard';
import TaskManagement from './components/task-managment/TaskManagement';

function App() {

  return (
    <>
      <Header/>
      <main>
        <Dashboard/>
        <TaskManagement/>
      </main>
      <Footer/>
    </>
  )
}

export default App
