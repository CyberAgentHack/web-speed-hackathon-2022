import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledDialog = styled.dialog`
  border: 1px solid #a8a29e;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

/**
 * @typedef Props
 * @type {object}
 * @property {Function} onClose
 */

/** @type {React.ForwardRefExoticComponent<{Props>} */
export const Dialog = forwardRef(({ children, onClose }, ref) => {
  return (
    <StyledDialog ref={ref} onClose={onClose}>
      {children}
    </StyledDialog>
  );
});

Dialog.displayName = "Dialog";
