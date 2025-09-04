import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
export const Logo = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 43 40"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath="url(#logo_svg__a)">
      <path
        fill="url(#logo_svg__b)"
        d="m42.99 39.331-7.471-6.606c7.009-7.626 6.715-19.256-.895-26.538-7.92-7.583-20.762-7.583-28.683 0s-7.921 19.877 0 27.46c3.96 3.79 9.15 5.687 14.341 5.687H42.99zM29.397 11.19c4.793 4.588 5.019 11.884.691 16.732L11.165 11.189c5.034-4.819 13.196-4.819 18.232 0"
      />
      <path
        fill="url(#logo_svg__c)"
        d="M11.165 11.189c-2.332 2.232-3.777 5.319-3.777 8.725 0 6.816 5.773 12.342 12.892 12.342 3.928 0 7.44-1.684 9.806-4.335z"
      />
      <path
        fill="url(#logo_svg__d)"
        d="M29.397 11.189c4.793 4.588 5.019 11.884.691 16.732l5.43 4.804c7.01-7.626 6.716-19.256-.894-26.538"
        opacity={0.8}
      />
    </g>
    <defs>
      <linearGradient
        id="logo_svg__b"
        x1={7.051}
        x2={36.124}
        y1={39.427}
        y2={9.061}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.07} stopColor="#00F" />
        <stop offset={0.5} stopColor="#ED4CCE" />
        <stop offset={1} stopColor="#FFE91F" />
      </linearGradient>
      <linearGradient
        id="logo_svg__c"
        x1={7.011}
        x2={29.709}
        y1={21.724}
        y2={21.724}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1E1E95" />
        <stop offset={0.94} stopColor="#ED4CCE" stopOpacity={0.5} />
      </linearGradient>
      <linearGradient
        id="logo_svg__d"
        x1={35.752}
        x2={45.212}
        y1={30.924}
        y2={19.56}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00F" />
        <stop offset={0.407} stopColor="#FC6AD4" stopOpacity={0.2} />
        <stop offset={0.887} stopColor="#FFDE1D" stopOpacity={0} />
      </linearGradient>
      <clipPath id="logo_svg__a">
        <path fill="#fff" d="M0 .5h43v39H0z" />
      </clipPath>
    </defs>
  </svg>
);
