import React from 'react';

function Flag({ flag }) {
  return (
    <div className="flag">
      <img src={flag} alt="Flag" />
    </div>
  );
}

export default Flag;
