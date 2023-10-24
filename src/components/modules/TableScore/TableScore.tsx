import React from 'react';

import './TableScore.scss';

type Props = {
  children: React.ReactNode;
};

export const TableScore: React.FC<Props> = ({
  children,
}) => {
  return (
    <div className="table-score">
      {children}
    </div>
  );
};
