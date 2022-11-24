import Dashboard_Style from '../styles/dashborad.module.css'
import toast, { Toaster } from 'react-hot-toast';
export default function Home() {
  const a = "Data saved"
  const click_tost = () => {
    toast.success(a, {
      style: {
        padding: '16px',
        color: 'black',
        fontWeight: "700",
        fontSize: "22px"
      },
      iconTheme: {
        primary: 'green',
        secondary: '#ffffff',
      },
    });
  }
  return (
    <div>
      <Toaster position="top-center" reverseOrder={ false } />
      <section>
        <h1 style={ { margin: "20px auto" } }>Dashboard</h1>
      </section>
      <section>
        <div className={ `${Dashboard_Style.dashboard_main}` }>
          <div className={ `card ${Dashboard_Style.dashboard_card}` }>
            <h3 style={ { textAlign: "center" } } >ABCD</h3>
            <h3 style={ { textAlign: "center" } } >120 $</h3>
            <button onClick={ click_tost }>Tost</button>
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
