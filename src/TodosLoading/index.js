import React from 'react';
import ContentLoader from "react-content-loader";

import './TodosLoading.css';

function TodosLoading(props) {
  return (
    // <div>
    //   <div className="LoadingTodo-container">
    //     <span className="LoadingTodo-completeIcon"></span>
    //     <div className="LoadingTodo-text"></div>
    //     <span className="LoadingTodo-deleteIcon"></span>
    //   </div>
    //   <div className="LoadingTodo-container">
    //     <span className="LoadingTodo-completeIcon"></span>
    //     <div className="LoadingTodo-text"></div>
    //     <span className="LoadingTodo-deleteIcon"></span>
    //   </div>
    //   <div className="LoadingTodo-container">
    //     <span className="LoadingTodo-completeIcon"></span>
    //     <div className="LoadingTodo-text"></div>
    //     <span className="LoadingTodo-deleteIcon"></span>
    //   </div>
    // </div>
    <div className='container-loader'>
      <ContentLoader
        speed={2}
        width={359}
        height={312}
        style={{ width: '100%', position: 'absolute'}}
        viewBox="0 0 359 312"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="0" y="0" rx="0" ry="0" width="359" height="72" />
        <rect x="0" y="91" rx="0" ry="0" width="359" height="72" />
        <rect x="0" y="183" rx="0" ry="0" width="359" height="72" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        width={359}
        height={312}
        style={{ width: '100%', position: 'absolute', zIndex:1}}
        viewBox="0 0 359 312"
        backgroundColor="#eaeaea"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="12" y="14" rx="0" ry="0" width="49" height="49" />
        <rect x="298" y="14" rx="0" ry="0" width="49" height="49" />        
        <rect x="12" y="101" rx="0" ry="0" width="49" height="49" />
        <rect x="298" y="101" rx="0" ry="0" width="49" height="49" />        
        <rect x="12" y="193" rx="0" ry="0" width="49" height="49" />
        <rect x="298" y="193" rx="0" ry="0" width="49" height="49" />
      </ContentLoader>
    </div>

  );
}

export { TodosLoading };