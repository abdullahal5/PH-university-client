type Ttitle = {
  title: string,
};

const Title = ({ title }: Ttitle) => {
  return (
    <div className="mb-3">
      <h1 className="text-3xl font-semibold text-center">{title}</h1>
    </div>
  );
};

export default Title;
