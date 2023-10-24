import {useContext} from 'react';
import { MyGlobalContext } from '../../base';

import './TreeOffsets.scss';

type TreeOffsetsProps = {
  carbon: number
}

export const TreeOffsets = ({carbon}: TreeOffsetsProps) => {
  const { weight } = useContext(MyGlobalContext);
  
  return (
    <div className="tree-offsets">
      <h3 className="tree-offsets__title">
        Trees needed to offset your emissions
      </h3>

      <div className="tree-offsets__result">
        <p className="tree-offsets__result-value">
          {(carbon / 20).toFixed()}
        </p>
        <div className="tree-offsets__image">
          <img src="/ph_tree-duotone.png" alt="tree" />
        </div>
      </div>

      <p className="tree-offsets__label">
        1 tree offsets ≈ {weight === 'kg' ? 20 : (20 * 2.20462).toFixed()} {weight} of carbon each year
      </p>
    </div>
  )
}