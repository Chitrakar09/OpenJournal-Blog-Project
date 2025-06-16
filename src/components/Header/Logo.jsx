import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

function Logo() {
  const isScreenMd = useMediaQuery({
    minWidth: 768,
  });
  return (
    <>
      <div className="flex space-x-2 justify-start items-center">
        {isScreenMd ? (
          <p>
            <FontAwesomeIcon icon={faBookOpen} style={{ color: "#fca311" }} />
          </p>
        ) : null}
        <p>OpenJournal</p>
      </div>
    </>
  );
}

export default Logo;
