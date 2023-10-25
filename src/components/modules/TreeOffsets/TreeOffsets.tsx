import {useContext} from 'react';
import { MyGlobalContext } from '../../base';

import styles from './TreeOffsets.module.scss';

type TreeOffsetsProps = {
  carbon: number
}

export const TreeOffsets = ({carbon}: TreeOffsetsProps) => {
  const { weight } = useContext(MyGlobalContext);
  
  return (
    <div className={styles.treeOffsets}>
      <h3 className={styles.title}>
        Trees needed to offset your emissions
      </h3>

      <div className={styles.result}>
        <p>
          {(carbon / 20).toFixed()}
        </p>
        <div className={styles.image}>
          <img src="/ph_tree-duotone.png" alt="tree" />
        </div>
      </div>

      <p className={styles.label}>
        1 tree offsets ≈ {weight === 'kg' ? 20 : (20 * 2.20462).toFixed()} {weight} of carbon each year
      </p>
    </div>
  )
}