import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bank2 from "../../assets/bank.jpeg";
import kalk from "../../assets/kalk.png";

const user = () => {
  const date = new Date();
  const [roomsId, setRoomsId] = useState([]);
  const [roomsPrice, setRoomsPrice] = useState();
  const [bankId, setBankId] = useState([]);
  const [bank, setBank] = useState([]);
  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const [complexName, setComplexName] = useState([]);
  const [company, setCompany] = useState([]);
  useEffect(() => {
    fetch("http://localhost:1000/companiesGet")
      .then((res) => res.json())
      .then((data) => setCompany(data))
      .catch((err) => console.log(err));
  }, []);

  const [companyId, setCompanyId] = useState([]);
  const [complexGet, setComplexGet] = useState("");
  const getCompany = (e) => {
    setComplexGet(e.target.value);
    console.log(e.target.value);
    fetch(`http://localhost:1000/company/${e.target.value}`)
      .then((res) => res.json())
      .then((data) => setCompanyId(data));
  };

  const [complex, setComplex] = useState([]);
  useEffect(() => {
    if (complexGet !== "") {
      fetch(`http://localhost:1000/complexCompanyId/${complexGet}`)
        .then((res) => res.json())
        .then((data) => setComplex(data));
    }
  }, [complexGet]);

  const [rooms, setRooms] = useState([]);
  const [roomsGet, setRoomsGet] = useState();
  const getRooms = (e) => {
    setRoomsGet(e.target.value);
    fetch(`http://localhost:1000/complexId/${e.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data.room);
        setComplexName(data.complex);
      });
  };
  useEffect(() => {
    fetch(`http://localhost:1000/roomGetIdcomplex/${roomsGet}`)
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, [roomsGet]);


  const roomsById = (e) => {
    fetch(`http://localhost:1000/roomGetId/${e.target.value}`)
      .then((res) => res.json())
      .then((data) => setRoomsId(data));
  };
  const mortgage = (e) => {
    fetch(`http://localhost:1000/bankgett/${e.target.value}`)
      .then((res) => res.json())
      .then((data) => setBank(data));
  };

  useEffect(() => {
    let roomPrice;
    roomsId.map((e) => {
      roomPrice = e.room_meter_square * Number(e.room_sum_square);
    });
    setRoomsPrice(roomPrice);
    const [array] = bank.filter((e) => e.bank_max_sum > roomPrice);
    setBankId([array]);
  }, [bank]);

  return (
    <>
      <div className="container-xl">
        <div className="d-flex alignitems-center justify-content-between alert alert-primary mt-3">
          <h3 className="m-0">USER</h3>
          <p className="m-0 p-0 pt-2" style={{ fontSize: "18px" }}>
            {showTime}
          </p>
          <Link
            className="btn text-white"
            style={{ fontSize: "20px", background: "#084298" }}
            to="/login"
          >
            admin
          </Link>
        </div>

        <div>
          <form className="d-flex justify-content-between gap-2 mt-4">
            <div className="w-100">
              <p className="mb-1">Choose Company</p>
              <select className="form-control" onChange={getCompany}>
                <option hidden>Choose Company</option>
                {company &&
                  company.map((e) => {
                    return (
                      <option key={e.company_id} value={e.company_id}>
                        {e.company_name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-100">
              <p className="mb-1">Choose Complex</p>
              <select className="form-control" onChange={getRooms}>
                <option hidden>Choose Complex</option>
                {complex &&
                  complex.map((e) => {
                    return (
                      <option key={e.complex_id} value={e.complex_id}>
                        {e.complex_name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-100">
              <p className="mb-1">Choose Count Room</p>
              <select className="form-control" required onChange={roomsById}>
                <option hidden>Choose Count Room</option>
                {rooms &&
                  rooms.map((e) => {
                    return (
                      <option key={e.room_id} value={e.room_id}>
                        {e.room_number}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-100">
              <p className="mb-1">Mortgage duration</p>
              <select className="form-control" onChange={mortgage}>
                <option hidden>Mortgage duration</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
          </form>
          <hr />
          <div className="border d-flex p-2">
            <div className="border-end " style={{ width: "320px" }}>
              <ul className="list-unstyled text-center mb-0">
                {companyId &&
                  companyId.map((e) => {
                    return (
                      <li key={e.company_id}>
                        <img
                          className="rounded-4"
                          src={e.company_img}
                          alt=""
                          width={300}
                          height={250}
                        />
                        <p className="mb-0 mt-2">{e.company_name}</p>
                      </li>
                    );
                  })}
              </ul>

              <ul className="list-unstyled mt-1 text-center w-100 mb-0 mb-1">
                {complexName.length
                  ? complexName.map((e, i) => (
                      <li key={i}>
                        <span className="mt-0">{e.complex_name}</span>
                      </li>
                    ))
                  : null}
              </ul>

              <ul className="list-unstyled m-0 p-0 ps-3">
                {roomsId.length
                  ? roomsId.map((e, i) => (
                      <li key={i}>
                        <p className="m-0 m-1">
                          Room count:  <span className="text-primary">
                            {e.room_number}  Xona
                          </span>
                        </p>
                        <p className="m-0 m-1">
                          Meter square:  <span className="text-primary">
                            {e.room_meter_square} 
                            <span>
                              m <sup>2</sup> 
                            </span>
                          </span> 
                        </p>
                        <p className="m-0 m-1">
                          Room price: 
                          <span className="text-primary">  {e.room_sum_square}
                          </span>
                        </p>
                        <p className="m-0 m-1">
                          Location:   <span className="text-primary"> O'zbekistan </span>
                        </p>
                      </li>
                    ))
                  : null}
              </ul>
            </div>

            <ul
              className="list-unstyled border-start"
              style={{ paddingLeft: "117px", margin: "0", marginLeft: "10px" }}
            >
              {!bankId.includes(undefined) &&
                bankId.map((e, i) => {
                  return (
                    <li key={i}>
                      <img
                        className="rounded-4"
                        src={bank2}
                        alt=""
                        width={300}
                        height={250}
                      />
                      <p className="mb-0 mt-2 text-center">{e.bank_name}</p>
                      <p className="m-0 m-1">
                        Bank money can give:{" "}
                        <span className="text-primary">
                          {e.bank_max_sum} so'm
                        </span>
                      </p>
                      <p className="m-0 m-1">
                        Mortgage duraction:{" "}
                        <span className="text-primary">
                          {e.bank_max_year} year
                        </span>
                      </p>
                      <p className="m-0 m-1">
                        Starting payment:{" "}
                        <span className="text-primary">{e.bank_percent} %</span>
                      </p>
                    </li>
                  );
                })}
            </ul>

            <ul className="list-unstyled" style={{marginLeft: "153px"}}>
                {
                    !bankId.includes(undefined) && bankId.map((e) => {
                         return <li className="ps-2" key={e.bank_id}>
                                    <img className="rounded-4" src={kalk} alt="" width={300} height={250}/>
                                     <p className="m-0 m-1 mt-2">House price: <span className="text-primary">{roomsPrice} so'm</span></p>
                                     <p className="m-0 m-1">Starting payment: <span className="text-primary">{(roomsPrice * e.bank_percent) / 100} so'm</span></p>
                                     <p className="m-0 m-1">Oylik to'lov:  <span className="text-primary">{
                                            (roomsPrice -
                                              (roomsPrice * e.bank_percent) / 100) /
                                              (12 * e.bank_max_year)
                                          } so'm</span>
                                     </p>
                                     <p className="m-0 m-1">To'lov muddati: <span className="text-primary">{e.bank_max_year} year</span></p>
                                     <p className="m-0 m-1">Bank Xizmati: <span className="text-primary">2 500 000 so'm</span></p>
                                 </li>
                })
                }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default user;
