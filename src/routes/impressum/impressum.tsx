const Impressum = () => {
  const text: string|undefined = process.env.REACT_APP_IMPRESSUM_TEXT;

  return (
    <div className="text-center">
      {text}
    </div>
  );
};

export default Impressum;