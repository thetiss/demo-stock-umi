import React from "react";
import styles from './index.css';
const PageLoading: React.FC = () => (
  <div style={{width:'100vw',height:'100vh',backgroundColor:'#2a2a2a'}} className='common_flex'>
    <div className={styles.loader}>Loading...</div>
</div>
);

export default PageLoading;
