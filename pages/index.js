import Dashboard_Style from '../styles/dashborad.module.css'
export default function Home() {
  return (
    <div>
      <section>
        <h1 style={ { margin: "20px auto" } }>Dashboard</h1>
      </section>
      <section>
        <div className={ `${Dashboard_Style.dashboard_main}` }>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >ABCD</h3>
            <h3 style={ { textAlign: "center" } } >120 $</h3>
            <a href="/master/partymaster">SEnd</a>
          </div>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >ABCD</h3>
            <h3 style={ { textAlign: "center" } } >120 $</h3>
          </div>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >ABCD</h3>
            <h3 style={ { textAlign: "center" } } >120 $</h3>
          </div>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >ABCD</h3>
            <h3 style={ { textAlign: "center" } } >120 $</h3>
          </div>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >ABCD</h3>
            <h3 style={ { textAlign: "center" } } >120 $</h3>
          </div>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >ABCD</h3>
            <h3 style={ { textAlign: "center" } } >120 $</h3>
          </div>
        </div>
      </section>
    </div>
  )
}
