import React from "react";

import "./SuccessCheckMark.scss";

const SuccessCheckMark = props => {
    return (
        <div className="success-checkmark">
            <div className="check-icon">
                <span className="icon-line line-tip" />
                <span className="icon-line line-long" />
                <div className="icon-circle" />
                <div className="icon-fix" />
            </div>
        </div>
    );
};

export default SuccessCheckMark;
