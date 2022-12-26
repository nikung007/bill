import Dashboard_Style from '../styles/dashborad.module.css'
export default function Home({ data }) {

  return (
    <div>
      <section>
        <h1 style={ { margin: "20px auto" } }>Dashboard</h1>
      </section>
      <section>
        <div className={ `${Dashboard_Style.dashboard_main}` }>
          {
            data.bank.map((ele, index) => {
              return (
                <>
                  <div className={ `card ${Dashboard_Style.dashboard_card}` }>
                    <h3 style={ { textAlign: "center" } } >{ ele.bankName }</h3>
                    <h3 style={ { textAlign: "center", fontWeight: "700" } } >{ Math.round((ele.banaBalance) * 100) / 100 }</h3>
                  </div>
                </>
              )
            })
          }
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >TOTAL-BUY-ROUGH</h3>
            <h3 style={ { textAlign: "center", fontWeight: "700" } } >{ Math.round((data.buyrough) * 100) / 100 }</h3>
          </div>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >TOTAL-SELL-ROUGH</h3>
            <h3 style={ { textAlign: "center", fontWeight: "700" } } >{ Math.round((data.sellrough) * 100) / 100 }</h3>
          </div>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >PADEL-ROUGH</h3>
            <h3 style={ { textAlign: "center", fontWeight: "700" } } >{ Math.round((data.differnceRouhg) * 100) / 100 }</h3>
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