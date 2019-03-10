import React from "react";
const Rank = ({name,entries}) => {
    return (
        <div className='center' >
            <div className="white f3">
                {`${name}, Your current rank is...`}
            </div>
            <div className="f1">
                {entries}
            </div>
        </div>
    );
}
export default Rank;