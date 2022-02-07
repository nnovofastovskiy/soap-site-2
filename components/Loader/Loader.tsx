import { LoaderProps } from './Loader.props';
import React from "react";
import ContentLoader from "react-content-loader";

const Loader = ({ width, height }: LoaderProps): JSX.Element => (
    <ContentLoader
        speed={2}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    // {...props}
    >
        <rect width={`${width}`} height={`${height}`} />
        {/* <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
        <circle cx="20" cy="20" r="20" /> */}
    </ContentLoader>
);

export default Loader;