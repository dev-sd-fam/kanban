import Wrapper from "../wrapper/Wrapper"
import "./dashboard.scss"

const Dashboard = () => {
  return (
    <section className="dashboard">
      <Wrapper>
        <ul className="grid">
          <li className="blue">Created Task 11</li>
          <li className="green">Completed Task 4</li>
          <li className="red">Pending Task 7 </li>
        </ul>
      </Wrapper>
    </section>
  )
}

export default Dashboard