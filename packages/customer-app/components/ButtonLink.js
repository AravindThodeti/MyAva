import React from "react";
import Link from "next/link";
import { string, object, func } from "prop-types";

const propTypes = {
  className: string,
  href: string,
  hrefAs: string,
  children: object,
  onClick: func,
};
const ButtonLink = ({ className, href, hrefAs, children, onClick }) => {
  return (
    <Link href={href} as={hrefAs}>
      <a className={className} onClick={onClick}>
        {children}
      </a>
    </Link>
  );
};
ButtonLink.propTypes = propTypes;
export default ButtonLink;
