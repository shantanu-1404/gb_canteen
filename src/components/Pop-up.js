import React, { useState, useRef } from "react";
import { Popover, Overlay, Button, Form } from "react-bootstrap";

const CustomPopover = ({ title, children, triggerText }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <div className="d-inline">
      {/* ✅ Clickable Link */}
      <a
        ref={target}
        href="#"
        className="tax-link"
        onClick={(e) => {
          e.preventDefault();
          setShow(!show);
        }}
      >
        {triggerText}
      </a>

      {/* ✅ Pop-up appears below the text */}
      <Overlay target={target.current} show={show} placement="bottom">
        {(props) => (
          <Popover {...props} className="custom-popover">
            <Popover.Body>
              <h6 className="mb-3">{title}</h6>

              {/* ✅ Dynamic Content */}
              {children}

            
            </Popover.Body>
          </Popover>
        )}
      </Overlay>
    </div>
  );
};

export default CustomPopover;
