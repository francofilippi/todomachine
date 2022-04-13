import React from "react";
import ContentLoader from "react-content-loader"

function TodosLoading(props) {
    return (
        <ContentLoader
            speed={2}
            width={400}
            height={434}
            viewBox="0 0 400 434"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="0" y="0" rx="1" ry="1" width="320" height="72" />
            <rect x="0" y="96" rx="1" ry="1" width="320" height="72" />
            <rect x="0" y="192" rx="1" ry="1" width="320" height="72" />
        </ContentLoader>
    );
}

export { TodosLoading };
