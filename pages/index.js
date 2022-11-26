import React from 'react';

import styles from '../styles/dashborad.module.css'

export default function Home() {

   return (
      <div>
         <section>
            <h1 className={ `${styles.dashboard_Main_Heading}` }>Dashboard</h1>
         </section>
         <section>
            <div className={ `${styles.dashboard_Main}` }>
               <div className={ `card ${styles.dashboard_Card}` }>
                  <h3>ABCD</h3>
                  <h3>120 $</h3>
               </div>
               <div className={ `card ${styles.dashboard_Card}` }>
                  <h3>ABCD</h3>
                  <h3>120 $</h3>
               </div>
               <div className={ `card ${styles.dashboard_Card}` }>
                  <h3>ABCD</h3>
                  <h3>120 $</h3>
               </div>
               <div className={ `card ${styles.dashboard_Card}` }>
                  <h3>ABCD</h3>
                  <h3>120 $</h3>
               </div>
               <div className={ `card ${styles.dashboard_Card}` }>
                  <h3>ABCD</h3>
                  <h3>120 $</h3>
               </div>
               <div className={ `card ${styles.dashboard_Card}` }>
                  <h3>ABCD</h3>
                  <h3>120 $</h3>
               </div>
            </div>
         </section>
      </div>
   )
}
