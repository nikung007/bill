import Dashboard_Style from '../styles/dashborad.module.css'
export default function Home({ data }) {

  return (
    <div>
      <section>
        <h1 style={ { margin: "20px auto" } }>Dashboard</h1>
      </section>
      <section>
        <div className={ `${Dashboard_Style.dashboard_main}` }>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >FD-DOLLAR</h3>
            <h3 style={ { textAlign: "center", fontWeight: "700" } } >{ Math.round((data.fddollar) * 100) / 100 } $</h3>
          </div>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >FD-DIRAM</h3>
            <h3 style={ { textAlign: "center", fontWeight: "700" } } >{ Math.round((data.fddiram) * 100) / 100 } د.إ </h3>
          </div>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >FDFENILA-DIRAM</h3>
            <h3 style={ { textAlign: "center", fontWeight: "700" } } >{ Math.round((data.fenildiram) * 100) / 100 } د.إ </h3>
          </div>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >BUY-ROUGH</h3>
            <h3 style={ { textAlign: "center", fontWeight: "700" } } >{ Math.round((data.buyrough) * 100) / 100 }</h3>
          </div>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >SELL-ROUGH</h3>
            <h3 style={ { textAlign: "center", fontWeight: "700" } } >{ Math.round((data.sellrough) * 100) / 100 }</h3>
          </div>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >DIFF-ROUGH</h3>
            <h3 style={ { textAlign: "center", fontWeight: "700" } } >{ Math.round((data.differnceRouhg) * 100) / 100 }</h3>
          </div>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >CASH</h3>
            <h3 style={ { textAlign: "center", fontWeight: "700" } } >{ Math.round((data.fcash) * 100) / 100 }</h3>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const res = await fetch(`${process.env.API}Bank/Selectedbankbalance`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  const data = await res.json()

  return {
    props: {
      "data": data
    }
  }
}