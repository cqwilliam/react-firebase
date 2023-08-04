import "./card.css";

const card = () => {
  return (
    <div className="card">
      <div className="text_card">
        <div>
          <h1>Stay updated!</h1>
          <p>Join 60,000+ product managers receiving monthly update on:</p>
        </div>
        <div>
          <p>Product descovery and building what matthers</p>
          <p>Measuring to ensure updates are a success</p>
          <p>And much more!</p>
        </div>
        <form action="">
          <label htmlFor="">Email address</label>
          <input type="text" />
          <input type="submit" value="Subscribe to monthly newsletter" />
        </form>
      </div>
      <div>
        <img src="/desktop.svg" alt="" style={{ width: "300px" }} />
      </div>
    </div>
  );
};

export default card;
