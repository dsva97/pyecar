import React from "react";

const Title = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export const getServerSideProps = (ctx) => {
  const { title } = ctx.query;
  return {
    props: {
      title,
    },
  };
};

export default Title;
