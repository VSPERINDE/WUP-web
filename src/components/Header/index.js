const Header = () => {
  return (
    <header className="container-fluid d-flex justify-content-end">
      <div className="d-flex align-items-center">
        <div>
          <span className="d-block m-0 p-0 text-white">Mist Collab</span>
          <small className="m-0 p-0">Plano Gold</small>
        </div>
        <img
          alt=""
          src="https://lh3.googleusercontent.com/p/AF1QipNAEbHePSIp8jHP18o_mLvrfXQ15sF4e1CKgZoM=s680-w680-h510"
        />
        <span className="mdi mdi-chevron-down text-white"></span>
      </div>
    </header>
  );
};

export default Header;
