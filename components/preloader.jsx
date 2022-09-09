const Preloader = () => {
  return (
    <div id="preloader">
      <div id="status">&nbsp;</div>
      <div className="loader">
        <h1>Loading...</h1>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Preloader;