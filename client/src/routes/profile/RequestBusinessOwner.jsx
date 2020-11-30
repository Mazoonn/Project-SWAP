import React from "react";

const RequestBusinessOwner = (props) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <div>
      <h1 className="" style={{ "text-align": "center" }}>
        Business Owner
      </h1>
      <tr />
      <div style={{ "text-align": "center" }}>
        <h5>To become a business owner, you need to provide evidenced</h5>
        <h5>that you have a business and provide contact and will get back to you</h5>
      </div>
      <form>
        <div class="form-group col-md-6">
          <label for="exampleFormControlInput1">Email address</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          <label htmlFor="phone">Phone Number</label>
          <input type="text" className="form-control" id="phone" placeholder="+XXX-XXX-XXXX" />
        </div>
        <div class="form-group col-md">
          <label for="exampleFormControlTextarea1">Request</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
        </div>
        <div style={{ "text-align": "center" }}>
          <button type="Submit Request" disabled={loading} onClick={handleClick} className="btn btn-primary mt-4">
            {loading ? "Loading..." : "Send Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

const handleClick = () => {};

export default RequestBusinessOwner;
