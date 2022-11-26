import React from 'react';

import Dashboard_Style from '../styles/dashborad.module.css'

export default function Home() {

   return (
      <div>
         <section>
            <h1 className={ `${Dashboard_Style.dashboard_Main_Heading}` }>Dashboard</h1>
         </section>
         <section>
            <div className={ `${Dashboard_Style.dashboard_Main}` }>
               <div className={ `card ${Dashboard_Style.dashboard_Card}` }>
                  <h3>ABCD</h3>
                  <h3>120 $</h3>
               </div>
               <div className={ `card ${Dashboard_Style.dashboard_Card}` }>
                  <h3>ABCD</h3>
                  <h3>120 $</h3>
               </div>
               <div className={ `card ${Dashboard_Style.dashboard_Card}` }>
                  <h3>ABCD</h3>
                  <h3>120 $</h3>
               </div>
               <div className={ `card ${Dashboard_Style.dashboard_Card}` }>
                  <h3>ABCD</h3>
                  <h3>120 $</h3>
               </div>
               <div className={ `card ${Dashboard_Style.dashboard_Card}` }>
                  <h3>ABCD</h3>
                  <h3>120 $</h3>
               </div>
               <div className={ `card ${Dashboard_Style.dashboard_Card}` }>
                  <h3>ABCD</h3>
                  <h3>120 $</h3>
               </div>
            </div>
         </section>
      </div>
   )
}
